<script setup>
import { ref, computed } from "vue";
import { ArrowUpRight, ArrowRight, ChevronRight } from "lucide-vue-next";
import { projects } from "../data/content";
import DesignStage from "../components/DesignStage.vue";
defineEmits(["consult", "open-project"]);
const first = (type) => projects.find((p) => p.type === type);
const rooms = ["Living", "Kitchen", "Bedroom", "Dining", "Office", "Pooja"]
  .map((type) => first(type))
  .filter(Boolean);
const slide = ref(0),
  material = ref(0),
  step = ref(0);
const covers = [first("Living"), first("Kitchen"), first("Bedroom")];
const featured = [
  projects.find((p) => p.title === "Courtyard Retreat") || projects[1],
  first("Bedroom"),
  first("Dining"),
];
const palettes = [
  {
    name: "Warm & grounded",
    title: "A little earth. A lot of character.",
    image: "generated/kitchen-clay.webp",
    text: "Clay, warm timber and brushed metal. An inviting direction with depth, texture and everyday warmth.",
    colors: ["#bc785b", "#a18361", "#ede6d9", "#4c4b3a"],
  },
  {
    name: "Quietly colourful",
    title: "Colour with a considered point of view.",
    image: "generated/living-teal.webp",
    text: "Deep teal, soft ivory and walnut. Rich colour feels balanced when materials and proportions work together.",
    colors: ["#254d43", "#e8e1cf", "#7e5b3c", "#b68a50"],
  },
  {
    name: "Calm & contemporary",
    title: "A softer way to make a statement.",
    image: "generated/bedroom-navy.webp",
    text: "Inky blue, natural linen and warm wood. A restful palette with just enough contrast to feel distinctive.",
    colors: ["#334b61", "#d7c5ac", "#a28059", "#eee9de"],
  },
];
const steps = [
  {
    title: "First, we listen.",
    name: "Discover",
    text: "Tell us about your space, your routines and what you want to change. Your priorities shape the brief.",
    detail: "Your story · Space review · Budget discussion",
  },
  {
    title: "Then, possibilities take shape.",
    name: "Design",
    text: "Layouts and 3D concepts bring the possibilities into focus. Explore finishes and refine the design direction.",
    detail: "Layouts · 3D concepts · Material palette",
  },
  {
    title: "Every detail finds its place.",
    name: "Detail",
    text: "Agree the scope, drawings and specifications so the next stage starts with a clear plan.",
    detail: "Drawings · Specifications · Coordination",
  },
  {
    title: "Finally, make yourself at home.",
    name: "Deliver",
    text: "Bring the approved design together through coordinated installation and a considered finishing review.",
    detail: "Execution · Installation · Handover",
  },
];
</script>
<template>
  <div class="home-page">
    <section class="home-cover" data-home-section="1">
      <Transition name="cover" mode="out-in"
        ><img
          :key="slide"
          :src="'images/' + covers[slide].image"
          :alt="covers[slide].title"
          fetchpriority="high"
          width="1536"
          height="1024"
      /></Transition>
      <div class="cover-shade"></div>
      <div class="cover-content">
        <p class="eyebrow">VSN INTERIORS · SPACES WITH SOUL</p>
        <h1 tabindex="-1">A home.<br />Entirely <span>yours.</span></h1>
        <p>
          Considered design. Personal spaces.<br />A beautiful way to live,
          every day.
        </p>
        <div class="cover-links">
          <a class="button button-white" href="#/gallery"
            >Explore our spaces <ArrowUpRight :size="20" /></a
          ><a class="quiet-link" href="#/about"
            >Meet VSN <ArrowRight :size="18"
          /></a>
        </div>
      </div>
      <div class="cover-bottom">
        <span>DESIGN IS PERSONAL. SO ARE WE.</span>
        <div
          class="cover-pagination"
          role="group"
          aria-label="Select featured interior"
        >
          <button
            v-for="(item, i) in covers"
            :key="item.image"
            @click="slide = i"
            :class="{ active: slide === i }"
            :aria-label="'Show ' + item.type + ' interior'"
            :aria-pressed="slide === i"
          >
            0{{ i + 1 }}
          </button>
        </div>
        <span class="cover-credit"
          >{{ covers[slide].type.toUpperCase() }} / DESIGN CONCEPT</span
        >
      </div>
    </section>
    <section class="section room-finder" data-home-section="2">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">START WITH A SPACE</p>
          <h2>Every room.<br /><span>A new possibility.</span></h2>
        </div>
        <p>Find the feeling you want to come home to.</p>
      </div>
      <div class="room-strip">
        <a
          v-for="(room, i) in rooms"
          :key="room.type"
          :href="'#/gallery?room=' + encodeURIComponent(room.type)"
          class="room-tile reveal"
          ><div>
            <img
              :src="'images/' + (room.thumbnail || room.image)"
              :alt="room.type + ' design inspiration'"
              loading="lazy"
              width="720"
              height="480"
            /><span>0{{ i + 1 }}</span>
          </div>
          <h3>{{ room.type }} <ArrowUpRight :size="18" /></h3
        ></a>
      </div>
    </section>
    <section class="section selected-spaces" data-home-section="3">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">THE SELECTED EDIT</p>
          <h2>Spaces that<br /><span>stay with you.</span></h2>
        </div>
        <a class="text-link" href="#/gallery"
          >View the collection <ArrowUpRight :size="20"
        /></a>
      </div>
      <div class="editorial-projects">
        <button
          v-for="(project, i) in featured"
          :key="project.image"
          :class="['editorial-project', 'project-' + i, 'reveal']"
          @click="$emit('open-project', project)"
        >
          <img
            :src="'images/' + project.image"
            :alt="project.title"
            loading="lazy"
            width="1536"
            height="1024"
          />
          <div>
            <p class="eyebrow">{{ project.type }} / {{ project.style }}</p>
            <h3>{{ project.title }}</h3>
            <span class="round-arrow"><ArrowUpRight :size="24" /></span>
          </div>
        </button>
      </div>
      <p class="collection-note">
        Original AI design concepts, created to inspire your own space.
      </p>
    </section>
    <section class="home-services" data-home-section="4">
      <div class="home-services-intro reveal">
        <p class="eyebrow">FROM FIRST IDEAS TO FINAL DETAILS</p>
        <h2>One home.<br />Every detail<br /><span>considered.</span></h2>
        <a class="button button-outline" href="#/services"
          >Discover our services <ArrowUpRight :size="19"
        /></a>
      </div>
      <div class="service-rails">
        <a
          v-for="(service, i) in [
            {
              name: 'Design & planning',
              text: 'Layouts, 3D visualisation and material direction.',
            },
            {
              name: 'Complete home interiors',
              text: 'Kitchens, wardrobes, living spaces and more.',
            },
            {
              name: 'Finishes & styling',
              text: 'Lighting, surfaces, furniture and the final layer.',
            },
            {
              name: 'Commercial & execution',
              text: 'Workspaces, showrooms and coordinated delivery.',
            },
          ]"
          :key="service.name"
          href="#/services"
          class="service-rail reveal"
          ><span>0{{ i + 1 }}</span>
          <div>
            <h3>{{ service.name }}</h3>
            <p>{{ service.text }}</p>
          </div>
          <ArrowUpRight :size="25"
        /></a>
      </div>
    </section>
    <section class="section home-interactive" data-home-section="5">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">A DIFFERENT PERSPECTIVE</p>
          <h2>Don’t just imagine it.<br /><span>Step inside.</span></h2>
        </div>
        <p>
          Rotate the room. Change the accents.<br />See how a space comes
          together.
        </p>
      </div>
      <DesignStage />
      <div class="stage-caption">
        <span>LIVE 3D CONCEPT</span>
        <p>An interactive starting point for your design conversation.</p>
      </div>
    </section>
    <section class="material-edit" data-home-section="6">
      <div class="material-copy reveal">
        <p class="eyebrow copper">THE MATERIAL EDIT</p>
        <h2>Colour. Texture.<br /><span>Character.</span></h2>
        <div
          class="material-tabs"
          role="group"
          aria-label="Choose material direction"
        >
          <button
            v-for="(p, i) in palettes"
            :key="p.name"
            @click="material = i"
            :aria-pressed="material === i"
            :class="{ active: material === i }"
          >
            {{ p.name }}
          </button>
        </div>
        <h3>{{ palettes[material].title }}</h3>
        <p>{{ palettes[material].text }}</p>
        <div class="material-colors">
          <span
            v-for="color in palettes[material].colors"
            :key="color"
            :style="{ background: color }"
            :aria-label="color"
          ></span>
        </div>
        <button class="text-link" @click="$emit('consult')">
          Find your palette <ArrowUpRight :size="19" />
        </button>
      </div>
      <div class="material-photo">
        <Transition name="cover" mode="out-in"
          ><img
            :key="material"
            :src="'images/' + palettes[material].image"
            alt="Interior illustrating the selected material palette"
            loading="lazy"
            width="1536"
            height="1024" /></Transition
        ><span>{{ palettes[material].name.toUpperCase() }}</span>
      </div>
    </section>
    <section class="section home-process" data-home-section="7">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">A CLEAR WAY FORWARD</p>
          <h2>From a first hello<br /><span>to feeling at home.</span></h2>
        </div>
        <p>Four thoughtful stages.<br />One connected design journey.</p>
      </div>
      <div
        class="process-tabs"
        role="group"
        aria-label="Explore our design process"
      >
        <button
          v-for="(s, i) in steps"
          :key="s.name"
          :class="{ active: step === i }"
          :aria-pressed="step === i"
          @click="step = i"
        >
          <span>0{{ i + 1 }}</span
          >{{ s.name }}
        </button>
      </div>
      <div class="process-detail">
        <span class="process-giant">0{{ step + 1 }}</span>
        <div>
          <h3>{{ steps[step].title }}</h3>
          <p>{{ steps[step].text }}</p>
          <small>{{ steps[step].detail }}</small>
        </div>
        <button
          class="round-arrow"
          @click="step = (step + 1) % steps.length"
          aria-label="Next design stage"
        >
          <ArrowRight :size="26" />
        </button>
      </div>
    </section>
    <section class="home-finale" data-home-section="8">
      <p class="eyebrow">LET’S MAKE ROOM FOR YOUR NEXT CHAPTER</p>
      <a href="#/contact"
        ><h2>Your space.<br /><span>Our next conversation.</span></h2>
        <span class="finale-arrow"
          ><ArrowUpRight :size="54" :stroke-width="1.2" /></span
      ></a>
      <div>
        <span>A ROOM. A HOME. A FRESH BEGINNING.</span
        ><span>LET’S CREATE SOMETHING PERSONAL.</span>
      </div>
    </section>
  </div>
</template>
