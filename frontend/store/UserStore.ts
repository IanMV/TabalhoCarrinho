import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MessageErrorStore } from "./MessageError";
import { VITE } from "./VITELOCAL";

export const UserStore = defineStore("UserStore", () => {
  const error = MessageErrorStore();
  const router = useRouter();
  const password = ref<string>("");
  const email = ref<string>("");
  const name = ref<string>("");
  const local = VITE().local;
  const user = ref(JSON.parse(sessionStorage.getItem("user") || "{}"));

  async function register() {
    try {
      const response = await fetch(`${local}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });

      switch (response.status) {
        case 201:
          error.message = "";
          router.push("/login");
          break;
        default:
          error.message = "Um erro ocorreu";
          break;
      }
    } catch (err) {
      console.error(err);
      error.message = "Um erro ocorreu";
    }
  }

  async function login() {
    try {
      const response: Response = await fetch(`${local}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      switch (response.status) {
        case 200:
          error.message = "";
          const data = await response.json();
          user.value = data.information;
          router.push("/");
          sessionStorage.setItem("user", JSON.stringify(data.information));
          
          break;
        case 401:
          error.message = "Email ou senha incorretos";
          break;
        case 404:
          error.message = "Email ou senha incorretos";
          break;
        default:
          error.message = "Um erro ocorreu";
          break;
      }
    } catch (err) {
      console.error(err);
      error.message = "Um erro ocorreu";
    }
  }

  return {
    user,
    name,
    login,
    register,
    password,
    email,
  };
});
