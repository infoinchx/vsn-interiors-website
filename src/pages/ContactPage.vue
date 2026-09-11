<script setup>
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  MessageCircle,
  Plus,
} from "lucide-vue-next";
import InquiryForm from "../components/InquiryForm.vue";
import { business } from "../config";
</script>
<template>
  <div class="contact-page">
    <section class="contact-cover">
      <div class="contact-cover-label">
        <p class="eyebrow">CONTACT VSN INTERIORS</p>
        <span>AN IDEA IS A GOOD PLACE TO START.</span>
      </div>
      <h1 tabindex="-1">Hello<span>.</span></h1>
      <div class="contact-cover-bottom">
        <h2>Let’s talk about<br />your next space.</h2>
        <p>
          A room you’ve been meaning to rethink.<br />A home you’re ready to
          make your own.<br />We’d love to hear what you have in mind.
        </p>
      </div>
    </section>
    <section class="section contact-body" id="enquiry">
      <div class="contact-form-heading">
        <p class="eyebrow copper">YOUR DESIGN CONVERSATION STARTS HERE</p>
        <h2>Tell us a little<br /><span>about your space.</span></h2>
      </div>
      <div class="contact-layout">
        <aside class="contact-aside">
          <img
            :src="'images/generated/office-creative.webp'"
            alt="Comfortable studio corner for a design conversation"
            width="1024"
            height="1536"
            loading="lazy"
          />
          <div>
            <p class="eyebrow copper">BEFORE WE TALK</p>
            <h3>A few things<br />to think about.</h3>
            <ul>
              <li>The rooms you want to transform.</li>
              <li>The feeling you want to create.</li>
              <li>Your priorities and a budget range.</li>
              <li>A floor plan or a few room photos.</li>
            </ul>
          </div>
        </aside>
        <div class="contact-form-panel"><InquiryForm /></div>
      </div>
      <div
        class="contact-methods"
        v-if="
          business.email ||
          business.phone ||
          business.whatsapp ||
          business.address
        "
      >
        <a v-if="business.email" :href="'mailto:' + business.email"
          ><Mail :size="24" />
          <div>
            <small>WRITE TO US</small><span>{{ business.email }}</span>
          </div>
          <ArrowUpRight :size="20" /></a
        ><a v-if="business.phone" :href="'tel:' + business.phone"
          ><Phone :size="24" />
          <div>
            <small>GIVE US A CALL</small><span>{{ business.phone }}</span>
          </div>
          <ArrowUpRight :size="20" /></a
        ><a
          v-if="business.whatsapp"
          :href="'https://wa.me/' + business.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          ><MessageCircle :size="24" />
          <div><small>LET’S CHAT</small><span>WhatsApp us</span></div>
          <ArrowUpRight :size="20"
        /></a>
        <div v-if="business.address">
          <MapPin :size="24" />
          <div>
            <small>VISIT THE STUDIO</small><span>{{ business.address }}</span>
          </div>
        </div>
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
            Yes. Your enquiry can be for a single room, a specific service or a
            complete home. The scope is discussed during the design
            conversation.
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
          <summary>
            What happens after I share my brief?<Plus :size="20" />
          </summary>
          <p>
            In a live enquiry, your brief is the starting point for discussing
            the space, priorities and next steps. This demonstration saves a
            downloadable brief until the business contact details or enquiry
            service are connected.
          </p>
        </details>
      </div>
    </section>
    <div class="contact-signoff">
      <span>WE’RE LOOKING FORWARD TO YOUR STORY.</span
      ><a href="#/gallery"
        >Need a little inspiration first? <ArrowUpRight :size="19"
      /></a>
    </div>
  </div>
</template>
