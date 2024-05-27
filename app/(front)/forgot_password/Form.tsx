"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputWithLabel from "@/components/input/input";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from "@/lib/firebase";
import toast from "react-hot-toast";

type Inputs = {
  email: string;

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
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    // console.log("Form values:", form);
    const { email } = form;
    // console.log(email, password);
    // sendPasswordResetEmail(auth,email).then(() => {
    //   // Password reset email sent!
    // })
    try{
      await sendPasswordResetEmail(auth,email);
      toast.success("Email reset password telah dikirim");
    }catch(error){
      toast.error("Email tidak ditemukan");
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-[50rem] mt-12 ">
        <div className="bg-white h-[30rem]  shadow-md rounded-3xl flex overflow-hidden">
          <div className="w-7/12 px-10  -mt-6 flex justify-center flex-col">
            <h1 className="text-center font-medium text-xl">Lupa Kata Sandi</h1>
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-ePrimary w-full border-0 rounded-xl font-normal"
                >
                  {isSubmitting && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Kirim
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
