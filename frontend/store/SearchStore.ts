import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { BooksStore } from "./BooksStore.js";

export const SearchStore = defineStore("SearchStore", () => {
  const search = ref<string>("");
  const booksStore = BooksStore();
  const results = computed(() => {
    const booksFiltered = booksStore.books.filter((book) =>
      book.title.toLowerCase().includes(search.value.toLowerCase())
    );
    return booksFiltered.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  });

  return {
    search,
    results,
  };
});
