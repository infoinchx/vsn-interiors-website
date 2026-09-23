<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { pageImages } from "../data/imageLibrary";
const props = defineProps({
  palette: { type: String, default: "teal" },
  night: Boolean,
  paused: Boolean,
});
const host = ref(null),
  failed = ref(false);
let touched = false;
let destination = null,
  selectedView = "overview",
  fan,
  wheelHandler;
let renderer,
  scene,
  camera,
  controls,
  frame,
  observer,
  viewObserver,
  inView = true,
  visible = true,
  sofaMaterial,
  wallMaterial,
  sunlight,
  ambient,
  start,
  resetHandler,
  contextHandler;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const palettes = { teal: 0x285a52, clay: 0xb76c4c, blue: 0x415e7a };
function reset() {
  setView("overview");
}
function setView(name) {
  if (!camera || !controls) return;
  selectedView = name;
  touched = true;
  const poses = {
    overview: { target: [2.6, 1.25, 0], offset: [12, 9, 16] },
    living: { target: [-0.2, 1, -0.4], offset: [7, 4.6, 8.6] },
    kitchen: { target: [7.1, 1.25, -1.7], offset: [4.2, 3.7, 7.4] },
    dining: { target: [6.1, 0.9, 1.65], offset: [4.5, 4.5, 7.2] },
    pooja: { target: [4.35, 1.65, -2.65], offset: [1.2, 1.1, 6.2] },
  };
  const pose = poses[name] || poses.overview;
  const target = new THREE.Vector3(...pose.target);
  const scale = camera.aspect < 1 ? Math.min(1.65, 1 / camera.aspect) : 1;
  const position = target
    .clone()
    .add(new THREE.Vector3(...pose.offset).multiplyScalar(scale));
  destination = { position, target };
  if (reduced) {
    camera.position.copy(position);
    controls.target.copy(target);
    destination = null;
    controls.update();
  }
}
defineExpose({ reset, setView });
watch(
  () => props.palette,
  (v) => sofaMaterial?.color.setHex(palettes[v]),
);
watch(
  () => props.night,
  (v) => {
    if (!sunlight) return;
    sunlight.intensity = v ? 0.5 : 3.5;
    ambient.intensity = v ? 0.8 : 2;
    wallMaterial.color.setHex(v ? 0xb3a89c : 0xe9e0d3);
  },
);
onMounted(() => {
  try {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd9d9cc);
    scene.fog = new THREE.Fog(0xd9d9cc, 45, 85);
    camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(16.4, 11.6, 19.8);
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 800 ? 1.25 : 1.6),
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    host.value.appendChild(renderer.domElement);
    renderer.domElement.setAttribute(
      "aria-label",
      "Interactive Indian home with living room, kitchen, dining and pooja area. Drag to rotate, pinch or Ctrl-scroll to zoom.",
    );
    renderer.domElement.setAttribute("role", "img");
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(2.6, 1.25, 0);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 40;
    controls.minAzimuthAngle = -0.25;
    controls.maxAzimuthAngle = 1.55;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minPolarAngle = 0.35;
    controls.autoRotate = false;
    controls.zoomSpeed = 0.6;
    controls.addEventListener("start", () => {
      touched = true;
      destination = null;
    });
    wheelHandler = (e) => {
      if (!e.ctrlKey) e.stopImmediatePropagation();
    };
    renderer.domElement.addEventListener("wheel", wheelHandler, {
      capture: true,
      passive: true,
    });
    ambient = new THREE.HemisphereLight(0xfff7e8, 0x566657, 2);
    scene.add(ambient);
    sunlight = new THREE.DirectionalLight(0xffedd5, 3.5);
    sunlight.position.set(3, 9, 5);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(
      window.innerWidth < 800 ? 1024 : 2048,
      window.innerWidth < 800 ? 1024 : 2048,
    );
    Object.assign(sunlight.shadow.camera, {
      left: -8,
      right: 15,
      top: 8,
      bottom: -8,
    });
    sunlight.shadow.normalBias = 0.035;
    scene.add(sunlight);
    const mat = (color, roughness = 0.8, metalness = 0) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const oak = mat(0xa17c51),
      dark = mat(0x292c25),
      cream = mat(0xe4d6bd),
      gold = mat(0xa5854e, 0.3, 0.7),
      clay = mat(0xbc7557),
      leaf = mat(0x395342);
    const woodCanvas = document.createElement("canvas");
    woodCanvas.width = 128;
    woodCanvas.height = 256;
    const woodCtx = woodCanvas.getContext("2d");
    if (woodCtx) {
      woodCtx.fillStyle = "#c7aa7b";
      woodCtx.fillRect(0, 0, 128, 256);
      for (let i = 0; i < 96; i++) {
        woodCtx.strokeStyle =
          i % 3 === 0 ? "rgba(65,33,10,.12)" : "rgba(243,220,172,.16)";
        woodCtx.lineWidth = 0.6;
        woodCtx.beginPath();
        for (let y = 0; y <= 256; y += 8) {
          const x = i * 1.4 + Math.sin(y * 0.025 + i) * 1.4;
          y === 0 ? woodCtx.moveTo(x, y) : woodCtx.lineTo(x, y);
        }
        woodCtx.stroke();
      }
      const texture = new THREE.CanvasTexture(woodCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      oak.map = texture;
    }
    sofaMaterial = mat(palettes[props.palette]);
    wallMaterial = mat(0xe9e0d3);
    function box(w, h, d, x, y, z, m, r = 0) {
      const mesh = new THREE.Mesh(
        r
          ? new RoundedBoxGeometry(w, h, d, 3, r)
          : new THREE.BoxGeometry(w, h, d),
        m,
      );
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    }
    function cyl(rt, rb, h, x, y, z, m) {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 40), m);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    }
    function sphere(x, y, z, sx, sy, sz, m) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), m);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      scene.add(mesh);
      return mesh;
    }
    
    box(8, 0.22, 6.7, 0, -0.16, 0, oak, 0.06);
    for (let i = 0; i < 20; i++)
      box(
        0.38,
        0.028,
        6.65,
        -3.8 + i * 0.4,
        -0.035,
        0,
        mat(i % 3 === 0 ? 0xb69770 : 0xc4a77e),
      );
    box(8, 3.9, 0.14, 0, 1.86, -3.3, wallMaterial);
    box(0.14, 3.9, 6.7, -4, 1.86, 0, wallMaterial);
    box(7.9, 0.09, 0.07, 0, 0.065, -3.17, cream);
    box(0.07, 0.09, 6.5, -3.88, 0.065, 0, cream);
    
    for (let i = 0; i < 28; i++)
      box(0.065, 3.65, 0.1, -3.72 + i * 0.105, 1.82, -3.17, oak);
    
    const glass = new THREE.MeshStandardMaterial({
      color: 0xc4d4cf,
      roughness: 0.25,
      emissive: 0xb5c5bd,
      emissiveIntensity: 0.4,
    });
    box(0.04, 2.8, 3.65, -3.9, 2, -0.05, glass);
    for (let i = 0; i < 4; i++)
      box(0.07, 2.9, 0.055, -3.84, 2, -1.85 + i * 1.2, dark);
    box(0.08, 0.06, 3.7, -3.83, 3.42, 0, dark);
    box(0.08, 0.06, 3.7, -3.83, 0.58, 0, dark);
    
    for (let j = 0; j < 9; j++)
      cyl(0.075, 0.075, 3.4, -3.7, 1.74, 1.9 + j * 0.08, cream);
    
    box(5.6, 0.035, 3.7, 0.1, 0.015, 0.3, mat(0xcec5ae), 0.03);
    for (let i = 0; i < 6; i++)
      box(5.2, 0.003, 0.018, 0.1, 0.035, -1.28 + i * 0.065, mat(0xa89e86));
    
    box(4.3, 0.36, 1.36, -0.1, 0.47, -1.92, sofaMaterial, 0.12);
    box(4.3, 0.8, 0.32, -0.1, 1, -2.5, sofaMaterial, 0.12);
    for (let i = 0; i < 3; i++)
      box(1.3, 0.24, 1.04, -1.45 + i * 1.35, 0.76, -1.86, sofaMaterial, 0.1);
    box(0.32, 0.65, 1.42, -2.12, 0.85, -1.93, sofaMaterial, 0.1);
    box(0.32, 0.65, 1.42, 1.92, 0.85, -1.93, sofaMaterial, 0.1);
    for (const x of [-1.9, 1.7])
      for (const z of [-2.35, -1.45]) cyl(0.04, 0.045, 0.25, x, 0.15, z, gold);
    const cushion1 = box(0.66, 0.64, 0.21, -1.48, 1.05, -2.18, cream, 0.1);
    cushion1.rotation.z = 0.16;
    const cushion2 = box(0.62, 0.56, 0.22, 1.2, 1.02, -2.17, clay, 0.1);
    cushion2.rotation.z = -0.2;
    
    cyl(0.87, 0.87, 0.1, 0.2, 0.63, 0.17, cream);
    cyl(0.43, 0.48, 0.56, 0.2, 0.32, 0.17, oak);
    cyl(0.53, 0.53, 0.07, 1.17, 0.43, 0.65, oak);
    cyl(0.2, 0.28, 0.4, 1.17, 0.21, 0.65, dark);
    box(0.42, 0.055, 0.31, -0.05, 0.72, 0.21, clay);
    box(0.37, 0.035, 0.28, -0.02, 0.765, 0.2, cream);
    cyl(0.12, 0.1, 0.3, 0.54, 0.84, -0.04, clay);
    cyl(0.2, 0.17, 0.04, 0.57, 0.7, 0.35, dark);
    
    const chair = mat(0xbe774e);
    box(1.05, 0.26, 1.1, 2.65, 0.55, 1.5, chair, 0.15);
    box(1.05, 0.82, 0.22, 2.65, 0.99, 1.95, chair, 0.12);
    for (const x of [2.16, 3.14]) {
      box(0.1, 0.55, 1.15, x, 0.6, 1.5, oak, 0.03);
      box(0.1, 0.6, 0.1, x, 0.3, 1.88, oak);
      box(0.1, 0.6, 0.1, x, 0.3, 1.1, oak);
    }
    
    box(1.45, 0.56, 0.55, 2.93, 0.35, -2.76, oak, 0.03);
    for (let i = 0; i < 10; i++)
      box(0.08, 0.42, 0.018, 2.29 + i * 0.14, 0.36, -2.47, dark);
    
    box(1.8, 1.65, 0.07, 0.56, 2.53, -3.15, gold);
    box(1.69, 1.54, 0.035, 0.56, 2.53, -3.1, cream);
    const art = new THREE.Mesh(new THREE.CircleGeometry(0.49, 48), clay);
    art.position.set(0.4, 2.68, -3.07);
    scene.add(art);
    box(0.6, 0.61, 0.013, 0.94, 2.16, -3.05, sofaMaterial);
    
    for (const [x, y] of [
      [-0.35, 2.7],
      [0.35, 3.03],
      [0.88, 2.8],
    ]) {
      cyl(0.012, 0.012, 4 - y, x, (4 + y) / 2, 0, gold);
      sphere(
        x,
        y,
        0,
        0.25,
        0.27,
        0.25,
        new THREE.MeshStandardMaterial({
          color: 0xfff0cd,
          emissive: 0xffd89c,
          emissiveIntensity: 1.2,
          roughness: 0.4,
        }),
      );
    }
    const lamp = new THREE.PointLight(0xffc579, 18, 7, 2);
    lamp.position.set(0.3, 2.65, 0);
    scene.add(lamp);
    
    cyl(0.36, 0.26, 0.66, -2.95, 0.34, 1.35, clay);
    cyl(0.045, 0.07, 1.65, -2.95, 1.2, 1.35, oak);
    for (let i = 0; i < 17; i++) {
      const a = i * 2.399,
        y = 1.4 + (i % 5) * 0.19;
      const l = sphere(
        -2.95 + Math.cos(a) * 0.37,
        y,
        1.35 + Math.sin(a) * 0.37,
        0.27,
        0.1,
        0.15,
        leaf,
      );
      l.rotation.z = Math.cos(a) * 0.6;
      l.rotation.y = a;
    }
    
    const stone = mat(0xe8dfc9, 0.4),
      cabinetry = mat(0x677563),
      blackStone = mat(0x292c2a, 0.25),
      brass = gold;
    const glow = new THREE.MeshStandardMaterial({
      color: 0xffe0a2,
      emissive: 0xffc575,
      emissiveIntensity: 1.5,
    });
    box(5.6, 0.22, 6.7, 6.8, -0.16, 0, oak, 0.04);
    for (let x = 0; x < 7; x++)
      for (let z = 0; z < 8; z++)
        box(
          0.78,
          0.025,
          0.82,
          4.39 + x * 0.8,
          -0.035,
          -2.88 + z * 0.83,
          mat((x + z) % 2 === 0 ? 0xe4ded0 : 0xdcd3c1, 0.55),
        );
    box(5.65, 3.9, 0.14, 6.78, 1.86, -3.3, wallMaterial);
    box(5.6, 0.1, 0.08, 6.8, 0.05, -3.17, cream);
    box(13.5, 0.16, 0.24, 2.75, 3.78, -3.15, cream);
    box(13.3, 0.045, 0.045, 2.75, 3.65, -3.02, glow);
    box(0.22, 0.16, 6.6, -3.86, 3.78, 0, cream);
    box(0.04, 0.045, 6.4, -3.7, 3.65, 0, glow);
    
    box(1.45, 0.9, 0.055, 2.93, 1.65, -3.1, dark, 0.025);
    box(1.35, 0.79, 0.015, 2.93, 1.66, -3.062, mat(0x344645, 0.2));
    box(0.34, 0.08, 0.09, 2.93, 1.1, -3.0, gold);
    box(1.15, 0.07, 0.27, 2.93, 2.5, -3.03, oak);
    for (let i = 0; i < 5; i++)
      box(
        0.085,
        0.23 + (i % 2) * 0.08,
        0.14,
        2.54 + i * 0.1,
        2.66,
        -3.0,
        i % 2 ? cream : clay,
      );
    cyl(0.09, 0.1, 0.23, 3.27, 2.65, -3.0, clay);
    
    box(1.45, 0.75, 0.55, 4.35, 0.4, -2.93, oak, 0.03);
    box(1.48, 0.08, 0.6, 4.35, 0.82, -2.93, stone);
    box(1.46, 2.65, 0.16, 4.35, 2.05, -3.08, oak);
    box(1.25, 2.18, 0.045, 4.35, 2.04, -2.975, cream);
    for (const x of [3.71, 4.99]) box(0.11, 2.64, 0.32, x, 2.05, -2.96, oak);
    box(1.5, 0.2, 0.42, 4.35, 3.35, -2.93, oak);
    box(1.2, 0.035, 0.04, 4.35, 3.13, -2.86, glow);
    for (const x of [4.04, 4.64]) {
      box(0.55, 0.29, 0.025, x, 0.43, -2.64, oak, 0.015);
      box(0.22, 0.025, 0.035, x, 0.5, -2.61, gold);
      cyl(0.12, 0.12, 0.06, x, 0.91, -2.77, gold);
      cyl(0.025, 0.06, 0.36, x, 1.12, -2.77, gold);
      cyl(0.12, 0.04, 0.06, x, 1.32, -2.77, gold);
    }
    const omRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.23, 0.025, 8, 36),
      gold,
    );
    omRing.position.set(4.35, 2.2, -2.89);
    scene.add(omRing);
    for (let i = 0; i < 4; i++) {
      cyl(0.009, 0.009, 0.34, 3.98 + i * 0.24, 3.05, -2.69, gold);
      cyl(0.055, 0.075, 0.1, 3.98 + i * 0.24, 2.83, -2.69, gold);
    }
    box(0.58, 0.12, 0.35, 4.35, 0.96, -2.83, stone, 0.02);
    
    box(4.0, 0.82, 0.75, 7.37, 0.42, -2.84, cabinetry);
    box(4.08, 0.08, 0.85, 7.37, 0.9, -2.8, blackStone, 0.02);
    box(4.0, 0.72, 0.045, 7.37, 1.3, -3.19, stone);
    for (let i = 0; i < 7; i++) {
      const x = 5.66 + i * 0.56;
      box(0.54, 0.68, 0.03, x, 0.46, -2.445, cabinetry, 0.015);
      box(0.22, 0.022, 0.045, x, 0.69, -2.41, gold);
    }
    for (let i = 0; i < 6; i++) {
      const x = 5.78 + i * 0.57;
      box(0.55, 1.05, 0.4, x, 2.37, -3.01, cabinetry, 0.02);
      box(0.018, 0.3, 0.028, x + 0.2, 2.26, -2.79, gold);
    }
    box(3.8, 0.028, 0.04, 7.37, 1.79, -2.77, glow);
    box(0.92, 0.018, 0.56, 6.38, 0.95, -2.76, dark, 0.025);
    for (const x of [6.14, 6.61])
      for (const z of [-2.91, -2.63]) {
        cyl(0.102, 0.102, 0.018, x, 0.97, z, mat(0x060707));
        for (let k = 0; k < 4; k++) {
          const bar = box(0.22, 0.02, 0.018, x, 0.99, z, mat(0x626563));
          bar.rotation.y = (k * Math.PI) / 2;
        }
      }
    box(1.04, 0.13, 0.53, 6.38, 1.83, -2.92, mat(0x5b605b, 0.3, 0.5));
    box(0.4, 0.9, 0.3, 6.38, 2.34, -3.0, dark);
    box(0.75, 0.02, 0.48, 8.35, 0.95, -2.78, mat(0x9da6a2, 0.22, 0.65), 0.06);
    box(0.58, 0.02, 0.33, 8.35, 0.966, -2.78, dark, 0.045);
    const tap = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.018, 8, 24, Math.PI),
      gold,
    );
    tap.position.set(8.35, 1.14, -3.04);
    scene.add(tap);
    cyl(0.02, 0.02, 0.2, 8.48, 1.03, -3.04, gold);
    box(0.77, 2.55, 0.74, 9.15, 1.3, -2.79, mat(0xb2b7ae, 0.35, 0.4), 0.035);
    box(0.67, 0.017, 0.025, 9.15, 1.67, -2.4, dark);
    box(0.025, 0.36, 0.04, 8.91, 1.96, -2.37, dark);
    
    box(2.05, 0.92, 0.86, 7.43, 0.47, -0.88, oak, 0.04);
    box(2.2, 0.09, 1.03, 7.43, 0.98, -0.87, stone, 0.045);
    for (let i = 0; i < 12; i++)
      box(0.04, 0.76, 0.025, 6.53 + i * 0.164, 0.5, -0.43, cream);
    for (const x of [6.8, 7.86]) {
      cyl(0.28, 0.28, 0.1, x, 0.61, 0.04, sofaMaterial);
      for (const dx of [-0.19, 0.19])
        for (const dz of [-0.17, 0.17])
          cyl(0.025, 0.035, 0.56, x + dx, 0.29, 0.04 + dz, oak);
    }
    cyl(0.17, 0.11, 0.13, 7.5, 1.1, -0.84, clay);
    for (let i = 0; i < 3; i++)
      sphere(7.4 + i * 0.08, 1.16, -0.84, 0.055, 0.055, 0.055, mat(0xddac43));
    for (let i = 0; i < 3; i++)
      cyl(
        0.075,
        0.075,
        0.18 + i * 0.05,
        5.65 + i * 0.2,
        1.03 + i * 0.025,
        -3.04,
        i % 2 ? cream : clay,
      );
    
    box(2.65, 0.13, 1.2, 6.3, 0.87, 2.02, oak, 0.1);
    for (const x of [5.33, 7.27])
      for (const z of [1.62, 2.4]) box(0.12, 0.82, 0.12, x, 0.4, z, oak, 0.025);
    for (const x of [5.42, 6.3, 7.18])
      for (const z of [1.16, 2.88]) {
        box(0.59, 0.12, 0.55, x, 0.52, z, sofaMaterial, 0.09);
        box(
          0.59,
          0.72,
          0.1,
          x,
          0.88,
          z + (z > 2 ? 0.22 : -0.22),
          sofaMaterial,
          0.08,
        );
        for (const dx of [-0.22, 0.22])
          for (const dz of [-0.2, 0.2])
            cyl(0.025, 0.035, 0.48, x + dx, 0.25, z + dz, oak);
      }
    for (const x of [5.42, 6.3, 7.18])
      for (const z of [1.72, 2.33]) {
        cyl(0.18, 0.18, 0.014, x, 0.949, z, cream);
        cyl(0.11, 0.11, 0.008, x, 0.96, z, stone);
      }
    cyl(0.12, 0.09, 0.36, 6.3, 1.1, 2.02, clay);
    for (let i = 0; i < 5; i++) {
      const s = sphere(
        6.3 + Math.sin(i) * 0.1,
        1.42 + Math.cos(i) * 0.09,
        2.02,
        0.12,
        0.045,
        0.065,
        leaf,
      );
      s.rotation.z = i;
    }
    box(0.6, 0.86, 2.0, 9.05, 0.45, 1.5, oak, 0.025);
    box(0.66, 0.07, 2.04, 9.05, 0.91, 1.5, stone);
    for (let i = 0; i < 3; i++) {
      box(0.025, 0.68, 0.55, 8.73, 0.48, 0.86 + i * 0.63, cabinetry, 0.02);
      box(0.04, 0.02, 0.16, 8.7, 0.69, 0.86 + i * 0.63, gold);
    }
    cyl(0.23, 0.2, 0.035, 9.04, 0.975, 1.15, brass);
    cyl(0.12, 0.07, 0.3, 9.04, 1.12, 1.89, clay);
    
    for (let i = 0; i < 8; i++)
      box(0.075, 2.8, 0.075, 3.77, 1.4, -0.4 + i * 0.18, oak);
    for (let i = 0; i < 5; i++)
      box(0.075, 0.06, 1.35, 3.77, 0.4 + i * 0.52, 0.25, oak);
    for (const x of [5.8, 6.8]) {
      cyl(0.01, 0.01, 0.65, x, 3.37, 2.02, gold);
      const shade = cyl(0.27, 0.4, 0.28, x, 2.9, 2.02, gold);
      cyl(0.25, 0.35, 0.025, x, 2.755, 2.02, glow);
    }
    cyl(0.018, 0.018, 0.45, -0.25, 3.58, -0.9, dark);
    fan = new THREE.Group();
    fan.position.set(-0.25, 3.33, -0.9);
    scene.add(fan);
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.12, 24),
      oak,
    );
    fan.add(hub);
    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(
        new RoundedBoxGeometry(0.78, 0.035, 0.18, 2, 0.04),
        oak,
      );
      blade.position.set(
        Math.cos(i * 2.094) * 0.47,
        0,
        Math.sin(i * 2.094) * 0.47,
      );
      blade.rotation.y = -i * 2.094;
      fan.add(blade);
    }
    const fillLight = new THREE.PointLight(0xffdfaa, 12, 9, 2);
    fillLight.position.set(7, 3, 0);
    scene.add(fillLight);
    
    box(200, 0.1, 200, 0, -0.55, 0, mat(0xd9d9cc));
    observer = new ResizeObserver(() => {
      if (!host.value) return;
      const { width, height } = host.value.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (selectedView === "overview") setView("overview");
    });
    observer.observe(host.value);
    viewObserver = new IntersectionObserver(
      (entries) => (inView = entries[0].isIntersecting),
    );
    viewObserver.observe(host.value);
    reset();
    start = performance.now();
    const clock = new THREE.Clock();
    let lastRender = 0;
    function animate(now) {
      frame = requestAnimationFrame(animate);
      if (!visible || !inView) return;
      if (window.innerWidth < 800 && now - lastRender < 32) return;
      lastRender = now;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (destination) {
        camera.position.lerp(destination.position, 0.055);
        controls.target.lerp(destination.target, 0.055);
        if (camera.position.distanceTo(destination.position) < 0.02) {
          camera.position.copy(destination.position);
          controls.target.copy(destination.target);
          destination = null;
        }
      }
      if (fan && !reduced && !props.paused) fan.rotation.y += dt * 0.5;
      controls.update(dt);
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(animate);
    resetHandler = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", resetHandler);
    contextHandler = (e) => {
      e.preventDefault();
      failed.value = true;
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("webglcontextlost", contextHandler);
  } catch (e) {
    console.warn("3D view unavailable:", e);
    failed.value = true;
  }
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
  viewObserver?.disconnect();
  controls?.dispose();
  document.removeEventListener("visibilitychange", resetHandler);
  renderer?.domElement.removeEventListener("webglcontextlost", contextHandler);
  renderer?.domElement.removeEventListener("wheel", wheelHandler, true);
  scene?.traverse((o) => {
    o.geometry?.dispose();
    if (o.material) {
      for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
        m.map?.dispose();
        m.dispose();
      }
    }
  });
  renderer?.dispose();
  renderer?.forceContextLoss();
});
</script>
<template>
  <div ref="host" class="room-canvas" :class="{ unavailable: failed }">
    <div v-if="failed" class="scene-fallback">
      <img
        :src="'images/' + pageImages.fallback.image"
        alt="Indian living, dining and kitchen concept"
      />
      <p>
        Explore our room collection below. The interactive view needs a
        WebGL-compatible browser.
      </p>
    </div>
  </div>
</template>
