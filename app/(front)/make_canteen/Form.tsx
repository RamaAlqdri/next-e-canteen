"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";
import { TextInput } from "@tremor/react";
import ImageUpload from "@/components/image/ImageUpload";
import InputWithLabel from "@/components/input/input";
import TextareaWithLabel from "@/components/input/textarea";
import imageService from "@/lib/services/imageService";
import { nanoid } from "nanoid";


type Inputs = {
  name: string;
  location: string;
  description: string;
  phone: string;

  //   image: string;
};

const Form = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [uploadImageCanteen, setUploadImageCanteen] = useState(null);
  const [uploadImageQris, setUploadImageQris] = useState(null);
  // console.log(uploadImageCanteen);

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

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, location, description, phone } = form;
    try {
      const id = `CTN-${nanoid(4)}-${nanoid(8)}`;
      const imageUrl = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/canteen/avatar/${id}`;
      const qrisUrl = `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/canteen/qris/${id}`;
      const res = await fetch("/api/canteen/request", {
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
          id,
          imageUrl,
          qrisUrl,

        }),
      });
      // console.log(res);
      if (res.ok) {
        imageService.uploadImage(uploadImageCanteen, "canteen", id);
        imageService.uploadImage(uploadImageQris, "qris", id);
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
      <div className="lg:col-span-3 my-4">
        <div className=" bg-white px-8 py-6 shadow-md rounded-2xl">
          <h1 className="card-title">Daftarkan Kantin</h1>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 mt-6">
            <div>
              <InputWithLabel
                htmlFor="name"
                label="Nama"
                type="text"
                error={errors.name?.message}
                register={register}
                name="name"
                validationSchema={{
                  required: "Nama wajib diisi",
                }}
              />
            </div>
            <div className="pt-2 ">
              <InputWithLabel
                htmlFor="phone"
                label="Telepon"
                type="text"
                error={errors.phone?.message}
                register={register}
                name="phone"
                validationSchema={{
                  required: "No Telepon wajib diisi",
                }}
              />
            </div>
            <div className="pt-2">
              <TextareaWithLabel
                htmlFor="location"
                label="Lokasi"
                error={errors.location?.message}
                register={register}
                name="location"
                validationSchema={{
                  required: "Lokasi wajib diisi",
                }}
              />
            </div>
            <div className="">
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

            <div>
              <label
                htmlFor="imageProfile"
                className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
              >
                Profil Kantin
              </label>
              <ImageUpload maxSize={200} setImageFile={setUploadImageCanteen} />
            </div>
            <div>
              <label
                htmlFor="imageQris"
                className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
              >
                QRIS
              </label>
              <ImageUpload maxSize={500} setImageFile={setUploadImageQris} />
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
