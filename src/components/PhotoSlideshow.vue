<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  slides: { type: Array, required: true },
  label: { type: String, default: "Interior inspiration" },
  interval: { type: Number, default: 6000 },
});
const slide = ref(0),
  root = ref(null);
let timer,
  observer,
  inView = true;
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => (inView = entry.isIntersecting),
  );
  observer.observe(root.value);
  timer = setInterval(() => {
    if (document.hidden || !inView || props.slides.length < 2) return;
    slide.value = (slide.value + 1) % props.slides.length;
  }, props.interval);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  observer?.disconnect();
});
</script>
<template>
  <div
    class="photo-slideshow"
    ref="root"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
    aria-live="off"
  >
    <div
      v-for="(item, i) in slides"
      :key="item.image"
      class="photo-slide"
      :class="{ active: i === slide }"
      :aria-hidden="i !== slide"
      role="group"
      aria-roledescription="slide"
      :aria-label="item.title"
    >
      <img
        :src="'images/' + item.image"
        :alt="item.title"
        width="1536"
        height="1024"
        :fetchpriority="i === 0 ? 'high' : undefined"
        :loading="i === 0 ? 'eager' : 'lazy'"
      />
    </div>
    <div class="slideshow-shade"></div>
    <div class="slideshow-copy"><slot :current="slides[slide]" /></div>
    <div class="slideshow-bottom">
      <span class="slideshow-caption">{{ slides[slide].title }}</span>
    </div>
  </div>
</template>
