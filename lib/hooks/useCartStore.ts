import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem, OrderDetail } from "../models/OrderModel";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  // taxPrice: number;
  // shippingPrice: number;
  canteenId: string;
  totalPrice: number;
  paymentMethod: string;
  customerId: string;

};
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  // taxPrice: 0,
  // shippingPrice: 0,
  canteenId: "",
  totalPrice: 0,
  paymentMethod: "QRIS",
  customerId: ""

};

export const cartStore = create<Cart>()(
  persist(() => initialState, {
    name: "cart-storage",
  })
);

export default function useCartService() {
  const {
    items,
    itemsPrice,
    // taxPrice,
    // shippingPrice,
    canteenId,
    totalPrice,
    paymentMethod,
    customerId,

  } = cartStore();
  return {
    items,
    itemsPrice,
    // taxPrice,
    // shippingPrice,
    canteenId,
    totalPrice,
    paymentMethod,
    customerId,

    increase: (item: OrderItem) => {
      const existingItem = items.find((x) => x.id === item.id);

      // Check if the item being added is from a different canteen
      const isDifferentCanteen = items.some(
        (x) => x.canteenId !== item.canteenId
      );

      if (isDifferentCanteen) {
        // Show alert if the user tries to add an item from a different canteen
        toast.error("Maaf, tidak boleh menambahkan barang dari kantin yang berbeda");
        return; // or you can throw an error or prevent further execution
      }

      const updatedCartItems = existingItem
        ? items.map((x) =>
            x.id === item.id
              ? { ...existingItem, qty: existingItem.qty + 1 }
              : x
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, totalPrice } = calcPrice(updatedCartItems);


      // Update the cart state
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        totalPrice,
        canteenId: item.canteenId,
      });
    },

    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x.id === item.id);
      if (!exist) return;
      const updateCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x.id !== item.id)
          : items.map((x) =>
              x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x
            );

      const { itemsPrice, totalPrice } = calcPrice(updateCartItems);
      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        // shippingPrice,
        // taxPrice,
        totalPrice,
        canteenId: item.canteenId,
      });
    },
    saveOrderBy: () => {
      cartStore.setState({
        customerId,
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      cartStore.setState({
        paymentMethod,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
      });
    },
  };
}
const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, items) => acc + items.price * items.qty, 0)

    ),

    // shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    // taxPrice = round2(Number(0.15 * itemsPrice)),
    // totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
    totalPrice = round2(itemsPrice);
  return { itemsPrice, totalPrice };
};
