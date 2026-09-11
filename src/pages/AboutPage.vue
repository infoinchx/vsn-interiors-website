<script setup>
import { ArrowUpRight, Plus } from "lucide-vue-next";
defineEmits(["consult"]);
</script>
<template>
  <div class="about-page">
    <section class="about-cover section">
      <p class="eyebrow copper">THE STUDIO / VSN INTERIORS</p>
      <h1 tabindex="-1">
        Good spaces start<br />with <span>real connection.</span>
      </h1>
      <div class="about-cover-bottom">
        <p>Thoughtful interiors, shaped around the people who live in them.</p>
        <span>DESIGN WITH INTENTION.<br />DETAIL WITH CARE.</span>
      </div>
      <div class="about-collage">
        <figure>
          <img
            :src="'images/generated/living-courtyard.webp'"
            alt="Sunlit courtyard living room concept"
            width="1536"
            height="1024"
          />
          <figcaption>THE WAY WE LIVE.</figcaption>
        </figure>
        <figure>
          <img
            :src="'images/edition3/service-panels.webp'"
            alt="Natural wall materials and careful interior detailing"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <figcaption>THE DETAILS WE NOTICE.</figcaption>
        </figure>
        <span class="collage-note">A personal<br />point of view.</span>
      </div>
    </section>
    <section class="section founder-section" id="founder">
      <div class="founder-portrait reveal">
        <img
          :src="'images/edition3/founder-ganesh.webp'"
          alt="AI-generated portrait illustrating the fictional founder Ganesh"
          width="1024"
          height="1536"
          loading="lazy"
        /><span>GANESH / DEMO FOUNDER PROFILE</span>
      </div>
      <div class="founder-story reveal">
        <p class="eyebrow copper">MEET THE FOUNDER</p>
        <h2>Ganesh.</h2>
        <p class="founder-role">
          Founder & Creative Lead <span>Demo profile</span>
        </p>
        <blockquote>
          “A beautiful home should feel like the people who live in it.”
        </blockquote>
        <p>
          Ganesh’s sample founder story centres on a simple idea: thoughtful
          design begins with listening. The way a family gathers, works, cooks
          and unwinds gives every home its own starting point.
        </p>
        <p>
          In this demonstration profile, his role brings together the creative
          direction, material choices and attention to detail behind VSN
          Interiors.
        </p>
        <div class="founder-signoff">
          <span>DESIGN THAT FEELS PERSONAL.</span
          ><Plus :size="25" :stroke-width="1" />
        </div>
        <p class="demo-note">
          Fictional biography, illustrative quote and AI-generated portrait,
          included as requested for the website demo. Replace with verified
          founder details before launch.
        </p>
      </div>
    </section>
    <section class="about-manifesto">
      <p class="eyebrow">OUR POINT OF VIEW</p>
      <h2>
        Not just a room<br />you look at.<br /><span>A space you live in.</span>
      </h2>
      <div>
        <p>
          We bring function and feeling into the same conversation. Storage
          belongs beside style. Lighting belongs beside colour. The details work
          best when they work together.
        </p>
        <a class="text-link" href="#/services"
          >How we approach your space <ArrowUpRight :size="20"
        /></a>
      </div>
    </section>
    <section class="section principles">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow copper">THE THINGS WE COME BACK TO</p>
          <h2>Our design<br /><span>principles.</span></h2>
        </div>
      </div>
      <article
        v-for="(p, i) in [
          {
            title: 'Personal before anything else.',
            text: 'Your routines, tastes and priorities guide the brief. A design feels right when it makes sense for you.',
          },
          {
            title: 'Practical can be beautiful.',
            text: 'Useful storage, clear circulation and comfortable proportions form the foundation of a well-designed room.',
          },
          {
            title: 'Details make the difference.',
            text: 'Colour, materials and lighting should tell a coherent story, from the largest surface to the smallest finish.',
          },
          {
            title: 'Clarity creates confidence.',
            text: 'A shared understanding of the design, scope and specifications keeps the next steps clear.',
          },
        ]"
        :key="p.title"
        class="principle-row reveal"
      >
        <span>0{{ i + 1 }}</span>
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
      </article>
    </section>
    <section class="about-invite">
      <img
        :src="'images/generated/office-walnut.webp'"
        alt="Warm design studio inspiration"
        loading="lazy"
        width="1536"
        height="1024"
      />
      <div>
        <p class="eyebrow">YOUR STORY COULD BE NEXT</p>
        <h2>Let’s get<br />to know your space.</h2>
        <a class="button button-white" href="#/contact"
          >Start a conversation <ArrowUpRight :size="19"
        /></a>
      </div>
    </section>
  </div>
</template>
