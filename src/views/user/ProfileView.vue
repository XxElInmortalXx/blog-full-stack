<script setup>
import Alert from "@/components/Alert.vue";
import BlogPost from "@/components/BlogPost.vue";
import useFirestore from "@/composable/useFirestore";
import { useUserStore } from "@/stores/user";
import { onMounted, ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";

// router
const router = useRouter();

// store del usuario
const userStore = useUserStore();

// composable para obtener posts
const { getPostByUser } = useFirestore();

// función para cerrar sesión
const handleLogoutClick = () => {
  userStore.logout();
  router.push({ name: "login" });
};

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
  getPostByUser(limitDoc, lastDoc.value, userStore.authUser.email).then((dataPosts) => {
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
  getPostByUser(limitDoc, lastDoc.value, userStore.authUser.email).then((dataPosts) => {
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
  <main class="container">
    <h1
      class="py-8 font-bold uppercase text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
    >
      perfil
    </h1>
    <section>
      <article class="flex justify-between items-center">
        <div>
          <h2 class="text-left font-semibold text-xl">
            {{
              userStore.authUser.displayName
                ? userStore.authUser?.displayName || "Jhon Doe"
                : "Jhon Doe"
            }}
          </h2>
          <p>
            {{
              userStore.authUser.email
                ? userStore.authUser.email
                : "correo@correo.com"
            }}
          </p>
        </div>
        <button
          @click="handleLogoutClick"
          class="bg-red-500 hover:bg-red-600 text-neutral-50 font-medium rounded-md px-2 py-1"
        >
          cerrar sesión
        </button>
      </article>
      <RouterLink
        :to="{ name: 'create-post' }"
        class="bg-blue-500 text-center hover:bg-blue-600 text-neutral-50 font-medium rounded-md px-2 py-1 my-4 block w-full"
      >
        crear post
      </RouterLink>
      <section class="flex flex-col gap-8">
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
    </section>
    <p v-if="posts.length === 0 && !alert.loading" class="text-center font-bold text-neutral-500 text-lg">No hay posts</p>
  </main>
</template>
