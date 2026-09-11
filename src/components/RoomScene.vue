<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
const props = defineProps({
  palette: { type: String, default: "teal" },
  night: Boolean,
  paused: Boolean,
});
const host = ref(null),
  failed = ref(false);
let touched = false;
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
  if (!camera || !controls) return;
  touched = true;
  camera.position.set(8.2, 5.6, 9.4);
  controls.target.set(0, 1, 0);
  controls.update();
}
defineExpose({ reset });
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
    scene.fog = new THREE.Fog(0xd9d9cc, 23, 55);
    camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(11, 7, 13);
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
      "Interactive 3D living room. Drag to rotate, pinch or scroll to zoom.",
    );
    renderer.domElement.setAttribute("role", "img");
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 6;
    controls.maxDistance = 16;
    controls.minAzimuthAngle = -0.25;
    controls.maxAzimuthAngle = 1.55;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minPolarAngle = 0.35;
    controls.autoRotate = false;
    controls.zoomSpeed = 0.6;
    controls.addEventListener("start", () => (touched = true));
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
      right: 8,
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
    // Architectural shell, open on two sides for a dollhouse view.
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
    // Slatted feature wall.
    for (let i = 0; i < 28; i++)
      box(0.065, 3.65, 0.1, -3.72 + i * 0.105, 1.82, -3.17, oak);
    // Tall window at the left with daylight glass and bronze mullions.
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
    // Soft curtain folds.
    for (let j = 0; j < 9; j++)
      cyl(0.075, 0.075, 3.4, -3.7, 1.74, 1.9 + j * 0.08, cream);
    // Wool rug with thin woven borders.
    box(5.6, 0.035, 3.7, 0.1, 0.015, 0.3, mat(0xcec5ae), 0.03);
    for (let i = 0; i < 6; i++)
      box(5.2, 0.003, 0.018, 0.1, 0.035, -1.28 + i * 0.065, mat(0xa89e86));
    // Modular sofa, real volumes and rounded upholstery.
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
    // Round nesting coffee tables, ceramic styling and books.
    cyl(0.87, 0.87, 0.1, 0.2, 0.63, 0.17, cream);
    cyl(0.43, 0.48, 0.56, 0.2, 0.32, 0.17, oak);
    cyl(0.53, 0.53, 0.07, 1.17, 0.43, 0.65, oak);
    cyl(0.2, 0.28, 0.4, 1.17, 0.21, 0.65, dark);
    box(0.42, 0.055, 0.31, -0.05, 0.72, 0.21, clay);
    box(0.37, 0.035, 0.28, -0.02, 0.765, 0.2, cream);
    cyl(0.12, 0.1, 0.3, 0.54, 0.84, -0.04, clay);
    cyl(0.2, 0.17, 0.04, 0.57, 0.7, 0.35, dark);
    // Lounge chair.
    const chair = mat(0xbe774e);
    box(1.05, 0.26, 1.1, 2.65, 0.55, 1.5, chair, 0.15);
    box(1.05, 0.82, 0.22, 2.65, 0.99, 1.95, chair, 0.12);
    for (const x of [2.16, 3.14]) {
      box(0.1, 0.55, 1.15, x, 0.6, 1.5, oak, 0.03);
      box(0.1, 0.6, 0.1, x, 0.3, 1.88, oak);
      box(0.1, 0.6, 0.1, x, 0.3, 1.1, oak);
    }
    // Low media cabinet on right.
    box(1.45, 0.56, 0.55, 2.93, 0.35, -2.76, oak, 0.03);
    for (let i = 0; i < 10; i++)
      box(0.08, 0.42, 0.018, 2.29 + i * 0.14, 0.36, -2.47, dark);
    // Original abstract physical wall composition.
    box(1.8, 1.65, 0.07, 0.56, 2.53, -3.15, gold);
    box(1.69, 1.54, 0.035, 0.56, 2.53, -3.1, cream);
    const art = new THREE.Mesh(new THREE.CircleGeometry(0.49, 48), clay);
    art.position.set(0.4, 2.68, -3.07);
    scene.add(art);
    box(0.6, 0.61, 0.013, 0.94, 2.16, -3.05, sofaMaterial);
    // Sculptural pendant lighting.
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
    // Indoor tree in a textured terracotta pot.
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
    // Room plinth and floor beneath.
    box(200, 0.1, 200, 0, -0.55, 0, mat(0xd9d9cc));
    observer = new ResizeObserver(() => {
      if (!host.value) return;
      const { width, height } = host.value.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    observer.observe(host.value);
    viewObserver = new IntersectionObserver(
      (entries) => (inView = entries[0].isIntersecting),
    );
    viewObserver.observe(host.value);
    if (reduced) reset();
    start = performance.now();
    const clock = new THREE.Clock();
    function animate(now) {
      frame = requestAnimationFrame(animate);
      if (!visible || !inView) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!touched && !reduced && !props.paused) {
        const t = Math.min((now - start) / 2400, 1),
          ease = 1 - Math.pow(1 - t, 3);
        camera.position.set(11 - 2.8 * ease, 7 - 1.4 * ease, 13 - 3.6 * ease);
        if (t === 1) camera.position.x += Math.sin(now * 0.00012) * 0.16;
      }
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
  scene?.traverse((o) => {
    o.geometry?.dispose();
    if (o.material) {
      for (const m of Array.isArray(o.material) ? o.material : [o.material])
        m.dispose();
    }
  });
  renderer?.dispose();
  renderer?.forceContextLoss();
});
</script>
<template>
  <div ref="host" class="room-canvas" :class="{ unavailable: failed }">
    <div v-if="failed" class="scene-fallback">
      <img src="/images/hero.jpg" alt="Contemporary living room inspiration" />
      <p>
        Explore our room collection below. The interactive view needs a
        WebGL-compatible browser.
      </p>
    </div>
  </div>
</template>
