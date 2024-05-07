export type Order = {
  _id: string;
  // user?: { name: string };
  items: [OrderItem];
  orderBy?: {
    fullName: string;
    email: string;
  };
  canteenSlug: string;
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

export type OrderBy = {
  fullName: string;
  email: string;
};
