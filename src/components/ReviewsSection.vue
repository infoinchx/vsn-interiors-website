<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ArrowUpRight, Star } from "lucide-vue-next";
import { reviews, reviewSource } from "../data/reviews";
const root = ref(null),
  track = ref(null),
  reduced = ref(false),
  inView = ref(false);
let timer, observer, media;
function advance() {
  const el = track.value;
  if (!el) return;
  const step = el.firstElementChild.getBoundingClientRect().width + 22;
  const end = el.scrollWidth - el.clientWidth;
  let left = el.scrollLeft + step;
  if (left > end + 5) left = 0;
  el.scrollTo({ left, behavior: reduced.value ? "instant" : "smooth" });
}
function preference(e) {
  reduced.value = e.matches;
}
onMounted(() => {
  media = matchMedia("(prefers-reduced-motion: reduce)");
  preference(media);
  media.addEventListener("change", preference);
  observer = new IntersectionObserver(
    ([e]) => (inView.value = e.isIntersecting),
    { threshold: 0.1 },
  );
  observer.observe(root.value);
  timer = setInterval(() => {
    if (inView.value && !document.hidden) advance();
  }, 5500);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  observer?.disconnect();
  media?.removeEventListener("change", preference);
});
</script>
<template>
  <section
    class="reviews-section section"
    ref="root"
    data-home-section="reviews"
    aria-label="Customer reviews"
  >
    <div class="reviews-heading">
      <div>
        <p class="eyebrow copper">CUSTOMER EXPERIENCES</p>
        <h2>Homes made personal.<br /><span>Stories shared.</span></h2>
      </div>
      <a
        :href="reviewSource.url"
        target="_blank"
        rel="noopener noreferrer"
        class="google-rating"
        ><span class="google-word">Google</span>
        <div>
          <strong>{{ reviewSource.rating }}</strong
          ><span
            ><span class="review-stars" aria-label="5 out of 5 stars"
              ><Star
                v-for="n in 5"
                :key="n"
                :size="17"
                fill="currentColor" /></span
            ><small>{{ reviewSource.count }} reviews</small></span
          >
        </div>
        <span>Read all reviews <ArrowUpRight :size="16" /></span
      ></a>
    </div>
    <div
      class="reviews-track"
      ref="track"
      tabindex="0"
      aria-label="Scroll through 15 Google review highlights"
      aria-live="off"
    >
      <article v-for="review in reviews" :key="review.id" class="review-card">
        <div class="review-card-top">
          <span
            class="review-stars"
            :aria-label="review.rating + ' out of 5 stars'"
            ><Star
              v-for="n in review.rating"
              :key="n"
              :size="15"
              fill="currentColor" /></span
          ><span class="google-mini">G</span>
        </div>
        <p>{{ review.summary }}</p>
        <div class="review-author">
          <span class="review-avatar" aria-hidden="true">{{
            review.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((n) => n[0])
              .join("")
          }}</span>
          <div>
            <strong>{{ review.name }}</strong
            ><small>Google reviewer</small>
          </div>
        </div>
        <a :href="review.source" target="_blank" rel="noopener noreferrer"
          >Read on Google <ArrowUpRight :size="15"
        /></a>
      </article>
    </div>
    <div class="reviews-bottom">
      <p>
        Selected review highlights, summarised for brevity.<br />Rating and
        review count checked {{ reviewSource.checked }}.
      </p>
    </div>
  </section>
</template>
