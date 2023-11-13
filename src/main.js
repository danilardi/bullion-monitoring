import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/main.css";

import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ToastPlugin from "vue-toast-notification";
import VueDatePicker from "@vuepic/vue-datepicker";
import VueDragscroll from "vue-dragscroll";
import Antd from 'ant-design-vue';

const app = createApp(App);
const pinia = createPinia();

watch(
    pinia.state,
    (state) => {
        localStorage.setItem("auth", JSON.stringify(state.auth));
    },
    { deep: true }
);


app.use(pinia);
app.use(router);
app.use(ToastPlugin);
app.use(VueDragscroll);
app.use(Antd);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");

