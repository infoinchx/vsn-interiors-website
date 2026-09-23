<script setup>
import { whatsappUrl } from "../config";
</script>
<template>
  <a
    class="whatsapp-float"
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with VSN Interiors on WhatsApp"
    ><svg viewBox="0 0 32 32" width="27" height="27" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 .9A14.6 14.6 0 0 0 3.5 23L1.6 30.4l7.6-2A14.6 14.6 0 1 0 16 .9Zm0 26.6c-2.2 0-4.3-.6-6.2-1.7l-.4-.2-4.5 1.2 1.2-4.4-.3-.5A12.1 12.1 0 1 1 16 27.5Zm6.6-9c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.3.1-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.2-1.3 3s1.3 3.5 1.5 3.8c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.7.9.3 1.7.2 2.4.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z"
      /></svg
    ><span>WhatsApp us</span></a
  >
</template>
