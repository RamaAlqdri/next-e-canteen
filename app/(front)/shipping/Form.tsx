'use client'

import CheckoutSteps from "@/components/CheckoutSteps";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderBy } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form";

const Form = () => {
  const router = useRouter();
  const { saveOrderBy, orderBy } = useCartService();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderBy>({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  useEffect(() => {
    setValue("fullName", orderBy.fullName);
    setValue("email", orderBy.email);
  }, [setValue, orderBy]);

  const formSubmit: SubmitHandler<OrderBy> = async (form) => {
    saveOrderBy(form);
    router.push("/payment");
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof OrderBy;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="mb-2">
      <label htmlFor={id} className="label">
        {name}
      </label>
      <input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} is required`,
          pattern: pattern,
        })}
        className="input bg-gray-100 input-bordered w-full max-w-sm"
      />
      {errors[id]?.message && (
        <div className="text-error">{errors[id]?.message}</div>
      )}
    </div>
  );

  return (
    <div>
      <CheckoutSteps current={0} />
      <div className="max-w-sm mx-auto card bg-white my-4">
        <div className="card-body">
          <h1 className="card-title">Identitas Anda</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name="Nama" id="fullName" required />
            <FormInput name="Email" id="email" required/>
            
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-ePrimary border-0 w-full"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
