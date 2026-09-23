<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { ArrowUpRight, Search } from "lucide-vue-next";
import { projects, categories } from "../data/content";
import { pageImages } from "../data/imageLibrary";
import PhotoSlideshow from "../components/PhotoSlideshow.vue";
const emit = defineEmits(["open-project"]);
function routeFilter() {
  const v = new URLSearchParams(
    (location.hash.split("?")[1] || "").split("#")[0],
  ).get("room");
  return categories.includes(v) ? v : "All spaces";
}
const filter = ref(routeFilter()),
  query = ref(""),
  limit = ref(12);
const matches = computed(() =>
  projects.filter(
    (p) =>
      (filter.value === "All spaces" || p.type === filter.value) &&
      (p.title + " " + p.style + " " + p.type)
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
    <section class="gallery-slideshow-cover">
      <PhotoSlideshow
        :slides="pageImages.galleryHero"
        label="Indian interior design gallery"
        :interval="6500"
        ><p class="eyebrow">INDIAN HOMES / DISTINCT POSSIBILITIES</p>
        <h1 tabindex="-1">The space <span>edit.</span></h1>
        <p>
          Find your colours. Discover your details.<br />Imagine a space that
          feels like you.
        </p>
        <a href="#/gallery#collection" class="button button-white"
          >Explore 130 designs <ArrowUpRight :size="19" /></a
      ></PhotoSlideshow>
    </section>
    <section class="section gallery-collection" id="collection">
      <div class="gallery-title">
        <div>
          <p class="eyebrow">13 CATEGORIES / 10 DESIGNS EACH</p>
          <h2>Room for<br /><span>inspiration.</span></h2>
        </div>
        <p>
          Every design in this collection is unique.<br />Choose a room to find
          your starting point.
        </p>
      </div>
      <div class="gallery-controls">
        <div class="filters" role="group" aria-label="Filter design collection">
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
          ><Search :size="18" /><span class="sr-only">Search room designs</span
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
        ><span>Indian-inspired design concepts</span>
      </div>
      <div class="gallery-grid">
        <button
          v-for="project in shown"
          :key="project.image"
          class="project-card"
          @click="emit('open-project', project)"
        >
          <div class="project-image">
            <img
              :src="'images/' + project.thumbnail"
              :alt="
                project.title + ', ' + project.type.toLowerCase() + ' concept'
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
            <ArrowUpRight :size="18" />
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
        </button>
      </div>
      <p class="collection-note">
        AI-generated design concepts for inspiration. These images are not
        presented as completed VSN projects.
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
