"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";
import ImageUpload from "@/components/image/ImageUpload";
import InputWithLabel from "@/components/input/input";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";


type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();
  const [imageProfile, setImageProfile] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: session?.user.name as string,
      email: session?.user.email as string,
      password: "",
      confirmPassword: "",

      //   confirmPassword: "",
    },
  });
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        return router.push(
          "/signin?callbackUrl=${callbackUrl}&success=Account has been created"
        );
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
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;

  return (
    <div className="lg:grid lg:grid-cols-6">
      <div className="lg:col-span-3 my-4">
        <div className="bg-white px-8 py-6 shadow-md rounded-2xl">
          <h1 className="card-title">Akun Anda</h1>
          <form className="space-y-8 mt-6" onSubmit={handleSubmit(formSubmit)}>
            <div className="my-2">
              <InputWithLabel
                htmlFor="name"
                type="text"
                label="Nama Anda"
                register={register}
                validationSchema={{
                  required: "Nama wajib diisi",
                }}
                name="name"
                error={errors.name?.message}
              />
              
            </div>
            <div className="my-2">
              <InputWithLabel
                htmlFor="password"
                type={"password"}
                label="Kata Sandi Baru"
                register={register}
                validationSchema={{
                  required: "Kata sandi wajib diis",
                }}
                name="password"
                
                error={errors.password?.message}
              />
            </div>
            <div className="my-2">
              <InputWithLabel
                type="password"
                htmlFor="password"
                label="Konfirmasi Kata Sandi "
                
                register={register}
                name="confirmPassword"
                validationSchema={{
                  required: "Konfirmasi kata sandi wajib diisi",
                  validate: (value:any) => {
                    const { password } = getValues();
                    return password === value || "Kata sandi tidak cocok";
                  },
                }}
                error={errors.confirmPassword?.message}
              />
            </div>
            <div>
              <label
                htmlFor="imageProfile"
                className="ml-4 absolute text-sm rounded-full font-light text-gray-700 -mt-2 px-2 bg-white"
              >
                Profil Anda
              </label>
              <ImageUpload maxSize={200} setImageFile={setImageProfile} />
            </div>
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ePrimary w-full border-0"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Perbarui
              </button>
            </div>
          </form>
        </div>
        {/* <div className="divider"></div> */}
      </div>
    </div>
  );
};
export default Form;
