<script lang="ts" setup>
import { CodeStore } from "../../store/CodeStore";
const code = CodeStore();
</script>

<template>
  <input
    type="number"
    maxlength="6"
    oninput="this.value=this.value.slice(0,6)"
    v-model="code.code"
  />
</template>
