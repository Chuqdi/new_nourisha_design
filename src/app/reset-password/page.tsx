"use client";
import Navbar from "@/components/commons/Navbar";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import useAuthToken from "@/hooks/useAuthToken";
import {
  forgotPasswordResetScheme,
  forgotPasswordScheme,
  loginUserScheme,
  registerUserScheme,
} from "@/lib/scheme";
import { toast } from "@/ui/use-toast";
import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import { FormEvent, useContext, useState } from "react";
import { CART_TEMP_ID } from "@/hooks/useCart";
import { UserContext } from "@/HOC/UserContext";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";

export default function Main() {
  const { makeRequest, isLoading } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [validators, setValidators] = useState<
    { _id: string; customer_id: string; token: string; exp: string } | undefined
  >(undefined);
  // const [ isOTP]

  const onSubmit = async (value: {
    password: string;
    confirm_password: string;
  }) => {
    const data = {
      password: value?.password,
      customer_id: validators?.customer_id,
      token: validators?.token,
    };

    const createdUser = await makeRequest("auth/reset", data);

    if (createdUser) {
      toast({
        variant: "default",
        title: "Password reset was sent successfully",
      });
      router.push(`/auth`);
      resetForm();
    }
  };

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    validationSchema: forgotPasswordResetScheme,
    initialValues: {
      password: "",
      confirm_password: "",
    },
    onSubmit,
  });

  const onSubmitOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.length < 5) {
      toast({
        variant: "destructive",
        title: "Please enter a valid OTP code",
      });
      return;
    }
    const createdUser = await makeRequest("auth/verify/reset-otp", { code });
    setValidators(createdUser);
  };
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <div className="m-1.25 mt-[8rem] md:m-6.25 flex flex-col-reverse md:flex-row items-stretch md:items-center gap-20">
        {validators && validators.customer_id ? (
          <form name="reset_password_form" onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
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
            <div>
              <label>Password</label>
              <Input
                type="password"
                className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="error_text">{errors.password}</p>
              )}
            </div>

            <div>
              <label>Confirm Password</label>
              <Input
                type="password"
                className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
                value={values.confirm_password}
                onChange={handleChange("confirm_password")}
                placeholder="Enter your password confirmation"
              />
              {errors.confirm_password && (
                <p className="error_text">{errors.confirm_password}</p>
              )}
            </div>

            <div className="flex w-full flex-col gap-8">
              <Button
                className="h-[3rem]"
                variant="primary"
                type="submit"
                disabled={isLoading}
                title="Continue"
              />
            </div>
          </form>
        ) : (
          <form name="reset_password_otp_form" onSubmit={onSubmitOTP} className="flex-1 flex flex-col gap-16">
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
                <label>OTP Code</label>
                <Input
                  className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter OTP Code"
                  max={5}
                />
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
            </div>
          </form>
        )}
        <div className="flex-1">
          <img src="/images/auth_banner.png" />
        </div>
      </div>
    </div>
  );
}
