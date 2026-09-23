<script setup>
import {
  ArrowUpRight,
  Ruler,
  Layers,
  Sun,
  ShieldCheck,
  Palette,
  Handshake,
} from "lucide-vue-next";
import { business } from "../config";
const principles = [
  {
    icon: Ruler,
    title: "Plan for real life",
    text: "Easy movement, practical storage and comfortable furniture positions come first. Each layout starts with how you use your home.",
  },
  {
    icon: Layers,
    title: "Make every corner useful",
    text: "From loft storage to a compact pooja unit, we look for ways to give everyday essentials a considered place.",
  },
  {
    icon: Palette,
    title: "Choose a connected palette",
    text: "Wood, colour, stone and fabric should work together. We balance Indian warmth with clean contemporary detailing.",
  },
  {
    icon: Sun,
    title: "Work with light",
    text: "Natural daylight, task lighting and softer evening light each have a role. We plan them alongside the room itself.",
  },
  {
    icon: ShieldCheck,
    title: "Think beyond the photograph",
    text: "Material choices need to suit the space, its use and its upkeep. We discuss finishes and maintenance while planning.",
  },
  {
    icon: Handshake,
    title: "Keep decisions clear",
    text: "Layouts, materials, drawings and scope are discussed together, so you understand the design before execution begins.",
  },
];
</script>
<template>
  <div class="about-page">
    <section class="founder-intro section">
      <div class="founder-intro-top">
        <p class="eyebrow copper">ABOUT VSN INTERIORS</p>
        <span>ROOTED IN VIZIANAGARAM</span>
      </div>
      <div class="real-founder-layout">
        <div class="real-founder-photo">
          <img
            :src="'images/' + business.founder.image"
            :alt="business.founder.name + ', founder of VSN Interiors'"
            width="1920"
            height="1280"
            fetchpriority="high"
          />
          <div>
            <span>{{ business.founder.name }}</span
            ><small>{{ business.founder.role }}</small>
          </div>
        </div>
        <div class="real-founder-copy">
          <p class="eyebrow copper">MEET THE FOUNDER</p>
          <h1 tabindex="-1">
            A personal eye.<br /><span>A practical approach.</span>
          </h1>
          <h2>{{ business.founder.name }}</h2>
          <p>
            VSN Interiors brings interior design, 3D visualisation and execution
            together, with our studio based in Dasannapeta, Vizianagaram.
          </p>
          <p>
            From an individual room to a complete home or commercial space, the
            conversation begins with your needs, your ideas and the way you want
            the space to work.
          </p>
          <a class="text-link" href="#/contact"
            >Meet us at the studio <ArrowUpRight :size="20"
          /></a>
          <div class="founder-facts">
            <div><small>OUR BASE</small><strong>Vizianagaram</strong></div>
            <div>
              <small>OUR FOCUS</small><strong>Design & execution</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="business.coFounder.name && business.coFounder.image"
      class="section cofounder-section"
    >
      <img
        :src="'images/' + business.coFounder.image"
        :alt="business.coFounder.name"
        loading="lazy"
      />
      <div>
        <p class="eyebrow copper">MEET THE TEAM</p>
        <h2>{{ business.coFounder.name }}</h2>
        <p>{{ business.coFounder.role }}</p>
      </div>
    </section>
    <section class="section design-principles">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">HOW WE THINK ABOUT YOUR SPACE</p>
          <h2>Our design<br /><span>principles.</span></h2>
        </div>
        <p>Beautiful details work best when the whole room makes sense.</p>
      </div>
      <div class="principle-grid">
        <article
          v-for="(p, i) in principles"
          :key="p.title"
          class="principle-card reveal"
        >
          <div>
            <component :is="p.icon" :size="27" :stroke-width="1.35" /><span
              >0{{ i + 1 }}</span
            >
          </div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </article>
      </div>
    </section>
    <section class="studio-address-band">
      <div>
        <p class="eyebrow">VISIT OUR STUDIO</p>
        <h2>Local roots.<br /><span>A wider perspective.</span></h2>
      </div>
      <div>
        <p v-for="line in business.addressLines" :key="line">{{ line }}</p>
        <a
          :href="business.maps"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
          >Get directions <ArrowUpRight :size="20" /></a
        ><small>{{ business.areas.join(" · ") }}</small>
      </div>
    </section>
  </div>
</template>
