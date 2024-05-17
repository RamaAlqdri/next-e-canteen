"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";
import { Canteen } from "@/lib/models/CanteenModel";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS
import InputWithLabel from "@/components/input/input";
import TextareaWithLabel from "@/components/input/textarea";
import ImageUpload from "@/components/image/ImageUpload";

type Inputs = {
  slugBefore: string;
  name: string;
  location: string;
  description: string;

  //   image: string;
};

const Form = ({ canteen }: { canteen: Canteen }) => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  const [uploadImageCanteen, setUploadImageCanteen] = useState(null);
  const [uploadImageQris, setUploadImageQris] = useState(null);

  //   let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      slugBefore: canteen.slug,
      name: canteen.name,
      location: canteen.location,
      description: canteen.description,
      //   confirmPassword: "",
    },
  });
  //   useEffect(() => {
  //     if (session && session.user) {
  //       router.push(callbackUrl);
  //     }
  //   }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { slugBefore, name, location, description } = form;
    try {
      const res = await fetch("/api/canteen/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slugBefore,
          name,
          location,
          description,
          session,
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

  const deleteCanteen = async () => {
    try {
      confirmAlert({
        title: "Konfirmasi Hapus",
        message: "Apakah Anda yakin ingin menghapus kantin ini?",
        buttons: [
          {
            label: "Ya",
            onClick: async () => {
              const res = await fetch("/api/canteen/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  slugBefore: canteen.slug,
                  session,
                }),
              });
              if (res.ok) {
                return router.push("/");
              } else {
                const data = await res.json();
                throw new Error(data.message);
              }
            },
          },
          {
            label: "Tidak",
            onClick: () => {},
          },
        ],
      });
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
        <div className="bg-white px-8 py-6 shadow-md rounded-2xl">
          <h1 className="card-title">Sunting Kantin</h1>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 mt-6">
            <div className="">
              <InputWithLabel
                htmlFor="name"
                label="Nama Kantin"
                type="text"
                error={errors.name?.message}
                register={register}
                name="name"
                validationSchema={{
                  required: "Nama wajib diisi",
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

            <div className="my-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ePrimary w-full"
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
            onClick={deleteCanteen}
            className="btn btn-Delete w-full mt-2"
          >
            {/* {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )} */}
            Hapus Kantin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
