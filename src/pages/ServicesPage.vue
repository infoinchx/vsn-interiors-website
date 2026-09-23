<script setup>
import { ref, computed } from "vue";
import { ArrowUpRight, Plus, Check } from "lucide-vue-next";
import { serviceCatalog, serviceGroups } from "../data/serviceCatalog";
defineEmits(["consult"]);
const group = ref("All services");
const shown = computed(() =>
  serviceCatalog.filter(
    (s) => group.value === "All services" || s.group === group.value,
  ),
);
</script>
<template>
  <div class="services-page">
    <section class="services-cover section">
      <div class="services-cover-top">
        <p class="eyebrow copper">WHAT WE CAN CREATE TOGETHER</p>
        <span>DESIGN / INTERIORS / EXECUTION</span>
      </div>
      <h1 tabindex="-1">Every space.<br /><span>Every detail.</span></h1>
      <div class="services-cover-bottom">
        <p>
          From a single corner to a complete home. Explore the ways we can help
          bring your space together.
        </p>
        <a
          class="circle-link"
          href="#/services#catalogue"
          aria-label="Explore service catalogue"
          ><ArrowUpRight :size="35" :stroke-width="1"
        /></a>
      </div>
      <div class="services-panorama">
        <img
          :src="'images/indian/services-cover.webp'"
          alt="Contemporary Indian home with a thoughtfully detailed living and dining area"
          width="1536"
          height="1024"
        />
        <div>
          <span>01 / THE BIG PICTURE</span><span>02 / THE FINE DETAILS</span
          ><span>03 / THE FINISHED SPACE</span>
        </div>
      </div>
    </section>
    <section class="section service-catalogue" id="catalogue">
      <div class="catalogue-heading">
        <div>
          <p class="eyebrow copper">THE SERVICE DIRECTORY</p>
          <h2>What does your<br /><span>space need?</span></h2>
        </div>
        <p>
          Explore {{ serviceCatalog.length }} service areas.<br />Select a
          category, then open a service for details.
        </p>
      </div>
      <div
        class="filters service-filters"
        role="group"
        aria-label="Filter services"
      >
        <button
          v-for="g in serviceGroups"
          :key="g"
          @click="group = g"
          :class="{ active: group === g }"
          :aria-pressed="group === g"
        >
          {{ g }}
        </button>
      </div>
      <p class="results-count" aria-live="polite">
        {{ shown.length }} services
      </p>
      <div class="service-directory">
        <details
          v-for="service in shown"
          :key="service.id"
          class="service-entry"
        >
          <summary>
            <span class="service-id">{{
              String(service.id).padStart(2, "0")
            }}</span>
            <div>
              <small>{{ service.group }}</small>
              <h3>{{ service.name }}</h3>
            </div>
            <Plus :size="25" :stroke-width="1" />
          </summary>
          <div class="service-expanded">
            <img
              :src="'images/' + service.image"
              :alt="service.name + ' design concept'"
              loading="lazy"
              width="1536"
              height="1024"
            />
            <div>
              <p>{{ service.text }}</p>
              <ul>
                <li v-for="item in service.includes" :key="item">
                  <Check :size="17" />{{ item }}
                </li>
              </ul>
              <button class="button" @click="$emit('consult', service.name)">
                Discuss this service <ArrowUpRight :size="18" />
              </button>
            </div>
          </div>
        </details>
      </div>
    </section>
    <section class="service-delivery">
      <div>
        <p class="eyebrow">A CONNECTED APPROACH</p>
        <h2>
          From your first idea<br />to the <span>finishing details.</span>
        </h2>
      </div>
      <div class="delivery-steps">
        <article
          v-for="(s, i) in [
            {
              title: 'Understand',
              text: 'Your space, your priorities and the scope you need.',
            },
            {
              title: 'Define',
              text: 'A clear design direction, drawings and specifications.',
            },
            {
              title: 'Coordinate',
              text: 'Materials, fabrication and installation planned together.',
            },
            {
              title: 'Review',
              text: 'The details brought together for the final handover.',
            },
          ]"
          :key="s.title"
        >
          <span>0{{ i + 1 }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </article>
      </div>
    </section>
    <section class="service-footnote section">
      <p>
        Every project has its own requirements. The final scope, materials and
        execution responsibilities are agreed during your design consultation.
      </p>
      <a class="text-link" href="#/contact"
        >Let’s define your project <ArrowUpRight :size="20"
      /></a>
    </section>
  </div>
</template>
