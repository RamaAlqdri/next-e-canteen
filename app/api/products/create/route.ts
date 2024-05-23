import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { User } from "@/lib/models/UserModel";
import { Canteen } from "@/lib/models/CanteenModel";
import canteenService from "@/lib/services/canteenService";
import productsService from "@/lib/services/productService";
import userService from "@/lib/services/userService";
import { getSession, useSession } from "next-auth/react";
import { Product } from "@/lib/models/ProductModels";
import { parse } from "path";

export const POST = async (request: NextRequest) => {
  //   const session = useSession();

  const { id,category, countInStock, name, price, description, canteenId,image } =
    await request.json();
  //   console.log(countInStock);
  //   console.log("tes")
  //   const { data: session } = useSession();


  //   const hashedPassword = bcrypt.hashSync(password, 5);
  const productSlug = name.toLowerCase().replace(/ /g, "-");
  const existingProduct = await productsService.getProductBySlugByCanteenId(
    canteenId,
    productSlug
  );
  //   const existingCanteen = await canteenService.getCanteenBySlug(slug);
  if (existingProduct.name) {
    console.error("Produk sudah ada");
    return Response.json(
      { message: "Produk sudah ada" },
      {
        status: 400,
      }
    );
  }
  const newProduct = {
    id,
    canteenId: canteenId,
    name,
    slug: productSlug,
    image,
    price: parseInt(price),
    description,
    category,
    rating: 0,
    numReviews: 0,
    countInStock,
  } as Product;
  try {
    // canteenService.createCanteen(newCanteen);
    productsService.createProduct(newProduct);
    // console.log("Product has been created");
    // userService.updateUserRole(session.user.email, "canteen");
    // userService.updateUserCanteen(session.user.email, slug);
    // userService.createUser(newUser);

    return Response.json(
      { message: "Product has been created" },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: "Produk gagal dibuat" },
      {
        status: 500,
      }
    );
  }
};
// export const GET = async (request: NextRequest) => {
//   try {
//     // Ambil kategori dari query parameter
//     const { category, canteenslug } = await request.json();

//     // Pastikan kategori tersedia
//     if (!category) {
//       return Response.json(
//         { message: "Kategori tidak ditemukan" },
//         { status: 400 }
//       );
//     }

//     // Dapatkan produk berdasarkan kategori
//     const products = await productsService.getProductByCategoryByCanteenSlug(
//       category as string,
//       canteenslug as string
//     );

//     // Pastikan produk ditemukan
//     if (!products || products.length === 0) {
//       return Response.json(
//         { message: "Produk tidak ditemukan untuk kategori ini" },
//         { status: 404 }
//       );
//     }

//     // Kirim produk yang ditemukan
//     return Response.json(products, { status: 200 });
//   } catch (error) {
//     // Tangani kesalahan
//     console.error("Error:", error);
//     return Response.json(
//       { message: "Terjadi kesalahan saat mengambil produk" },
//       { status: 500 }
//     );
//   }
// };
