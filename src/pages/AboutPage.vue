<script setup>
import { computed, ref } from "vue";
import {
  ArrowUpRight,
  Plus,
  MoveUpRight,
  Check,
} from "lucide-vue-next";
import { business } from "../config";
import ImageHero from "../components/ImageHero.vue";
import VisualCarousel from "../components/VisualCarousel.vue";
import { clientVisuals } from "../data/clientVisuals";

const openPrinciple = ref(0);
const selectedPalette = ref(0);
const principles = [
  {
    title: "Life before layout.",
    tag: "FUNCTION",
    text: "A place for the morning rush, the family gathering and the quiet evening. We begin with the way you live, then plan movement, furniture and storage around it.",
  },
  {
    title: "An Indian sense of home.",
    tag: "BELONGING",
    text: "A welcoming entrance, a thoughtful pooja corner, practical cooking spaces and room for the whole family. Familiar rituals belong in a contemporary home.",
  },
  {
    title: "Materials with purpose.",
    tag: "MATERIALITY",
    text: "Finishes should feel good and work hard. We discuss texture, durability, maintenance and budget together, so the palette makes sense beyond the first photograph.",
  },
  {
    title: "Light changes everything.",
    tag: "ATMOSPHERE",
    text: "Daylight, focused task lighting and a softer evening glow need different decisions. We consider them alongside the layout, not after the furniture arrives.",
  },
  {
    title: "Small details. Lasting impact.",
    tag: "CRAFT",
    text: "A handle that feels right, a clean cabinet line, a useful corner. We give the everyday details the same attention as the bigger design decisions.",
  },
  {
    title: "Clarity at every step.",
    tag: "COLLABORATION",
    text: "We discuss the layout, 3D views, material choices and agreed scope with you. Each stage should help you understand what comes next.",
  },
];
const palettes = [
  {
    name: "Earth & warmth",
    note: "Grounded, tactile and quietly welcoming.",
    materials: ["Terracotta", "Teak", "Natural linen"],
    colors: ["#b96746", "#9c673d", "#eee3cf"],
    tone: "#eadbcb",
  },
  {
    name: "Light & calm",
    note: "Soft neutrals with a little room to breathe.",
    materials: ["Limestone", "Pale oak", "Sage cotton"],
    colors: ["#ded7c4", "#b99a70", "#929e87"],
    tone: "#e7e9de",
  },
  {
    name: "Depth & character",
    note: "Confident colour, balanced with natural texture.",
    materials: ["Indigo", "Walnut", "Brushed brass"],
    colors: ["#384b69", "#674634", "#c2a167"],
    tone: "#dddde5",
  },
];
const palette = computed(() => palettes[selectedPalette.value]);
const journey = [
  { name: "We listen", detail: "Your routines, ideas, space and priorities." },
  {
    name: "We imagine",
    detail: "Layouts and 3D views to explore the possibilities.",
  },
  {
    name: "We refine",
    detail: "Materials, finishes and an agreed project scope.",
  },
  {
    name: "We bring it together",
    detail: "Execution, installation and the finishing details.",
  },
];
</script>

<template>
  <div class="studio-about">
    <ImageHero :slides="clientVisuals.about" page="about" eyebrow="THE VSN STORY"
      title="Rooted in the way we live." subtitle="Personal spaces. Thoughtful people."
      description="Based in Vizianagaram, we bring design, materials and everyday life together. Your routines and your ideas are where we begin."
      link="#/about#people" action="Meet the founder" note="Indian warmth. Contemporary thinking."
    />

    <section id="people" class="sa-people studio-section studio-container">
      <div class="sa-founder-image reveal">
        <img
          :src="'images/' + business.founder.image"
          :alt="business.founder.name + ', founder of VSN Interiors'"
          width="1920"
          height="1280"
          loading="lazy"
        />
        <div class="sa-founder-label">
          <span>THE PERSON BEHIND THE PRACTICE</span><ArrowUpRight :size="28" />
        </div>
      </div>
      <div class="sa-founder-copy reveal">
        <p class="studio-kicker">A PERSONAL APPROACH</p>
        <h2>Good design begins<br />with <em>understanding you.</em></h2>
        <p>
          Our studio in Dasannapeta, Vizianagaram brings interior design, 3D
          visualisation and execution into one conversation.
        </p>
        <p>
          Whether it is a single room, a complete home or a commercial space, we
          start by understanding what you need from it. Your habits, your taste
          and your priorities help shape the direction.
        </p>
        <div class="sa-founder-name">
          <div>
            <h3>{{ business.founder.name }}</h3>
            <span>{{ business.founder.role }}, VSN Interiors</span>
          </div>
          <span class="sa-founder-mark" aria-hidden="true">VSN</span>
        </div>
        <a href="#/contact" class="studio-text-link"
          >Meet the studio <ArrowUpRight :size="19"
        /></a>
      </div>
    </section>

    <section
      v-if="business.coFounder.name && business.coFounder.image"
      class="sa-cofounder studio-container"
    >
      <img
        :src="'images/' + business.coFounder.image"
        :alt="business.coFounder.name"
        loading="lazy"
      />
      <div>
        <p class="studio-kicker">ALONGSIDE THE FOUNDER</p>
        <h2>{{ business.coFounder.name }}</h2>
        <p>{{ business.coFounder.role }}</p>
      </div>
    </section>

    <section class="sa-principles studio-section">
      <div class="studio-container sa-principles-layout">
        <div class="sa-principles-intro reveal">
          <VisualCarousel :slides="clientVisuals.principles" label="Our design principles in pictures" :interval="5600" class="vsn-principles-photos" />
          <p class="studio-kicker">OUR DESIGN PRINCIPLES</p>
          <h2>Considered. Connected. <em>Yours.</em></h2>
          <p>Six ideas that guide the decisions behind every space.</p>
        </div>
        <div class="sa-principle-list">
          <article
            v-for="(principle, index) in principles"
            :key="principle.title"
            class="sa-principle"
            :class="{ 'is-open': openPrinciple === index }"
          >
            <h3>
              <button
                type="button"
                :aria-expanded="openPrinciple === index"
                :aria-controls="'principle-' + index"
                @click="openPrinciple = openPrinciple === index ? null : index"
              >
                <span class="sa-principle-number">0{{ index + 1 }}</span
                ><span>{{ principle.title }}</span
                ><Plus :size="21" />
              </button>
            </h3>
            <div
              :id="'principle-' + index"
              v-show="openPrinciple === index"
              class="sa-principle-content"
            >
              <span>{{ principle.tag }}</span>
              <p>{{ principle.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      id="materials"
      class="sa-materials studio-section studio-container"
    >
      <div class="sa-material-heading reveal">
        <p class="studio-kicker">COLOUR. TEXTURE. FEELING.</p>
        <h2>A home has<br /><em>its own material language.</em></h2>
        <p>
          Explore a few starting points. We develop the final palette around
          your space, your needs and the way you want it to feel.
        </p>
      </div>
      <div class="sa-material-layout">
        <figure class="sa-material-photo reveal">
          <img
            :src="'images/studio/about-materials.webp'"
            alt="Teak, limestone, terracotta, brass and handwoven Indian textile material study"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <figcaption>Material study · AI concept</figcaption>
        </figure>
        <div
          class="sa-palette-panel"
          :style="{
            '--palette-ground': palette.tone,
            '--sample-one': palette.colors[0],
            '--sample-two': palette.colors[1],
            '--sample-three': palette.colors[2],
          }"
        >
          <div class="sa-palette-top">
            <span>THE MATERIAL EDIT</span
            ><span>0{{ selectedPalette + 1 }} / 03</span>
          </div>
          <div class="sa-sample-stage" aria-hidden="true">
            <div class="sa-sample sa-sample-stone"></div>
            <div class="sa-sample sa-sample-wood"></div>
            <div class="sa-sample sa-sample-fabric"></div>
            <div class="sa-brass-ring"></div>
          </div>
          <div class="sa-palette-description" aria-live="polite">
            <h3>{{ palette.name }}</h3>
            <p>{{ palette.note }}</p>
            <div class="sa-sample-labels">
              <span
                v-for="(material, index) in palette.materials"
                :key="material"
                ><i :style="{ background: palette.colors[index] }"></i
                >{{ material }}</span
              >
            </div>
          </div>
          <div
            class="sa-palette-options"
            aria-label="Choose a material palette"
          >
            <button
              v-for="(item, index) in palettes"
              :key="item.name"
              type="button"
              :aria-pressed="selectedPalette === index"
              @click="selectedPalette = index"
            >
              <Check v-if="selectedPalette === index" :size="14" />{{
                item.name
              }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="sa-journey studio-section">
      <div class="studio-container">
        <div class="sa-journey-title reveal">
          <div>
            <p class="studio-kicker">THE WAY WE WORK</p>
            <h2>From an idea<br /><em>to a place of your own.</em></h2>
          </div>
          <a href="#/services" class="studio-text-link"
            >Explore our services <ArrowUpRight :size="18"
          /></a>
        </div>
        <div class="sa-journey-grid">
          <article
            v-for="(stage, index) in journey"
            :key="stage.name"
            class="reveal"
          >
            <div>
              <span>0{{ index + 1 }}</span
              ><MoveUpRight :size="23" />
            </div>
            <h3>{{ stage.name }}</h3>
            <p>{{ stage.detail }}</p>
          </article>
        </div>
      </div>
    </section>


  </div>
</template>
