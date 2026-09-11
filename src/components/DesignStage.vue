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
import AtelierScene from "./AtelierScene.vue";
const props = defineProps({ variant: { type: String, default: "home" } });
defineEmits(["open-project"]);
const room = ref(null),
  palette = ref("teal"),
  night = ref(false),
  paused = ref(false),
  expanded = ref(false),
  stage = ref(null),
  expandButton = ref(null);
let previousOverflow = "";
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
    aria-label="Interactive interior concept"
    @keydown="keys"
  >
    <div class="stage-canvas">
      <RoomScene
        v-if="variant === 'home'"
        ref="room"
        :palette="palette"
        :night="night"
        :paused="paused"
      /><AtelierScene
        v-else
        ref="room"
        variant="gallery"
        :palette="palette"
        :night="night"
        :paused="paused"
        @select-project="$emit('open-project', $event)"
      />
    </div>
    <div class="stage-label">
      <Move3d :size="17" />{{
        variant === "home" ? "THE LIVING ROOM" : "THE EXHIBITION"
      }}
      · INTERACTIVE 3D
    </div>
    <button
      ref="expandButton"
      class="stage-expand icon-button"
      @click="expanded = !expanded"
      :aria-label="expanded ? 'Exit expanded view' : 'Expand 3D view'"
    >
      <X v-if="expanded" :size="18" /><Expand v-else :size="18" />
    </button>
    <div class="stage-toolbar">
      <p>Drag to rotate <span>· Pinch or scroll to zoom</span></p>
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
          @click="room?.reset()"
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
