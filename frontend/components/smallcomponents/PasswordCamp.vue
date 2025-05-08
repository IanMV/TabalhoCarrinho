<script lang="ts" setup>
import { UserStore } from "../../store/UserStore";
const user = UserStore();
</script>

<template>
  <input type="text" v-model="user.password" placeholder="Senha..." />
</template>
