"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import InputWithLabel from "@/components/input/input";
import Image from "next/image";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signup: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,

      });
  
      await sendEmailVerification(user);
      toast.success("Email verifikasi telah dikirim ke email anda");
  
      // Optional: Redirect or perform additional actions after successful registration
      router.push("/signin?callbackUrl=${callbackUrl}&success=Account has been created");
  
    } catch (error: any) {
      console.error("Error in form submission:", error);
      let errorMessage = "An error occurred";
  
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email sudah ada";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email anda salah";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password anda lemah";
      }
  
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-[50rem] mt-12">
        <div className="bg-white h-[30rem]  shadow-md rounded-3xl flex overflow-hidden">
          <div className="w-7/12 px-10  flex justify-center flex-col">
            <h1 className="text-center font-medium text-xl">Daftar</h1>
            <form
              className="space-y-6 mt-6"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="">
                <InputWithLabel
                  register={register}
                  validationSchema={{
                    required: "Nama wajib diisi",
                  }}
                  name="name"
                  htmlFor="name"
                  type="text"
                  label="Nama Anda"
                  error={errors.name?.message}
                />
              </div>
              <div className="">
                <InputWithLabel
                  register={register}
                  validationSchema={{
                    required: "Email wajib diisi",
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Email is invalid",
                    },
                  }}
                  name="email"
                  htmlFor="email"
                  type="text"
                  label="Email"
                  error={errors.email?.message}
                />
              </div>
              <div className="">
                <InputWithLabel
                  register={register}
                  validationSchema={{
                    required: "Kata sandi wajib diisi",
                  }}
                  name="password"
                  htmlFor="password"
                  type="password"
                  label="Kata Sandi"
                  error={errors.password?.message}
                />
              </div>
              <div className="my-2">
                <InputWithLabel
                  register={register}
                  validationSchema={{
                    required: "Kata sandi wajib diisi",
                    validate: (value: any) => {
                      const { password } = getValues();
                      return password === value || "Password do not match";
                    },
                  }}
                  name="confirmPassword"
                  htmlFor="confirmPassword"
                  type="password"
                  label="Konfirmasi Kata Sandi"
                  error={errors.confirmPassword?.message}
                />
              </div>
              <div className="my-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-ePrimary w-full border-0 rounded-xl font-normal"
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Daftar
                </button>
              </div>
            </form>

            <div className="text-sm text-center text-gray-500 mt-4">
              Sudah Punya akun?{" "}
              <Link
                className="link text-[#EEA061] font-semibold"
                href={`/signin?callbackUrl=${callbackUrl}`}
              >
                Masuk
              </Link>
            </div>
          </div>
          <div className=" overflow-hidden w-5/12 opacity-40 ">
            <Image
              src="/images/login/login.jpg"
              alt="register"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
