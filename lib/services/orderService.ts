import { cache } from "react";
import { OrderDetail } from "../models/OrderModel";
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
  updateDoc,
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

async function getRealTimeOrderById(orderId: string): Promise<OrderDetail> {
  try {
    const q = query(
      collection(db, "order"),
      where("id", "==", orderId),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let order: OrderDetail = {} as OrderDetail;
      snapshot.forEach((doc) => {
        order = doc.data() as OrderDetail;
      });
      // Do something with the real-time order data
      // console.log("Real-time order data:", order);
    });
    return {} as OrderDetail;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return {} as OrderDetail;
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

async function createOrder(order: OrderDetail) {
  try {
    const docRef = doc(db, "order", order.id as string);
    await setDoc(docRef, order);
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
async function updateReadOrder(orderId: string) {
  // const readBy = {
  //   canteen: true,
  // };
  try {
    const orderRef = doc(db, "order", orderId);
    await updateDoc(orderRef, {
      'readBy.canteen': true,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
  }
}

async function getOrderById(orderId: string): Promise<OrderDetail> {
  try {
    const q = query(
      collection(db, "order"),
      where("id", "==", orderId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let order: OrderDetail = {} as OrderDetail;
    querySnapshot.forEach((doc) => {
      order = doc.data() as OrderDetail;
    });
    return order as OrderDetail;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return {} as OrderDetail;
  }
}
async function getAllOrderByUserId(userId: string): Promise<OrderDetail[]> {
  try {
    const q = query(collection(db, "order"), where("customerId", "==", userId));
    const querySnapshot = await getDocs(q);
    let orders: OrderDetail[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as OrderDetail);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return [];
  }
}
async function getAllOrderByCanteenId(
  canteenId: string
): Promise<OrderDetail[]> {
  try {
    const q = query(
      collection(db, "order"),
      where("canteenId", "==", canteenId)
    );
    const querySnapshot = await getDocs(q);
    let orders: OrderDetail[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as OrderDetail);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return [];
  }
}
async function getAllOrderByCanteenIdAndStatus(
  canteenId: string,
  status: number
): Promise<OrderDetail[]> {
  try {
    const q = query(
      collection(db, "order"),
      where("canteenId", "==", canteenId),
      where("status", "==", status)
    );
    const querySnapshot = await getDocs(q);
    let orders: OrderDetail[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as OrderDetail);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return [];
  }
}
async function getAllOrder(): Promise<OrderDetail[]> {
  try {
    const q = query(collection(db, "order"));
    const querySnapshot = await getDocs(q);
    let orders: OrderDetail[] = [];
    querySnapshot.forEach((doc) => {
      orders.push(doc.data() as OrderDetail);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching order data:", error);
    return [];
  }
}

const ordersService = {
  getAllOrder,
  updateReadOrder,
  createOrder,
  getOrderById,
  getAllOrderByUserId,
  getAllOrderByCanteenId,
  getRealTimeOrderById,
  updateOrderStatus,
  getAllOrderByCanteenIdAndStatus,
};
export default ordersService;
