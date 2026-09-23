<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import BrandLogo from "./components/BrandLogo.vue";
import SiteFooter from "./components/SiteFooter.vue";
import WhatsAppButton from "./components/WhatsAppButton.vue";
import ServicesPage from "./pages/ServicesPage.vue";
import InquiryForm from "./components/InquiryForm.vue";
import HomePage from "./pages/HomePage.vue";
import AboutPage from "./pages/AboutPage.vue";
import GalleryPage from "./pages/GalleryPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import { projects } from "./data/content";
const links = [
  { id: "home", label: "Home", href: "#/" },
  { id: "about", label: "About Us", href: "#/about" },
  { id: "services", label: "Services", href: "#/services" },
  { id: "gallery", label: "Gallery", href: "#/gallery" },
  { id: "contact", label: "Contact Us", href: "#/contact" },
];
function skipContent() {
  document.getElementById("main")?.focus();
}
function readRoute() {
  const p = location.hash
    .slice(1)
    .split("#")[0]
    .split("?")[0]
    .replace(/^\/+|\/+$/g, "");
  return p === "" ? "home" : links.some((l) => l.id === p) ? p : "missing";
}
const page = ref(readRoute()),
  mobileMenu = ref(false),
  selected = ref(null),
  galleryDialog = ref(null),
  inquiryDialog = ref(null),
  inquirySpace = ref("Complete home");
const currentComponent = computed(
  () =>
    ({
      home: HomePage,
      about: AboutPage,
      services: ServicesPage,
      gallery: GalleryPage,
      contact: ContactPage,
    })[page.value],
);
let observer;
function observeReveals() {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
async function pageReady(focus = true) {
  await nextTick();
  observeReveals();
  const section = location.hash.split("#")[2];
  if (section) {
    document.getElementById(section)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  } else if (focus) {
    document.querySelector("main h1")?.focus({ preventScroll: true });
  }
}
function changePage() {
  const next = readRoute();
  mobileMenu.value = false;
  galleryDialog.value?.close();
  inquiryDialog.value?.close();
  if (next === page.value) {
    pageReady();
    return;
  }
  page.value = next;
  document.title = `${links.find((l) => l.id === next)?.label || "Page not found"} | Vsn Interiors`;
  window.scrollTo({ top: 0, behavior: "instant" });
}
function navClicked(id) {
  mobileMenu.value = false;
  if (page.value === id)
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
}
function consult(space) {
  inquirySpace.value = typeof space === "string" ? space : "Complete home";
  mobileMenu.value = false;
  inquiryDialog.value.showModal();
}
function openProject(project) {
  selected.value = project;
  galleryDialog.value.showModal();
}
function nextProject(n) {
  const index = projects.findIndex(
    (project) => project.image === selected.value?.image,
  );
  selected.value = projects[(index + n + projects.length) % projects.length];
}
function dialogKeys(e) {
  if (e.key === "ArrowLeft") nextProject(-1);
  if (e.key === "ArrowRight") nextProject(1);
}
function menuKeys(e) {
  if (e.key === "Escape") mobileMenu.value = false;
}
onMounted(() => {
  window.addEventListener("hashchange", changePage);
  document.addEventListener("keydown", menuKeys);
  document.title = `${links.find((l) => l.id === page.value)?.label || "Page not found"} | Vsn Interiors`;
  pageReady(false);
});
onBeforeUnmount(() => {
  window.removeEventListener("hashchange", changePage);
  document.removeEventListener("keydown", menuKeys);
  observer?.disconnect();
});
</script>
<template>
  <a class="skip-link" href="#main" @click.prevent="skipContent"
    >Skip to content</a
  >
  <header class="header">
    <a
      class="brand"
      href="#/"
      @click="navClicked('home')"
      aria-label="Vsn Interiors home"
      ><BrandLogo
    /></a>
    <nav
      id="main-navigation"
      aria-label="Main navigation"
      :class="{ open: mobileMenu }"
    >
      <a
        v-for="link in links"
        :key="link.id"
        :href="link.href"
        :class="{ 'nav-active': page === link.id }"
        :aria-current="page === link.id ? 'page' : undefined"
        @click="navClicked(link.id)"
        >{{ link.label }}</a
      >
    </nav>
    <button class="button header-cta" @click="consult">
      Let us talk <ArrowUpRight :size="17" /></button
    ><button
      class="menu-toggle icon-button"
      @click="mobileMenu = !mobileMenu"
      :aria-expanded="mobileMenu"
      aria-controls="main-navigation"
      :aria-label="mobileMenu ? 'Close menu' : 'Open menu'"
    >
      <X v-if="mobileMenu" /><Menu v-else />
    </button>
  </header>
  <main id="main" tabindex="-1">
    <Transition name="page" mode="out-in" @after-enter="pageReady"
      ><div :key="page" class="page-shell">
        <component
          v-if="currentComponent"
          :is="currentComponent"
          @consult="consult"
          @open-project="openProject"
        />
        <section v-else class="section missing-page">
          <p class="eyebrow copper">A DIFFERENT DIRECTION</p>
          <h1 tabindex="-1">This space<br />isn’t here yet.</h1>
          <p>Let’s take you back to the beginning.</p>
          <a class="button" href="#/"
            >Return home <ArrowUpRight :size="18"
          /></a>
        </section></div
    ></Transition>
  </main>
  <SiteFooter />
  <WhatsAppButton />
  <dialog
    ref="galleryDialog"
    class="gallery-dialog"
    @keydown="dialogKeys"
    @click="
      (e) => {
        if (e.target === galleryDialog) galleryDialog.close();
      }
    "
  >
    <div v-if="selected" class="gallery-content">
      <button
        class="dialog-close icon-button"
        @click="galleryDialog.close()"
        aria-label="Close room details"
      >
        <X /></button
      ><img :src="'images/' + selected.image" :alt="selected.title" />
      <div class="gallery-info">
        <p class="eyebrow copper">{{ selected.type }} · {{ selected.style }}</p>
        <h2>{{ selected.title }}</h2>
        <p>{{ selected.description }}</p>
        <p class="collection-note">
          {{ selected.origin || "Curated inspiration" }}. Illustrative design
          direction.
        </p>
        <div class="gallery-actions">
          <button
            class="button"
            @click="
              galleryDialog.close();
              consult(selected.type);
            "
          >
            Plan a space like this <ArrowUpRight :size="18" />
          </button>
          <div>
            <button
              class="icon-button"
              @click="nextProject(-1)"
              aria-label="Previous room"
            >
              <ChevronLeft /></button
            ><button
              class="icon-button"
              @click="nextProject(1)"
              aria-label="Next room"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
  <dialog
    ref="inquiryDialog"
    class="inquiry-dialog"
    @click="
      (e) => {
        if (e.target === inquiryDialog) inquiryDialog.close();
      }
    "
  >
    <button
      class="dialog-close icon-button"
      @click="inquiryDialog.close()"
      aria-label="Close enquiry"
    >
      <X />
    </button>
    <p class="eyebrow copper">A HOME THAT STARTS WITH YOU</p>
    <h2>Tell us about<br /><em>your space.</em></h2>
    <p class="form-intro">A few details to shape your design conversation.</p>
    <InquiryForm :space="inquirySpace" />
  </dialog>
</template>
