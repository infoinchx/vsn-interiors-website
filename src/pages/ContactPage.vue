<script setup>
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Plus,
  Navigation,
  ArrowRight,
} from "lucide-vue-next";
import ContactPlanner from "../components/ContactPlanner.vue";
import { business, whatsappUrl } from "../config";
const questions = [
  {
    question: "Can we begin with one room?",
    answer:
      "Absolutely. A modular kitchen, a bedroom, a wardrobe or a pooja unit can be a project of its own. Tell us which space needs attention and we can discuss the scope.",
  },
  {
    question: "What should I bring to our first conversation?",
    answer:
      "A floor plan or a few room photographs are useful. Bring any ideas you like, your priorities and a rough budget if you have one. You do not need a finished design brief.",
  },
  {
    question: "Can I see the design before execution?",
    answer:
      "We can discuss layouts, materials and 3D visualisation as part of your project scope, so you can understand the proposed design before execution.",
  },
  {
    question: "Do you work outside Vizianagaram?",
    answer:
      "Our service areas include Andhra Pradesh, Telangana and Odisha. Share your project location and the work you need so we can discuss feasibility and the next steps.",
  },
  {
    question: "How is my enquiry shared?",
    answer: business.inquiryEndpoint
      ? "Review your project brief, then choose Send enquiry to share it with our studio. The form confirms whether your enquiry was sent successfully."
      : "The form prepares your project brief. With WhatsApp or email selected, your chosen app opens and you press Send there. You can review everything before sharing it.",
  },
];
</script>

<template>
  <div class="studio-contact">
    <section class="sc-opening">
      <div class="studio-container">
        <div class="sc-topline">
          <span class="studio-kicker">CONTACT THE STUDIO</span
          ><span>GOOD SPACES BEGIN WITH PEOPLE</span>
        </div>
        <div class="sc-headline">
          <span class="sc-headline-orbit" aria-hidden="true"></span>
          <h1 tabindex="-1">Let’s create<br /><em>something personal.</em></h1>
          <a
            class="sc-round-link"
            href="#/contact#enquiry"
            aria-label="Start your project enquiry"
            ><ArrowDown :size="31" /><span>START YOUR<br />PROJECT</span></a
          >
        </div>
        <div class="sc-hero-bottom">
          <p>
            A new home, a favourite corner or a space for your business. Bring
            your ideas. We’ll work out the next step together.
          </p>
          <a href="#/contact#visit" class="studio-text-link"
            ><MapPin :size="16" />MEET US IN VIZIANAGARAM
            <ArrowUpRight :size="17"
          /></a>
        </div>
        <figure class="sc-panorama">
          <img
            :src="'images/studio/contact-salon.webp'"
            alt="Indian dining concept with a blue alcove, cane chairs and courtyard daylight"
            width="1660"
            height="948"
            fetchpriority="high"
          />
          <figcaption>
            ROOM FOR YOUR IDEAS <span>AI interior concept</span>
          </figcaption>
          <div class="sc-photo-label">
            <span>DESIGNED AROUND</span><strong>Your everyday.</strong>
          </div>
        </figure>
      </div>
    </section>

    <section
      class="sc-direct studio-container"
      aria-label="Contact VSN Interiors"
    >
      <a :href="'tel:' + business.phone" class="sc-direct-card"
        ><span class="sc-direct-icon"
          ><Phone :size="22" :stroke-width="1.5"
        /></span>
        <div>
          <span>CALL OUR STUDIO</span
          ><strong>{{ business.phoneDisplay }}</strong
          ><small>Let’s talk through your ideas.</small>
        </div>
        <ArrowUpRight :size="24"
      /></a>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="sc-direct-card"
        ><span class="sc-direct-icon"
          ><MessageCircle :size="22" :stroke-width="1.5"
        /></span>
        <div>
          <span>START ON WHATSAPP</span><strong>A message is enough.</strong
          ><small>Share your plans and inspiration.</small>
        </div>
        <ArrowUpRight :size="24"
      /></a>
      <a :href="'mailto:' + business.email" class="sc-direct-card"
        ><span class="sc-direct-icon"
          ><Mail :size="22" :stroke-width="1.5"
        /></span>
        <div>
          <span>WRITE TO US</span
          ><strong class="sc-email-address">{{ business.email }}</strong
          ><small>A little detail goes a long way.</small>
        </div>
        <ArrowUpRight :size="24"
      /></a>
    </section>

    <section id="enquiry" class="sc-enquiry studio-section studio-container">
      <div class="sc-section-heading reveal">
        <div>
          <p class="studio-kicker">LET’S GET TO KNOW YOUR SPACE</p>
          <h2>A little information.<br /><em>A world of possibilities.</em></h2>
        </div>
        <p>
          Take us through your plans. You can review your brief before sharing
          it with the studio.
        </p>
      </div>
      <ContactPlanner />
    </section>

    <section id="visit" class="sc-visit studio-section">
      <div class="studio-container sc-visit-layout">
        <div class="sc-visit-copy reveal">
          <p class="studio-kicker">SOME CONVERSATIONS ARE BETTER IN PERSON</p>
          <h2>Find us in<br /><em>Vizianagaram.</em></h2>
          <p>
            Bring your floor plan, a few ideas and your questions. Let’s sit
            down and explore what your space could become.
          </p>
          <div class="sc-areas">
            <span>WORKING ACROSS</span>
            <div>
              <span v-for="area in business.areas" :key="area">{{ area }}</span>
            </div>
          </div>
          <a :href="'tel:' + business.phone" class="studio-text-link"
            >Call to arrange a studio visit <ArrowUpRight :size="18"
          /></a>
        </div>
        <div class="sc-address-card reveal">
          <div class="sc-address-top">
            <span class="sc-address-symbol" aria-hidden="true"
              ><MapPin :size="29" /></span
            ><span>VSN INTERIORS<br />DESIGN STUDIO</span>
          </div>
          <div class="sc-address-drawing" aria-hidden="true">
            <div class="sc-drawing-building"><i></i><i></i><i></i><i></i></div>
            <div class="sc-drawing-tree"></div>
            <div class="sc-drawing-line"></div>
          </div>
          <h3>Come over.<br />Let’s make a plan.</h3>
          <address>
            <span v-for="line in business.addressLines" :key="line">{{
              line
            }}</span>
          </address>
          <p>Visits by arrangement. Please call before you come.</p>
          <a
            :href="business.maps"
            target="_blank"
            rel="noopener noreferrer"
            class="sc-button sc-map-link"
            >Open Google Maps <Navigation :size="18"
          /></a>
        </div>
      </div>
    </section>

    <section class="sc-faq studio-section studio-container">
      <div class="sc-faq-title reveal">
        <p class="studio-kicker">BEFORE WE BEGIN</p>
        <h2>A few things<br /><em>you might wonder.</em></h2>
        <p>Have another question? We’re a message away.</p>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="studio-text-link"
          >Ask us on WhatsApp <ArrowUpRight :size="18"
        /></a>
      </div>
      <div class="sc-faq-list">
        <details v-for="(item, index) in questions" :key="item.question">
          <summary>
            <span class="sc-faq-number">0{{ index + 1 }}</span
            ><span>{{ item.question }}</span
            ><Plus :size="20" />
          </summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>

    <section class="sc-social-band">
      <div class="studio-container">
        <div>
          <p class="studio-kicker">KEEP THE IDEAS COMING</p>
          <h2>A little inspiration,<br />between conversations.</h2>
        </div>
        <div class="sc-social-links">
          <a
            :href="business.instagram"
            target="_blank"
            rel="noopener noreferrer"
            ><Instagram :size="22" /><span>Instagram</span
            ><ArrowUpRight :size="20" /></a
          ><a
            :href="business.facebook"
            target="_blank"
            rel="noopener noreferrer"
            ><Facebook :size="22" /><span>Facebook</span
            ><ArrowUpRight :size="20"
          /></a>
        </div>
        <ArrowRight
          class="sc-social-arrow"
          :size="72"
          :stroke-width="0.8"
          aria-hidden="true"
        />
      </div>
    </section>
  </div>
</template>
