// 'use client'
import productsService from "@/lib/services/productService";
import { OrderDetail } from "@/lib/models/OrderModel";
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
    id,
    items,
    customerId,
    canteenId,
    paymentMethod,
    itemsPrice,
    status,
    createdAt,
    readBy,
  } = await request.json();

  //   const hashedPassword = bcrypt.hashSync(password, 5);
  

  const newOrder = {
    id,
    items,
    customerId,
    canteenId,
    paymentMethod,
    itemsPrice,
    status,
    createdAt,
    readBy,
  } as OrderDetail;
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
