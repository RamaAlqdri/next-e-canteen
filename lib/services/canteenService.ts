import { cache } from "react";
import { Product } from "../models/ProductModels";
import { db } from "../firebase";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { Canteen } from "../models/CanteenModel";
import { get } from "http";
import exp from "constants";
import { CanteenRequest } from "../models/RequestModel";
import { nanoid } from "nanoid";
import { User } from "firebase/auth";

export const revalidate = 3600;

async function updateCanteenRequestStatus(requestId: string, status: string) {
  try {
    const requestRef = doc(db, "requestCanteen", requestId);
    await updateDoc(requestRef, {
      status: status,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
  }
}
async function getRequestCanteenData(requestId: string): Promise<CanteenRequest> {
  try {
    const requestRef = doc(db, "requestCanteen", requestId);
    const requestDoc = await getDoc(requestRef);
    return requestDoc.data() as CanteenRequest;
  } catch (error) {
    console.error("Error fetching request data:", error);
    return {} as CanteenRequest;
  }
}

async function createRequestCanteen(canteen: Canteen, user:User): Promise<void> {
  try {
    const requestRef = collection(db, "requestCanteen");
    const request_id = `RQS-${nanoid(4)}-${nanoid(8)}`;
    const docRef = doc(requestRef, request_id)
    await setDoc(docRef, {
      id: request_id,
      canteenName: canteen.name,
      canteenLocation: canteen.location,
      // canteenImage?:string;
      canteenDescription: canteen.description,
      canteenPhone: canteen.phone,
      status:"Permintaan",
      user:user
    });
  } catch (error) {
    console.error("Error creating request canteen:", error);
  }
}
async function getAllCanteenRequest(): Promise<CanteenRequest[]> {
  try {
    const docRef = collection(db, "requestCanteen");
    const snapShot = await getDocs(docRef);
    const canteenList: CanteenRequest[] = [];
    snapShot.forEach((doc) => {
      canteenList.push(doc.data() as CanteenRequest);
    });
    return canteenList;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return [];
  }
}

async function getCanteenName(canteenId: string): Promise<string> {
  try {
    console.log(canteenId);
    const canteenRef = doc(db, "canteen", canteenId);
    const canteenData = await getDoc(canteenRef);
    if (canteenData) {
      const nameData = canteenData.data();
      console.log(canteenData.data() as Canteen);
      if (nameData) {
        return nameData.name;
      } else {
        return ""; // or some default image path
      }
    } else {
      console.log("No such document!");
      return ""; // or throw an error if necessary
    }
  } catch (error) {
    console.error("Error fetching canteen name:", error);
    return "";
  }
}

async function createCanteen(canteen: Canteen , id:string): Promise<void> {
  try {
    const transaction_id = `CTN-${nanoid(4)}-${nanoid(8)}`;
    const canteenRef = collection(db, "canteen");
    const docRef = doc(canteenRef, id)
    await setDoc(docRef, {
      id: id,
      name: canteen.name,
      location: canteen.location,
      description: canteen.description,
      image: canteen.image,
      numReviews: canteen.numReviews,
      rating: canteen.rating,
      slug: canteen.slug,
    });

    // Dapatkan ID kantin yang baru dibuat
  } catch (error) {
    console.error("Error creating canteen:", error);
  }
}

async function getCanteenData(canteenId: any): Promise<Canteen> {
  try {
    console.log(canteenId);

    const kantinRef = doc(db, "canteen", canteenId);
    const canteenData = await getDoc(kantinRef);
    console.log(canteenData.data());
    return canteenData.data() as Canteen;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return {} as Canteen;
  }
}
async function updateCanteenData(
  canteenSlug: string,
  canteen: Canteen
): Promise<void> {
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

async function getCanteenImagePath(canteenId: string): Promise<string> {
  try {
    const canteenRef = doc(db, "canteen", canteenId);
    const canteenData = await getDoc(canteenRef);

    if (canteenData.exists()) {
      const imageData = canteenData.data();
      if (imageData) {
        return imageData.image;
      } else {
        return ""; // or some default image path
      }
    } else {
      return ""; // or throw an error if necessary
    }
  } catch (error) {
    console.error("Error fetching canteen image path:", error);
    return "";
  }
}

async function deleteCanteenData(canteenSlug: string): Promise<void> {
  try {
    const canteenId = await getCanteenIdBySlug(canteenSlug);

    // Ambil referensi kantin
    const canteenRef = doc(db, "canteen", canteenId);

    // Ambil referensi produk yang terkait dengan kantin
    const productsSnapshot = await getDocs(
      collection(db, "canteen", canteenId, "product")
    );

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
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", slug),
      limit(1)
    );
    const canteenData = await getDocs(canteenRef);
    return canteenData.docs[0].data() as Canteen;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return {} as Canteen;
  }
}
async function getCanteenIdBySlug(slug: string): Promise<string> {
  try {
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", slug),
      limit(1)
    );
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
    const snapShot = await getDocs(docRef);
    const canteenList: Canteen[] = [];
    snapShot.forEach((doc) => {
      canteenList.push(doc.data() as Canteen);
    });
    return canteenList;
  } catch (error) {
    console.error("Error fetching canteen data:", error);
    return [];
  }
}
const canteenService = {
  getRequestCanteenData,
  updateCanteenRequestStatus,
  getAllCanteenRequest,
  createRequestCanteen,
  getCanteenData,
  getAllCanteenData,
  getCanteenBySlug,
  getCanteenIdBySlug,
  createCanteen,
  updateCanteenData,
  deleteCanteenData,
  getCanteenImagePath,
  getCanteenName,
};
export default canteenService;
