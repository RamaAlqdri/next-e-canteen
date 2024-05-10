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
  onSnapshot,
} from "firebase/firestore";
import { set } from "firebase/database";

export const revalidate = 3600;

// async function createOrder(paymentMethod: String, items: any, orderBy: any , itemsPrice: number, _id: string) {
//   const order = {
//     items: items,
//     orderBy: orderBy,
//     paymentMethod: paymentMethod,
//     itemsPrice: itemsPrice,
//     isPaid: false,
//     createdAt: new Date().toISOString(),
//   };
//   console.log(order);
//   try{
//     await setDoc(doc(db, "order", _id), order);
//   }catch (error){
//     console.error("Error creating order:", error);
//   }
// }

async function getRealTimeOrderById(orderId: string): Promise<Order> {
  try {
    const q = query(collection(db, "order"), where("_id", "==", orderId), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let order: Order = {} as Order;
      snapshot.forEach((doc) => {
        order = doc.data() as Order;
      });
      // Do something with the real-time order data
      console.log("Real-time order data:", order);
    });
    return {} as Order;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return {} as Order;
  }
}

async function updateOrderStatus(orderId: string, status: number) {
  try {
    const orderRef = doc(db, "order", orderId);
    await setDoc(orderRef, { status: status }, { merge: true });
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}

async function createOrder(order: Order) {
  
  try{
    await setDoc(doc(db, "order", order._id), order);
  }catch (error){
    console.error("Error creating order:", error);
  }
}

async function getOrderById(orderId: string): Promise<Order> {
  try{

    const q = query(collection(db, "order"), where("_id", "==", orderId), limit(1));
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
async function getAllOrderByUserId(userId: string): Promise<Order[]> {
  try{
    const q = query(collection(db, "order"), where("orderBy.email", "==", userId));
    const querySnapshot = await getDocs(q);
    let orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    return orders;
  }catch(error){
    console.error("Error fetching order data:", error);
    return [];
  }
}
async function getAllOrderByCanteenSlug(canteenSlug: string): Promise<Order[]> {
  try{
    const q = query(collection(db, "order"), where("canteenSlug", "==", canteenSlug));
    const querySnapshot = await getDocs(q);
    let orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    return orders;
  }catch(error){
    console.error("Error fetching order data:", error);
    return [];
  }
}
async function getAllOrderByCanteenSlugAndStatus(canteenSlug: string, status: number): Promise<Order[]> {
  try{
    const q = query(collection(db, "order"), where("canteenSlug", "==", canteenSlug), where("status", "==", status));
    const querySnapshot = await getDocs(q);
    let orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as Order);
    });
    return orders;
  }catch(error){
    console.error("Error fetching order data:", error);
    return [];
  }
}

const ordersService = {
  createOrder,
  getOrderById,
  getAllOrderByUserId,
  getAllOrderByCanteenSlug,
  getRealTimeOrderById,
  updateOrderStatus,
  getAllOrderByCanteenSlugAndStatus,
  
};
export default ordersService;
