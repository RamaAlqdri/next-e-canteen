"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import CheckoutSteps from "@/components/CheckoutSteps";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { formatRupiah } from "@/lib/utils";
import orderService from "@/lib/services/orderService";
import { Order } from "@/lib/models/OrderModel";
import useSnap from "@/lib/hooks/useSnap";

const Form = () => {
  const router = useRouter();
  const { paymentMethod, orderBy, items, itemsPrice, totalPrice, clear } =
    useCartService();

  const placeOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          orderBy: orderBy,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          isPaid: false,
          createdAt: new Date().toISOString(),
        }),
      });
      // console.log(data)
      console.log(response);

      if (!response.ok) {
        console.log(response);
        throw new Error(
          "Failed to place order. Server responded with status: " +
            response.status
        );
      }

      const data = await response.json();
      console.log(data);
      console.log("tes");
      clear();
      snapEmbed(data.data.snap_token,'snap-container',{
        onSuccess: function (result:any) {
          console.log("success", result);
          // setSnapShow(false)
        },
        onPending: function (result:any) {
          console.log("pending", result);
          // setSnapShow(false)
        },
        onClose: function () {
          // setSnapShow(false)
        },

      })
      toast.success("Order placed successfully");
      // router.push("/");
      // Redirect or handle response data as needed
    } catch (error: any) {
      console.error("Error placing order:", error.message);
      toast.error("Failed to place order. Please try again later.");
      // Additional error handling if needed
    }
  };

  const {snapEmbed} = useSnap();

  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      // return router.push("/");
    }
  }, [items.length, paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;

  return (
    <div>
      <CheckoutSteps current={3} />
      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card bg-white">
            <div className="card-body">
              <h2 className="card-title">Identitas</h2>
              <p>{orderBy.fullName}</p>
              <p>{orderBy.email}</p>
              <div>
                <Link className="btn btn-accent border-neutral border-2 hover:bg-neutral hover:border-neutral" href="/shipping">
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="card bg-white mt-4">
            <div className="card-body">
              <h2 className="card-title">Metode Pembayaran</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link className="btn btn-accent border-neutral border-2 hover:bg-neutral hover:border-neutral" href="/payment">
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="card bg-white mt-4">
            <div className="card-body">
              <h2 className="card-title">Pesanan</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>Rp {formatRupiah(item.price)},00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="btn btn-accent border-neutral border-2 hover:bg-neutral hover:border-neutral" href="/cart">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-white">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <ul className="space-y-3">
                <li>
                  <div className="flex justify-between">
                    <div>Items</div>
                    <div>Rp {formatRupiah(itemsPrice)},00</div>
                  </div>
                </li>

                <li>
                  <div className="flex justify-between">
                    <div>Total</div>
                    <div>Rp {formatRupiah(totalPrice)},00</div>
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => placeOrder()}
                    // disabled={isPlacing}
                    className="btn btn-ePrimary border-0  w-full"
                  >
                    {/* {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )} */}
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div id="snap-container"></div>
    </div>
  );
};
export default Form;
