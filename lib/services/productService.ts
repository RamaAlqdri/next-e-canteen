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
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


export const revalidate = 3600;

async function getProductBySlugWithoutCanteen(
  productSlug: string
): Promise<Product> {
  try {
    const kantinRef = collection(db, "canteen");
    const snapShot = await getDocs(kantinRef);
    let product: Product = {} as Product;

    // Gunakan map untuk membuat array dari seluruh janji productItem
    const productPromises = snapShot.docs.map(async (doc) => {
      const kantinId = doc.id;
      const productRef = collection(db, "canteen", kantinId, "product");
      const productSnap = await getDocs(productRef);

      // Masukkan semua item produk ke dalam productList
      productSnap.forEach((doc) => {
        if (doc.data().slug === productSlug) {
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
async function getProductIdByProductSlugandCanteenSlug(
  productSlug: string,
  canteenSlug: string
): Promise<string> {
  try {
    const kantinRef = query(
      collection(db, "canteen"),
      where("slug", "==", canteenSlug),
      limit(1)
    );
    const kantinData = await getDocs(kantinRef);
    const productRef = query(
      collection(db, "canteen", kantinData.docs[0].id, "product"),
      where("slug", "==", productSlug),
      limit(1)
    );
    const productData = await getDocs(productRef);
    return productData.docs[0].id;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return "" as string;
  }
}

async function updateProduct(slugBefore: string, product: Product) {
  try {
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", product.canteenId),
      limit(1)
    );
    const canteenData = await getDocs(canteenRef);
    const productRef = collection(
      db,
      "canteen",
      canteenData.docs[0].id,
      "product"
    );
    const productId = await getProductIdByProductSlugandCanteenSlug(
      slugBefore,
      product.canteenId
    );
    await updateDoc(doc(productRef, productId), {
      canteenId: product.canteenId,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
      slug: product.slug,
      image: product.image,
      rating: product.rating,
      numReviews: product.numReviews,
    });
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

async function deleteProduct(canteenSlug: string, productSlug: string) {
  try {
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", canteenSlug),
      limit(1)
    );
    const canteenData = await getDocs(canteenRef);
    // const productRef = collection(
    //   db,
    //   "canteen",
    //   canteenData.docs[0].id,
    //   "product"
    // );
    console.log(canteenData);
    const productId = await getProductIdByProductSlugandCanteenSlug(
      productSlug,
      canteenSlug
    );
    console.log(productId);
    const productRef = doc(
      db,
      "canteen",
      canteenData.docs[0].id,
      "product",
      productId
    );
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product:", error);
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
// async function getProductByCanteenSlug(
//   canteenSlug: string
// ): Promise<Product[]> {
//   try {
//     const productRef = query(
//       collection(db, "canteen"),
//       where("slug", "==", canteenSlug),
//       limit(1)
//     );
//     const productData = await getDocs(productRef);
//     return productData.docs[0].data() as Product[];
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     return {} as Product[];
//   }
// }

async function getAllProductsFromCanteen(
  canteenId: string
): Promise<Product[]> {
  try {
    const productRef = collection(db, "canteen", canteenId, "product");
    const snapShot = await getDocs(productRef);

    let productList: Product[] = [];
    snapShot.forEach((doc) => {
      // console.log(doc.data());
      productList.push(doc.data() as Product);
    });
    // console.log(productList);
    return productList;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [] as Product[];
  }
}
async function getProductByCanteenSlug(canteenSlug:string):Promise<Product[]>{
  try{
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", canteenSlug),
      limit(1)
    );
    const canteenData = await getDocs(canteenRef);
    const productRef = query(
      collection(db, "canteen", canteenData.docs[0].id, "product")
    );
    const productData = await getDocs(productRef);
    let productList: Product[] = [];
    productData.forEach((doc) => {
      productList.push(doc.data() as Product);
    });
    return productList;
  }catch(error){
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

    // Gunakan map untuk membuat array dari janji-janji produk
    const productPromises = snapShot.docs.map(async (doc) => {
      const kantinId = doc.id;
      const productRef = collection(db, "canteen", kantinId, "product");
      const productSnap = await getDocs(productRef);

      // Mengembalikan array produk
      return productSnap.docs.map((doc) => doc.data() as Product);
    });

    // Tunggu hingga semua janji produk selesai
    const productLists = await Promise.all(productPromises);

    // Gabungkan semua produk menjadi satu array
    const allProducts = productLists.flat();

    return allProducts;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [] as Product[];
  }
}

async function createProduct(product: Product) {
  try {
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", product.canteenId),
      limit(1)
    );
    const canteenData = await getDocs(canteenRef);

    const productRef = collection(
      db,
      "canteen",
      canteenData.docs[0].id,
      "product"
    );
    await setDoc(doc(productRef), {
      canteenId: product.canteenId,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
      slug: product.slug,
      image: product.image,
      rating: product.rating,
      numReviews: product.numReviews,
    });

    const productId = await getProductIdByProductSlugandCanteenSlug(
      product.slug,
      product.canteenId
    );
    await updateDoc(doc(productRef, productId), {
      _id: productId,
    });
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

async function getProductByCategoryByCanteenSlug(
  canteenSlug: string,
  category: string
): Promise<Product[]> {
  try {
    const canteenRef = query(
      collection(db, "canteen"),
      where("slug", "==", canteenSlug),
      limit(1)
    );
    const canteenData = await getDocs(canteenRef);
    const productRef = query(
      collection(db, "canteen", canteenData.docs[0].id, "product"),
      where("category", "==", category)
    );
    const productData = await getDocs(productRef);
    let productList: Product[] = [];
    productData.forEach((doc) => {
      productList.push(doc.data() as Product);
    });
    return productList;
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
  getProductByCategoryByCanteenSlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCanteenSlug,
};
export default productsService;
