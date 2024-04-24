export type Order = {
  _id: string;
  // user?: { name: string };
  items: [OrderItem];
  orderBy?: {
    fullName: string;
    email: string;
  };
  paymentMethod: string;
  paymentResult?: { id: string; status: string; email_address: string };
  itemsPrice: number;
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
};

export type OrderItem = {
  name: string;
  slug: string;
  qty: number;
  image: string;
  price: number;
  canteenId: string;
};

export type OrderBy = {
  fullName: string;
  email: string;
};
