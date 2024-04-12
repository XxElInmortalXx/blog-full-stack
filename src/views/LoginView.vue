<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/user"
import { ref, reactive } from "vue";
import Alert from "@/components/Alert.vue";

// store del usuario
const userStore = useUserStore()

// router
const router = useRouter()

// función para iniciar sesión
const alert = reactive({
  type: "default",
  message: "Loading...",
  loading: false
});
const handleLoginSubmit = async (dataLogin) => {
  alert.loading = true;
  alert.type = "default";
  alert.message = "Iniciando sesión...";
  try {
    const result = await userStore.login(dataLogin)
    // en caso de error
    if (!result.success) {
      alert.type = "error";
      alert.message = result.message;
      return;
    }

    // en caso de exito
    router.push({ name: 'profile' })
  } catch (error) {
    console.log(error);
  }
  alert.loading = false;
};
</script>

<template>
  <main class="container-small">
    <h2 class="text-left font-semibold pb-4 text-xl">
      Inicia sesión para continuar
    </h2>
    <section>
      <FormKit
        id="form_login"
        @submit="handleLoginSubmit"
        type="form"
        submit-label="Iniciar Sesión"
        incomplete-message="Error, revisa lo que estás enviando al formulario"
      >
        <FormKit
          type="email"
          label="Email"
          name="email"
          placeholder="ejemplo@ejemplo.com"
          help="Escribe tu email"
          validation="required|email"
          :validation-messages="{
            required: 'El email es obligatorio',
            email: 'El email no es valido',
          }"
          validation-visibility="submit"
        />
        <FormKit
          type="password"
          label="Contraseña"
          name="password"
          placeholder="******"
          help="Escribe tu contraseña"
          validation="required"
          :validation-messages="{
            required: 'La contraseña es obligatoria',
          }"
          validation-visibility="submit"
        />
      </FormKit>
      <section>
        <RouterLink
          :to="{ name: 'register' }"
          class="text-purple-500 font-medium"
          >¿No tienes cuenta? Registrate</RouterLink
        >
      </section>
        <Alert v-if="alert.loading" :message="alert.message" :type="alert.type" />
    </section>
  </main>
</template>
