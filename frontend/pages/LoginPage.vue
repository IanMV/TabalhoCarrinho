<script lang="ts" setup>
import EmailCamp from "../components/smallcomponents/EmailCamp.vue";
import PasswordCamp from "../components/smallcomponents/PasswordCamp.vue";
import "../loginregister.css";

import { useRouter } from "vue-router";
const router = useRouter();

import { onUnmounted } from "vue";

import { UserStore } from "../store/UserStore";
const user = UserStore();

import { MessageErrorStore } from "../store/MessageError";
const error = MessageErrorStore();



function back() {
  router.push("/");
}

function confirm() {
  user.login()
}

onUnmounted(() => {
  user.password = "";
  user.email = "";
    error.message = ''
});
</script>

<template>
  <main id="main">
    <aside><h1>Bem-vindo de volta!</h1></aside>
    <section>
    <form>
      <h2>Login</h2>
      <div id="usercamps">
        <EmailCamp />
        <PasswordCamp />
        <p v-if="error.message != ''">{{ error.message }}</p>
        <router-link to="/register">Não tem uma conta?</router-link>
      </div>
      
      <div id="buttondiv">
        
        <button type="button" @click="back">
          Cancelar
        </button>
        <button type="button" @click="confirm">
          Confirmar
        </button>
      </div>
    </form>
  </section>
  </main>
</template>
