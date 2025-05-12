import { defineStore } from "pinia";

import { UserStore } from "./UserStore";
import { computed, ref } from "vue";

import { BooksStore } from "./BooksStore";

import { VITE } from "./VITELOCAL";

interface Item {
  id: number;
  quantity: number;
  dir: string;
  subtotal: number;
  price: number;
  author: string;
  title: string;
}

interface Cupom {
  cupom: string | undefined;
  aplly: string | undefined;
  before: number | undefined;
}

export const CartStore = defineStore("Cart", () => {
  const user = UserStore();
  const book = BooksStore();
  const cart = ref<Array<string>>(
    JSON.parse(sessionStorage.getItem("cart") || "[]")
  );
  const local = VITE().local;

  const cartTotal = computed(() => {
    let total = 0;
    let quantity = 0;
    for (const item of finalCart.value) {
      total += item.subtotal;
      quantity += item.quantity;
    }

    if (cupom.value.aplly) {
      cupom.value.before = total;
      total *= 0.9;
    }
    total = Number(total.toFixed(2));
    return {
      total,
      quantity,
    };
  });

  const finalCart = computed(() => {
    const array: Array<Item> = [];

    for (const item of cart.value) {
      let quantity = cart.value.filter((id) => item == id).length;

      let directory: string = "";
      let subtotal: number = 0;
      let price: number = 0;
      let author: string = "";
      let title: string = "";
      let id: number = 0;

      for (const i of book.books) {
        if (i.id.toString() == item) {
          id = Number(i.id);
          title = i.title;
          author = i.author;
          price = i.price;
          directory = i.dir;
          subtotal = Number((quantity * i.price).toFixed(2));
          break;
        }
      }

      const object: Item = {
        id: id,
        quantity: quantity,
        dir: directory,
        subtotal: subtotal,
        title: title,
        author: author,
        price: price,
      };

      if (!array.some((a) => a.id.toString() == item)) {
        array.push(object);
      }
    }
    return array;
  });

  async function getcart() {
    try {
      if (user.user.email) {
        const response = await fetch(`${local}/cart/get-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.user,
          }),
        });

        const data = await response.json();

        switch (response.status) {
          case 200:
            cart.value = data.cart;
            console.log(data.cart);
            console.log(cart.value);
            break;

          case 500:
            break;
        }
      } else {
        cart.value = JSON.parse(sessionStorage.getItem("cart") || "[]");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function addcart(id: number) {
    try {
      if (user.user.email) {
        const response = await fetch(`${local}/cart/add-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.user,
            id: id,
          }),
        });

        switch (response.status) {
          case 200:
            await getcart();
            break;

          case 500:
            break;
        }
      } else {
        cart.value.push(id.toString());

        sessionStorage.setItem("cart", JSON.stringify(cart.value));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function removecart(id: number) {
    try {
      if (user.user.email) {
        const response = await fetch(`${local}/cart/remove-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user.user,
            id: id,
          }),
        });

        switch (response.status) {
          case 200:
            await getcart();
            break;

          case 500:
            break;
        }
      } else {
        const index = cart.value.indexOf(id.toString());

        cart.value.splice(index, 1);

        sessionStorage.setItem("cart", JSON.stringify(cart.value));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const cupom = ref<Cupom>({
    cupom: undefined,
    aplly: undefined,
    before: undefined,
  });

  return {
    cupom,
    finalCart,
    getcart,
    addcart,
    removecart,
    cart,
    cartTotal,
  };
});
