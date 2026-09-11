<script setup>
import { ref, watch } from "vue";
import { Download, ArrowUpRight } from "lucide-vue-next";
import { business } from "../config";
import { serviceCatalog } from "../data/serviceCatalog";
const services = serviceCatalog;
const props = defineProps({
  space: { type: String, default: "Complete home" },
});
const formStatus = ref(""),
  sending = ref(false);
const form = ref({
  name: "",
  email: "",
  phone: "",
  city: "",
  space: props.space,
  message: "",
});
watch(
  () => props.space,
  (value) => (form.value.space = value),
);
function exportBrief() {
  const text = `VSN INTERIORS | DESIGN ENQUIRY\n\nName: ${form.value.name}\nEmail: ${form.value.email}\nPhone: ${form.value.phone}\nCity: ${form.value.city}\nSpace: ${form.value.space}\nBrief: ${form.value.message}\n`;
  const u = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = u;
  a.download = "Vsn-Interiors-Design-Brief.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}
async function submit() {
  sending.value = true;
  formStatus.value = "";
  try {
    if (business.inquiryEndpoint) {
      const response = await fetch(business.inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.value),
      });
      if (!response.ok)
        throw Error("We could not send your enquiry. Please try again.");
      formStatus.value = "Thank you. Your enquiry has been sent.";
    } else if (business.email) {
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent("Interior design enquiry from " + form.value.name)}&body=${encodeURIComponent(
        Object.entries(form.value)
          .map(([k, v]) => k + ": " + v)
          .join("\n"),
      )}`;
      formStatus.value =
        "Your email app will open with your enquiry. Please send it there.";
    } else {
      exportBrief();
      formStatus.value =
        "Your design brief has been downloaded. This preview does not send enquiries.";
    }
  } catch (e) {
    formStatus.value = e.message;
  } finally {
    sending.value = false;
  }
}
</script>
<template>
  <form @submit.prevent="submit">
    <div class="form-grid">
      <label
        >Your name<input
          v-model="form.name"
          required
          maxlength="100"
          autocomplete="name"
          placeholder="Full name" /></label
      ><label
        >Email address<input
          v-model="form.email"
          type="email"
          required
          maxlength="150"
          autocomplete="email"
          placeholder="you@example.com" /></label
      ><label
        >Phone number<input
          v-model="form.phone"
          type="tel"
          required
          minlength="8"
          maxlength="20"
          autocomplete="tel"
          placeholder="Your contact number" /></label
      ><label
        >City<input
          v-model="form.city"
          required
          maxlength="100"
          autocomplete="address-level2"
          placeholder="Where is your space?"
      /></label>
    </div>
    <label
      >Your project<select v-model="form.space">
        <option>Complete home</option>
        <option>Living</option>
        <option>Kitchen</option>
        <option>Bedroom</option>
        <option>Dining</option>
        <option>Office</option>
        <option>Pooja</option>
        <option>Bathroom</option>
        <option>Wardrobe</option>
        <option>Kids</option>
        <option>Balcony</option>
        <option>Commercial</option>
        <option>Details</option>
        <option>Exterior</option>
        <option v-for="service in services" :key="service.name">
          {{ service.name }}
        </option>
      </select></label
    ><label
      >What do you have in mind?<textarea
        v-model="form.message"
        rows="3"
        maxlength="2000"
        placeholder="Room size, preferred style, budget or anything you’d like us to know…"
      ></textarea>
    </label>
    <p
      class="preview-notice"
      v-if="!business.inquiryEndpoint && !business.email"
    >
      Preview mode: save your brief as a text file. No information is sent or
      stored by this website.
    </p>
    <p class="preview-notice" v-else>
      Your details will be used to respond to this design enquiry.
    </p>
    <button class="button submit-button" :disabled="sending">
      {{
        sending
          ? "Sending…"
          : !business.inquiryEndpoint && !business.email
            ? "Download my design brief"
            : "Send my enquiry"
      }}<Download
        v-if="!business.inquiryEndpoint && !business.email"
        :size="18"
      /><ArrowUpRight v-else :size="18" />
    </button>
    <p role="status" class="form-status">{{ formStatus }}</p>
  </form>
</template>
