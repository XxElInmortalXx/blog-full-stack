import "./assets/main.css";
import "@/assets/utils.css";
import "remixicon/fonts/remixicon.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "../formkit.config.js";

// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// firebase
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
// formkit
app.use(plugin, defaultConfig(config));

app.mount("#app");
