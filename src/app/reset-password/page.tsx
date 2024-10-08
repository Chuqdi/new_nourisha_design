"use client";
import Navbar from "@/components/commons/Navbar";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import useAuthToken from "@/hooks/useAuthToken";
import {
  forgotPasswordScheme,
  loginUserScheme,
  registerUserScheme,
} from "@/lib/scheme";
import { toast } from "@/ui/use-toast";
import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { CART_TEMP_ID } from "@/hooks/useCart";
import { UserContext } from "@/HOC/UserContext";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function Main() {
  const [onLogin, setOnLogin] = useState(true);
  const { makeRequest, isLoading } = useAuth();
  const router = useRouter();
//   const [ isOTP]

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = values;

    const createdUser = await makeRequest("auth/request/reset-otp", data);

    if (createdUser) {
      toast({
        variant: "default",
        title: "Password reset OTP sent successfully",
      });
      router.push(`/auth/reset-password`);
      resetForm();
    }
  };

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    validationSchema: forgotPasswordScheme,
    initialValues: {
      email: "",
    },
    onSubmit,
  });

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <div className="m-1.25 mt-[8rem] md:m-6.25 flex flex-col-reverse md:flex-row items-stretch md:items-center gap-20">
        <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-16">
          <div className="flex items-center gap-6 justify-center">
            <button
              type="button"
              className={`
                     "border-b-4  text-black-900"
                border-none text-center  text-[2rem] font-NewSpiritBold`}
            >
              Reset Password
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label>Email address</label>
              <Input
                className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="error_text">{errors.email}</p>}
            </div>
          </div>
          <div className="flex w-full flex-col gap-8">
            <Button
              className="h-[3rem]"
              variant="primary"
              type="submit"
              disabled={isLoading}
              title="Continue"
            />
            <div
              onClick={() => setOnLogin(!onLogin)}
              className="cursor-pointer w-full text-center text-black-900 font-inter text-lg"
            >
              {onLogin ? "Don't have an account? " : "Already have an account?"}
              <span className="text-primary-orange-900">
                {onLogin ? "Sign Up" : " Log in"}
              </span>
            </div>
          </div>
        </form>
        <div className="flex-1">
          <img src="/images/auth_banner.png" />
        </div>
      </div>
    </div>
  );
}
