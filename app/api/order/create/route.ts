// 'use client'
import productsService from "@/lib/services/productService";
import { Order } from "@/lib/models/OrderModel";
import ordersService from "@/lib/services/orderService";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// export async function GET() {
//   return NextResponse.json({
//     hello: "world",
//   });
// }

export const POST = async (request: NextRequest) => {
  //   const session = useSession();

  const {
    _id,
    items,
    orderBy,
    canteenSlug,
    paymentMethod,
    itemsPrice,
    status,
    createdAt,
  } = await request.json();

  //   const hashedPassword = bcrypt.hashSync(password, 5);
  

  const newOrder = {
    _id,
    items,
    orderBy,
    canteenSlug,
    paymentMethod,
    itemsPrice,
    status,
    createdAt,
  } as Order;
  try {
    ordersService.createOrder(newOrder);
    // userService.createUser(newUser);

    return Response.json(
      { message: "Pesanan Dibuat" },
      {
        status: 201,
      },
      
    );
  } catch (err: any) {
    return Response.json(
      { message: "Gagal Membuat Pesanan" },
      {
        status: 500,
      }
    );
  }
};
