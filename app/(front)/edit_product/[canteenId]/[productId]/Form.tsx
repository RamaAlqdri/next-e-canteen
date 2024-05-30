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
import InputWithLabel from "@/components/input/input";
import SelectCustom from "@/components/input/select";
import TextareaWithLabel from "@/components/input/textarea";
import StockCounter from "@/components/input/count";
import imageService from "@/lib/services/imageService";

type Inputs = {
  slugBefore: string;
  category: string;
  countInStock: number;
  description: string;
  name: string;
  price: number;
  //   image: string;
};

const Form = ({
  product,
  canteenId,
}: {
  product: Product;
  canteenId: string;
}) => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  // console.log(product);

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
      // console.log(res);

      if (res.ok) {
        // return router.push(`/canteen/${session?.user.canteen}`);
        if (uploadedImageUrl) {
          imageService.uploadImage(
            uploadedImageUrl,
            "product",
            product.id as string
          );
        }
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
          productId: product.id,
          canteenId: product.canteenId,
        }),
      });
      // console.log(res);
      if (res.ok) {
        imageService.deleteImage("product", product.id as string);
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
  useEffect(() => {
    if (session?.user.role !== "admin") {
      if (session?.user.canteenId !== canteenId) {
        router.push("/");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="lg:grid lg:grid-cols-6">
      <div className="lg:col-span-3 my-4">
        <div className="bg-white px-8 py-6 shadow-md rounded-2xl">
          <h1 className="card-title">Sunting Product</h1>
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
              <ImageUpload
                maxSize={200}
                setImageFile={setUploadedImageUrl}
                path={product.image}
              />
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
