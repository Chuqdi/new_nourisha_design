import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { BREAKPOINT } from "@/config";
import { IUser } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import useAuthToken from "@/hooks/useAuthToken";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const PROMO_CODE = "NOURISHA10";
export default function LoginModal({
  close,
  setUser,
}: {
  close: () => void;
  setUser: (user: IUser) => void;
}) {
  const { setToken } = useAuthToken();
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
  });
  const device_id = localStorage?.getItem(DEVICE_ID);
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const { makeRequest, isLoading } = useAuth();
  const [showPromoCode, setShowPromoCode] = useState(false);

  const handleSubmit = () => {
    if (!!formData?.email && !!formData.phoneNumber) {
      setShowPromoCode(true);
    }
  };

  // const onSubmit = async (data: { email: string; password: string }) => {
  //   const d = {
  //     ...values,
  //     device_id,
  //   };

  //   const createdUser = await makeRequest("auth/login", data, true);
  //   if (createdUser) {
  //     setToken(createdUser.token);
  //     localStorage.setItem("AUTH_USER_EMAIL", data.email);

  //     toast({
  //       variant: "default",
  //       title: "Login successful",
  //     });
  //     setUser(createdUser?.payload);

  //     window.location.href = "/";

  //     resetForm();
  //   }
  // };

  // const { values, errors, handleChange, resetForm, handleSubmit } = useFormik({
  //   validationSchema: loginUserScheme,
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit,
  // });
  return (
    <div
      id="login_modal"
      className="flex flex-col md:flex-row h-[80vh] md:h-[90vh] overflow-y-scroll  bg-white  rounded-[1rem] overflow-hidden w-[85%] md:w-full mx-auto relative"
    >
      <button
        onClick={close}
        className="right-2 top-2  absolute bg-[#EDEDF3] flex justify-center items-center rounded-[2rem] w-[2.8rem] h-[2.8rem]"
      >
        <Icon color="#000" className="w-14 h-14" icon="iconoir:cancel" />
      </button>
      {isMobile ? (
        <img
          src="/images/login_modal_side.png"
          className="object-cover w-full md:h-[20rem] h-[15rem]"
        />
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

      {showPromoCode ? (
        <div className="flex-1 p-1 md:p-6  flex-col flex justify-center items-center gap-3">
          <h4 className="font-NewSpiritBold text-center text-xl">
            Enjoy 10% off your first meal plan order by using the following code
            at checkout:
          </h4>
          <button
            onClick={() => {
              navigator.clipboard.writeText(PROMO_CODE);
              alert("Promo Code copied");
            }}
            className="rounded-[0.75rem] w-4/5 md:w-2/5 mx-auto bg-[#DEF54C] rounded-[0.5rem]text-center justify-center items-center py-10 text-center font-NewSpiritBold text-2xl"
          >
            {PROMO_CODE}
          </button>
          <p className="font-NewSpiritBold text-center text-xl">
            Or Subscribe and save 99% on your 5th meal plan order within 35
            days.
          </p>
        </div>
      ) : (
        <form
          name="login_form"
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-7 py-14 px-6"
        >
          <h4 className="text-black-900 text-center font-NewSpiritBold text-[1.75rem]">
            Get 10% discount on your first order
          </h4>

          <div className="flex flex-col gap-6">
            <div>
              <label>Full name</label>
              <Input
                type="text"
                required
                className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label>Email address</label>
              <Input
                className="h-[3rem] rounded-[0.75rem] bg-[#F2F4F7]"
                value={formData.email}
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email address"
              />
            </div>

            <Button
              className="h-[3rem]"
              variant="primary"
              type="submit"
              disabled={isLoading}
              title={"Get my discount code"}
            />
            <button
              type="button"
              onClick={close}
              className="font-inter font-bold text-black-900 text-center"
            >
              No Thanks
            </button>
            {/* <div className="text-center text-sm text-black-900 font-semibold">
        By Subscribing you agree to receive marketing communications from
        us. To opt-out, click unsubscribe at the bottom of our emails
      </div> */}
          </div>
        </form>
      )}
    </div>
  );
}
