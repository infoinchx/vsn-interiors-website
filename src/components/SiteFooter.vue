<script setup>
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowUpRight,
  MapPin,
} from "lucide-vue-next";
import BrandLogo from "./BrandLogo.vue";
import { business, whatsappUrl } from "../config";
</script>
<template>
  <footer class="site-footer">
    <div class="footer-topline">
      <p>
        Thoughtful spaces.<br /><span
          >From the first idea to the final detail.</span
        >
      </p>
      <a href="#/contact">Let’s talk interiors <ArrowUpRight :size="26" /></a>
    </div>
    <div class="footer-columns">
      <div class="footer-brand-column">
        <a class="brand" href="#/" aria-label="VSN Interiors home"
          ><BrandLogo
        /></a>
        <p>
          Interior design, 3D visualisation and complete execution, with our
          studio in Vizianagaram.
        </p>
        <div class="footer-socials">
          <a
            :href="business.instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VSN Interiors on Instagram"
            ><Instagram :size="21" /></a
          ><a
            :href="business.facebook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VSN Interiors on Facebook"
            ><Facebook :size="21" /></a
          ><a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with VSN Interiors on WhatsApp"
            ><span>WA</span></a
          >
        </div>
      </div>
      <div>
        <h2>Explore</h2>
        <nav aria-label="Footer navigation">
          <a href="#/">Home</a><a href="#/about">About us</a
          ><a href="#/services">Services</a><a href="#/gallery">Gallery</a
          ><a href="#/contact">Contact us</a>
        </nav>
      </div>
      <div class="footer-contact">
        <h2>Let’s connect</h2>
        <a :href="'tel:' + business.phone"
          ><Phone :size="17" />{{ business.phoneDisplay }}</a
        ><a :href="'mailto:' + business.email"
          ><Mail :size="17" /><span>{{ business.email }}</span></a
        ><a :href="business.instagram" target="_blank" rel="noopener noreferrer"
          >@v_s_n_interiors <ArrowUpRight :size="16"
        /></a>
        <p class="footer-services-list">
          Interior designing · 3D designing<br />Modular kitchens · Facade
          design<br />Planning & execution
        </p>
      </div>
      <div class="footer-address">
        <h2>Visit our studio</h2>
        <address>
          <span v-for="line in business.addressLines" :key="line">{{
            line
          }}</span>
        </address>
        <a :href="business.maps" target="_blank" rel="noopener noreferrer"
          ><MapPin :size="17" />Get directions <ArrowUpRight :size="16"
        /></a>
        <p>Andhra Pradesh · Telangana · Odisha</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span
        >© {{ new Date().getFullYear() }} VSN Interiors. All rights
        reserved.</span
      ><span>DESIGN WITH CARE. LIVE WITH COMFORT.</span>
    </div>
  </footer>
</template>
