<script lang="ts" setup>
import { SearchStore } from "../../store/SearchStore";
const search = SearchStore();

import { CartStore } from "../../store/CartStore";
const cart = CartStore();

import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <ul v-if="search.search">
    <li v-for="result in search.results">
      <p>{{ result.title }}</p>
      <button
        type="button"
        @click="
          () => {
            cart.addcart(result.id);
          router.push('/cart')
          }
        "
      >
        <span class="fa-solid fa-cart-shopping"></span>
      </button>
    </li>
  </ul>
</template>

<style scoped>
ul {
  z-index: 2;
  position: absolute;
  top: 100%;
  background-color: rgba(241, 241, 241, 1);
  max-width: 300px;
  width: calc(80px + 18vw + 6px + 1.6vw);
  li {
    padding: calc(1px + 0.2vw) calc(3px + 0.3vw);
    margin: calc(1px + 0.5vw) calc(1px + 1vw);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--preto);

    button {
      cursor: pointer;
      background-color: inherit;
      border: none;

      span {
        color: var(--verde-claro);
      }
    }
  }
}
</style>
