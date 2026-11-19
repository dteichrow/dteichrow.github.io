#!/usr/bin/env bash
set -euo pipefail
umask 077

if [[ $# != 1 ]]; then
  echo 'Usage: bash scripts/check_secrets.sh --index | DIRECTORY' >&2
  exit 2
fi

scratch="$(mktemp -d)"
trap 'rm -rf -- "$scratch"' EXIT
script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
target="$1"
if [[ "$target" == "--index" ]]; then
  target="$scratch/index"
  mkdir "$target"
  git checkout-index --all --prefix="$target/"
elif [[ ! -d "$target" ]]; then
  echo 'The directory to scan does not exist.' >&2
  exit 2
fi

# Reject credential files by name, even when the scanner cannot read a key
# (for example, a binary keystore). Log only paths, never file contents.
credential_files="$(find "$target" \( -type f -o -type l \) \( \
  -name '.env' -o -name '.env.*' -o -name '.netrc' -o -name '.pypirc' -o \
  -name 'credentials.json' -o -name '*.pem' -o -name '*.key' -o \
  -name '*.p12' -o -name '*.pfx' -o -path '*/.aws/credentials' -o -path '*/.ssh/id_*' \
\) -print)"
if [[ -n "$credential_files" ]]; then
  printf 'Credential files found in publication inputs:\n%s\n' "$credential_files" >&2
  exit 1
fi

version=8.30.1
case "$(uname -s)-$(uname -m)" in
  Linux-x86_64)
    platform=linux_x64
    checksum=551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb
    ;;
  Darwin-arm64)
    platform=darwin_arm64
    checksum=b40ab0ae55c505963e365f271a8d3846efbc170aa17f2607f13df610a9aeb6a5
    ;;
  *)
    echo 'The pinned secret scanner supports x86-64 Linux and Apple Silicon macOS.' >&2
    exit 2
    ;;
esac

asset="gitleaks_${version}_${platform}.tar.gz"
curl --fail --silent --show-error --location --retry 3 \
  "https://github.com/gitleaks/gitleaks/releases/download/v${version}/${asset}" \
  --output "$scratch/$asset"
printf '%s  %s\n' "$checksum" "$scratch/$asset" | shasum -a 256 --check --status
tar -xzf "$scratch/$asset" -C "$scratch" gitleaks
"$scratch/gitleaks" dir --config "$script_dir/../.gitleaks.toml" --redact=100 --no-banner -- "$target"
