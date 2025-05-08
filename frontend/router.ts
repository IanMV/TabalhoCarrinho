import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";

const route = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/register",
      component: () => import("./pages/RegisterPage.vue"),
    },
    {
      path: "/login",
      component: () => import("./pages/LoginPage.vue"),
    },
    {
      path: "/cart",
      component: () => import("./pages/CartPage.vue"),
    },
  ],
});

export default route;
