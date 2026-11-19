<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  slides: { type: Array, required: true },
  label: { type: String, default: "Interior design inspiration" },
  interval: { type: Number, default: 5200 },
  eager: { type: Boolean, default: false },
  sizes: { type: String, default: "100vw" },
});
const active = ref(0);
const root = ref(null);
const visible = ref(props.eager);
const shown = ref(new Set([0]));
let timer;
let observer;
let disposed = false;
let advancing = false;
const ready = new Map();
const imageUrl = (item) => "images/" + item.image;

function preload(index) {
  const item = props.slides[index];
  if (!item) return Promise.resolve(false);
  if (ready.has(item.image)) return ready.get(item.image);

  const promise = new Promise((resolve) => {
    const photo = new Image();
    photo.onload = () => resolve(true);
    photo.onerror = () => {
      ready.delete(item.image);
      resolve(false);
    };
    if (item.srcset) {
      photo.sizes = props.sizes;
      photo.srcset = item.srcset;
    }
    photo.src = imageUrl(item);
  });
  ready.set(item.image, promise);
  return promise;
}

async function advance() {
  if (document.hidden || !visible.value || props.slides.length < 2 || advancing) return;
  advancing = true;
  const slides = props.slides;
  const next = (active.value + 1) % slides.length;
  const loaded = await preload(next);
  if (!disposed && loaded && slides === props.slides && visible.value && !document.hidden) {
    shown.value.add(next);
    active.value = next;
    preload((next + 1) % slides.length);
  }
  advancing = false;
}

watch(() => props.slides, () => {
  active.value = 0;
  shown.value = new Set([0]);
  ready.clear();
});

onMounted(() => {
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(([entry]) => {
      visible.value = entry.isIntersecting;
      if (entry.isIntersecting) preload((active.value + 1) % props.slides.length);
    });
    observer.observe(root.value);
  } else {
    visible.value = true;
  }
  timer = window.setInterval(advance, props.interval);
});

onBeforeUnmount(() => {
  disposed = true;
  clearInterval(timer);
  observer?.disconnect();
});
</script>

<template>
  <div ref="root" class="vsn-reel" role="region" aria-roledescription="carousel" :aria-label="label" aria-live="off">
    <div
      v-for="(item, index) in slides"
      :key="item.image"
      class="vsn-reel-frame"
      :class="{ 'vsn-reel-active': active === index }"
      :aria-hidden="index !== active"
      role="group"
      aria-roledescription="slide"
      :aria-label="item.title"
    >
      <img
        v-if="shown.has(index)"
        :src="imageUrl(item)"
        :srcset="item.srcset"
        :sizes="item.srcset ? sizes : undefined"
        :alt="item.alt || item.description || item.title"
        :width="item.width || 1536"
        :height="item.height || 1024"
        :fetchpriority="eager && index === 0 ? 'high' : 'auto'"
        :loading="!eager && index === 0 ? 'lazy' : 'eager'"
        decoding="async"
        :style="{ objectPosition: item.position || 'center' }"
      />
    </div>
    <div v-if="$slots.default" class="vsn-reel-overlay"><slot :current="slides[active]" /></div>
  </div>
</template>
