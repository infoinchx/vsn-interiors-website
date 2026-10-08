<script setup>
import { ref, reactive, computed, watch } from "vue";
import { ArrowUpRight, MessageCircle, Mail, CheckCircle2 } from "lucide-vue-next";
import { business } from "../config";
const form = reactive({ name: "", phone: "", city: "", project: "Complete home interiors", budget: "Let’s discuss", message: "", channel: "whatsapp" });
const errors = reactive({});
const readyUrl = ref("");
const readyText = ref("");
const formRoot = ref(null);
const pending = ref(false);
const sent = ref(false);
const failure = ref("");
const actionText = computed(() => business.inquiryEndpoint ? "Send enquiry" : form.channel === "whatsapp" ? "Continue on WhatsApp" : "Continue by email");
watch(form, () => { readyUrl.value = ""; sent.value = false; failure.value = ""; });
function validate() {
  Object.keys(errors).forEach((key) => delete errors[key]);
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = form.phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(form.phone) || digits.length < 10 || digits.length > 15) errors.phone = "Enter a valid phone number with 10–15 digits.";
  if (form.city.trim().length < 2) errors.city = "Please enter your project location.";
  return Object.keys(errors).length === 0;
}
async function submit() {
  readyUrl.value = ""; failure.value = ""; sent.value = false;
  if (!validate()) {
    requestAnimationFrame(() => formRoot.value?.querySelector('[aria-invalid="true"]')?.focus());
    return;
  }
  const brief = ["Hello VSN Interiors, I would like to discuss my project.", "", "Name: " + form.name.trim(), "Phone: " + form.phone.trim(), "Location: " + form.city.trim(), "Project: " + form.project, "Budget: " + form.budget, "", form.message.trim()].join("\n");
  if (business.inquiryEndpoint) {
    pending.value = true;
    try {
      const response = await fetch(business.inquiryEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, name: form.name.trim(), phone: form.phone.trim(), city: form.city.trim(), message: form.message.trim(), source: "contact-page" }), signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error("Unable to send");
      sent.value = true;
    } catch { failure.value = "Your enquiry could not be sent. Please call or WhatsApp the studio directly."; }
    finally { pending.value = false; }
    return;
  }
  readyUrl.value = form.channel === "whatsapp" ? "https://wa.me/" + business.whatsapp + "?text=" + encodeURIComponent(brief) : "mailto:" + business.email + "?subject=" + encodeURIComponent("Interior enquiry · " + form.name.trim()) + "&body=" + encodeURIComponent(brief);
  readyText.value = form.channel === "whatsapp" ? "Your brief is ready. Press Send in WhatsApp to share it with us." : "Your brief is ready. Press Send in your email app to share it with us.";
  if (form.channel === "whatsapp") window.open(readyUrl.value, "_blank", "noopener,noreferrer");
  else window.location.href = readyUrl.value;
}
</script>
<template>
  <form ref="formRoot" class="vsn-enquiry-form" @submit.prevent="submit" novalidate>
    <p class="vsn-kicker">TELL US ABOUT YOUR SPACE</p><h2>Make room for<br />something beautiful.</h2><p class="vsn-form-intro">A few details are all we need to begin.</p>
    <div class="vsn-form-grid">
      <label for="vsn-name">Your name <span>*</span><input id="vsn-name" v-model="form.name" name="name" autocomplete="name" maxlength="90" required placeholder="Full name" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'vsn-name-error' : undefined" /><small v-if="errors.name" id="vsn-name-error" class="vsn-field-error">{{ errors.name }}</small></label>
      <label for="vsn-phone">Phone number <span>*</span><input id="vsn-phone" v-model="form.phone" name="phone" type="tel" autocomplete="tel" maxlength="25" required placeholder="Your mobile number" :aria-invalid="!!errors.phone" :aria-describedby="errors.phone ? 'vsn-phone-error' : undefined" /><small v-if="errors.phone" id="vsn-phone-error" class="vsn-field-error">{{ errors.phone }}</small></label>
      <label for="vsn-city">Project location <span>*</span><input id="vsn-city" v-model="form.city" name="city" autocomplete="address-level2" maxlength="100" required placeholder="City or area" :aria-invalid="!!errors.city" :aria-describedby="errors.city ? 'vsn-city-error' : undefined" /><small v-if="errors.city" id="vsn-city-error" class="vsn-field-error">{{ errors.city }}</small></label>
      <label for="vsn-project">What are you planning?<select id="vsn-project" v-model="form.project" name="project"><option>Complete home interiors</option><option>Modular kitchen</option><option>Bedroom &amp; wardrobes</option><option>Living &amp; dining</option><option>Pooja room</option><option>Renovation</option><option>Office or commercial space</option><option>3D design &amp; consultation</option><option>Something else</option></select></label>
      <label for="vsn-budget" class="vsn-form-wide">Budget in mind<select id="vsn-budget" v-model="form.budget" name="budget"><option>Let’s discuss</option><option>Below ₹5 lakh</option><option>₹5–10 lakh</option><option>₹10–20 lakh</option><option>₹20–35 lakh</option><option>Above ₹35 lakh</option></select></label>
      <label for="vsn-message" class="vsn-form-wide">A little about your ideas <span class="vsn-optional">optional</span><textarea id="vsn-message" v-model="form.message" name="message" rows="3" maxlength="1500" placeholder="Rooms, styles, timelines… anything you would like us to know." /></label>
    </div>
    <fieldset v-if="!business.inquiryEndpoint" class="vsn-channel"><legend>Continue the conversation on</legend><label><input v-model="form.channel" type="radio" value="whatsapp" name="channel" /><MessageCircle :size="17" />WhatsApp</label><label><input v-model="form.channel" type="radio" value="email" name="channel" /><Mail :size="17" />Email</label></fieldset>
    <button class="vsn-submit" type="submit" :disabled="pending">{{ pending ? "Sending…" : actionText }}<ArrowUpRight :size="19" /></button>
    <p class="vsn-form-note">{{ business.inquiryEndpoint ? "Your details will be shared with the VSN Interiors team." : "Review your message in your chosen app, then press Send." }}</p>
    <div v-if="readyUrl" class="vsn-form-feedback" role="status"><CheckCircle2 :size="20" /><div><p>{{ readyText }}</p><a :href="readyUrl" :target="form.channel === 'whatsapp' ? '_blank' : undefined" rel="noopener noreferrer">Open {{ form.channel === "whatsapp" ? "WhatsApp" : "email" }} again <ArrowUpRight :size="14" /></a></div></div>
    <p v-if="sent" class="vsn-form-feedback" role="status">Your enquiry has been sent. Thank you for getting in touch.</p><p v-if="failure" class="vsn-field-error" role="alert">{{ failure }}</p>
  </form>
</template>
