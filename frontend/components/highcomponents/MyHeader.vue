<script lang="ts" setup>
import SearchCamp from "../smallcomponents/SearchCamp.vue";
import { SearchStore } from "../../store/SearchStore";
const search = SearchStore();

import { UserStore } from "../../store/UserStore";
const user = UserStore();
</script>

<template>
  <header>
    <nav>
      <ul class="nav">
        <li class="nav-item">
          <ul class="nav-item-logo">
            <li><router-link to="/">IFbooks</router-link></li>
            <hr />
            <li style="opacity: 0.6" class="greentext">
              Apreço a<br />
              leitura
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <div class="nav-item_search">
            <div>
              <input
                type="text"
                placeholder="Pesquisar"
                v-model="search.search"
              /><span class="fa-solid fa-magnifying-glass"></span>
            </div>
            <div>
              <SearchCamp />
            </div>
          </div>
        </li>
        <li class="nav-item">
          <ul class="nav-item-nav">
            <li><router-link to="/">Termos</router-link></li>
            <li><router-link to="/">Equipe</router-link></li>
            <li><router-link to="/">Envio</router-link></li>
            <li><router-link to="/">Devoluções</router-link></li>
          </ul>
        </li>

        <li class="nav-item">
          <ul class="nav-item-user">
            <li class="nav-item-user-name greentext" v-if="user.user?.name">
              <router-link to="/login"
                ><span class="fa-solid fa-user greentext"></span
                >{{ user.user?.name }}</router-link
              >
            </li>
            <li class="nav-item-user-login" v-else>
              <router-link to="/login">Login</router-link>
            </li>
            <hr />
            <li class="greentext">
              <router-link to="/"
                ><span class="fa-solid fa-heart"></span
              ></router-link>
            </li>
            <hr />
            <li class="greentext">
              <router-link to="/cart"
                ><span class="fa-solid fa-cart-shopping"></span
              ></router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
hr {
  height: calc(10px + 4vh);
  width: 1px;
  background-color: var(--verde-claro);
  border: none;
}
header {
  font-size: var(--texto);
  border-bottom: 1px solid var(--verde-claro);
  nav {
    margin: calc(10px + 1vw) calc(20px + 4vw);
    .nav {
      display: grid;
      grid-template-columns: 1fr 2fr 1.8fr 0.8fr;
      align-items: center;
      gap: calc(8px + 2vw);
      grid-auto-rows: 1fr 1fr;

      @media (max-width: 1024px) {
        & {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          .nav-item {
            &:nth-child(1) {
              order: 1;
            }
            &:nth-child(2) {
              order: 3;
            }
            &:nth-child(3) {
              order: 2;
            }
            &:nth-child(4) {
              order: 4;
            }
          }
        }
      }
      @media (max-width: 600px) {
        & {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          .nav-item {
            &:nth-child(1) {
              order: 2;
            }
            &:nth-child(2) {
              order: 4;
            }
            &:nth-child(3) {
              order: 1;
              grid-column: 1/3;
              .nav-item-nav {
                margin-right: calc(2px + 4vw);
                li {
                  width: calc(10% + 9vw);
                }
              }
            }
            &:nth-child(4) {
              order: 3;
            }
          }
        }
      }

      .nav-item {
        .nav-item-logo {
          display: flex;
          align-items: center;
          justify-content: baseline;
          gap: calc(10px + 0.3vw);

          hr {
            height: calc(17px + 4vh);
          }

          li {
            a {
              text-decoration: none;
              color: var(--preto);
            }
          }
        }
        .nav-item-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(8px + 0.5vw);

          li {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            a {
              height: 100%;
              width: 100%;
              text-align: center;
              text-decoration: none;
              color: rgb(141, 141, 141);
            }
          }
        }

        .nav-item-user {
          display: flex;
          align-items: center;
          justify-content: end;
          gap: calc(5px + 1vw);

          li {
            a {
              color: var(--verde-claro);
            }
          }

          .nav-item-user-login {
            a {
              text-align: center;
              text-decoration: none;
              color: var(--verde-claro);
              border: 1px solid var(--verde-claro);
              padding: calc(2px + 0.2vh) calc(3px + 0.5vw);
            }
          }
          .nav-item-user-name {
            a {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: calc(1px + 0.2vw);
              text-decoration: none;
            }
          }
        }
        .nav-item_search {
          display: block;

          div {
            display: flex;
            justify-content: baseline;
            align-items: center;

            span {
              font-size: 15px;
              padding: 10px;
              background-color: rgba(241, 241, 241, 1);
            }
            input {
              background-color: rgba(241, 241, 241, 1);
              border-radius: 3px;
              outline: none;
              border: none;
              height: 35px;
              max-width: 287.25px;
              width: calc(80px + 18vw);
              padding-left: calc(3px + 0.8vw);
            }

            &:last-child {
              position: relative;
            }
          }
        }
      }
    }

    @media (max-width: 500px) {
      & {
        margin: calc(20px + 1vw) calc(10px + 4vw);
      }
    }
  }
}
.greentext {
  color: var(--verde-claro);
}
</style>
