<script setup>
import { ArrowUpRight, ArrowRight } from "lucide-vue-next";
import PhotoSlideshow from "../components/PhotoSlideshow.vue";
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
    <section class="home-cover" data-home-section="hero">
      <PhotoSlideshow
        :slides="pageImages.homeHero"
        label="Featured Indian interiors"
      >
        <p class="eyebrow">VSN INTERIORS / VIZIANAGARAM</p>
        <h1 tabindex="-1">A home.<br />Entirely <span>yours.</span></h1>
        <p>
          Designed around your life.<br />Made with care, down to the last
          detail.
        </p>
        <div class="cover-links">
          <a class="button button-white" href="#/gallery"
            >Discover the collection <ArrowUpRight :size="20" /></a
          ><a class="quiet-link" href="#/about"
            >Meet VSN <ArrowRight :size="18"
          /></a>
        </div>
      </PhotoSlideshow>
    </section>
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
    <section class="home-services" data-home-section="services">
      <div class="home-services-intro reveal">
        <p class="eyebrow">DESIGN / DETAIL / EXECUTION</p>
        <h2>One home.<br />Every detail<br /><span>considered.</span></h2>
        <a class="button button-outline" href="#/services"
          >Discover our services <ArrowUpRight :size="19"
        /></a>
      </div>
      <div class="service-rails">
        <a
          v-for="(service, i) in rails"
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
