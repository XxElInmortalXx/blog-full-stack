<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const navLinks = [
  { name: "blog", text: "blog" },
  { name: "about", text: "sobre mi" },
];
</script>

<template>
  <header class="container">
    <nav class="flex justify-between items-center py-4">
      <RouterLink to="/" class="font-medium text-xl">Andres Eduardo</RouterLink>
      <nav class="hidden md:flex md:justify-center md:items-center md:gap-4">
        <RouterLink
          v-for="link in navLinks"
          class="capitalize hover:underline"
          :to="{ name: link.name }"
          >{{ link.text }}</RouterLink
        >
        <RouterLink
          class="capitalize py-2 px-6 font-medium hover:underline bg-neutral-800 text-neutral-50 rounded-full"
          :to="{ name: userStore.authUser ? 'profile' : 'login' }"
          >{{ userStore.authUser ? "mi perfil" : "iniciar sesión" }}</RouterLink
        >
      </nav>
      <button class="md:hidden">
        <i class="ri-menu-fill"></i>
      </button>
    </nav>
  </header>
</template>
