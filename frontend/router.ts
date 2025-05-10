import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import CartPage from "./pages/CartPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";

const route = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
    {
      path: "/cart",
      component: CartPage,
    },
  ],
});

export default route;
