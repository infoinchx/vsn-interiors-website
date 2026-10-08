<script setup>
import { ArrowUpRight } from "lucide-vue-next";
import VisualCarousel from "./VisualCarousel.vue";
defineProps({
  slides: { type: Array, required: true },
  page: { type: String, required: true },
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  action: { type: String, required: true },
  note: { type: String, default: "Indian interiors. Thoughtfully imagined." },
});
</script>

<template>
  <section class="vsn-image-hero" :class="'vsn-image-hero-' + page">
    <div class="vsn-hero-media">
      <VisualCarousel :slides="slides" :label="eyebrow" eager>
        <div class="vsn-hero-eyebrow"><span class="vsn-status-dot"></span>{{ eyebrow }}</div>
        <div class="vsn-hero-title"><h1 tabindex="-1">{{ title }}</h1><p>{{ note }}</p></div>
      </VisualCarousel>
      <div class="vsn-hero-cutout"><span>DESIGNED AROUND YOU</span><span class="vsn-cutout-mark" aria-hidden="true">↗</span></div>
    </div>
    <div class="vsn-hero-below">
      <div><p class="vsn-kicker">VSN INTERIORS · VIZIANAGARAM</p><h2>{{ subtitle }}</h2></div>
      <p class="vsn-hero-description">{{ description }}</p>
      <a :href="link" class="vsn-pill-link">{{ action }}<ArrowUpRight :size="19" /></a>
    </div>
  </section>
</template>
