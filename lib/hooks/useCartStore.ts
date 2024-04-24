import { create } from "zustand";
import { round2 } from "../utils";
import { OrderItem, OrderBy, Order } from "../models/OrderModel";
import { persist } from "zustand/middleware";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  // taxPrice: number;
  // shippingPrice: number;
  totalPrice: number;
  paymentMethod: string;
  orderBy: OrderBy;
};
const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  // taxPrice: 0,
  // shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: "Paypal",
  orderBy: {
    fullName: "",
    email: "",
  },
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
    totalPrice,
    paymentMethod,
    orderBy,
  } = cartStore();
  return {
    items,
    itemsPrice,
    // taxPrice,
    // shippingPrice,
    totalPrice,
    paymentMethod,
    orderBy,
    increase: (item: OrderItem) => {
      const exist = items.find((x) => x._id === item._id );
      const updateCartItems = exist
        ? items.map((x) =>
            x._id === item._id  ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, totalPrice } =
        calcPrice(updateCartItems);
      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        // shippingPrice,
        // taxPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x) => x._id === item._id);
      if (!exist) return;
      const updateCartItems =
        exist.qty === 1
          ? items.filter((x: OrderItem) => x._id !== item._id)
          : items.map((x) =>
              x._id === item._id ? { ...exist, qty: exist.qty - 1 } : x
            );

      const { itemsPrice,totalPrice } =
        calcPrice(updateCartItems);
      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        // shippingPrice,
        // taxPrice,
        totalPrice,
      });
    },
    saveOrderBy: (orderBy: OrderBy) => {
      cartStore.setState({
        orderBy,
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
  return { itemsPrice,totalPrice };
};
