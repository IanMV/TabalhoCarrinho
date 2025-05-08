import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const MessageErrorStore = defineStore("MessageError", () => {
  const message = ref<string>("");

  const steps = reactive({
    two: false,
    three: false,
  });

  return {
    steps,
    message,
  };
});
