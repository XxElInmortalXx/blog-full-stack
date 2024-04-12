<script setup>
import { onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import useFirestore from "@/composable/useFirestore";
import { ref } from "vue";

const { getPostById } = useFirestore();

const route = useRoute();
const { id } = route.params;
const postDetail = ref({});

const getPostDetail = async () => {
  const data = await getPostById(id);
  return data;
};

onMounted(() => {
  getPostDetail().then((data) => {
    postDetail.value = data;
  });
});
</script>

<template>
  <main class="container">
    <section>
      <div class="w-full aspect-video">
        <img
        v-if="postDetail.image_post"
        :src="
          postDetail.image_post
          ? postDetail.image_post
          : '../assets/images/post.png'
          "
        class="image-class"
        alt=""
        />
      </div>
      <h1
        class="text-3xl py-4 font-bold uppercase sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {{ postDetail.title }}
      </h1>
      <h2 v-if="postDetail.author" class="font-semibold">
        <span class="font-bold">Autor:</span> {{ postDetail.author }}
      </h2>
      <p class="text-neutral-500 mt-2 mb-6">{{ postDetail.description }}</p>
      <article></article>
    </section>
    <section
      v-html="postDetail.content ? postDetail.content : ''"
      class="py-4 border-t-2 border-neutral-800 prose prose-img:object-cover prose-img:max-h-96 prose-img:w-full prose-img:h-full prose-neutral-800 max-w-none text-wrap overflow-hidden outline-none"
    ></section>

    <RouterLink
      :to="{ name: 'blog' }"
      class="bg-blue-500 hover:bg-blue-600 text-neutral-50 block text-center font-medium rounded-md px-2 py-1"
      >Volver</RouterLink
    >
  </main>
</template>
