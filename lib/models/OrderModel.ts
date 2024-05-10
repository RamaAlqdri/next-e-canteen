export type Order = {
  _id: string;
  // user?: { name: string };
  items: [OrderItem];
  customerId: string;
  canteenId: string;
  paymentMethod: string;
  itemsPrice: number;
  status: number;
  createdAt: string;
};

export type OrderItem = {
  name: string;
  slug: string;
  qty: number;
  image: string;
  _id: string;
  price: number;
  canteenId: string;
};
