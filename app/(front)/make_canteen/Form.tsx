"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";
import { TextInput } from '@tremor/react';
import ImageUpload from "@/components/image/ImageUpload";

type Inputs = {
  name: string;
  location: string;
  description: string;
  phone: string;
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
      name: "",
      location: "",
      description: "",
      phone: "",
      //   confirmPassword: "",
    },
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleUpload = (imageUrl: any) => {
    setUploadedImageUrl(imageUrl);
  };
  //   useEffect(() => {
  //     if (session && session.user) {
  //       router.push(callbackUrl);
  //     }
  //   }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, location, description, phone } = form;
    try {
      const res = await fetch("/api/canteen/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          description,
          session,
          phone,
        }),
      });
      console.log(res);
      if (res.ok) {
        return router.push("/");
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
      <div className="lg:col-span-4 my-4">
        <div className=" bg-white px-8 py-6 shadow-md rounded-xl">
          <h1 className="card-title">Daftarkan Kantin</h1>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 mt-6">
            <div className=" ">
              <label htmlFor="name" className="ml-4 absolute rounded-full -mt-3 px-2 bg-white ">
                Nama
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
                className=" w-full focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-2 border-1 px-6 border-gray-400 "
              />
              {errors.name?.message && (
                <div className="text-error">{errors.name.message}</div>
              )}

            </div>
            <div className="pt-2 ">
              <label htmlFor="phone" className="ml-4 absolute rounded-full -mt-3 px-2 bg-white ">
                Telepon
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", {
                  required: "phone is required",
                })}
                className=" w-full focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-2 border-1 px-6 border-gray-400 "
              />
              {errors.name?.message && (
                <div className="text-error">{errors.name.message}</div>
              )}

            </div>
            <div className="pt-2">
              <label htmlFor="location" className="ml-4 absolute rounded-full -mt-3 px-2  bg-white">
                Lokasi
              </label>
              <textarea
                id="location"
                {...register("location", {
                  required: "location is required",
                  
                })}
                className="w-full focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-2 border-1 px-6 border-gray-400"
              />
              {errors.location?.message && (
                <div className="text-error">{errors.location.message}</div>
              )}
            </div>
            <div className="">
              <label htmlFor="description" className="ml-4 absolute rounded-full -mt-3 px-2  bg-white">
                Deskripsi
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full focus:border-[#EEA147] focus:ring-[#EEA147] rounded-xl py-2 border-1 px-6 border-gray-400"
              />
              {errors.description?.message && (
                <div className="text-error">{errors.description.message}</div>
              )}
            </div>
            <div>
              <label htmlFor="image" className="ml-4 absolute rounded-full -mt-3 px-2  ">
                Gambar Kantin
              </label>
              <ImageUpload onUpload={handleUpload} />
            </div>

            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ePrimary w-full"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Daftarkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
