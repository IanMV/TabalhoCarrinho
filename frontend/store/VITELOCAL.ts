import { defineStore } from "pinia";

export const VITE = defineStore("VITE_LOCAL", () => {
  const local = import.meta.env.VITE_LOCAL;

  return {
    local,
  };
});
