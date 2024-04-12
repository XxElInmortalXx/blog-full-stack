<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Alert from "../components/Alert.vue";
import { reactive } from "vue";

// store del usuario
const userStore = useUserStore();
// router
const router = useRouter();

// función para registrar un usuario
const alert = reactive({
  type: "default",
  message: "Loading...",
  loading: false,
});
const handleRegisterSubmit = async (dataRegister) => {
  alert.loading = true;
  alert.type = "default";
  alert.message = "Registrando...";
  try {
    const result = await userStore.register(dataRegister);
    // en caso de error
    if (!result.success) {
      alert.type = "error";
      alert.message = result.message;
      return;
    }

    // en caso de exito
    router.push({ name: "login" });
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
        id="form_register"
        @submit="handleRegisterSubmit"
        type="form"
        submit-label="Registrarme"
        incomplete-message="Error, revisa lo que estás enviando al formulario"
      >
        <FormKit
          type="text"
          label="Nombre"
          name="username"
          placeholder="Jhon Doe"
          help="Escribe aquí tu nombre"
          validation="required"
          :validation-messages="{
            required: 'Tu nombre es obligatorio',
          }"
          validation-visibility="submit"
        />
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
        <RouterLink :to="{ name: 'login' }" class="text-purple-500 font-medium"
          >¿Ya tienes cuenta? Inicia sesión</RouterLink
        >
      </section>
      <Alert v-if="alert.loading" :message="alert.message" :type="alert.type" />
    </section>
  </main>
</template>
