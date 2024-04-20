// 'use client'
import productsService from "@/lib/services/productService";
import { Order } from "@/lib/models/OrderModel";
import ordersService from "@/lib/services/orderService";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hello: "world",
  });
}

export const POST = async (req: Request) => {
  try {
    const order = await req.json();

    const transaction_id = `TRX-${nanoid(4)}-${nanoid(8)}`;

    const gross_amount = order.itemsPrice;
    const authString = btoa(`${process.env.NEXT_PUBLIC_MITRANS_SERVER_KEY}:`);

    const payload = {
      transaction_details: {
        order_id: transaction_id,
        gross_amount: gross_amount,
      },
      item_details: order.items.map((item: any) => ({
        // id: item._id,
        price: item.price,
        quantity: item.qty,
        name: item.name,
      })),
      customer_details: {
        first_name: order.orderBy.fullName,
        email: order.orderBy.email,
      },
    };
    console.log(payload);
    console.log(process.env.NEXT_PUBLIC_MITRANS_BASE_URL);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MITRANS_BASE_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${authString}`,
        },
        body: JSON.stringify(payload),
      }
    );
    console.log(response);

    const data = await response.json();

    if (response.status != 201) {
      return NextResponse.json({
        status: "error",
        message: "Failed to create transactions",
      });
    }
    console.log(data);

    await Promise.all([
      ordersService.createOrder(
        order.paymentMethod,
        order.items,
        order.orderBy,
        gross_amount,
        transaction_id
      ),
    ]);

    return NextResponse.json({
      status: "success",
      data: {
        id: transaction_id,
        status: "PENDING",
        customer_name: order.orderBy.fullName,
        customer_email: order.orderBy.email,
        products: order.items,
        snap_token: data.token,
        snap_redirect_url: data.redirect_url,
      },
    });
  } catch (error: any) {
    return NextResponse.error;
  }
};
