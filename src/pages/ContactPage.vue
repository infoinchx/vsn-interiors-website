<script setup>
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Plus,
  Instagram,
  Facebook,
} from "lucide-vue-next";
import InquiryForm from "../components/InquiryForm.vue";
import { business, whatsappUrl } from "../config";
import { pageImages } from "../data/imageLibrary";
</script>
<template>
  <div class="contact-page">
    <section class="contact-intro section">
      <div class="contact-intro-heading">
        <p class="eyebrow copper">LET’S TALK / VSN INTERIORS</p>
        <h1 tabindex="-1">Your ideas.<br /><span>Our full attention.</span></h1>
        <p>
          A room to rethink, a home to create or a business space to transform.
          Tell us what you have in mind.
        </p>
        <div class="contact-intro-actions">
          <a class="button" :href="'tel:' + business.phone"
            ><Phone :size="19" />Call our studio</a
          ><a
            class="text-link"
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            >Start on WhatsApp <ArrowUpRight :size="20"
          /></a>
        </div>
      </div>
      <a
        class="visit-card"
        :href="business.maps"
        target="_blank"
        rel="noopener noreferrer"
        ><div class="visit-pin"><MapPin :size="42" :stroke-width="1.2" /></div>
        <p class="eyebrow">MEET US IN PERSON</p>
        <h2>Vizianagaram.</h2>
        <address>
          <span v-for="line in business.addressLines" :key="line">{{
            line
          }}</span>
        </address>
        <span class="visit-directions"
          >Open Google Maps <ArrowUpRight :size="23" /></span
      ></a>
    </section>
    <section class="section contact-body" id="enquiry">
      <div class="contact-form-heading">
        <p class="eyebrow copper">A FEW DETAILS TO BEGIN WITH</p>
        <h2>Tell us about<br /><span>your space.</span></h2>
      </div>
      <div class="contact-layout">
        <aside class="contact-aside">
          <img
            :src="'images/' + pageImages.contact.image"
            :alt="pageImages.contact.title"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div>
            <p class="eyebrow copper">BRING YOUR IDEAS</p>
            <h3>We’ll explore<br />the possibilities.</h3>
            <ul>
              <li>Your floor plan or room photos.</li>
              <li>The rooms you want to transform.</li>
              <li>Your priorities and preferred style.</li>
              <li>A budget range and timing in mind.</li>
            </ul>
          </div>
        </aside>
        <div class="contact-form-panel"><InquiryForm /></div>
      </div>
      <div class="contact-methods">
        <a :href="'mailto:' + business.email"
          ><Mail :size="24" />
          <div>
            <small>WRITE TO US</small><span>{{ business.email }}</span>
          </div>
          <ArrowUpRight :size="20" /></a
        ><a :href="'tel:' + business.phone"
          ><Phone :size="24" />
          <div>
            <small>GIVE US A CALL</small
            ><span>{{ business.phoneDisplay }}</span>
          </div>
          <ArrowUpRight :size="20" /></a
        ><a :href="business.instagram" target="_blank" rel="noopener noreferrer"
          ><Instagram :size="24" />
          <div><small>FOLLOW OUR WORK</small><span>@v_s_n_interiors</span></div>
          <ArrowUpRight :size="20" /></a
        ><a :href="business.facebook" target="_blank" rel="noopener noreferrer"
          ><Facebook :size="24" />
          <div>
            <small>STAY CONNECTED</small><span>VSN Interiors on Facebook</span>
          </div>
          <ArrowUpRight :size="20"
        /></a>
      </div>
    </section>
    <section class="contact-questions section">
      <div>
        <p class="eyebrow copper">A FEW FIRST QUESTIONS</p>
        <h2>Good to know.</h2>
      </div>
      <div>
        <details>
          <summary>Can we start with just one room?<Plus :size="20" /></summary>
          <p>
            Yes. Share the room or service you need, and we can discuss a
            suitable scope for your space.
          </p>
        </details>
        <details>
          <summary>
            Do I need a final design idea already?<Plus :size="20" />
          </summary>
          <p>
            No. A few preferences, room photos or examples of what you like are
            enough to start exploring a direction.
          </p>
        </details>
        <details>
          <summary>How do I send my enquiry?<Plus :size="20" /></summary>
          <p>
            Fill in the brief and choose WhatsApp or email. Your chosen app
            opens with the details ready. Press Send there to share your enquiry
            with our studio.
          </p>
        </details>
        <details>
          <summary>Where can I meet the team?<Plus :size="20" /></summary>
          <p>
            Find us at PJR Residency, Ayya Koneru, Dasannapeta, beside Gayathri
            Hospital in Vizianagaram. Call ahead to arrange your visit.
          </p>
        </details>
      </div>
    </section>
  </div>
</template>
