import { cache } from "react";
import { Order } from "../models/OrderModel";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { set } from "firebase/database";

export const revalidate = 3600;

// async function getOrderById(orderId: string): Promise<Order> {
//     try{
        
//     }catch{

//     }
// }
// paymentMethod,
// orderBy,
// items,
// itemsPrice,
// totalPrice,

// export type Order = {
//   _id: string;
//   // user?: { name: string };
//   items: [OrderItem];
//   orderBy?: {
//     fullName: string;
//     email: string;
//   };
//   paymentMethod: string;
//   paymentResult?: { id: string; status: string; email_address: string };
//   itemsPrice: number;
//   isPaid: boolean;
//   paidAt?: string;
//   createdAt: string;
// };

async function createOrder(paymentMethod: String, items: any, orderBy: any , itemsPrice: number, _id: string) {
  const order = {
    items: items,
    orderBy: orderBy,
    paymentMethod: paymentMethod,
    itemsPrice: itemsPrice,
    isPaid: false,
    createdAt: new Date().toISOString(),
  };
  console.log(order);
  try{
    await setDoc(doc(db, "order", _id), order);
  }catch (error){
    console.error("Error creating order:", error);
  }
}

async function getOrderById(orderId: string): Promise<Order> {
  try{

    const q = query(collection(db, "orders"), where("_id", "==", orderId), limit(1));
    const querySnapshot = await getDocs(q);
    let order: Order = {} as Order;
    querySnapshot.forEach((doc) => {
      order = doc.data() as Order;
    });
    return order as Order;
  }catch(error){
    console.error("Error fetching order data:", error);
    return {} as Order;
  }
}

const ordersService = {
  createOrder,
  getOrderById,
  
};
export default ordersService;
