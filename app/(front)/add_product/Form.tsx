"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";

type Inputs = {
  category: string;
  countInStock: number;
  description: string;
  name: string;
  price: number;
  //   image: string;
};

const Form = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  //   let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      category: "",
      countInStock: 0,
      description: "",
      name: "",
      price: 0,
      //   confirmPassword: "",
    },
  });
  const [countInStock, setCountInStock] = useState(0);

  const handleIncrement = () => {
    setCountInStock(countInStock + 1);
  };

  const handleDecrement = () => {
    if (countInStock > 0) {
      setCountInStock(countInStock - 1);
    }
  };

  //   useEffect(() => {
  //     if (session && session.user) {
  //       router.push(callbackUrl);
  //     }
  //   }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { category, countInStock, name, price, description } = form;
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          countInStock,
          name,
          price,
          description,
          session,
          
        }),
      });
      console.log(res);
      if (res.ok) {
        return router.back();
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
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Tambah Product</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
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
              className="input input-bordered w-full max-w-sm"
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
              className="select select-bordered w-full max-w-sm"
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
              className="input input-bordered w-full max-w-sm"
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
              className="input input-bordered w-full max-w-sm"
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
                className="btn btn-sm btn-outline"
              >
                -
              </button>
              <input
                type="text"
                id="countInStock"
                value={countInStock}
                readOnly
                className="input input-bordered w-full max-w-sm text-center"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="btn btn-sm btn-outline"
              >
                +
              </button>
            </div>
          </div>
          <div className="my-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Buat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;