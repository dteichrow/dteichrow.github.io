/* Loaded only after an explicit request. Original procedural teaching geometry. */
import * as THREE from "../vendor/three/three.module.js";
export function createShip(container, onSelect) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#202127");
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor("#202127");
  renderer.domElement.setAttribute(
    "aria-label",
    "Schematic ship cutaway. Use the labeled space buttons and view controls for keyboard access.",
  );
  renderer.domElement.setAttribute("role", "img");
  container.replaceChildren(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const group = new THREE.Group();
  scene.add(group);
  scene.add(new THREE.HemisphereLight("#fff8de", "#303347", 3));
  const key = new THREE.DirectionalLight("#fff2d4", 3);
  key.position.set(-3, 8, 5);
  scene.add(key);
  const parts = new Map(),
    targets = [];
  const material = (color, extra = {}) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
      metalness: 0.05,
      ...extra,
    });
  const timber = material("#9b7850"),
    deck = material("#b99b69"),
    hullMaterial = material("#4c5067", { side: THREE.DoubleSide });
  const hullShape = new THREE.Shape();
  hullShape.moveTo(-5, 1.1);
  hullShape.lineTo(5.25, 1.1);
  hullShape.quadraticCurveTo(4.4, -1, 2.7, -1.15);
  hullShape.lineTo(-2.8, -1.15);
  hullShape.quadraticCurveTo(-4.5, -0.8, -5, 1.1);
  const hull = new THREE.Mesh(
    new THREE.ExtrudeGeometry(hullShape, { depth: 0.13, bevelEnabled: false }),
    hullMaterial,
  );
  hull.position.z = -1.3;
  group.add(hull);
  function box(w, h, d, x, y, z, mat, parent = group) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  }
  box(8.2, 0.12, 2.7, 0, -0.72, 0, deck);
  const upper = new THREE.Group();
  upper.position.y = 0.65;
  group.add(upper);
  box(9.2, 0.12, 2.7, 0, 0, 0, deck, upper);
  // The near half-deck is absent to reveal the interior; thin ribs mark the hull section.
  for (let x = -4; x <= 4; x += 1) {
    box(0.055, 1.8, 0.055, x, 0.12, -1.24, timber);
    box(0.055, 0.55, 0.055, x, -0.42, 1.24, timber);
  }
  for (let x of [-2, 1.8]) {
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.08, 3.6, 10),
      timber,
    );
    mast.position.set(x, 1.8, -0.3);
    upper.add(mast);
    box(2.4, 0.06, 0.06, x, 2.7, -0.3, timber, upper);
  }
  const colors = {
    berths: "#c97562",
    ventilation: "#b9bbd1",
    water: "#7378b0",
    provisions: "#d3b557",
    care: "#8589b7",
  };
  function part(id) {
    const g = new THREE.Group();
    group.add(g);
    parts.set(id, { group: g, base: 0, meshes: [] });
    return g;
  }
  function tag(mesh, id) {
    mesh.userData.space = id;
    mesh.userData.color = colors[id];
    parts.get(id).meshes.push(mesh);
    targets.push(mesh);
  }
  const berths = part("berths");
  for (let x of [-3.2, -1.7, -0.2])
    for (let z of [-0.65, 0.7]) {
      const bed = box(
        1.14,
        0.16,
        0.56,
        x,
        -0.48,
        z,
        material(colors.berths),
        berths,
      );
      tag(bed, "berths");
      box(1.1, 0.09, 0.54, x, -0.61, z, timber, berths);
    }
  const water = part("water");
  for (let x of [0.9, 1.55, 2.2]) {
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.23, 0.23, 0.7, 14),
      material(colors.water),
    );
    barrel.position.set(x, -0.3, 0.63);
    water.add(barrel);
    tag(barrel, "water");
    for (let y of [-0.52, -0.08]) {
      const hoop = new THREE.Mesh(
        new THREE.TorusGeometry(0.235, 0.02, 5, 18),
        timber,
      );
      hoop.rotation.x = Math.PI / 2;
      hoop.position.set(x, y, 0.63);
      water.add(hoop);
    }
  }
  const provisions = part("provisions");
  for (let x of [2.8, 3.55]) {
    const crate = box(
      0.62,
      0.58,
      0.68,
      x,
      -0.4,
      -0.45,
      material(colors.provisions),
      provisions,
    );
    tag(crate, "provisions");
  }
  const care = part("care");
  tag(
    box(1.25, 0.18, 0.9, -3.45, 1.03, 0.2, material(colors.care), care),
    "care",
  );
  box(1.25, 0.5, 0.05, -3.45, 1.14, -0.27, timber, care);
  const ventilation = part("ventilation");
  for (let x of [-0.7, 2.7]) {
    tag(
      box(
        0.64,
        0.14,
        0.75,
        x,
        0.98,
        0.15,
        material(colors.ventilation),
        ventilation,
      ),
      "ventilation",
    );
    for (let z of [-0.15, 0, 0.15, 0.3, 0.45])
      box(0.58, 0.03, 0.025, x, 1.07, z, timber, ventilation);
  }
  const controls = document.createElement("div");
  controls.className = "ship-view-controls";
  controls.innerHTML =
    '<button type="button" data-explode>Separate the decks</button><label>View angle<input type="range" min="-145" max="145" value="25" data-angle></label><label>Deck separation<input type="range" min="0" max="100" value="0" data-separation></label>';
  container.append(controls);
  let angle = 25,
    elevation = 6,
    separation = 0,
    current = null,
    drag = null;
  function render() {
    const a = (angle * Math.PI) / 180;
    camera.position.set(Math.sin(a) * 14, elevation, Math.cos(a) * 14);
    camera.lookAt(0, 0.65 + separation * 0.4, 0);
    upper.position.y = 0.65 + separation * 1.8;
    parts.get("care").group.position.y = separation * 1.8;
    parts.get("ventilation").group.position.y = separation * 1.8;
    renderer.render(scene, camera);
  }
  function resize() {
    const width = container.clientWidth;
    renderer.setSize(width, Math.max(300, Math.min(560, width * 0.64)));
    camera.aspect = renderer.domElement.width / renderer.domElement.height;
    camera.updateProjectionMatrix();
    render();
  }
  const select = (id) => {
    current = id;
    for (const [key, p] of parts)
      for (const mesh of p.meshes) {
        mesh.material.emissive.set(key === id ? "#77602f" : "#000000");
        mesh.material.emissiveIntensity = key === id ? 0.4 : 0;
      }
    render();
  };
  const angleInput = controls.querySelector("[data-angle]"),
    separationInput = controls.querySelector("[data-separation]");
  angleInput.oninput = () => {
    angle = Number(angleInput.value);
    render();
  };
  separationInput.oninput = () => {
    separation = Number(separationInput.value) / 100;
    render();
  };
  controls.querySelector("[data-explode]").onclick = () => {
    separation = separation > 0.5 ? 0 : 1;
    separationInput.value = String(separation * 100);
    controls.querySelector("[data-explode]").textContent = separation
      ? "Assemble the ship"
      : "Separate the decks";
    render();
  };
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const canvas = renderer.domElement;
  canvas.style.touchAction = "pan-y";
  canvas.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, angle };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    angle = Math.max(
      -145,
      Math.min(145, drag.angle + (e.clientX - drag.x) * 0.3),
    );
    angleInput.value = String(angle);
    render();
  });
  canvas.addEventListener("pointerup", (e) => {
    if (!drag) return;
    const moved = Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y);
    drag = null;
    if (moved > 8) return;
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      (-(e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(targets)[0];
    if (hit) onSelect(hit.object.userData.space);
  });
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    document.getElementById("ship-3d-stage").hidden = true;
    document.getElementById("ship-svg").removeAttribute("hidden");
    const toggle = document.getElementById("ship-3d-toggle");
    toggle.disabled = true;
    toggle.textContent = "Illustrated cutaway active";
    document.getElementById("ship-status").textContent =
      "The illustrated cutaway remains available after the 3D context was interrupted.";
  });
  new ResizeObserver(resize).observe(container);
  resize();
  return {
    select,
    resize,
    reset() {
      angle = 25;
      separation = 0;
      angleInput.value = "25";
      separationInput.value = "0";
      controls.querySelector("[data-explode]").textContent =
        "Separate the decks";
      render();
    },
    dispose() {
      renderer.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
    },
  };
}
