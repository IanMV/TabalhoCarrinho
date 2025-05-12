import { defineStore } from "pinia";
import { ref } from "vue";
import Books from "./BooksInterface";

export const BooksStore = defineStore("BooksStore", () => {
  const books = ref<Books[]>([
    {
      id: 1,
      title: "Chain of Iron: Volume 2",
      author: "Cassandra Clare",
      price: 32.99,
      dir: "./src/bookscovers/cover-chainofiron2.png",
    },
    {
      id: 2,
      title: "Chain of Thorns",
      author: "Cassandra Clare",
      price: 32.99,
      dir: "./src/bookscovers/cover-chainofthorns.png",
    },
    {
      id: 3,
      title: "City of Fallen Angels",
      author: "Cassandra Clare",
      price: 32.99,
      dir: "./src/bookscovers/cover-cityoffallenangels.png",
    },
    {
      id: 4,
      title: "Nona the Ninth",
      author: "Cassandra Clare",
      price: 32.99,
      dir: "./src/bookscovers/cover-nonatheninth.png",
    },

    {
      id: 5,
      title: "Harlem Shuffle",
      author: "Colson Whitehead",
      price: 32.99,
      dir: "./src/bookscovers/cover-harlemshuffle.png",
    },
    {
      id: 6,
      title: "Two Old Woman",
      author: "Velma Wallis",
      price: 32.99,
      dir: "./src/bookscovers/cover-twooldwoman.png",
    },
    {
      id: 7,
      title: "Carrie Soto is Back",
      author: "Taylor Jenkins Reid",
      price: 32.99,
      dir: "./src/bookscovers/cover-carriesotoisback.png",
    },
    {
      id: 1,
      title: "Book Lovers",
      author: "Emily Henry",
      price: 32.99,
      dir: "./src/bookscovers/cover-booklovers.png",
    },
  ]);

  return {
    books,
  };
});
