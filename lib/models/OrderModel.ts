export type OrderDetail = {
  id?: string;
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
export type dataStatistic={
  Date: string;
  TotalTransaksi: number;
  Pendapatan: number;
}

export type OrderItem = {
  name: string;
  slug: string;
  qty: number;
  image: string;
  id?: string;
  price: number;
  canteenId: string;
  
  
};
export type Order = {
  id?: string;
  readBy: {
    customer: boolean;
    canteen: boolean;
  };
  customerId: string;
  canteenId: string;
  status: number;
};
