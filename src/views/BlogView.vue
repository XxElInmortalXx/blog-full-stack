<script setup>
import BlogPost from "@/components/BlogPost.vue";
import useFirestore from "@/composable/useFirestore";
import { onMounted, reactive, ref } from "vue";
import Alert from "@/components/Alert.vue";

// funcion para cargar posts
const { getPosts } = useFirestore();

// alerta de cargando
const alert = reactive({
  type: "default",
  message: "Cargando posts...",
  loading: true,
});

// para habilitar o deshabilitar el boton de cargar más posts
const disableLoadMore = ref(false);

// funcion para cargar posts al cargar la página
const limitDoc = 10;
const lastDoc = ref(null);
const posts = ref([]);
onMounted(() => {
  getPosts(limitDoc, lastDoc.value).then((dataPosts) => {
    if (!dataPosts.success) {
      alert.type = "error";
      alert.message = result.message;
      return;
    }
    if (dataPosts.querySnapshot.docs.length < limitDoc) {
      disableLoadMore.value = true;
    }
    posts.value = dataPosts.querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    lastDoc.value = dataPosts.querySnapshot.docs[dataPosts.querySnapshot.docs.length - 1];
  }).catch((error) => {
    console.log(error);
  })
  .finally(() => {
    alert.loading = false;
  });
});

// funcion para cargar más posts
const loadMore = () => {
  alert.loading = true;
  alert.message = "Cargando posts...";
  alert.type = "default";
  getPosts(limitDoc, lastDoc.value).then((dataPosts) => {
    if (!dataPosts.success) {
      alert.type = "error";
      alert.message = result.message;
      return;
    }
    posts.value = [...posts.value, ...dataPosts.querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))];
    lastDoc.value = dataPosts.querySnapshot.docs[dataPosts.querySnapshot.docs.length - 1];
  }).catch((error) => {
    console.log(error);
  });
  alert.loading = false;
};
</script>

<template>
  <main class="container-medium">
    <section class="mt-4 space-y-8">
      <BlogPost v-for="post in posts" :key="post.id" :post="post" />
    </section>
    <Alert v-if="alert.loading" :type="alert.type" :message="alert.message" />
    <section v-if="posts.length !== 0" class="mt-4">
      <button
        @click="loadMore"
        v-if="!alert.loading"
        type="button"
        :disabled="disableLoadMore"
        class="bg-green-500 hover:bg-green-600 text-neutral-50 font-medium w-full rounded-md px-2 py-1 disabled:bg-neutral-500 disabled:cursor-not-allowed"
      >
        {{ disableLoadMore ? "Ya no hay más posts" : "Cargar más posts" }}
      </button>
    </section>
    <p v-if="posts.length === 0 && !alert.loading" class="text-center font-bold text-neutral-500 text-lg">No hay posts</p>
  </main>
</template>
