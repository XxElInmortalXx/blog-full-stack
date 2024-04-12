<script setup>
import useFirestore from "@/composable/useFirestore";
import { extractFileName, getDateFromCurrentDate } from "@/helpers";
import { reactive } from "vue";
import useStorage from "@/composable/useStorage";
import Alert from "./Alert.vue";
import { useUserStore } from "@/stores/user"

// store del usuario
const userStore = useUserStore();

// definir props
const props = defineProps({
  post: {
    type: Object,
    default: {
      id: "id-post",
      title: "",
      desctiption: "",
      image_post: "",
      created_at: "",
      updated_at: "",
    },
  },
});

// composables para borrar posts
const { deleteImagePostFromStorage } = useStorage();
const { deletePostById } = useFirestore();

// función para eliminar un post
const alert = reactive({
  type: "",
  message: "",
  loading: false,
});
const deletePost = async (docId, url) => {
  alert.loading = true;
  alert.message = "Eliminando...";
  alert.type = "default";
  try {
    const path = extractFileName(url);

    // borrar imagen
    alert.message = "Eliminando imagen...";
    const resultDeleteImage = await deleteImagePostFromStorage(path);
    if (!resultDeleteImage.success) {
      alert.type = "error";
      alert.message = resultDeleteImage.message;
      return;
    }

    // borrar post
    alert.message = "Eliminando post...";
    const resultDeletePost = await deletePostById(docId);
    if (!resultDeletePost.success) {
      alert.type = "error";
      alert.message = resultDeletePost.message;
      return;
    }
    // recargar la página
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
  alert.loading = true;
};
</script>

<template>
  <article
    class="relative grid place-items-stretch gap-4 grid-cols-1 md:grid-cols-2"
  >
    <div v-if="alert.loading" class="absolute top-0 right-0 w-full h-full rounded-md overflow-hidden bg-black/50 grid place-items-center cursor-not-allowed">
      <div class="w-full max-w-60">
        <Alert v-if="alert.loading" :type="alert.type" :message="alert.message" />
      </div>
    </div>
    <img
      class="image-class col-span-2 md:col-span-1"
      :src="
        props.post.image_post
          ? props.post.image_post
          : '../assets/images/post.png'
      "
      alt="aqui alt"
    />
    <section class="space-y-4 md:space-y-2 my-auto">
      <p class="text-purple-500 font-medium capitalize">
        {{
          props.post.created_at
            ? getDateFromCurrentDate(props.post.created_at)
            : "hoy, 1 de junio 2024"
        }}
      </p>
      <RouterLink
        :to="{ name: 'blog-detail', params: { id: props.post.id } }"
        class="text-3xl leading-none font-bold capitalize sm:text-4xl hover:underline"
      >
        {{ props.post.title ? props.post.title : "Título" }}
      </RouterLink>
      <p class="text-neutral-500 max-h-20">
        {{
          props.post.description
            ? props.post.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas, incidunt vero dolore"
        }}
      </p>
      <p
        class="leading-none w-[max-content] capitalize text-amber-700 font-medium"
      >
        {{
          props.post.updated_at
            ? `Ultima actualización: ${getDateFromCurrentDate(
                props.post.updated_at
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
    </section>
    <section v-if="userStore.authUser && userStore.authUser.email === props.post.email" class="grid grid-cols-1 gap-2 md:grid-cols-2 col-span-2 w-full">
      <RouterLink
        :to="{ name: 'edit-post', params: { id: props.post.id } }"
        class="bg-blue-500 hover:bg-blue-600 text-neutral-50 font-medium rounded-md px-2 py-1 text-center"
        >editar post</RouterLink
      >
      <button
        type="button"
        @click="() => deletePost(props.post.id, props.post.image_post)"
        class="bg-red-500 hover:bg-red-600 text-neutral-50 font-medium rounded-md px-2 py-1"
      >
        eliminar post
      </button>
    </section>
  </article>
</template>
