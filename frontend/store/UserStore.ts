import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MessageErrorStore } from "./MessageError";

const local = import.meta.env.VITE_LOCAL

export const UserStore = defineStore("UserStore", () => {
  const error = MessageErrorStore();
  const router = useRouter();
  const password = ref<string>("");
  const email = ref<string>("");
  const name = ref<string>("");
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
          error.message = "An error ocurred";
          break;
      }
    } catch (err) {
      console.error(err);
      error.message = "An error ocurred";
    }
  }

  async function login() {
    try {
      const response: Response = await fetch(
        `${local}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        }
      );

      switch (response.status) {
        case 200:
          error.message = "";
          const data = await response.json();
          user.value = data.information;
          sessionStorage.setItem("user", JSON.stringify(data.information));
          router.push("/");
          break;
        case 401:
          error.message = "Email or password incorrect";
          break;
        case 404:
          error.message = "Email or password incorrect";
          break;
        default:
          error.message = "An error ocurred";
          break;
      }
    } catch (err) {
      console.error(err);
      error.message = "An error ocurred";
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
