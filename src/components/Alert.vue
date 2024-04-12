<script setup>
import { computed } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: "Este es un mensaje de alerta",
    },
    type: {
        type: String,
        default: "default",
    },
});

const alertClass = computed(() => {
  switch (props.type) {
    case 'alert':
      return 'py-2 w-full text-center my-2 px-6 font-medium bg-amber-200 text-amber-500 rounded-md capitalize';
    case 'error':
      return 'py-2 w-full text-center my-2 px-6 font-medium bg-red-200 text-red-500 rounded-md capitalize';
    case 'success':
      return 'py-2 w-full text-center my-2 px-6 font-medium bg-green-200 text-green-500 rounded-md capitalize';
    default:
      return 'py-2 w-full text-center my-2 px-6 font-medium bg-neutral-200 text-neutral-500 rounded-md capitalize';
  }
});

// const alertRender = ref(true);
// onMounted(() => {
//     setTimeout(() => {
//         alertRender.value = false;
//     }, 5000);
// })
</script>

<template>
    <p
    :class="alertClass"
    >{{ props.message }}</p>
</template>
