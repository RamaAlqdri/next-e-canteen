import { cache } from "react";
import { Product } from "../models/ProductModels";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  limit,
} from "firebase/firestore";

export const revalidate = 3600;

async function getProductBySlugWithoutCanteen(productSlug:string): Promise<Product> {
  try {
      const kantinRef = collection(db, "canteen");
      const snapShot = await getDocs(kantinRef);
      let product : Product = {} as Product;
    
      // Gunakan map untuk membuat array dari seluruh janji productItem
      const productPromises = snapShot.docs.map(async (doc) => {
        const kantinId = doc.id;
        const productRef = collection(db, "canteen", kantinId, "product");
        const productSnap = await getDocs(productRef);
        
        // Masukkan semua item produk ke dalam productList
        productSnap.forEach((doc) => {
          if(doc.data().slug === productSlug){
            product = doc.data() as Product;
          }
        });
      });
    
      // Tunggu hingga semua janji productItem selesai
      await Promise.all(productPromises);
    
      return product;
     // or any default value you prefer
    } catch (error) {
    console.error("Error fetching product data:", error);
    return {} as Product;
  }
}

async function getProductBySlug(
  canteenId: string,
  slug: string
): Promise<Product> {
  try {
    const productRef = query(
      collection(db, "canteen", canteenId, "product"),
      where("slug", "==", slug),
      limit(1)
    );
    const productData = await getDocs(productRef);
    return productData.docs[0].data() as Product;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {} as Product;
  }
}
async function getProductByCanteenSlug(canteenSlug:string): Promise<Product[]> {
  try {
    const productRef = query(
      collection(db, "canteen"),
      where("slug", "==", canteenSlug),
      limit(1)
    );
    const productData = await getDocs(productRef);
    return productData.docs[0].data() as Product[];
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {} as Product[];
  }
}

async function getAllProductsFromCanteen(
  canteenId: string
): Promise<Product[]> {
  try {
    const productRef = collection(db, "canteen", canteenId, "product");
    const snapShot = await getDocs(productRef);
    let productList: Product[] = [];
    snapShot.forEach((doc) => {
      productList.push(doc.data() as Product);
    });
    return productList;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [] as Product[];
  }
}

const getProduct = cache(async () => {
  try {
    const kantinRef = collection(db, "canteen");
    const snapShot = await getDocs(kantinRef);
    let productList: Product[] = [];

    // Gunakan map untuk membuat array dari seluruh janji productItem
    const productPromises = snapShot.docs.map(async (doc) => {
      const kantinId = doc.id;
      const productRef = collection(db, "canteen", kantinId, "product");
      const productSnap = await getDocs(productRef);

      // Masukkan semua item produk ke dalam productList
      productSnap.forEach((doc) => {
        productList.push(doc.data() as Product);
      });
    });

    // Tunggu hingga semua janji productItem selesai
    await Promise.all(productPromises);

    return productList;
    // or any default value you prefer
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [] as Product[];
  }
});

async function getAllProducts(): Promise<Product[]> {
  try {
    const kantinRef = collection(db, "canteen");
    const snapShot = await getDocs(kantinRef);
    let productList: Product[] = [];

    // Gunakan map untuk membuat array dari seluruh janji productItem
    const productPromises = snapShot.docs.map(async (doc) => {
      const kantinId = doc.id;
      const productRef = collection(db, "canteen", kantinId, "product");
      const productSnap = await getDocs(productRef);

      // Masukkan semua item produk ke dalam productList
      
      productSnap.forEach((doc) => {
        // console.log(doc.ref.parent.parent?.id);
        productList.push(doc.data() as Product);
      });
    });

    // Tunggu hingga semua janji productItem selesai
    await Promise.all(productPromises);
    // console.log(productList);

    return productList;
    // or any default value you prefer
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [] as Product[];
  }
}

const productsService = {
  getAllProducts,
  getProduct,
  getProductBySlug,
  getAllProductsFromCanteen,
  getProductBySlugWithoutCanteen,
};
export default productsService;
