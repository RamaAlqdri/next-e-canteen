"use client";

import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import ProductItem from "@/components/products/ProductItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddToCart from "@/components/products/AddToCart";
import { formatRupiah } from "@/lib/utils";

const Detail = ({
  canteen,
  product,
}: {
  canteen: Canteen;
  product: Product;
}) => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  const back = () => {
    router.back();
  };
  const editProduct = () => {
    router.push(`/edit_product/${canteen.slug}/${product.slug}`);
  }

  return (
    <>
      <div className="my-2">
        <button onClick={back}> back</button>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <button
          //   onClick={fetchProducts}
          onClick={editProduct}
          className="flex  items-center font-normal hover:bg-[#FFEBD7] text-sm p-1 rounded-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.4549 5.41595C21.5499 5.56016 21.5922 5.73273 21.5747 5.90454C21.5573 6.07634 21.481 6.23685 21.3589 6.35895L12.1659 15.551C12.0718 15.6449 11.9545 15.7122 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.744C7.48485 16.7097 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0905 7.04888 15.9575 7.08189 15.831L8.08189 12.003C8.11109 11.888 8.16616 11.7813 8.24289 11.691L17.4699 2.46995C17.6105 2.3295 17.8011 2.25061 17.9999 2.25061C18.1986 2.25061 18.3893 2.3295 18.5299 2.46995L21.3589 5.29795C21.3948 5.33396 21.4269 5.37349 21.4549 5.41595ZM19.7679 5.82795L17.9999 4.06095L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.82795Z"
              fill="#EEA147"
            />
            <path
              d="M19.6411 17.16C19.9144 14.824 20.0017 12.4699 19.9021 10.12C19.8999 10.0646 19.9092 10.0094 19.9293 9.95782C19.9494 9.9062 19.98 9.85928 20.0191 9.82001L21.0031 8.83601C21.0299 8.80897 21.0641 8.79027 21.1013 8.78215C21.1386 8.77404 21.1774 8.77686 21.2131 8.79027C21.2488 8.80368 21.2799 8.82712 21.3026 8.85776C21.3253 8.88841 21.3386 8.92495 21.3411 8.96301C21.5263 11.7542 21.456 14.5566 21.1311 17.335C20.8951 19.357 19.2711 20.942 17.2581 21.167C13.7634 21.554 10.2367 21.554 6.74206 21.167C4.73006 20.942 3.10506 19.357 2.86906 17.335C2.45446 13.7904 2.45446 10.2096 2.86906 6.66501C3.10506 4.64301 4.72906 3.05801 6.74206 2.83301C9.39443 2.53889 12.0668 2.46764 14.7311 2.62001C14.7692 2.62275 14.8057 2.63635 14.8364 2.65922C14.867 2.68209 14.8904 2.71325 14.9039 2.74903C14.9174 2.78481 14.9203 2.82369 14.9124 2.86108C14.9044 2.89847 14.8859 2.93281 14.8591 2.96001L13.8661 3.95201C13.8272 3.99076 13.7807 4.02113 13.7297 4.04125C13.6786 4.06137 13.6239 4.07082 13.5691 4.06901C11.3458 3.99343 9.12001 4.07866 6.90906 4.32401C6.263 4.39552 5.65991 4.68273 5.19721 5.13926C4.73451 5.59579 4.43923 6.19497 4.35906 6.84001C3.9581 10.2683 3.9581 13.7317 4.35906 17.16C4.43923 17.805 4.73451 18.4042 5.19721 18.8608C5.65991 19.3173 6.263 19.6045 6.90906 19.676C10.2641 20.051 13.7361 20.051 17.0921 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8608C19.2666 18.4042 19.5609 17.805 19.6411 17.16Z"
              fill="#EEA147"
            />
          </svg>
        </button>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{canteen.name}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card bg-gray-200 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>Rp {formatRupiah(product.price)},00</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>
              {session?.user.canteen !== canteen.slug &&
                product.countInStock !== 0 && (
                  <div className="card-actions justify-center">
                    <AddToCart item={{ ...product, qty: 0 }} />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
