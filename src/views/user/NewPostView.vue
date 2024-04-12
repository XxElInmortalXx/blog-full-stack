<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import useStorage from "@/composable/useStorage";
import useFirestore from "@/composable/useFirestore";
import { useUserStore } from "@/stores/user";
import { reset } from "@formkit/core";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

// router
const router = useRouter();

// store del usuario
const userStore = useUserStore();

// composable para Storage
const { addImagePostToStorage } = useStorage();

// composable para Firestore
const { addPost } = useFirestore();

// Configuración para texto enrriquecido
const editor = new Editor({
  extensions: [StarterKit, Image],
  content: "<p>Texto de ejempo</p>",
  editorProps: {
    attributes: {
      class: "prose max-w-none outline-none",
    },
  },
});
// Configuración para añadir imagenes al texto enrriquecido
Image.configure({
  HTMLAttributes: {
    class: "object-cover max-h-96 w-full h-full",
  },
});

// funcion para anadir imagen al texto enrriquecido
const addImage = () => {
  const url = window.prompt("URL");
  if (url) {
    editor.chain().focus().setImage({ src: url }).run();
  }
};

// Funcion para mostrar imagen en UI
const previewImageUrl = ref(null);
const previewImage = (e) => {
  if (e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImageUrl.value = e.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  previewImageUrl.value = "";
};

// Funcion para crear post
const alert = reactive({
  type: "",
  message: "",
  loading: false,
});
const handleNewPostSubmit = async (dataNewPost) => {
  alert.loading = true;
  alert.type = "default";
  alert.message = "Creando post...";
  try {
    // subir imagen
    alert.message = "Subiendo imagen...";
    const resultUploadImage = await addImagePostToStorage(
      dataNewPost["post-image"][0].file
    );
    // en caso de error
    if (!resultUploadImage.success) {
      alert.type = "error";
      alert.message = resultUploadImage.message;
      return;
    }
    // crear post
    alert.message = "Creando post...";
    const resultCreatePost = await addPost({
      title: dataNewPost["post-title"],
      description: dataNewPost["post-description"],
      content: editor.getHTML(),
      url: resultUploadImage.url,
      author: userStore.authUser.displayName,
      email: userStore.authUser.email,
    });
    // en caso de error
    if (!resultCreatePost.success) {
      alert.type = "error";
      alert.message = resultCreatePost.message;
      return;
    }
    // mensaje a UI
    alert.type = "success";
    alert.message = "Crear post";
    // vaciar formulario
    reset("form_new_post");
    editor.commands.clearContent();
    previewImageUrl.value = null;
    // redireccionar a perfil
    router.push({ name: "profile" });
  } catch (error) {
    console.log(error);
  }
  alert.loading = false;
};
</script>

<template>
  <main class="container">
    <h2 class="text-left font-semibold pb-4 text-xl">Crea un post</h2>
    <section>
      <FormKit
        id="form_new_post"
        @submit="handleNewPostSubmit"
        type="form"
        :submit-label="!alert.loading ? 'Crear post' : alert.message"
        :submit-attrs="{ disabled: alert.loading }"
        incomplete-message="Error, revisa lo que estás enviando al formulario"
      >
        <FormKit
          type="text"
          label="Título del post"
          name="post-title"
          placeholder="Soy un titulo llamativo"
          validation="required"
          :validation-messages="{
            required: 'El título del post es obligatorio',
          }"
          validation-visibility="submit"
        />
        <FormKit
          type="textarea"
          label="Descripción del post"
          name="post-description"
          placeholder="Soy una descripción corta y llamativa de maximo 150 caracteres"
          validation="required"
          :validation-messages="{
            required: 'La descripción del post es obligatorio',
          }"
          validation-visibility="submit"
        />
        <FormKit
          type="file"
          label="Imagen del post"
          name="post-image"
          @change="previewImage"
          placeholder="Imagen del post"
          accept=".png,.jpg,.jpeg,.webp"
          multiple="false"
          validation="required"
          :validation-messages="{
            required: 'La imagen del post es obligatorio',
          }"
          validation-visibility="submit"
        />
        <section v-if="previewImageUrl" class="my-2">
          <img :src="previewImageUrl" class="image-class" alt="" />
        </section>
        <!-- tiptap -->
        <section class="w-full rounded-t-md border-2 py-4 px-2">
          <h3 class="text-xl font-medium">Botones Tiptap</h3>

          <!-- tiptap utilidades -->
          <section
            class="flex gap-2 flex-wrap py-4 border-b-2 border-neutral-500"
          >
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="editor.chain().focus().unsetAllMarks().run()"
            >
              clear marks
            </button>
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="editor.chain().focus().clearNodes().run()"
            >
              clear nodes
            </button>
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="editor.chain().focus().setHorizontalRule().run()"
            >
              horizontal rule
            </button>
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="editor.chain().focus().setHardBreak().run()"
            >
              hard break
            </button>
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="editor.chain().focus().undo().run()"
            >
              undo
            </button>
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="editor.chain().focus().redo().run()"
            >
              redo
            </button>
          </section>
          <!-- tiptap texto -->
          <section
            v-if="editor"
            class="flex gap-2 flex-wrap pt-4 pb-4 border-b-2 border-neutral-500"
          >
            <button
              type="button"
              @click="editor.chain().focus().toggleBold().run()"
              :disabled="!editor.can().chain().focus().toggleBold().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('bold'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              bold
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleItalic().run()"
              :disabled="!editor.can().chain().focus().toggleItalic().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('italic'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              italic
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleStrike().run()"
              :disabled="!editor.can().chain().focus().toggleStrike().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('strike'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              strike
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleCode().run()"
              :disabled="!editor.can().chain().focus().toggleCode().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('code'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              code
            </button>
            <button
              type="button"
              @click="editor.chain().focus().setParagraph().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('paragraph'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              paragraph
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('heading', {
                  level: 1,
                }),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              h1
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('heading', {
                  level: 2,
                }),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              h2
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('heading', {
                  level: 3,
                }),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              h3
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('heading', {
                  level: 4,
                }),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              h4
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('bulletList'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              bullet list
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{
                'bg-neutral-800 text-neutral-50':
                  editor.isActive('orderedList'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              ordered list
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleCodeBlock().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('codeBlock'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              code block
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleBlockquote().run()"
              :class="{
                'bg-neutral-800 text-neutral-50': editor.isActive('blockquote'),
              }"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
            >
              blockquote
            </button>
          </section>
          <!-- tiptap image -->
          <section v-if="editor" class="pt-4">
            <button
              type="button"
              class="py-1 px-3 rounded-md border-2 border-neutral-800"
              @click="addImage"
            >
              add image from URL
            </button>
          </section>
        </section>
        <editor-content
          v-if="editor && alert.loading === false"
          class="w-full border-2 border-neutral-500 py-4 px-2 outline-none"
          :editor="editor"
        />
        <div
          v-if="alert.loading"
          class="w-full border-2 border-neutral-500 py-4 px-2 outline-none"
        >
          <p>Cargando...</p>
        </div>
      </FormKit>
    </section>
  </main>
</template>
