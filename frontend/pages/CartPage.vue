<script lang="ts" setup>
import { onBeforeMount } from "vue";
import MyFooter from "../components/highcomponents/MyFooter.vue";
import MyHeader from "../components/highcomponents/MyHeader.vue";
import { CartStore } from "../store/CartStore";

import { UserStore } from "../store/UserStore";
const cart = CartStore();
const user = UserStore();
onBeforeMount(async () => {
  await cart.getcart();
});
</script>

<template>
  <MyHeader />
  <main>
    <section id="cart">
      <p id="alert" v-if="!user.user.email">
        Seu carrinho não está sendo salvo.
        <router-link to="/login">Conecte-se.</router-link>
      </p>
      <h2>Carrinho</h2>

      <div id="legend">
        <p>Título</p>
        <p>Quantidade</p>
        <p>Subtotal</p>
      </div>
      <p id="alert2" v-if="!cart.finalCart[0]">Nenhum item no carrinho</p>
      <ul>
        <li v-for="item of cart.finalCart">
          <div id="item">
            <div>
              <img :src="item.dir" alt="" />
              <div class="info">
                <p>{{ item.title }}</p>
                <p>{{ item.author }}</p>
                <p>R$ {{ item.price }}</p>
              </div>
            </div>
            <div>
              <div>
                <button @click="cart.removecart(item.id)">-</button
                >{{ item.quantity }}
                <button @click="cart.addcart(item.id)">+</button>
              </div>
            </div>
            <div>
              <p>R${{ item.subtotal }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div id="back"><router-link to="">Voltar para a loja</router-link></div>
    </section>
    <section id="buy">
      <div id="cupom">
        <input type="text" placeholder="Código do cupom" /><button>
          Inserir Cupom
        </button>
      </div>
      <div id="total">
        <h3>Total da compra</h3>
        <ul>
          <li>
            <p>Produtos:</p>
            <p>{{}}</p>
          </li>
          <li>
            <p>Frete:</p>
            <p>Grátis</p>
          </li>
          <li>
            <p>Total:</p>
            <p>{{}}</p>
          </li>
        </ul>
        <button>Ir para pagamento</button>
      </div>
    </section>
  </main>
  <MyFooter />
</template>

<style lang="scss" scoped>
main {
  #cart {
    display: flex;
    flex-direction: column;

    width: 100%;
    #alert {
      width: auto;
      padding: calc(4vw + 30px) calc(2vw + 30px);
      color: var(--vermelho);
      font-size: calc(var(--subtitulo) - 12px);
      a {
        text-decoration: none;
        color: var(--verde-claro);
        font-size: calc(var(--subtitulo) - 12px);
      }
    }

    h2 {
      font-size: var(--subtitulo);
      width: auto;
      padding: calc(2vw + 30px) calc(2vw + 40px) calc(1.5vw + 20px);
    }

    #legend {
      margin: calc(20px + 3vw);
      width: calc(100% - 2 * calc(2vw + 20px) - 2 * calc(20px + 3vw));
      padding: 0 calc(2vw + 20px) calc(1vw + 25px);
      border-bottom: 1px solid var(--verde-claro);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      p {
        font-size: calc(var(--subtitulo) - 17px);
        font-weight: bold;
        &:nth-child(2) {
          text-align: center;
        }

        &:last-child {
          text-align: right;
        }
      }
    }

    ul {
      width: 100%;
      li {
        width: 100%;
        #item {
          margin: calc(8px + 5vw);
          width: calc(100% - 2 * calc(4vw + 10px) - 2 * calc(8px + 5vw));
          padding: 0 calc(4vw + 10px) calc(1vw + 25px);
          border-bottom: 1px solid var(--verde-claro);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;

          div {
            &:first-child {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: calc(5px + 1vw);
              img {
                width: calc(40px + 10vw);
              }

              div.info {
                flex-direction: column;
                align-items: baseline;
                justify-content: baseline;
                text-align: left;
                gap: calc(3px + 0.5vw);

                p {
                  &:first-child {
                    font-size: var(--texto);
                  }

                  &:nth-child(2) {
                    font-size: calc(var(--texto) - 2px);
                    color: var(--cinza);
                  }
                  &:last-child {
                    font-size: var(--texto);
                  }
                }
              }

              @media (max-width: 820px) {
                & {
                  align-items: baseline;
                  justify-content: baseline;
                  flex-direction: column;
                }
              }
            }
            &:nth-child(2) {
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              div {
                align-items: center;
                justify-content: center;
                width: 25%;
                border: 1px solid var(--preto);
                padding: calc(2px + 1vw);
                
                button {
                  background-color: var(--branco);
                  border: none;
                }
              }
            }
            &:last-child {
              text-align: center;
              display: flex;
              justify-content: right;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
