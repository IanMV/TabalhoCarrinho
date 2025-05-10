<script lang="ts" setup>
import EmailCamp from "../components/smallcomponents/EmailCamp.vue";
import PasswordCamp from "../components/smallcomponents/PasswordCamp.vue";
import NameCamp from "../components/smallcomponents/NameCamp.vue";
import TokenCamp from "../components/smallcomponents/TokenCamp.vue";
import "../loginregister.css";

import { useRouter } from "vue-router";
const router = useRouter();

import { onUnmounted } from "vue";

import { MessageErrorStore } from "../store/MessageError";
const error = MessageErrorStore();

import { UserStore } from "../store/UserStore";
const user = UserStore();

import { CodeStore } from "../store/CodeStore";
const code = CodeStore();

async function confirm() {
  if (!error.steps.two) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      error.message = "*Invalid email";
      return;
    } else {
      error.message = "";
      await code.sendtoken();
      return;
    }
  } else if (error.steps.two && !error.steps.three) {
    error.message = "";
    await code.verification();
    return;
  } else if (error.steps.three) {
    error.message = "";
    await user.register();
  }
}

function back() {
  if (!error.steps.two) {
    router.push("/");
  } else if (error.steps.two) {
    error.message = "";
    code.code = undefined;
    error.steps.two = false;
  } else if (error.steps.three) {
    error.message = "";
    user.name = "";
    user.password = "";
    code.code = undefined;
    error.steps.two = false;
    error.steps.three = false;
  }
}

onUnmounted(() => {
  user.password = "";
  user.email = "";
  user.name = "";
  code.code = undefined;
  error.message = "";
});
</script>



<template>
  <main id="main">
    <aside><h1>Bem-vindo!</h1></aside>
    <section>
      <form>
        <h2>Cadastro</h2>
        <div id="usercamps">
          <TokenCamp v-if="error.steps.two && !error.steps.three" />
          <NameCamp v-if="error.steps.three" />
          <EmailCamp v-if="!error.steps.two" />
          <PasswordCamp v-if="error.steps.three" />
          <p v-if="error.message != ''">{{ error.message }}</p>
          <router-link to="/login">Já tem uma conta?</router-link>
        </div>
        <div id="buttondiv">
          <button type="button" @click="back">
            {{ error.steps.two || error.steps.three ? "Voltar" : "Cancelar" }}
          </button>
          <button type="button" @click="confirm">
            {{ error.steps.three ? "Registrar" : "Avançar" }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
