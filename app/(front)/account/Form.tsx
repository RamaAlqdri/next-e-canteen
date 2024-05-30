"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import toast from "react-hot-toast";
import ImageUpload from "@/components/image/ImageUpload";
import InputWithLabel from "@/components/input/input";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";
import { auth } from "@/lib/firebase";
import imageService from "@/lib/services/imageService";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import userService from "@/lib/services/userService";

type Inputs = {
  name: string;
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session, status, update } = useSession();
  // console.log(session?.user.image);
  const [imageProfile, setImageProfile] = useState(null);
  const user = auth.currentUser;
  console.log(session);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password, currentPassword } = form;
    if (user) {
      try {
        if (name !== "" && name !== user.displayName) {
          // console.log(name);
          await updateProfile(user, { displayName: name as string });
          await userService.updateUserName(email, name);
          update({name});
        }
        if (password !== "") {
          const credential = EmailAuthProvider.credential(
            user.email!,
            currentPassword
          );
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, password);
          // await userService.updateUserPassword(email, hashedPassword); // Jika Anda menggunakan hashed password
        }

        if (imageProfile !== null) {
          imageService.uploadImage(imageProfile, "user", user?.uid as string);
        }
        router.push("/");
      } catch (err: any) {
        toast.error(err.message || "error");
      }
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
                // validationSchema={{
                //   required: "Nama wajib diisi",
                // }}
                name="name"
                error={errors.name?.message}
              />
            </div>
            <div className="my-2">
              <InputWithLabel
                htmlFor="password"
                type={"password"}
                label="Kata Sandi Lama"
                register={register}
                // validationSchema={{
                //   required: "Kata sandi wajib diis",
                // }}
                name="currentPassword"
                error={errors.password?.message}
              />
            </div>
            <div className="my-2">
              <InputWithLabel
                htmlFor="password"
                type={"password"}
                label="Kata Sandi Baru"
                register={register}
                // validationSchema={{
                //   required: "Kata sandi wajib diis",
                // }}
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
                  // required: "Konfirmasi kata sandi wajib diisi",
                  validate: (value: any) => {
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
              <ImageUpload
                maxSize={200}
                setImageFile={setImageProfile}
                path={session?.user.image as string}
              />
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
