"use client";
import { useEffect, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";
import ImageUpload from "@/components/image/ImageUpload";
import Image from "next/image";
import { Product } from "@/lib/models/ProductModels";

type Inputs = {
  slugBefore: string;
  category: string;
  countInStock: number;
  description: string;
  name: string;
  price: number;
  //   image: string;
};

const Form = ({ product, canteenId }: { product: Product, canteenId:string }) => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  console.log(product);

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleUpload = (imageUrl: any) => {
    setUploadedImageUrl(imageUrl);
  };
  //   let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      slugBefore: product.slug,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
      name: product.name,
      price: product.price,
      //   confirmPassword: "",
    },
  });
  const [countInStockValue, setCountInStock] = useState(product.countInStock);

  const handleIncrement = () => {
    setCountInStock(countInStockValue + 1);
  };

  const handleDecrement = () => {
    if (countInStockValue > 0) {
      setCountInStock(countInStockValue - 1);
    }
  };

  //   useEffect(() => {
  //     if (session && session.user) {
  //       router.push(callbackUrl);
  //     }
  //   }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    form.countInStock = countInStockValue;
    const { slugBefore, category, countInStock, name, price, description } =
      form;

    // console.log(form);
    try {
      const res = await fetch("/api/products/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slugBefore,
          category,
          countInStock,
          name,
          price,
          description,
          canteenId,
        }),
      });

      if (res.ok) {
        // return router.push(`/canteen/${session?.user.canteen}`);
        return router.back();
        // router.reload();
        // router.refresh
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;
      toast.error(err.message || "error");
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch("/api/products/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slugBefore: product.slug,
          canteenId: product.canteenId,
        }),
      });
      console.log(res);
      if (res.ok) {
        // return router.push(`/canteen/${session?.user.canteen}`);
        return router.back();
        // router.reload();
        // router.refresh
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "Email is duplicate"
          : err.message;
      toast.error(err.message || "error");
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-6">
      <div className="lg:col-span-4 shadow-md rounded-2xl w-full bg-white my-4">
        <div className="card-body">
          <h1 className="card-title">Sunting Product</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            {/* <ImageUpload onUpload={handleUpload} /> */}
            {/* {uploadedImageUrl && (
            <div>
              <h2>Uploaded Image Preview:</h2>
              <Image
                src={uploadedImageUrl}
                alt="Uploaded"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            </div>
          )} */}
            <div className="my-2">
              <label htmlFor="name" className="label">
                Nama Produk
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Nama produk dibutuhkan",
                })}
                className="text-medium py-2 px-4 border border-gray-300 rounded-lg bg-gray-100 w-full max-w-sm "
              />
              {errors.name?.message && (
                <div className="text-error">{errors.name.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="category" className="label">
                Kategori
              </label>
              <select
                id="category"
                {...register("category", {
                  required: "Kategori produk dibutuhkan",
                })}
                className="select select-bordered bg-gray-100 w-full max-w-sm"
              >
                {/* <option value="">Pilih Kategori</option> */}
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="cemilan">Cemilan</option>
              </select>
              {errors.category?.message && (
                <div className="text-error">{errors.category.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="description" className="label">
                Deskripsi
              </label>
              <input
                type="text"
                id="description"
                {...register("description", {
                  required: "Deskripsi produk dibutuhkan",
                })}
                className="input input-bordered w-full max-w-sm bg-gray-100"
              />
              {errors.description?.message && (
                <div className="text-error">{errors.description.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="price" className="label">
                Harga
              </label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Harga produk dibutuhkan",
                })}
                className="input input-bordered w-full max-w-sm bg-gray-100"
              />
              {errors.price?.message && (
                <div className="text-error">{errors.price.message}</div>
              )}
            </div>
            <div className="my-2">
              <label htmlFor="countInStock" className="label">
                Stok
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="btn btn-ePrimary border-0"
                >
                  -
                </button>
                <input
                  type="text"
                  id="countInStock"
                  value={countInStockValue}
                  readOnly
                  className="input input-bordered w-full max-w-sm text-center bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="btn btn-ePrimary border-0"
                >
                  +
                </button>
              </div>
            </div>
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ePrimary border-0  w-full"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Ubah
              </button>
            </div>
          </form>
          <button
            // type="submit"
            // disabled={isSubmitting}
            onClick={deleteProduct}
            className="btn btn-Delete border-0  w-full"
          >
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
