import { createPinia, setActivePinia } from "pinia";
import { createApp } from "vue";
import route from "./router";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

setActivePinia(pinia);

app.use(pinia);
app.use(route);
app.mount("#app");
