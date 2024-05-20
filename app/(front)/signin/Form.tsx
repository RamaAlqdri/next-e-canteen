"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputWithLabel from "@/components/input/input";
import Image from "next/image";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { data: session } = useSession();

  // const params = useSearchParams();
  let callbackUrl = "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    // console.log("Form values:", form);
    const { email, password } = form;
    // console.log(email, password);

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center ">
      <div className="w-[50rem] mt-12 ">
        <div className="bg-white h-[30rem]  shadow-md rounded-3xl flex overflow-hidden">
          <div className="w-7/12 px-10  flex justify-center flex-col">
            <h1 className="text-center font-medium text-xl">Masuk</h1>
            <form
              className="space-y-6 mt-6"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="">
                <InputWithLabel
                  register={register}
                  validationSchema={{
                    required: "Email wajib diisi",
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
                  htmlFor="password"
                  type="password"
                  label="Kata Sandi"
                  name="password"
                  error={errors.password?.message}
                  register={register}
                  validationSchema={{
                    required: "Password wajib diisi",
                  }}
                />
              </div>
              <div className="">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-ePrimary w-full border-0 rounded-xl font-normal"
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Masuk
                </button>
                {/* <button
                  onClick={() => {
                    // signIn("google");
                    // console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
                  }}
                  className="btn btn-ePrimary w-full border-0 rounded-xl font-normal"
                >
                  Google
                </button> */}
              </div>
            </form>
            <div className="text-sm text-center text-gray-500 mt-12">
              Belum punya akun?{" "}
              <Link
                className="link text-[#EEA061] font-semibold"
                href={`/register?callbackUrl=${callbackUrl}`}
              >
                Daftar
              </Link>
            </div>
          </div>
          <div className=" overflow-hidden w-5/12 opacity-40 ">
            <Image
              src="/images/login/login.jpg"
              alt="login"
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
