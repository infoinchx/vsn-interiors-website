<script setup>
import { ArrowUpRight, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Plus, Navigation } from "lucide-vue-next";
import ImageHero from "../components/ImageHero.vue";
import StudioEnquiry from "../components/StudioEnquiry.vue";
import { clientVisuals } from "../data/clientVisuals";
import { business, whatsappUrl } from "../config";
const questions = [
  { question: "Can we begin with one room?", answer: "Absolutely. A modular kitchen, a bedroom, a wardrobe or a pooja unit can be a project of its own. Tell us which space needs attention and we can discuss the scope." },
  { question: "What should I bring to our first conversation?", answer: "A floor plan or a few room photographs are useful. Bring your ideas, priorities and a rough budget if you have one. You do not need a finished design brief." },
  { question: "Can I see the design before execution?", answer: "We can discuss layouts, materials and 3D visualisation as part of your project scope, so you can understand the proposed design before execution." },
  { question: "Do you work outside Vizianagaram?", answer: "Our service areas include Andhra Pradesh, Telangana and Odisha. Share your location and the work you need so we can discuss feasibility and the next steps." },
];
</script>
<template>
  <div class="vsn-contact">
    <ImageHero :slides="clientVisuals.contact" page="contact" eyebrow="LET’S CREATE SOMETHING PERSONAL"
      title="Your next chapter starts here." subtitle="Good spaces begin with a conversation."
      description="A new home, a favourite corner or a place for your business. Share your ideas and we’ll explore the possibilities together."
      link="#/contact#enquiry" action="Start your project" note="Bring your ideas. We’ll bring ours."
    />
    <section class="vsn-contact-direct vsn-container" aria-label="Contact the studio">
      <a :href="'tel:' + business.phone"><span class="vsn-contact-icon"><Phone :size="21" /></span><div><span>CALL THE STUDIO</span><h3>{{ business.phoneDisplay }}</h3><p>A little conversation. A fresh start.</p></div><ArrowUpRight :size="20" /></a>
      <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer"><span class="vsn-contact-icon"><MessageCircle :size="21" /></span><div><span>MESSAGE US</span><h3>Say hello on WhatsApp</h3><p>Share a plan, a photo or an idea.</p></div><ArrowUpRight :size="20" /></a>
      <a :href="'mailto:' + business.email"><span class="vsn-contact-icon"><Mail :size="21" /></span><div><span>WRITE TO US</span><h3>{{ business.email }}</h3><p>Your ideas are always welcome.</p></div><ArrowUpRight :size="20" /></a>
    </section>
    <section id="enquiry" class="vsn-contact-enquiry vsn-container">
      <div class="vsn-visit-column">
        <figure class="vsn-consult-photo"><img :src="'images/' + clientVisuals.contactMaterials.image" :alt="clientVisuals.contactMaterials.alt" width="1536" height="1024" loading="lazy" decoding="async" /><figcaption>A place to imagine what comes next.<span>Interior concept</span></figcaption></figure>
        <div class="vsn-visit-card" id="visit"><p class="vsn-kicker"><MapPin :size="14" /> FIND US IN VIZIANAGARAM</p><h2>Come with ideas.<br />Leave with a direction.</h2><address><span v-for="line in business.addressLines" :key="line">{{ line }}</span></address><p>Call ahead to arrange a studio visit.</p><a :href="business.maps" target="_blank" rel="noopener noreferrer" class="vsn-pill-link">Get directions <Navigation :size="17" /></a><div class="vsn-service-areas"><span>WORKING ACROSS</span><p>{{ business.areas.join(" · ") }}</p></div></div>
      </div>
      <StudioEnquiry />
    </section>
    <section class="vsn-contact-faq vsn-container"><div><p class="vsn-kicker">BEFORE WE BEGIN</p><h2>A few helpful<br />starting points.</h2><p>Have something else in mind?<br />We’re a message away.</p><a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="vsn-text-link">Ask us on WhatsApp <ArrowUpRight :size="17" /></a></div><div class="vsn-faq-list"><details v-for="(item, index) in questions" :key="item.question"><summary><span>0{{ index + 1 }}</span><h3>{{ item.question }}</h3><Plus :size="19" /></summary><p>{{ item.answer }}</p></details></div></section>
    <section class="vsn-contact-social"><div class="vsn-container"><div><p class="vsn-kicker">A LITTLE EVERYDAY INSPIRATION</p><h2>Stay close to the details.</h2></div><div><a :href="business.instagram" target="_blank" rel="noopener noreferrer"><Instagram :size="21" />Instagram<ArrowUpRight :size="18" /></a><a :href="business.facebook" target="_blank" rel="noopener noreferrer"><Facebook :size="21" />Facebook<ArrowUpRight :size="18" /></a></div></div></section>
  </div>
</template>
