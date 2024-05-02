import { cache } from "react";
import { Product } from "../models/ProductModels";
import { db } from "../firebase";
import { collection,setDoc, doc, getDoc, getDocs, limit, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { Canteen } from "../models/CanteenModel";
import { get } from "http";
import exp from "constants";

export const revalidate = 3600;

async function createCanteen(canteen: Canteen): Promise<void> {

  try {
    
    const docRef = collection(db, "canteen");
    await setDoc(doc(docRef), {
      name: canteen.name,
      location: canteen.location,
      description: canteen.description,
      image: canteen.image,
      numReviews: canteen.numReviews,
      rating: canteen.rating,
      slug: canteen.slug,

    });
  } catch (error) {
    console.error("Error creating canteen:", error);
  }
}

async function getCanteenData(canteenId: string): Promise<Canteen> {
  try {
    const canteenRef = query(collection(db, "canteen"),where("slug", "==", canteenId),limit(1));
    const canteenData0 = await getDocs(canteenRef);
    
    const kantinRef = doc(db, "canteen", canteenData0.docs[0].id);
    const canteenData = await getDoc(kantinRef);

    return canteenData.data() as Canteen;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return {} as Canteen;
  }
}
async function updateCanteenData(canteenSlug: string, canteen: Canteen): Promise<void> {
  try {
    const canteenId = await getCanteenIdBySlug(canteenSlug);
    console.log(canteenId);
    console.log(canteen);
    const canteenRef = doc(db, "canteen", canteenId);
    await updateDoc(canteenRef, {
      name: canteen.name,
      location: canteen.location,
      description: canteen.description,
      // image: canteen.image,
      // numReviews: canteen.numReviews,
      // rating: canteen.rating,
      slug: canteen.slug,
    });
  } catch (error) {
    console.error("Error updating canteen data:", error);
  }
}

async function deleteCanteenData(canteenSlug: string): Promise<void> {
  try {
    const canteenId = await getCanteenIdBySlug(canteenSlug);
    
    // Ambil referensi kantin
    const canteenRef = doc(db, "canteen", canteenId);

    // Ambil referensi produk yang terkait dengan kantin
    const productsSnapshot = await getDocs(collection(db, "canteen", canteenId, "product"));

    // Hapus setiap produk yang terkait
    const productDeletionPromises = productsSnapshot.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });
    await Promise.all(productDeletionPromises);

    // Setelah produk dihapus, hapus kantin itu sendiri
    await deleteDoc(canteenRef);

    console.log("Canteen and associated products deleted successfully.");
  } catch (error) {
    console.error("Error deleting canteen data:", error);
  }
}


async function getCanteenBySlug(slug: string): Promise<Canteen> {
  try {
    const canteenRef = query(collection(db, "canteen"),where("slug", "==", slug),limit(1));
    const canteenData = await getDocs(canteenRef);
    return canteenData.docs[0].data() as Canteen;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return {} as Canteen;
  }
}
async function getCanteenIdBySlug(slug: string): Promise<string> {
  try {
    const canteenRef = query(collection(db, "canteen"),where("slug", "==", slug),limit(1));
    const canteenData = await getDocs(canteenRef);
    return canteenData.docs[0].id;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return "" as string;
  }
}

async function getAllCanteenData(): Promise<Canteen[]> {
  try {
    const docRef = collection(db, "canteen");
    const canteenData = await getDocs(docRef).then((snapShot) => {
      let canteenList: Canteen[] = [];
      snapShot.forEach((doc) => {
        canteenList.push(doc.data() as Canteen);
      });
      return canteenList;
    });
    // console.log(canteenData);
    return canteenData as Canteen[];
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return [] as Canteen[];
  }
}

const canteenService = {
  getCanteenData,
  getAllCanteenData,
  getCanteenBySlug,
  getCanteenIdBySlug,
  createCanteen,
  updateCanteenData,
  deleteCanteenData,
};
export default canteenService;