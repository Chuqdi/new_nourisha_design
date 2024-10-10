import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { toast } from "@/components/ui/use-toast";
import { BREAKPOINT } from "@/config";
import { IUser } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import useAuthToken from "@/hooks/useAuthToken";
import useFingerPrint, { DEVICE_ID } from "@/hooks/useFingerPrint";
import { loginUserScheme } from "@/lib/scheme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import { useMediaQuery } from "react-responsive";

export default function LoginModal({
  close,
  setUser,
}: {
  close: () => void;
  setUser: (user: IUser) => void;
}) {
  const { setToken } = useAuthToken();
  const device_id = localStorage?.getItem(DEVICE_ID)
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const { makeRequest, isLoading } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    const d = {
      ...values,
      device_id,
    };

    const createdUser = await makeRequest("auth/login", data);
    if (createdUser) {
      setToken(createdUser.token);
      localStorage.setItem("AUTH_USER_EMAIL", data.email);

      toast({
        variant: "default",
        title: "Login successful",
      });
      setUser(createdUser?.payload);

      window.location.href = "/";

      resetForm();
    }
  };

  const { values, errors, handleChange, resetForm, handleSubmit } = useFormik({
    validationSchema: loginUserScheme,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });
  return (
    <div
      id="login_modal"
      className="flex flex-col md:flex-row h-[70vh] overflow-y-scroll  bg-white  rounded-[1rem] overflow-hidden w-[85%] md:w-full mx-auto relative"
    >
      <button
        onClick={close}
        className="right-2 top-2  absolute bg-[#EDEDF3] flex justify-center items-center rounded-[2rem] w-[2.8rem] h-[2.8rem]"
      >
        <Icon color="#000" className="w-14 h-14" icon="iconoir:cancel" />
      </button>
      {isMobile ? (
        <img src="/images/login_modal_side.png" className="object-cover w-full h-[20rem]" />
      ) : (
        <div
          style={{
            backgroundImage: `url(/images/login_modal_side.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-[30rem] w-full md:h-full md:flex-1 "
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-7 py-14 px-6"
      >
        <h4 className="text-black-900 text-center font-NewSpiritBold text-[1.75rem]">
          Sign up to get a 10% discount on your first order
        </h4>

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

          <div>
            <label>Password</label>
            <Input
              type="password"
              className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
              value={values.password}
              onChange={handleChange("password")}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error_text">{errors.password}</p>}
          </div>

          <Button
            className="h-[3rem]"
            variant="primary"
            type="submit"
            disabled={isLoading}
            title={"Log in"}
          />
          <button
            type="button"
            onClick={close}
            className="font-inter font-bold text-black-900 text-center"
          >
            No Thanks
          </button>
          <div className="text-center text-sm text-black-900 font-semibold">
            By Subscribing you agree to receive marketing communications from
            us. To opt-out, click unsubscribe at the bottom of our emails
          </div>
        </div>
      </form>
    </div>
  );
}
