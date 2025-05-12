<script lang="ts" setup>
import MyHeader from "../components/highcomponents/MyHeader.vue";
import MyFooter from "../components/highcomponents/MyFooter.vue";
import { BooksStore } from "../store/BooksStore";
import { CartStore } from "../store/CartStore";
import { useRouter } from "vue-router";
import imagens from "../images";
const router = useRouter()
const cart = CartStore()
const books = BooksStore();


function getImage(file: number): string {
  const path = books.books[file].dir
  console.log(path)
  return imagens[path]
}

</script>
<template>
  <MyHeader />
  <main>
    <section id="highlight">
      <div id="highlight-author">
        <p id="author">Autor de Abril</p>
        <div id="description">
          <h2>Eric-Emanuel Schmitt</h2>
          <p>
            Eric-Emmanuel Schmitt has been awarded more than 20 literary prizes
            and distinctions, and in 2001 he received the title of Chevalier des
            Arts et des Lettres. His books have been translated into over 40
            languages.
          </p>
        </div>
       <a target="_blank" href="https://www.amazon.co.uk/Noc-ognia-Eric-Emmanuel-Schmitt/dp/8324037047">Acessar página do livro</a>
      </div>
      <div id="highlight-book">
        <img src="../src/bookscovers/initialbookcover.png" alt="" />
      </div>
    </section>

    <section id="resources">
      <ul>
        <li>
          <span class="fa-solid fa-truck"></span>
          <p>Frete grátis para SC</p>
        </li>
        <hr />
        <li>
          <span class="fa-solid fa-star"></span>
          <p>Livros recomendados</p>
        </li>
        <hr />
        <li>
          <span class="fa-solid fa-book-open"></span>
          <p>Mais vendidos</p>
        </li>
      </ul>
    </section>

    <section id="books">
      <h3>Lançamentos</h3>
      <ul>
        <li v-for="(book, index) of books.books" :key="index">
         
            <img :src="getImage(index)" alt="" />
            <div>
              <p>Título: {{ book.title }}</p>
              <p>Autores: {{ book.author }}</p>
              <p>Preço: {{ book.price }}</p>
            </div>
            <button @click="async ()=>{await cart.addcart(book.id)
              router.push('/cart')
            }">
              <span class="fa-solid fa-cart-shopping"></span>Comprar
            </button>
     
        </li>
      </ul>
   
    </section>
  </main>
  <MyFooter />
</template>

<style lang="scss" scoped>
#highlight {
  padding: calc(10px + 2vh) calc(15px + 2vw) calc(10px + 2vh) calc(40px + 6vw);
  display: grid;
  grid-template-columns: 1fr 1fr;

  #highlight-author {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    gap: calc(10px + 3vw);

    #author {
      color: var(--verde-claro);
      border: 1px solid var(--verde-claro);
      padding: calc(5px + 0.5vh) calc(6px + 1vw);
    }
    #description {
      h2 {
        font-size: var(--subtitulo);
        color: var(--preto);
        margin-bottom: calc(8px + 1vh);
      }

      p {
        color: var(--preto);
      }
    }
    a {
      text-decoration: none;
      padding: calc(3px + 1.5vh) calc(6px + 2vw);
      color: var(--branco);
      background-color: var(--verde-claro);
      border: none;
      border-radius: 3px;
      font-size: var(--texto);
    }
  }

  #highlight-book {
    display: flex;
    align-items: end;
    justify-content: end;
    img {
      width: calc(250px + 17vw);
    }
  }

  @media (max-width: 768px) {
    & {
      padding: calc(10px + 5vh) calc(10px + 6vw);
      grid-template-columns: 1fr;
      grid-template-rows: 0.8fr 1fr;

      #highlight-book {
        justify-content: center;

        img {
          width: calc(150px + 30vw);
        }
      }

      #highlight-author {
        align-items: center;
        text-align: center;
        #author {
          color: var(--verde-claro);
          border: 1px solid var(--verde-claro);
          padding: calc(5px + 0.5vh) calc(6px + 1vw);
        }
        #description {
          margin: 0 calc(20px + 4vw);
          h2 {
            font-size: var(--subtitulo);
            color: var(--preto);
            margin-bottom: calc(8px + 1vh);
          }

          p {
            color: var(--preto);
          }
        }
        a {
          
          padding: calc(3px + 0.8vh) calc(8px + 1.3vw);
          color: var(--branco);
          background-color: var(--verde-claro);
          border: none;
          border-radius: 3px;
          font-size: calc(var(--texto) + 3px);
        }
      }
    }
  }
}

#resources {
  border-top: 1px solid var(--verde-claro);
  border-bottom: 1px solid var(--verde-claro);
  padding: calc(35px + 0.5vh) calc(5px + 1vw);
  color: var(--preto);
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: auto;

  hr {
    height: calc(100px + 1vh);
    width: 1px;
    background-color: var(--preto);
    border: none;
  }
  ul {
    gap: calc(10px + 3vw);
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      min-width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: calc(5px + 1vw);

      span {
        font-size: calc(17px + 1vw);
      }
    }
  }
}
#books {
  padding: calc(50px + 1.5vh) calc(40px + 3vw);
  h3 {
    font-size: calc(30px + 0.5vw);
    margin-bottom: calc(10px + 2vh);
  }
  ul {
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: calc(10px + 2vw);
    margin-bottom: calc(10px + 3vh);
    li {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;

      gap: calc(12px + 1vh);
      button {
        cursor: pointer;
        width: 100%;
        color: white;
        padding: calc(5px + 1vh) calc(10px + 2vw);
        border: none;
        background-color: var(--verde-claro);
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(4px + 0.4vw);
      }
      img {
        width: 100%;
      }
      div {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: calc(3px + 0.8vh);
        p {
          width: 100%;
          &:first-child {
            font-weight: bold;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    & {
      padding: calc(50px + 1.5vh) calc(10px + 3vw);
      ul {
        li {
          img {
            width: calc(130px + 2vw);
          }
        }
      }
    }
  }
}
</style>
