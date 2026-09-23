<script setup>
import { ref, watch, onBeforeUnmount, nextTick } from "vue";
import {
  Move3d,
  RotateCcw,
  Sun,
  Moon,
  Pause,
  Play,
  Expand,
  X,
  Check,
} from "lucide-vue-next";
import RoomScene from "./RoomScene.vue";
const room = ref(null),
  palette = ref("teal"),
  night = ref(false),
  paused = ref(false),
  expanded = ref(false),
  stage = ref(null),
  expandButton = ref(null),
  view = ref("overview");
const views = [
  ["overview", "Whole home"],
  ["living", "Living"],
  ["kitchen", "Kitchen"],
  ["dining", "Dining"],
  ["pooja", "Pooja"],
];
let previousOverflow = "";
function setView(id) {
  view.value = id;
  room.value?.setView(id);
}
watch(expanded, async (value) => {
  if (value) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    await nextTick();
    stage.value.querySelector("button")?.focus();
  } else {
    document.body.style.overflow = previousOverflow;
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
    const buttons = [...stage.value.querySelectorAll("button")],
      first = buttons[0],
      last = buttons.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
onBeforeUnmount(() => {
  if (expanded.value) document.body.style.overflow = previousOverflow;
});
</script>
<template>
  <div
    ref="stage"
    class="design-stage"
    :class="{ expanded }"
    :role="expanded ? 'dialog' : undefined"
    :aria-modal="expanded || undefined"
    aria-label="Interactive Indian home concept"
    @keydown="keys"
  >
    <div class="stage-canvas">
      <RoomScene
        ref="room"
        :palette="palette"
        :night="night"
        :paused="paused"
      />
    </div>
    <div class="stage-label">
      <Move3d :size="17" />THE INDIAN HOME / LIVE 3D
    </div>
    <button
      ref="expandButton"
      class="stage-expand icon-button"
      @click="expanded = !expanded"
      :aria-label="expanded ? 'Exit expanded view' : 'Expand 3D view'"
    >
      <X v-if="expanded" :size="18" /><Expand v-else :size="18" />
    </button>
    <div class="stage-views" role="group" aria-label="Explore room views">
      <button
        v-for="[id, label] in views"
        :key="id"
        @click="setView(id)"
        :aria-pressed="view === id"
        :class="{ active: view === id }"
      >
        {{ label }}
      </button>
    </div>
    <div class="stage-toolbar">
      <p>Drag to explore <span>· Pinch to zoom</span></p>
      <div class="stage-swatches">
        <span>Upholstery</span
        ><button
          v-for="(color, key) in {
            teal: '#285a52',
            clay: '#b76c4c',
            blue: '#415e7a',
          }"
          :key="key"
          :style="{ background: color }"
          :aria-label="key + ' accent colour'"
          :aria-pressed="palette === key"
          @click="palette = key"
        >
          <Check v-if="palette === key" :size="14" />
        </button>
      </div>
      <div class="stage-actions">
        <button
          class="icon-button"
          @click="setView('overview')"
          aria-label="Reset camera"
        >
          <RotateCcw :size="17" /></button
        ><button
          class="icon-button"
          @click="paused = !paused"
          :aria-label="paused ? 'Resume motion' : 'Pause motion'"
        >
          <Play v-if="paused" :size="17" /><Pause v-else :size="17" /></button
        ><button
          class="icon-button"
          @click="night = !night"
          :aria-label="
            night ? 'Switch to daylight' : 'Switch to evening lighting'
          "
        >
          <Sun v-if="night" :size="17" /><Moon v-else :size="17" />
        </button>
      </div>
    </div>
  </div>
</template>
