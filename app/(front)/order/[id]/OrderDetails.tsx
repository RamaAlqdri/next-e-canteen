"use client";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { OrderItem } from "@/lib/models/OrderModel";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { formatRupiah } from "@/lib/utils";

export default function OrderDetails({
  orderId,
  paypalClientId,
}: {
  orderId: string;
  paypalClientId: string;
}) {
  const { data: session } = useSession();

  function createPayPalOrder() {
    console.log(orderId);
    return fetch(`/api/orders/${orderId}/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }
  function onApprovePayPalOrder(data: any) {
    console.log(orderId);
    return fetch(`/api/orders/${orderId}/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((orderData) => {
        toast.success("Order paid successfully");
      });
  }

  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return "Loading...";

  const {
    paymentMethod,
    items,
    itemsPrice,
    totalPrice,
    isPaid,
    paidAt,
  } = data;
  return (
    <div>
      <h1 className="text-2xl py-4">Order {orderId}</h1>
      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        <div className="md:col-span-3">
          <div className="card bg-base-300">
          </div>
          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Payment Method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <div className="text-success">Paid at {paidAt}</div>
              ) : (
                <div className="text-error">Not Paid</div>
              )}
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Items</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: OrderItem) => (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="px-2">
                            {item.name}
                          </span>
                        </Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>Rp {formatRupiah(item.price)},00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>Rp {formatRupiah(itemsPrice)},00</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>Rp {formatRupiah(totalPrice)},00</div>
                  </div>
                </li>
                <li></li>
                {!isPaid && paymentMethod === "PayPal" && (
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PayPalButtons
                      createOrder={createPayPalOrder}
                      onApprove={onApprovePayPalOrder}
                    />
                  </PayPalScriptProvider>
                )}
                {/* {session?.user.isAdmin &&(
                    <li>
                        <button
                        onClick={()=>payOrder()}
                        disabled = {isPaying}
                        className="btn w-full my-2"
                        >
                          {isPaying && <span className="loading loading-spinner"></span>}
                          Mark as paid

                        </button>
                    </li>
                )} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
