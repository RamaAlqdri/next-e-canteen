"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Span } from "next/dist/trace";
import { Canteen } from "@/lib/models/CanteenModel";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS

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
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sunting Kantin</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label htmlFor="name" className="label">
              Nama
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="location" className="label">
              Lokasi
            </label>
            <input
              type="text"
              id="email"
              {...register("location", {
                required: "location is required",
                // pattern: {
                //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                //   message: "Email is invalid",
                // },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.location?.message && (
              <div className="text-error">{errors.location.message}</div>
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
                required: "Description is required",
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.description?.message && (
              <div className="text-error">{errors.description.message}</div>
            )}
          </div>

          <div className="my-2 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-ePrimary w-full mt-2"
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
          className="btn btn-Delete w-full"
        >
          {/* {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )} */}
          Hapus Kantin
        </button>
      </div>
    </div>
  );
};

export default Form;
