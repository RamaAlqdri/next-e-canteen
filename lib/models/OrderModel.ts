export type OrderDetail = {
  _id: string;
  // user?: { name: string };
  items: [OrderItem];
  customerId: string;
  canteenId: string;
  paymentMethod: string;
  itemsPrice: number;
  status: number;
  createdAt: string;
  readBy: {
    customer: boolean;
    canteen: boolean;
  };
};
export type Order = {
  _id: string;
  readBy: {
    customer: boolean;
    canteen: boolean;
  };
  customerId: string;
  canteenId: string;
  status: number;
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
