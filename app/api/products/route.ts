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

  const { category, countInStock, name, price, description, session } =
    await request.json();
  console.log(countInStock);
  console.log("tes")
//   const { data: session } = useSession();
  console.log(session);
  const canteenSlug = session?.user.canteen as string;
  //   const hashedPassword = bcrypt.hashSync(password, 5);
  const productSlug = name.toLowerCase().replace(/ /g, "-");
  const existingProduct = await productsService.getProductBySlug(
      canteenSlug,
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
    canteenId: canteenSlug,
    name,
    slug: productSlug,
    image: "/images/product/product2.jpg",
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
