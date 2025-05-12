<script lang="ts" setup>
import { onBeforeMount } from "vue";
import MyFooter from "../components/highcomponents/MyFooter.vue";
import MyHeader from "../components/highcomponents/MyHeader.vue";
import { CartStore } from "../store/CartStore";
import { useRouter } from "vue-router";
const router = useRouter();
import { UserStore } from "../store/UserStore";
const cart = CartStore();
const user = UserStore();
import { BooksStore } from "../store/BooksStore";
const books = BooksStore();
import imagens from "../images";
onBeforeMount(async () => {
  await cart.getcart();
});
function getImage(file: number): string {
  const item = books.books.filter(a => a.id == file)
  const path = item[0].dir
  console.log(path)
  return imagens[path]
}
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
              <img :src="getImage(item.id)" alt="" />
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
      <div id="back">
        <button type="button" @click="router.push('/')">
          Voltar para a loja
        </button>
      </div>
    </section>
    <section id="buy">
      <div id="cupom">
        <div>
          <input
            type="text"
            placeholder="Código do cupom"
            v-model="cart.cupom.cupom"
          /><button
            type="button"
            @click="
              () => {
                if (cart.cupom.cupom == 'vue' && cart.cupom.aplly != 'vue') {
                  cart.cupom.aplly = cart.cupom.cupom;
                }

                cart.cupom.cupom = undefined;
              }
            "
          >
            Inserir Cupom
          </button>
        </div>
        <div v-if="!cart.cupom.before">**Insira 'vue' no cupom**</div>
        <div v-if="cart.cupom.before">
          *Cupom '{{ cart.cupom.aplly }}' aplicado
        </div>
      </div>
      <div id="total">
        <h3>Total da compra</h3>
        <ul>
          <li>
            <p>Produtos:</p>
            <p>{{ cart.cartTotal.quantity }}</p>
          </li>
          <li>
            <p>Frete:</p>
            <p>Grátis</p>
          </li>
          <li>
            <p>Total:</p>
            <div>
              <p v-if="cart.cupom.before" class="before">
                R${{ cart.cupom.before }}
              </p>
              <p :class="[cart.cupom.before ? 'after' : '']">
                R${{ cart.cartTotal.total }}
              </p>
            </div>
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

    #alert2 {
      margin: calc(20px + 3vw);
      width: calc(100% - 2 * calc(2vw + 20px) - 2 * calc(20px + 3vw));
      padding: 0 calc(2vw + 20px) calc(1vw + 25px);
      text-align: center;
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

    #back {
      padding: 0 calc(2vw + 20px) calc(1vw + 25px);
      margin: 0 calc(10px + 2.5vw) calc(10px + 2.5vw);
      width: calc(100% - 2 * calc(2vw + 20px) - 2 * calc(20px + 3vw));

      button {
        padding: calc(8px + 0.5vw) calc(10px + 1vw);
        border: 1px solid var(--preto);
        background-color: var(--branco);
        border-radius: 3px;
        text-decoration: none;
        color: var(--preto);
        cursor: pointer;
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

  #buy {
    margin: calc(10px + 2.5vw);
    width: calc(100% - 2 * calc(2vw + 10px) - 2 * calc(20px + 2.5vw));
    padding: 0 calc(2vw + 20px) calc(1vw + 25px);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: calc(15px + 2vw);

    #total {
      min-width: 180px;
      width: calc(300px + 5vw);
      max-width: 400px;
      border: 1px solid var(--preto);
      padding: calc(15px + 2vw);
      display: flex;
      align-items: baseline;
      justify-content: center;
      flex-direction: column;
      gap: calc(8px + 1vw);

      h3 {
        font-size: calc(var(--texto) + 3px);
        color: var(--preto);
      }

      button {
        background-color: var(--verde-claro);
        border: none;
        border-radius: 3px;
        color: var(--branco);
        align-self: center;
        padding: calc(7px + 0.4vw) calc(5px + 1.5vw);
        cursor: pointer;
      }

      ul {
        flex-direction: column;
        display: flex;
        align-items: baseline;
        gap: calc(5px + 0.3vw);
        width: 100%;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: calc(3px + 0.2vw) 0;
          border-bottom: 1px solid var(--preto);
          width: 100%;

          div {
            display: flex;
            align-items: center;
            justify-content: end;
            gap: calc(6px + 0.6vw);
            .before {
              text-decoration: line-through;
              color: var(--vermelho);
            }
            .after {
              color: var(--verde-claro);
            }
          }
        }
      }
    }

    #cupom {
      min-width: 180px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-direction: column;
      gap: calc(5px + 1vw);

      div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: calc(5px + 1vw);
        input {
          width: calc(150px + 5vw);
          padding: calc(7px + 0.4vw) 0 calc(7px + 0.4vw) calc(5px + 1.5vw);
          outline: 1px solid var(--preto);
          border: none;
          border-radius: 3px;
        }

        button {
          background-color: var(--verde-claro);
          border: none;
          border-radius: 3px;
          color: var(--branco);
          align-self: center;
          padding: calc(7px + 0.4vw) calc(5px + 1.5vw);
          outline: 1px solid var(--verde-claro);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
