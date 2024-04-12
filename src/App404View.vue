<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <main class="container-small">
    <section>
      <h1
        class="py-8 font-bold uppercase text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        404
      </h1>
      <p class="text-center text-xl font-medium">Página no encontrada</p>
      <RouterLink
        to="/"
        class="bg-blue-500 text-center block hover:bg-blue-600 text-neutral-50 font-medium rounded-md px-2 py-1 my-4 w-full"
        >Volver al inicio</RouterLink
      >
    </section>
  </main>
</template>
