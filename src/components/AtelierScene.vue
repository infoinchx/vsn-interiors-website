<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { projects } from "../data/content";
const props = defineProps({
  variant: { type: String, default: "about" },
  palette: { type: String, default: "teal" },
  night: Boolean,
  paused: Boolean,
});
const emit = defineEmits(["select-project"]);
const fallbackImage = import.meta.env.BASE_URL + "images/hero.jpg";
const host = ref(null),
  failed = ref(false);
let renderer,
  scene,
  camera,
  controls,
  resizeObserver,
  visibilityObserver,
  frame,
  active = true,
  disposed = false,
  interacted = false,
  accent,
  sun,
  ambient,
  glass,
  down,
  click,
  lost;
const materials = [],
  geometries = [],
  textures = [],
  targets = [];
const colors = { teal: 0x285a52, clay: 0xb76c4c, blue: 0x415e7a };
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function reset() {
  if (!camera || !controls) return;
  interacted = true;
  camera.position.set(8, 5.2, 10);
  controls.target.set(0, 1, 0);
  controls.update();
}
defineExpose({ reset });
watch(
  () => props.palette,
  (v) => accent?.color.setHex(colors[v]),
);
watch(
  () => props.night,
  (v) => {
    if (sun) {
      sun.intensity = v ? 0.6 : 3;
      ambient.intensity = v ? 0.8 : 1.8;
    }
  },
);
onMounted(() => {
  try {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(
      props.variant === "gallery" ? 0xd4d0c2 : 0xdce0d3,
    );
    scene.fog = new THREE.Fog(scene.background, 25, 60);
    camera = new THREE.PerspectiveCamera(41, 1, 0.1, 90);
    camera.position.set(12, 7, 14);
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 800 ? 1.25 : 1.5),
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    host.value.appendChild(renderer.domElement);
    lost = (e) => {
      e.preventDefault();
      failed.value = true;
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute(
      "aria-label",
      props.variant === "gallery"
        ? "Interactive 3D design gallery. Drag to rotate. Click a framed room to view it."
        : "Interactive 3D " +
            props.variant +
            " interior. Drag to rotate, pinch to zoom.",
    );
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.target.set(0, 1, 0);
    controls.minDistance = 7;
    controls.maxDistance = 16;
    controls.minAzimuthAngle = -0.1;
    controls.maxAzimuthAngle = 1.45;
    controls.maxPolarAngle = Math.PI / 2.15;
    controls.minPolarAngle = 0.32;
    controls.zoomSpeed = 0.6;
    controls.addEventListener("start", () => (interacted = true));
    ambient = new THREE.HemisphereLight(
      0xfff5e2,
      0x606e60,
      props.night ? 0.8 : 1.8,
    );
    scene.add(ambient);
    sun = new THREE.DirectionalLight(0xffedd4, props.night ? 0.6 : 3);
    sun.position.set(4, 8, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(
      window.innerWidth < 800 ? 1024 : 1536,
      window.innerWidth < 800 ? 1024 : 1536,
    );
    Object.assign(sun.shadow.camera, {
      left: -9,
      right: 9,
      top: 9,
      bottom: -9,
    });
    sun.shadow.normalBias = 0.035;
    scene.add(sun);
    function material(color, roughness = 0.7, metalness = 0) {
      const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
      materials.push(m);
      return m;
    }
    const ivory = material(0xe8dfcc),
      oak = material(0xa67d50),
      dark = material(0x32392f),
      copper = material(0xa66a49, 0.4, 0.6),
      white = material(0xfaf4df),
      leaf = material(0x3d6543),
      navy = material(0x355062);
    accent = material(colors[props.palette]);
    glass = material(0xc6d7cf, 0.2);
    glass.emissive.setHex(0x7c9487);
    glass.emissiveIntensity = 0.22;
    function mesh(geo, mat, x, y, z) {
      geometries.push(geo);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    }
    function box(w, h, d, x, y, z, mat, r = 0) {
      return mesh(
        r
          ? new RoundedBoxGeometry(w, h, d, 3, r)
          : new THREE.BoxGeometry(w, h, d),
        mat,
        x,
        y,
        z,
      );
    }
    function cylinder(rt, rb, h, x, y, z, mat) {
      return mesh(new THREE.CylinderGeometry(rt, rb, h, 32), mat, x, y, z);
    }
    function ball(x, y, z, sx, sy, sz, mat) {
      const m = mesh(new THREE.SphereGeometry(1, 20, 16), mat, x, y, z);
      m.scale.set(sx, sy, sz);
      return m;
    }
    function tree(x, z) {
      cylinder(0.32, 0.24, 0.6, x, 0.3, z, ivory);
      cylinder(0.04, 0.07, 1.8, x, 1.3, z, oak);
      for (let i = 0; i < 15; i++) {
        const a = i * 2.4;
        const m = ball(
          x + Math.cos(a) * 0.38,
          1.6 + (i % 5) * 0.17,
          z + Math.sin(a) * 0.38,
          0.3,
          0.09,
          0.16,
          leaf,
        );
        m.rotation.set(0.4, a, 0.3);
      }
    }
    function chair(x, z, rotation = 0) {
      const pieces = [
        box(0.84, 0.24, 0.8, x, 0.6, z, accent, 0.1),
        box(0.86, 0.6, 0.18, x, 0.99, z + 0.36, accent, 0.09),
      ];
      for (const dx of [-0.32, 0.32])
        for (const dz of [-0.26, 0.26])
          pieces.push(
            cylinder(0.025, 0.03, 0.48, x + dx, 0.26, z + dz, copper),
          );
      if (rotation) {
        for (const m of pieces) {
          const v = m.position.clone().sub(new THREE.Vector3(x, 0, z));
          v.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
          m.position.copy(v.add(new THREE.Vector3(x, 0, z)));
          m.rotation.y = rotation;
        }
      }
    }
    function framePicture(x, y, z, w, h, project, rotation = 0) {
      const f = box(w + 0.12, h + 0.12, 0.09, x, y, z, copper);
      f.rotation.y = rotation;
      const backing = material(0xe2d7bd);
      const pic = mesh(new THREE.PlaneGeometry(w, h), backing, x, y, z + 0.06);
      pic.rotation.y = rotation;
      if (rotation)
        pic.position.set(
          x + Math.sin(rotation) * 0.06,
          y,
          z + Math.cos(rotation) * 0.06,
        );
      pic.userData.project = project;
      targets.push(pic);
      new THREE.TextureLoader().load(
        import.meta.env.BASE_URL + "images/" + project.image,
        (t) => {
          if (disposed) {
            t.dispose();
            return;
          }
          t.colorSpace = THREE.SRGBColorSpace;
          const ratio = t.image.width / t.image.height,
            target = w / h;
          if (ratio > target) {
            t.repeat.x = target / ratio;
            t.offset.x = (1 - t.repeat.x) / 2;
          } else {
            t.repeat.y = ratio / target;
            t.offset.y = (1 - t.repeat.y) / 2;
          }
          textures.push(t);
          backing.map = t;
          backing.color.setHex(0xffffff);
          backing.needsUpdate = true;
        },
        undefined,
        () => {},
      );
    }
    box(9, 0.23, 7, 0, -0.13, 0, oak, 0.04);
    box(8.9, 0.025, 6.9, 0, 0, 0, ivory);
    box(9, 4.3, 0.16, 0, 2.08, -3.5, white);
    box(0.16, 4.3, 7, -4.5, 2.08, 0, white);
    box(160, 0.1, 160, 0, -0.48, 0, material(scene.background));
    // Light-filled side window, brass mullions and a clean architectural plinth.
    box(0.06, 3.2, 3.1, -4.39, 2.15, 0.4, glass);
    for (let i = 0; i < 4; i++)
      box(0.08, 3.3, 0.045, -4.32, 2.15, -1.15 + i * 1.04, copper);
    box(8.85, 0.07, 0.08, 0, 0.08, -3.37, oak);
    if (props.variant === "about") {
      // Design atelier: material library, shared drawing table and pin-up boards.
      for (let i = 0; i < 13; i++)
        box(0.07, 4, 0.09, -4.2 + i * 0.11, 2, -3.36, oak);
      box(3.6, 0.16, 1.6, -0.1, 1.13, 0.2, oak, 0.035);
      for (const x of [-1.6, 1.4])
        for (const z of [-0.38, 0.78]) box(0.09, 1.05, 0.09, x, 0.53, z, dark);
      chair(-0.85, 1.38);
      chair(0.85, 1.38);
      chair(-0.8, -1.02, Math.PI);
      for (let i = 0; i < 4; i++) {
        const m = box(
          0.62,
          0.025,
          0.42,
          -1.2 + i * 0.72,
          1.23,
          0.15,
          [ivory, copper, accent, navy][i],
        );
        m.rotation.y = -0.12 + i * 0.08;
      }
      box(0.55, 0.025, 0.4, -0.7, 1.26, -0.23, white);
      for (let i = 0; i < 5; i++)
        box(0.43, 0.002, 0.008, -0.7, 1.276, -0.35 + i * 0.05, dark);
      cylinder(0.08, 0.08, 0.19, 1.15, 1.32, 0.53, copper);
      box(2.1, 2.7, 0.45, 2.65, 1.42, -3.13, oak);
      for (let row = 0; row < 4; row++) {
        box(2.12, 0.07, 0.5, 2.65, 0.24 + row * 0.76, -2.85, ivory);
        for (let j = 0; j < 5; j++)
          box(
            0.18,
            0.52,
            0.26,
            1.83 + j * 0.39,
            0.53 + row * 0.76,
            -2.9,
            [white, accent, copper, navy, ivory][(j + row) % 5],
          );
      }
      framePicture(-0.85, 2.65, -3.36, 1.95, 1.4, projects[0]);
      tree(-3, 1.7);
      const strip = material(0xffedc6);
      strip.emissive.setHex(0xffd48c);
      strip.emissiveIntensity = 1;
      box(2.7, 0.065, 0.15, 0, 3.25, 0.2, strip, 0.02);
      for (const x of [-1.1, 1.1])
        cylinder(0.012, 0.012, 1, x, 3.78, 0.2, copper);
    } else if (props.variant === "gallery") {
      // Walkable-scale miniature exhibition of real collection textures.
      for (let i = 0; i < 3; i++) {
        framePicture(
          -2.8 + i * 2.65,
          2.5,
          -3.34,
          2.08,
          1.54,
          projects[(i * 2) % projects.length],
        );
        box(0.14, 0.14, 0.32, -2.8 + i * 2.65, 3.85, -2.9, dark);
        const spot = new THREE.SpotLight(0xffe6bd, 10, 7, 0.55, 0.7, 1);
        spot.position.set(-2.8 + i * 2.65, 3.8, -1.9);
        spot.target.position.set(-2.8 + i * 2.65, 2.3, -3.3);
        scene.add(spot, spot.target);
      }
      box(3.25, 0.11, 1, -0.2, 0.72, 0.4, oak, 0.07);
      for (const x of [-1.2, 0.8]) box(0.15, 0.66, 0.7, x, 0.35, 0.4, dark);
      box(0.85, 1.2, 0.85, 2.8, 0.6, 1.5, white, 0.02);
      const sculpture = mesh(
        new THREE.TorusGeometry(0.42, 0.105, 18, 64),
        copper,
        2.8,
        1.78,
        1.5,
      );
      sculpture.rotation.y = 0.65;
      box(0.72, 0.65, 0.72, -2.9, 0.33, 1.45, ivory);
      ball(-2.9, 0.94, 1.45, 0.32, 0.32, 0.32, accent);
      framePicture(
        -4.37,
        2.55,
        -1.85,
        1.7,
        1.4,
        projects[3 % projects.length],
        Math.PI / 2,
      );
      tree(3.5, -2);
    } else {
      // Consultation lounge: round table, paired armchairs, display wall and greenery.
      box(5.6, 0.028, 3.8, 0, 0.04, 0.3, material(0xc9c6ae), 0.02);
      cylinder(1.05, 1.05, 0.12, 0, 0.84, 0, oak);
      cylinder(0.45, 0.6, 0.75, 0, 0.4, 0, ivory);
      chair(-1.4, 0.8, -0.7);
      chair(1.4, 0.8, 0.7);
      chair(0, -1.55, Math.PI);
      box(0.55, 0.035, 0.4, -0.35, 0.93, 0.06, white);
      box(0.42, 0.025, 0.33, -0.3, 0.96, 0.05, copper);
      cylinder(0.12, 0.09, 0.3, 0.48, 1.05, -0.1, ivory);
      box(3.5, 0.65, 0.65, 0.4, 0.39, -2.9, oak, 0.025);
      for (let i = 0; i < 28; i++)
        box(0.055, 0.52, 0.035, -1.24 + i * 0.12, 0.4, -2.55, copper);
      framePicture(0.4, 2.4, -3.35, 2.9, 1.55, projects[1 % projects.length]);
      tree(-3.1, 1.6);
      tree(3.4, -2.3);
      const glow = material(0xfff1d4);
      glow.emissive.setHex(0xffd38b);
      glow.emissiveIntensity = 0.6;
      cylinder(0.015, 0.015, 1.15, 0, 3.72, 0, copper);
      ball(0, 3.04, 0, 0.52, 0.22, 0.52, glow);
    }
    const warm = new THREE.PointLight(0xffc681, 8, 10, 2);
    warm.position.set(0, 3, 0);
    scene.add(warm);
    resizeObserver = new ResizeObserver(() => {
      if (!host.value) return;
      const { width, height } = host.value.getBoundingClientRect();
      if (width && height) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(host.value);
    visibilityObserver = new IntersectionObserver(
      (entries) => (active = entries[0].isIntersecting),
    );
    visibilityObserver.observe(host.value);
    let origin;
    down = (e) => (origin = { x: e.clientX, y: e.clientY });
    click = (e) => {
      if (
        !origin ||
        Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > 7 ||
        props.variant !== "gallery"
      )
        return;
      const rect = renderer.domElement.getBoundingClientRect();
      const pointer = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        (-(e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(targets)[0];
      if (hit) emit("select-project", hit.object.userData.project);
    };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointerup", click);
    const start = performance.now();
    function animate(now) {
      frame = requestAnimationFrame(animate);
      if (!active || document.hidden) return;
      if (!interacted && !props.paused && !reduced) {
        const t = Math.min((now - start) / 2200, 1),
          e = 1 - (1 - t) ** 3;
        camera.position.set(12 - 4 * e, 7 - 1.8 * e, 14 - 4 * e);
        if (t === 1) camera.position.x += Math.sin(now * 0.00015) * 0.18;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    if (reduced) reset();
    frame = requestAnimationFrame(animate);
  } catch (error) {
    console.warn("3D scene unavailable", error);
    failed.value = true;
  }
});
onBeforeUnmount(() => {
  disposed = true;
  cancelAnimationFrame(frame);
  resizeObserver?.disconnect();
  visibilityObserver?.disconnect();
  controls?.dispose();
  renderer?.domElement.removeEventListener("webglcontextlost", lost);
  renderer?.domElement.removeEventListener("pointerdown", down);
  renderer?.domElement.removeEventListener("pointerup", click);
  for (const t of textures) t.dispose();
  for (const g of geometries) g.dispose();
  for (const m of materials) m.dispose();
  renderer?.dispose();
  renderer?.forceContextLoss();
});
</script>
<template>
  <div ref="host" class="room-canvas">
    <div v-if="failed" class="scene-fallback">
      <img :src="fallbackImage" alt="Warm interior inspiration" />
      <p>
        The 3D view needs a WebGL-compatible browser. All pages and images
        remain available.
      </p>
    </div>
  </div>
</template>
