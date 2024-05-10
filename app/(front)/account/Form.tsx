"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";




import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";



import { SubmitHandler } from "react-hook-form";

import { Span } from "next/dist/trace";
type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();
  
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
  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
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
    <div className="max-w-sm mx-auto card bg-white my-4">
      <div className="card-body">
        <h1 className="card-title">Akun Anda</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label htmlFor="name" className="label">
              Nama Anda
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full max-w-sm bg-gray-100"
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="password" className="label">
              Kata Sandi Baru
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="input input-bordered w-full max-w-sm bg-gray-100"
            />
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
          </div>
          <div className="my-2">
            <label htmlFor="confirmPassword" className="label">
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Password do not match";
                },
              })}
              className="input input-bordered w-full max-w-sm bg-gray-100"
            />
            {errors.confirmPassword?.message && (
              <div className="text-error">{errors.confirmPassword.message}</div>
            )}
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
        {/* <div className="divider"></div> */}
      </div>
    </div>
  );
};
export default Form;
