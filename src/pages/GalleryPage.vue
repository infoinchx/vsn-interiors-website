<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { ArrowUpRight, Search, Grid2X2, Move3d } from "lucide-vue-next";
import { projects, categories } from "../data/content";
import DesignStage from "../components/DesignStage.vue";
const emit = defineEmits(["open-project"]);
function routeFilter() {
  const value = new URLSearchParams(
    (location.hash.split("?")[1] || "").split("#")[0],
  ).get("room");
  return categories.includes(value) ? value : "All spaces";
}
const filter = ref(routeFilter()),
  query = ref(""),
  limit = ref(12),
  view = ref("collection");
const matches = computed(() =>
  projects.filter(
    (p) =>
      (filter.value === "All spaces" || p.type === filter.value) &&
      `${p.title} ${p.style} ${p.type}`
        .toLowerCase()
        .includes(query.value.trim().toLowerCase()),
  ),
);
const shown = computed(() => matches.value.slice(0, limit.value));
watch([filter, query], () => (limit.value = 12));
function syncFilter() {
  filter.value = routeFilter();
}
onMounted(() => window.addEventListener("hashchange", syncFilter));
onBeforeUnmount(() => window.removeEventListener("hashchange", syncFilter));
</script>
<template>
  <div class="gallery-page">
    <section class="gallery-cover">
      <div class="gallery-cover-meta">
        <p class="eyebrow">VSN / THE INSPIRATION ARCHIVE</p>
        <span>{{ projects.length }} DESIGN DIRECTIONS</span>
      </div>
      <h1 tabindex="-1">THE SPACE <span>EDIT.</span></h1>
      <div class="gallery-cover-images">
        <img
          :src="'images/generated/living-teal.webp'"
          alt="Teal living room inspiration"
          width="1536"
          height="1024"
        /><img
          :src="'images/generated/bedroom-earth.webp'"
          alt="Warm and tranquil bedroom concept"
          width="1536"
          height="1024"
        /><img
          :src="'images/generated/dining-courtyard.webp'"
          alt="Courtyard dining room concept"
          width="1536"
          height="1024"
        />
      </div>
      <div class="gallery-cover-caption">
        <p>
          Follow a colour. Fall for a detail.<br />Find a space that feels like
          you.
        </p>
        <a href="#/gallery#collection" class="text-link"
          >Enter the collection <ArrowUpRight :size="20"
        /></a>
      </div>
    </section>
    <section class="section gallery-collection" id="collection">
      <div class="gallery-title">
        <div>
          <p class="eyebrow">CURATED POSSIBILITIES</p>
          <h2>Room for<br /><span>inspiration.</span></h2>
        </div>
        <div class="gallery-mode" role="group" aria-label="Gallery view">
          <button
            @click="view = 'collection'"
            :aria-pressed="view === 'collection'"
            :class="{ active: view === 'collection' }"
          >
            <Grid2X2 :size="17" />Collection</button
          ><button
            @click="view = 'exhibition'"
            :aria-pressed="view === 'exhibition'"
            :class="{ active: view === 'exhibition' }"
          >
            <Move3d :size="17" />3D exhibition
          </button>
        </div>
      </div>
      <template v-if="view === 'collection'"
        ><div class="gallery-controls">
          <div
            class="filters"
            role="group"
            aria-label="Filter design collection"
          >
            <button
              v-for="category in categories"
              :key="category"
              @click="filter = category"
              :aria-pressed="filter === category"
              :class="{ active: filter === category }"
            >
              {{ category
              }}<span>{{
                category === "All spaces"
                  ? projects.length
                  : projects.filter((p) => p.type === category).length
              }}</span>
            </button>
          </div>
          <label class="gallery-search"
            ><Search :size="18" /><span class="sr-only"
              >Search room designs</span
            ><input
              v-model="query"
              type="search"
              placeholder="Search a room or style"
          /></label>
        </div>
        <div class="gallery-result">
          <span aria-live="polite"
            >{{ matches.length }} design
            {{ matches.length === 1 ? "direction" : "directions" }}</span
          ><span>AI concepts & curated inspiration</span>
        </div>
        <div class="gallery-grid">
          <button
            v-for="(project, index) in shown"
            :key="project.image"
            class="project-card"
            @click="emit('open-project', project)"
          >
            <div class="project-image">
              <img
                :src="'images/' + (project.thumbnail || project.image)"
                :alt="
                  project.style + ' ' + project.type.toLowerCase() + ' concept'
                "
                loading="lazy"
                width="720"
                height="480"
              /><span class="project-tag">{{ project.type }}</span
              ><span class="project-open"><ArrowUpRight :size="22" /></span>
            </div>
            <div class="project-meta">
              <div>
                <p>{{ project.style }}</p>
                <h3>{{ project.title }}</h3>
              </div>
              <span>{{ String(index + 1).padStart(2, "0") }}</span>
            </div>
          </button>
        </div>
        <div v-if="matches.length === 0" class="gallery-empty">
          <h3>No spaces found just yet.</h3>
          <p>Try another style or reset your filters.</p>
          <button
            class="button button-white"
            @click="
              query = '';
              filter = 'All spaces';
            "
          >
            Show all spaces
          </button>
        </div>
        <div class="load-more" v-if="shown.length < matches.length">
          <p>Showing {{ shown.length }} of {{ matches.length }} designs</p>
          <button class="button button-outline" @click="limit += 12">
            Discover more spaces <ArrowUpRight :size="18" />
          </button></div
      ></template>
      <div v-else class="exhibition-view">
        <p>
          Explore the room in 3D. Click a framed image to open its design story.
        </p>
        <DesignStage
          variant="gallery"
          @open-project="emit('open-project', $event)"
        />
      </div>
      <p class="collection-note">
        This collection includes original AI-generated concepts and curated
        stock photography. It illustrates design possibilities, not completed
        VSN projects.
      </p>
    </section>
    <section class="gallery-end">
      <p>FOUND YOUR INSPIRATION?</p>
      <a href="#/contact"
        >Let’s make it personal. <ArrowUpRight :size="32"
      /></a>
    </section>
  </div>
</template>
