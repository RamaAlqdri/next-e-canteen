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
import InputWithLabel from "@/components/input/input";
import TextareaWithLabel from "@/components/input/textarea";
import SelectCustom from "@/components/input/select";
import StockCounter from "@/components/input/count";
import { nanoid } from "nanoid";
import imageService from "@/lib/services/imageService";

type Inputs = {
  category: string;
  countInStock: number;
  description: string;
  name: string;
  price: number;
  //   image: string;
};

const Form = ({ canteenId }: { canteenId: string }) => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  console.log(uploadedImageUrl);
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
  const [countInStockValue, setCountInStock] = useState(0);

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
    const { category, countInStock, name, price, description } = form;

    // console.log(form);
    try {
      const id = `PDT-${nanoid(4)}-${nanoid(8)}`;
      const imageUrl = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/product/avatar/${id}`;
      const res = await fetch("/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          category,
          countInStock,
          name,
          image: imageUrl,
          price,
          description,
          canteenId: canteenId,
        }),
      });
      console.log(res);
      if (res.ok) {
        imageService.uploadImage(uploadedImageUrl, "product", id);
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
    <div className=" lg:grid lg:grid-cols-6">
      <div className="lg:col-span-3 my-4">
        <div className="bg-white px-8 py-6 shadow-md rounded-2xl ">
          <h1 className="card-title">Tambah Produk</h1>
          <form onSubmit={handleSubmit(formSubmit)} className="py-2">
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
            <div className="my-3">
              <InputWithLabel
                htmlFor="name"
                label="Nama Produk"
                type="text"
                error={errors.name?.message}
                register={register}
                name="name"
                validationSchema={{
                  required: "Nama produk wajib diisi",
                }}
              />
            </div>
            <div className="my-6">
              <SelectCustom
                htmlFor="category"
                label="Kategori"
                type="select"
                register={register}
                name="category"
                validationSchema={{ required: "Category is required" }}
                error={errors.category?.message}
                options={[
                  { value: "makanan", label: "Makanan" },
                  { value: "minuman", label: "Minuman" },
                  { value: "cemilan", label: "Cemilan" },
                ]}
              />
            </div>
            <div className="my-6">
              <TextareaWithLabel
                htmlFor="description"
                label="Deskripsi"
                error={errors.description?.message}
                register={register}
                name="description"
                validationSchema={{
                  required: "Deskripsi wajib diisi",
                }}
              />
            </div>
            <div className="my-6">
              <InputWithLabel
                htmlFor="price"
                label="Harga"
                type="number"
                error={errors.price?.message}
                register={register}
                name="price"
                validationSchema={{
                  required: "Harga Produk Wajib Diisi",
                }}
              />
            </div>
            <div className="my-6">
              <StockCounter
                label={"Stok"}
                countInStockValue={countInStockValue}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            </div>
            <div>
              <label
                htmlFor="imageProfile"
                className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
              >
                Gambar Produk
              </label>
              <ImageUpload maxSize={200} setImageFile={setUploadedImageUrl} />
            </div>
            <div className="my-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ePrimary border-0  w-full"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
