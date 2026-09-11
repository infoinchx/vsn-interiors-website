<script setup>
import { ref, computed, onBeforeUnmount, watch, nextTick } from "vue";
import {
  ArrowUpRight,
  Move3d,
  RotateCcw,
  Sun,
  Moon,
  Pause,
  Play,
  Check,
  Expand,
  X,
} from "lucide-vue-next";
import RoomScene from "./RoomScene.vue";
import AtelierScene from "./AtelierScene.vue";
const props = defineProps({ page: { type: String, default: "home" } });
const emit = defineEmits(["select-project"]);
const room = ref(null),
  palette = ref("teal"),
  night = ref(false),
  paused = ref(false),
  expanded = ref(false),
  world = ref(null),
  expandButton = ref(null);
const copy = computed(
  () =>
    ({
      home: {
        kicker: "SPACES WITH SOUL",
        first: "Come in.",
        last: "Feel at home.",
        text: "Thoughtfully designed interiors.\nBeautifully made for the way you live.",
        link: "#/gallery",
        cta: "Find your inspiration",
        label: "THE LIVING ROOM",
        note: "A new perspective\non everyday living.",
        number: "01",
      },
      about: {
        kicker: "THE PEOPLE BEHIND THE SPACES",
        first: "Good design.",
        last: "Great listening.",
        text: "Your story is where we start.\nEvery detail follows from there.",
        link: "#/about#story",
        cta: "Get to know our approach",
        label: "THE DESIGN ATELIER",
        note: "Ideas take shape.\nYour story becomes a space.",
        number: "02",
      },
      gallery: {
        kicker: "STEP INSIDE THE COLLECTION",
        first: "Find a space.",
        last: "Feel a connection.",
        text: "A world of colour, texture and possibility.\nDiscover your next design direction.",
        link: "#/gallery#collection",
        cta: "Explore the collection",
        label: "THE DESIGN GALLERY",
        note: "Click a framed room\nto discover its story.",
        number: "03",
      },
      contact: {
        kicker: "EVERY HOME STARTS WITH A HELLO",
        first: "Your ideas.",
        last: "Our next chapter.",
        text: "A room, an entire home, a fresh beginning.\nLet’s talk about what you have in mind.",
        link: "#/contact#enquiry",
        cta: "Tell us about your space",
        label: "THE CONSULTATION LOUNGE",
        note: "Make yourself comfortable.\nThe conversation starts here.",
        number: "04",
      },
    })[props.page],
);
let oldOverflow = "";
watch(expanded, async (value) => {
  if (value) {
    oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    await nextTick();
    world.value.querySelector("button")?.focus();
  } else {
    document.body.style.overflow = oldOverflow;
    expandButton.value?.focus();
  }
});
function keys(e) {
  if (!expanded.value) return;
  if (e.key === "Escape") {
    expanded.value = false;
    e.preventDefault();
  }
  if (e.key === "Tab") {
    const items = [...world.value.querySelectorAll('button,a,[tabindex="0"]')];
    const first = items[0],
      last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
}
onBeforeUnmount(() => {
  if (expanded.value) document.body.style.overflow = oldOverflow;
});
</script>
<template>
  <section class="hero page-hero" :class="'hero-' + page">
    <div class="hero-copy">
      <div class="eyebrow">
        <span class="small-rule"></span>{{ copy.kicker }}
      </div>
      <h1 tabindex="-1">
        {{ copy.first }}<br /><em>{{ copy.last }}</em>
      </h1>
      <p class="preserve-lines">{{ copy.text }}</p>
      <a :href="copy.link" class="button light-button"
        >{{ copy.cta }}<ArrowUpRight :size="19"
      /></a>
      <div class="hero-note">
        <span class="note-number">{{ copy.number }} /</span
        ><span class="preserve-lines">{{ copy.note }}</span>
      </div>
    </div>
    <div
      ref="world"
      class="hero-world"
      :class="{ expanded }"
      :role="expanded ? 'dialog' : undefined"
      :aria-modal="expanded ? true : undefined"
      :aria-label="expanded ? copy.label : undefined"
      @keydown="keys"
    >
      <RoomScene
        v-if="page === 'home'"
        ref="room"
        :palette="palette"
        :night="night"
        :paused="paused"
      /><AtelierScene
        v-else
        ref="room"
        :variant="page"
        :palette="palette"
        :night="night"
        :paused="paused"
        @select-project="$emit('select-project', $event)"
      />
      <div class="scene-top">
        <span class="scene-label"
          ><Move3d :size="17" />{{ copy.label }} · 3D CONCEPT</span
        ><button
          ref="expandButton"
          class="icon-button glass"
          @click="expanded = !expanded"
          :aria-label="expanded ? 'Exit expanded view' : 'Expand 3D view'"
        >
          <X v-if="expanded" :size="18" /><Expand v-else :size="18" />
        </button>
      </div>
      <div class="scene-bottom">
        <div class="scene-tip">
          <Move3d :size="18" /><span
            >Drag to explore
            <span class="desktop-only">· Pinch to zoom</span></span
          >
        </div>
        <div class="scene-tools">
          <button
            class="icon-button glass"
            @click="room?.reset()"
            aria-label="Reset camera"
          >
            <RotateCcw :size="17" /></button
          ><button
            class="icon-button glass"
            @click="paused = !paused"
            :aria-label="paused ? 'Resume motion' : 'Pause motion'"
          >
            <Play v-if="paused" :size="17" /><Pause v-else :size="17" /></button
          ><button
            class="icon-button glass"
            @click="night = !night"
            :aria-label="
              night ? 'Switch to daylight' : 'Switch to evening lighting'
            "
          >
            <Sun v-if="night" :size="17" /><Moon v-else :size="17" />
          </button>
        </div>
      </div>
      <div class="material-picker">
        <span>MAKE IT YOURS</span
        ><button
          v-for="(color, key) in {
            teal: '#285a52',
            clay: '#b76c4c',
            blue: '#415e7a',
          }"
          :key="key"
          :style="{ background: color }"
          :class="{ active: palette === key }"
          @click="palette = key"
          :aria-label="key + ' accent colour'"
          :aria-pressed="palette === key"
        >
          <Check v-if="palette === key" :size="14" />
        </button>
      </div>
    </div>
  </section>
</template>
