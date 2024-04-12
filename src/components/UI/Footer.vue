<script setup>
const navLinks = [
  { url: "https://twitter.com/XxElInmortalXx1", text: "Twitter" },
  { url: "https://www.linkedin.com/in/andres-eduardo-rosas-alpiri-b6635522a/", text: "LinkedIn" },
  { url: "https://www.youtube.com/channel/UCm4_iGzVSvQ8zgPBHJm9DKw", text: "Youtube" },
];
</script>

<template>
  <footer class="mt-4 py-8">
    <nav class="flex justify-center gap-4">
      <a v-for="link in navLinks" class="text-neutral-500 hover:text-neutral-950" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>
    </nav>
  </footer>
</template>
