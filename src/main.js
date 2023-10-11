import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.mount("#app");
