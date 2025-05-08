import { defineStore } from "pinia";
import { ref } from "vue";

import { MessageErrorStore } from "./MessageError";

import { UserStore } from "./UserStore";

export const CodeStore = defineStore("Code", () => {
  const user = UserStore();
  const erro = MessageErrorStore();

  const code = ref<number>();

  async function verification() {
    try {
      const response: Response = await fetch(
        "http://localhost:3000/user/check-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code.value,
            email: user.email,
          }),
        }
      );

      switch (response.status) {
        case 200:
          erro.steps.three = true;
          break;
        case 400:
          erro.message = "*Código inválido";
          break;
        default:
          erro.message = "*Um erro ocorreu";
      }
    } catch (err) {
      console.error(err);
      erro.message = "*Um erro ocorreu";
    }
  }

  async function sendtoken() {
    try {
      const response: Response = await fetch("http://localhost:3000/email/send-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      switch (response.status) {
        case 418:
          erro.message = "*Email ja cadastrado";
          break;
        case 200:
          erro.steps.two = true;
          break;
          case 409:
            erro.steps.two = true;
            erro.message = '*Código ja enviado à este email'
            break;
        default:
          erro.message = "*Um erro ocorreu";
          break;
      }
    } catch (err) {
      console.error(err);
      erro.message = "*Um erro ocorreu";
    }
  }

  return {
    code,
    verification,
    sendtoken,
  };
});
