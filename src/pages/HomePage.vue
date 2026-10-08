<script setup>
import { ArrowUpRight } from "lucide-vue-next";
import ImageHero from "../components/ImageHero.vue";
import VisualCarousel from "../components/VisualCarousel.vue";
import { clientVisuals } from "../data/clientVisuals";
import DesignStage from "../components/DesignStage.vue";
import ReviewsSection from "../components/ReviewsSection.vue";
import { pageImages } from "../data/imageLibrary";
defineEmits(["consult", "open-project"]);
const rails = [
  {
    name: "Design & planning",
    text: "Space planning, 3D visualisation and material selection.",
  },
  {
    name: "Complete home interiors",
    text: "Kitchens, wardrobes, pooja rooms and thoughtfully planned living spaces.",
  },
  {
    name: "Finishes & styling",
    text: "Ceilings, lighting, surfaces and furniture that bring a room together.",
  },
  {
    name: "Commercial & execution",
    text: "Offices, showrooms, facade design and coordinated installation.",
  },
];
</script>
<template>
  <div class="home-page">
    <ImageHero
      :slides="clientVisuals.home" page="home" eyebrow="WELCOME TO VSN INTERIORS"
      title="A home. Entirely yours." subtitle="Beautiful spaces. Everyday living."
      description="Indian warmth, thoughtful planning and details that feel personal. Discover a fresh perspective on your home."
      link="#/gallery" action="Explore our designs" note="Designed for the way you live."
    />
    <section class="section room-finder" data-home-section="rooms">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">START WITH A SPACE</p>
          <h2>Every room.<br /><span>A new possibility.</span></h2>
        </div>
        <p>Familiar Indian spaces.<br />A fresh way to make them yours.</p>
      </div>
      <div class="room-strip">
        <a
          v-for="(room, i) in pageImages.homeRooms"
          :key="room.image"
          :href="
            '#/gallery?room=' + encodeURIComponent(room.type) + '#collection'
          "
          class="room-tile reveal"
          ><div>
            <img
              :src="'images/' + room.thumbnail"
              :alt="room.title"
              loading="lazy"
              width="720"
              height="480"
            /><span>0{{ i + 1 }}</span>
          </div>
          <h3>{{ room.type }}<ArrowUpRight :size="18" /></h3
        ></a>
      </div>
    </section>
    <section class="vsn-home-edit" data-home-section="services">
      <VisualCarousel :slides="clientVisuals.homeBanner" label="Spaces for everyday living" :interval="6100" class="vsn-home-banner">
        <template #default="{ current }"><div class="vsn-banner-caption"><span>THE EVERYDAY, REIMAGINED</span><h2>{{ current.title }}</h2></div></template>
      </VisualCarousel>
      <div class="vsn-home-edit-content">
        <div class="vsn-home-edit-intro"><p class="vsn-kicker">DESIGN / DETAIL / EXECUTION</p><h2>One studio.<br />Every detail considered.</h2><a class="vsn-pill-link" href="#/services">Discover our services <ArrowUpRight :size="18" /></a></div>
        <div class="vsn-service-rails"><a v-for="(service, i) in rails" :key="service.name" href="#/services" class="vsn-service-rail"><span>0{{ i + 1 }}</span><div><h3>{{ service.name }}</h3><p>{{ service.text }}</p></div><ArrowUpRight :size="20" /></a></div>
      </div>
    </section>
    <section class="section home-interactive" data-home-section="studio">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">EXPLORE OUR INTERACTIVE HOME</p>
          <h2>See the details.<br /><span>Feel the possibilities.</span></h2>
        </div>
        <p>
          A furnished Indian living, dining and kitchen concept. Explore
          different views, colours and lighting.
        </p>
      </div>
      <DesignStage />
      <div class="stage-caption">
        <span>LIVE 3D CONCEPT</span>
        <p>Living · Dining · Kitchen · Pooja · Custom joinery</p>
      </div>
    </section>
    <ReviewsSection />
  </div>
</template>
