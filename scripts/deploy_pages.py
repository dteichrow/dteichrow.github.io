#!/usr/bin/env python3
"""Deploy a Pages artifact without the deploy-pages action's 10-minute cap."""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


API_VERSION = "2026-03-10"
ARTIFACT_NAME = "github-pages"
PENDING_STATUSES = {"deployment_queued", "deployment_in_progress", "deployment_pending"}
SUCCESS_STATUS = "deployment_success"


def required_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def request_json(
    url: str,
    *,
    token: str,
    method: str = "GET",
    payload: dict[str, Any] | None = None,
) -> dict[str, Any]:
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    request = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": API_VERSION,
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        details = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GitHub API {method} {url} failed: {error.code} {details}") from error


def request_oidc_token(repository: str) -> str:
    request_url = required_env("ACTIONS_ID_TOKEN_REQUEST_URL")
    request_token = required_env("ACTIONS_ID_TOKEN_REQUEST_TOKEN")
    separator = "&" if "?" in request_url else "?"
    audience = urllib.parse.quote(f"https://github.com/{repository}", safe="")
    response = request_json(
        f"{request_url}{separator}audience={audience}",
        token=request_token,
    )
    token = response.get("value")
    if not isinstance(token, str) or not token:
        raise RuntimeError("GitHub did not return an OIDC token for the Pages deployment")
    return token


def current_artifact(api_url: str, repository: str, run_id: str, token: str) -> int:
    response = request_json(
        f"{api_url}/repos/{repository}/actions/runs/{run_id}/artifacts?name={ARTIFACT_NAME}",
        token=token,
    )
    artifacts = [
        artifact
        for artifact in response.get("artifacts", [])
        if artifact.get("name") == ARTIFACT_NAME and not artifact.get("expired")
    ]
    if len(artifacts) != 1:
        raise RuntimeError(f"Expected one active {ARTIFACT_NAME!r} artifact, found {len(artifacts)}")
    artifact_id = artifacts[0].get("id")
    if not isinstance(artifact_id, int):
        raise RuntimeError("Pages artifact did not include a numeric id")
    return artifact_id


def wait_for_deployment(
    status_url: str,
    token: str,
    *,
    max_wait_seconds: int,
    poll_seconds: int,
) -> None:
    deadline = time.monotonic() + max_wait_seconds
    while True:
        response = request_json(status_url, token=token)
        status = response.get("status")
        print(f"Pages deployment status: {status}", flush=True)
        if status == SUCCESS_STATUS:
            return
        if status not in PENDING_STATUSES:
            raise RuntimeError(f"Pages deployment ended with status: {status}")
        if time.monotonic() >= deadline:
            raise RuntimeError(
                f"Pages did not finish within {max_wait_seconds} seconds; leaving the accepted deployment running"
            )
        time.sleep(poll_seconds)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--max-wait-seconds", type=int, default=1800)
    parser.add_argument("--poll-seconds", type=int, default=10)
    args = parser.parse_args()
    if args.max_wait_seconds < 1 or args.poll_seconds < 1:
        parser.error("wait and poll intervals must be positive")

    repository = required_env("GITHUB_REPOSITORY")
    run_id = required_env("GITHUB_RUN_ID")
    sha = required_env("GITHUB_SHA")
    token = required_env("GITHUB_TOKEN")
    api_url = os.environ.get("GITHUB_API_URL", "https://api.github.com").rstrip("/")
    artifact_id = current_artifact(api_url, repository, run_id, token)
    deployment = request_json(
        f"{api_url}/repos/{repository}/pages/deployments",
        token=token,
        method="POST",
        payload={
            "artifact_id": artifact_id,
            "environment": "github-pages",
            "pages_build_version": sha,
            "oidc_token": request_oidc_token(repository),
        },
    )
    status_url = deployment.get("status_url")
    if not isinstance(status_url, str) or not status_url:
        raise RuntimeError("GitHub Pages did not return a deployment status URL")
    page_url = deployment.get("page_url")
    if isinstance(page_url, str) and page_url:
        print(f"Pages deployment created for {page_url}", flush=True)
    wait_for_deployment(
        status_url,
        token,
        max_wait_seconds=args.max_wait_seconds,
        poll_seconds=args.poll_seconds,
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        print(f"error: {error}", file=sys.stderr)
        raise SystemExit(1)
