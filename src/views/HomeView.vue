<script setup>
import BlogPost from "@/components/BlogPost.vue";
import { RouterLink } from "vue-router";
import useFirestore from "@/composable/useFirestore";
import { onMounted, ref, reactive } from "vue";
import useStorage from "@/composable/useStorage";
import { extractFileName, getDateFromCurrentDate } from "@/helpers";
import Alert from "@/components/Alert.vue";
import { useUserStore } from "@/stores/user";

// store del usuario
const userStore = useUserStore();

// composables para obtener posts
const { getPosts } = useFirestore();

// composable para borrar posts
const { deleteImagePostFromStorage } = useStorage();
const { deletePostById } = useFirestore();

// función para eliminar un post
const alertDeletePost = reactive({
  type: "default",
  message: "Loading...",
  loading: false,
});
const deletePost = async (docId, url) => {
  alertDeletePost.loading = true;
  alertDeletePost.message = "Eliminando...";
  try {
    const path = extractFileName(url);
    // borrar imagen
    alertDeletePost.message = "Eliminando imagen...";
    alertDeletePost.type = "default";
    await deleteImagePostFromStorage(path);
    // borrar post
    alertDeletePost.message = "Eliminando post...";
    alertDeletePost.type = "default";
    await deletePostById(docId);
    // recargar la página
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
  alertDeletePost.loading = false;
};

// alerta de cargando
const alert = reactive({
  type: "default",
  message: "Loading...",
  loading: true,
});

// para habilitar o deshabilitar el boton de cargar más posts
const disableLoadMore = ref(false);

// funcion para cargar posts
const limitDoc = 4;
const lastDoc = ref(null);
const posts = ref([]);
onMounted(() => {
  alert.loading = true;
  alert.message = "Cargando posts...";
  alert.type = "default";
  getPosts(limitDoc, lastDoc.value)
    .then((dataPosts) => {
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
      lastDoc.value =
        dataPosts.querySnapshot.docs[dataPosts.querySnapshot.docs.length - 1];
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      alert.loading = false;
    });
});
</script>
<template>
  <main class="container">
    <h1 class="text-header-page">nuestro blog</h1>
    <section v-if="posts[0]">
      <h2 class="text-left font-semibold pb-8 text-xl">
        Entradas recientes de nuestro blog
      </h2>
      <article class="space-y-4 mb-8 relative">
        <div
          v-if="alertDeletePost.loading"
          class="absolute top-0 right-0 w-full h-full rounded-md overflow-hidden bg-black/50 grid place-items-center cursor-not-allowed"
        >
          <div class="w-full max-w-60">
            <Alert
              v-if="alertDeletePost.loading"
              :type="alertDeletePost.type"
              :message="alertDeletePost.message"
            />
          </div>
        </div>
        <img
          v-if="posts[0]?.image_post"
          class="image-class"
          :src="
            posts[0]?.image_post
              ? posts[0]?.image_post
              : '../assets/images/post.png'
          "
          alt="aqui alt"
        />
        <p class="text-purple-500 font-medium capitalize">
          {{
            posts[0]?.created_at
              ? getDateFromCurrentDate(posts[0]?.created_at)
              : "hoy, 1 de junio 2024"
          }}
        </p>
        <RouterLink
          :to="{
            name: 'blog-detail',
            params: { id: posts[0]?.id ? posts[0]?.id : 'id-post' },
          }"
          class="text-3xl leading-none font-bold capitalize sm:text-4xl hover:underline"
        >
          {{ posts[0]?.title ? posts[0]?.title : "Título" }}
        </RouterLink>
        <p class="text-neutral-500 max-h-20">
          {{
            posts[0]?.description
              ? posts[0]?.description
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas, incidunt vero dolore"
          }}
        </p>
        <p
          class="leading-none w-[max-content] capitalize text-amber-700 font-medium"
        >
          {{
            posts[0]?.updated_at
              ? `Ultima actualización: ${getDateFromCurrentDate(
                  posts[0]?.updated_at
                )}`
              : "No hubo actualizaciones del post"
          }}
        </p>
        <!-- aqui le pones etiquetas en una actualización -->
        <!-- <div class="flex gap-2">
          <p
            class="bg-purple-100 leading-none py-1 px-4 rounded-full capitalize text-purple-500 font-medium"
          >
            diseño
          </p>
          <p
            class="bg-blue-100 leading-none py-1 px-4 rounded-full capitalize text-blue-500 font-medium"
          >
            presentación
          </p>
          <p
            class="bg-pink-100 leading-none py-1 px-4 rounded-full capitalize text-pink-500 font-medium"
          >
            desarrollo
          </p>
        </div> -->
        <!-- {{ userStore.authUser.email }} -->
        <section
        v-if="userStore.authUser && userStore.authUser.email === posts[0].email"
          class="grid grid-cols-1 gap-2 md:grid-cols-2 col-span-2 w-full"
        >
          <RouterLink
            :to="{
              name: 'edit-post',
              params: { id: posts[0]?.id ? posts[0]?.id : 'id-post' },
            }"
            class="bg-blue-500 hover:bg-blue-600 text-neutral-50 font-medium rounded-md px-2 py-1 text-center"
            >editar post</RouterLink
          >
          <button
            @click="
              () =>
                deletePost(
                  (id = posts[0]?.id ? posts[0]?.id : 'id-post'),
                  posts[0]?.image_post
                )
            "
            class="bg-red-500 hover:bg-red-600 text-neutral-50 font-medium rounded-md px-2 py-1"
          >
            eliminar post
          </button>
        </section>
      </article>
      <section class="flex flex-col gap-8">
        <BlogPost v-if="posts[1]" :post="posts[1]" />
        <BlogPost v-if="posts[2]" :post="posts[2]" />
        <BlogPost v-if="posts[3]" :post="posts[3]" />
      </section>
      <RouterLink :to="{ name: 'blog'}" class="block mt-8 text-center bg-green-500 hover:bg-green-600 text-neutral-50 font-medium w-full rounded-md px-2 py-1">Ver todos los posts</RouterLink>
    </section>
    <Alert v-if="alert.loading" :type="alert.type" :message="alert.message" />
    <p
      v-if="posts.length === 0 && !alert.loading"
      class="text-center font-bold text-neutral-500 text-lg"
    >
      No hay posts
    </p>
  </main>
</template>
