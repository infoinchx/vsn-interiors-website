<script setup>
import { computed, nextTick, reactive, ref } from "vue";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  House,
  CookingPot,
  Armchair,
  Building2,
  MessageCircle,
  Mail,
  Pencil,
  CheckCircle2,
} from "lucide-vue-next";
import { business } from "../config";

const step = ref(0);
const heading = ref(null);
const sending = ref(false);
const status = ref("");
const submitError = ref("");
const channel = ref(business.whatsapp ? "whatsapp" : "email");
const errors = reactive({});
const stages = ["Your space", "Your details", "Review & connect"];
const spaces = [
  {
    name: "Complete home",
    detail: "A connected vision for every room",
    icon: House,
  },
  {
    name: "Modular kitchen",
    detail: "Designed around your daily rituals",
    icon: CookingPot,
  },
  {
    name: "A room or a detail",
    detail: "A bedroom, wardrobe, pooja or more",
    icon: Armchair,
  },
  {
    name: "Commercial space",
    detail: "An office, store or business interior",
    icon: Building2,
  },
];
const form = reactive({
  space: "Complete home",
  city: "",
  timeline: "Exploring options",
  budget: "Discuss with the designer",
  name: "",
  phone: "",
  email: "",
  message: "",
});
const brief = computed(() =>
  [
    "Hello VSN Interiors, I would like to discuss my project.",
    "",
    "Project: " + form.space,
    "Location: " + form.city.trim(),
    "Timing: " + form.timeline,
    "Budget: " + form.budget,
    "Name: " + form.name.trim(),
    "Phone: " + form.phone.trim(),
    ...(form.email.trim() ? ["Email: " + form.email.trim()] : []),
    ...(form.message.trim() ? ["", "My ideas:", form.message.trim()] : []),
  ].join("\n"),
);
const draftUrl = computed(() =>
  channel.value === "whatsapp"
    ? "https://wa.me/" +
      business.whatsapp +
      "?text=" +
      encodeURIComponent(brief.value)
    : "mailto:" +
      business.email +
      "?subject=" +
      encodeURIComponent("Interior design enquiry from " + form.name.trim()) +
      "&body=" +
      encodeURIComponent(brief.value),
);

function validate(target) {
  if (target === 0) {
    delete errors.city;
    if (form.city.trim().length < 2)
      errors.city = "Please enter your city or project location.";
    return !errors.city;
  }
  delete errors.name;
  delete errors.phone;
  delete errors.email;
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  const phone = form.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (
    !/^\+?[\d\s()-]+$/.test(phone) ||
    digits.length < 10 ||
    digits.length > 15
  )
    errors.phone = "Please enter a valid phone number with 10 to 15 digits.";
  if (
    form.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  )
    errors.email = "Please check your email address.";
  return !errors.name && !errors.phone && !errors.email;
}
async function focusStep() {
  await nextTick();
  heading.value?.focus({ preventScroll: true });
}
async function advance() {
  if (step.value >= 2) return;
  if (!validate(step.value)) {
    await nextTick();
    document.querySelector('.contact-planner [aria-invalid="true"]')?.focus();
    return;
  }
  step.value += 1;
  status.value = "";
  focusStep();
}
function goBack(target) {
  if (sending.value) return;
  step.value = target;
  status.value = "";
  submitError.value = "";
  focusStep();
}
function draftOpened() {
  status.value =
    channel.value === "whatsapp"
      ? "Review your draft in WhatsApp, then press Send to share it with our studio."
      : "Review your draft in your email app, then press Send to share it with our studio.";
}
async function sendEnquiry() {
  if (!validate(0)) return goBack(0);
  if (!validate(1)) return goBack(1);
  sending.value = true;
  submitError.value = "";
  try {
    const response = await fetch(business.inquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, value.trim()]),
        ),
      ),
    });
    if (!response.ok)
      throw new Error(
        "Your enquiry could not be sent. Please try again or call our studio.",
      );
    status.value = "Thank you. Your enquiry has been sent to our studio.";
  } catch (error) {
    submitError.value = error.message || "Please try again or call our studio.";
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <div class="contact-planner">
    <aside class="cp-sidebar">
      <p class="studio-kicker">YOUR PROJECT NOTEBOOK</p>
      <h3>A few details.<br />A clearer starting point.</h3>
      <ol class="cp-steps" aria-label="Enquiry steps">
        <li
          v-for="(name, index) in stages"
          :key="name"
          :class="{ current: step === index, complete: step > index }"
        >
          <button
            type="button"
            :disabled="index >= step || sending"
            :aria-current="step === index ? 'step' : undefined"
            @click="goBack(index)"
          >
            <span
              ><Check v-if="step > index" :size="17" /><template v-else
                >0{{ index + 1 }}</template
              ></span
            >{{ name }}
          </button>
        </li>
      </ol>
      <div class="cp-mini-room" aria-hidden="true">
        <div class="cp-mini-wall"></div>
        <div class="cp-mini-floor"></div>
        <div class="cp-mini-window"></div>
        <div class="cp-mini-sofa"></div>
        <div class="cp-mini-table"></div>
        <div class="cp-mini-plant"></div>
      </div>
      <p class="cp-sidebar-note">A clear brief makes space for better ideas.</p>
    </aside>
    <form class="cp-form" novalidate @submit.prevent="advance">
      <div class="cp-form-progress">
        <span>STEP 0{{ step + 1 }} OF 03</span>
        <div aria-hidden="true">
          <i :style="{ width: ((step + 1) / 3) * 100 + '%' }"></i>
        </div>
      </div>
      <div v-if="step === 0" class="cp-step-content">
        <h3 ref="heading" tabindex="-1">What are you planning?</h3>
        <p class="cp-intro">Start with the space you want to make your own.</p>
        <fieldset class="cp-space-field">
          <legend class="studio-sr-only">Choose your project type</legend>
          <div class="cp-space-options">
            <label
              v-for="space in spaces"
              :key="space.name"
              :class="{ selected: form.space === space.name }"
              ><input
                v-model="form.space"
                type="radio"
                name="project-space"
                :value="space.name" /><component
                :is="space.icon"
                :size="25"
                :stroke-width="1.5" /><strong>{{ space.name }}</strong
              ><small>{{ space.detail }}</small
              ><Check
                v-if="form.space === space.name"
                class="cp-space-check"
                :size="16"
            /></label>
          </div>
        </fieldset>
        <label for="project-city" class="cp-field"
          >Project location <span>Required</span
          ><input
            id="project-city"
            v-model="form.city"
            autocomplete="address-level2"
            placeholder="City or locality"
            maxlength="100"
            required
            :aria-invalid="!!errors.city"
            :aria-describedby="errors.city ? 'error-city' : undefined"
            @input="delete errors.city"
          /><small v-if="errors.city" id="error-city" class="cp-error">{{
            errors.city
          }}</small></label
        >
        <div class="cp-field-pair">
          <label for="project-timeline" class="cp-field"
            >When would you like to start?<select
              id="project-timeline"
              v-model="form.timeline"
            >
              <option>Exploring options</option>
              <option>As soon as possible</option>
              <option>In 1 to 3 months</option>
              <option>In 3 to 6 months</option>
              <option>Later this year</option>
            </select></label
          ><label for="project-budget" class="cp-field"
            >Budget in mind?<select id="project-budget" v-model="form.budget">
              <option>Discuss with the designer</option>
              <option>Below ₹5 lakh</option>
              <option>₹5 to ₹10 lakh</option>
              <option>₹10 to ₹20 lakh</option>
              <option>Above ₹20 lakh</option>
            </select></label
          >
        </div>
        <p class="cp-field-help">
          A budget helps us understand your plans. These ranges are not price
          quotations.
        </p>
      </div>
      <div v-else-if="step === 1" class="cp-step-content">
        <h3 ref="heading" tabindex="-1">Who are we designing for?</h3>
        <p class="cp-intro">
          Tell us a little about yourself and what matters to you.
        </p>
        <div class="cp-field-pair">
          <label for="project-name" class="cp-field"
            >Your name <span>Required</span
            ><input
              id="project-name"
              v-model="form.name"
              autocomplete="name"
              placeholder="Full name"
              maxlength="100"
              required
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'error-name' : undefined"
              @input="delete errors.name"
            /><small v-if="errors.name" id="error-name" class="cp-error">{{
              errors.name
            }}</small></label
          ><label for="project-phone" class="cp-field"
            >Phone number <span>Required</span
            ><input
              id="project-phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              inputmode="tel"
              placeholder="Your contact number"
              maxlength="22"
              required
              :aria-invalid="!!errors.phone"
              :aria-describedby="errors.phone ? 'error-phone' : undefined"
              @input="delete errors.phone"
            /><small v-if="errors.phone" id="error-phone" class="cp-error">{{
              errors.phone
            }}</small></label
          >
        </div>
        <label for="project-email" class="cp-field"
          >Email address <span>Optional</span
          ><input
            id="project-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            maxlength="150"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'error-email' : undefined"
            @input="delete errors.email"
          /><small v-if="errors.email" id="error-email" class="cp-error">{{
            errors.email
          }}</small></label
        >
        <label for="project-message" class="cp-field"
          >What would make this space yours? <span>Optional</span
          ><textarea
            id="project-message"
            v-model="form.message"
            rows="5"
            maxlength="1500"
            placeholder="A colour you love, extra storage, room for the family, or a completely fresh start..."
          ></textarea>
        </label>
        <p class="cp-field-help">
          You can share floor plans and photographs when we connect.
        </p>
      </div>
      <div v-else class="cp-step-content">
        <h3 ref="heading" tabindex="-1">Your ideas, brought together.</h3>
        <p class="cp-intro">
          Check your brief, then choose how you would like to connect.
        </p>
        <div class="cp-review">
          <div class="cp-review-title">
            <House :size="23" /><strong>{{ form.space }}</strong
            ><button
              type="button"
              aria-label="Edit project details"
              @click="goBack(0)"
            >
              <Pencil :size="16" />
            </button>
          </div>
          <dl>
            <div>
              <dt>LOCATION</dt>
              <dd>{{ form.city }}</dd>
            </div>
            <div>
              <dt>WHEN</dt>
              <dd>{{ form.timeline }}</dd>
            </div>
            <div>
              <dt>BUDGET</dt>
              <dd>{{ form.budget }}</dd>
            </div>
          </dl>
          <div class="cp-review-person">
            <span
              ><strong>{{ form.name }}</strong
              ><small
                >{{ form.phone
                }}<template v-if="form.email">
                  · {{ form.email }}</template
                ></small
              ></span
            ><button
              type="button"
              aria-label="Edit contact details"
              @click="goBack(1)"
            >
              <Pencil :size="16" />
            </button>
          </div>
          <p v-if="form.message" class="cp-review-message">
            {{ form.message }}
          </p>
        </div>
        <fieldset v-if="!business.inquiryEndpoint" class="cp-channel">
          <legend>Where shall we open your brief?</legend>
          <label
            v-if="business.whatsapp"
            :class="{ selected: channel === 'whatsapp' }"
            ><input
              v-model="channel"
              type="radio"
              name="project-channel"
              value="whatsapp"
            /><MessageCircle :size="19" />WhatsApp</label
          ><label
            v-if="business.email"
            :class="{ selected: channel === 'email' }"
            ><input
              v-model="channel"
              type="radio"
              name="project-channel"
              value="email"
            /><Mail :size="19" />Email</label
          >
        </fieldset>
        <p v-if="!business.inquiryEndpoint" class="cp-field-help">
          Your chosen app opens with your brief ready. You decide when to press
          Send.
        </p>
      </div>
      <div class="cp-actions">
        <button
          v-if="step > 0"
          type="button"
          class="cp-back"
          :disabled="sending"
          @click="goBack(step - 1)"
        >
          <ArrowLeft :size="17" />Back</button
        ><span v-else class="cp-action-note">MADE AROUND YOU</span
        ><button v-if="step < 2" class="sc-button cp-next" type="submit">
          {{ step === 0 ? "Your details" : "Review my brief"
          }}<ArrowRight :size="18" /></button
        ><button
          v-else-if="business.inquiryEndpoint"
          class="sc-button cp-next"
          type="button"
          :disabled="sending"
          @click="sendEnquiry"
        >
          {{ sending ? "Sending..." : "Send enquiry"
          }}<ArrowUpRight :size="18" /></button
        ><a
          v-else
          class="sc-button cp-next"
          :href="draftUrl"
          :target="channel === 'whatsapp' ? '_blank' : undefined"
          rel="noopener noreferrer"
          @click="draftOpened"
          >{{
            channel === "whatsapp" ? "Open WhatsApp draft" : "Open email draft"
          }}<ArrowUpRight :size="18"
        /></a>
      </div>
      <p v-if="status" role="status" class="cp-status">
        <CheckCircle2 :size="18" />{{ status }}
      </p>
      <p v-if="submitError" role="alert" class="cp-error cp-submit-error">
        {{ submitError }}
      </p>
    </form>
  </div>
</template>
