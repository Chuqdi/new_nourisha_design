"use client";
import Navbar from "@/components/commons/Navbar";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import useAuthToken from "@/hooks/useAuthToken";
import useFingerPrint from "@/hooks/useFingerPrint";
import { loginUserScheme, registerUserScheme } from "@/lib/scheme";
import { toast } from "@/ui/use-toast";
import { useFormik } from "formik";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Main() {
  const [onLogin, setOnLogin] = useState(true);
  const { makeRequest, isLoading } = useAuth();
  const { setToken } = useAuthToken();
  const router = useRouter();
  const device_id = useFingerPrint();

  const options = [
    {
      title: "Log in",
      onClick: () => setOnLogin(true),
      selected: onLogin,
    },
    {
      title: "Sign up",
      onClick: () => setOnLogin(false),
      selected: !onLogin,
    },
  ];

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = onLogin
      ? {
          ...loginFormik?.values,
          device_id: device_id,
        }
      : signUpForm?.values;

    const createdUser = await makeRequest(
      onLogin ? "auth/login" : "auth/register",
      data
    );
    if (createdUser) {
      setToken(createdUser.token);
      localStorage.setItem("AUTH_USER_EMAIL", data.email);

      toast({
        variant: "default",
        title: onLogin ? "Registeration was successful" : "Login successful",
      });
      window.location.href = "/";
      // onLogin
      // ?
      // :
      // router.push(`/auth/enter_otp?email=${data.email}`);
      (onLogin ? loginFormik : signUpForm).resetForm();
    }
  };

  const signUpForm = useFormik({
    validationSchema: registerUserScheme,
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    onSubmit,
  });

  const loginFormik = useFormik({
    validationSchema: loginUserScheme,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <div className="m-1.25 mt-[8rem] md:m-6.25 flex flex-col-reverse md:flex-row items-stretch md:items-center gap-20">
        <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-16">
          <div className="flex items-center gap-6 justify-center">
            {options.map((option, index) => (
              <button
                type="button"
                onClick={option.onClick}
                className={`
                ${
                  option.selected
                    ? "border-b-4  text-black-900"
                    : "text-[#AEAAB5]"
                }
                border-none text-center  text-[2rem] font-NewSpiritBold`}
                key={`option_index_${index}`}
              >
                {option.title}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {onLogin ? (
              <Login formikObj={loginFormik} />
            ) : (
              <SignUp formikObj={signUpForm} />
            )}
          </AnimatePresence>
          <div className="flex w-full flex-col gap-8">
            <Button
              className="h-[3rem]"
              variant="primary"
              type="submit"
              disabled={isLoading}
              title={onLogin ? "Log in" : "Create account"}
            />
            <div className="w-full text-center text-black-900 font-inter text-lg">
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