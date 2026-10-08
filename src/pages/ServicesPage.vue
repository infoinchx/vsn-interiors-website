<script setup>
import { ref, computed } from "vue";
import { ArrowUpRight, Plus, Check } from "lucide-vue-next";
import { serviceCatalog, serviceGroups } from "../data/serviceCatalog";
import { clientVisuals } from "../data/clientVisuals";
import ImageHero from "../components/ImageHero.vue";
defineEmits(["consult"]);
const group = ref("All services");
const shown = computed(() => serviceCatalog.filter((s) => group.value === "All services" || s.group === group.value));
const stages = [
  { title: "Understand", text: "Your space, priorities and the scope you need." },
  { title: "Define", text: "Layouts, 3D views, materials and specifications." },
  { title: "Coordinate", text: "Fabrication and installation planned together." },
  { title: "Review", text: "Finishing details and the final handover." },
];
</script>
<template>
  <div class="services-page">
    <ImageHero :slides="clientVisuals.services" page="services" eyebrow="DESIGN / INTERIORS / EXECUTION"
      title="Every space. Every detail." subtitle="Your space, beautifully considered."
      description="From a modular kitchen to a complete home. Explore our services and find the right starting point for your project."
      link="#/services#catalogue" action="Explore services" note="From the bigger picture to the smallest detail."
    />
    <section class="section service-catalogue" id="catalogue">
      <div class="catalogue-heading"><div><p class="eyebrow copper">THE SERVICE DIRECTORY</p><h2>What does your<br /><span>space need?</span></h2></div><p>{{ serviceCatalog.length }} service areas, each with its own design direction.<br />Choose a category to explore.</p></div>
      <div class="filters service-filters" role="group" aria-label="Filter services"><button v-for="g in serviceGroups" :key="g" @click="group = g" :class="{ active: group === g }" :aria-pressed="group === g">{{ g }}</button></div>
      <p class="results-count" aria-live="polite">{{ shown.length }} services</p>
      <div class="vsn-service-grid">
        <article v-for="service in shown" :key="service.id" class="vsn-service-card">
          <div class="vsn-service-photo"><img :src="'images/' + service.image" :alt="service.name + ' interior design concept'" loading="lazy" decoding="async" width="1536" height="1024" /><span>{{ String(service.id).padStart(2, "0") }}</span></div>
          <div class="vsn-service-body"><p class="vsn-kicker">{{ service.group }}</p><h3>{{ service.name }}</h3><p>{{ service.text }}</p>
            <details class="vsn-service-includes"><summary>What we can plan <Plus :size="17" /></summary><ul><li v-for="item in service.includes" :key="item"><Check :size="16" />{{ item }}</li></ul></details>
            <button class="vsn-service-discuss" @click="$emit('consult', service.name)">Discuss this service <ArrowUpRight :size="18" /></button>
          </div>
        </article>
      </div>
    </section>
    <section class="service-delivery"><div><p class="eyebrow">A CONNECTED APPROACH</p><h2>From your first idea<br />to the <span>finishing details.</span></h2></div><div class="delivery-steps"><article v-for="(stage, i) in stages" :key="stage.title"><span>0{{ i + 1 }}</span><h3>{{ stage.title }}</h3><p>{{ stage.text }}</p></article></div></section>
    <section class="service-footnote section"><p>Scope, materials and execution responsibilities are agreed during your design consultation.</p><a class="text-link" href="#/contact">Let’s define your project <ArrowUpRight :size="20" /></a></section>
  </div>
</template>
