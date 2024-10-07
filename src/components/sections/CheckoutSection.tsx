import { ICartDetail } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { ATOMS } from "@/store/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import DeliveryModal from "./Modals/DeliveryModal";
import Button from "../ui/Button";
import { toast } from "@/ui/use-toast";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

export default ({ coupon }: { coupon: string }) => {
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const user = useContext(UserContext);
  const loggedInUser = useAtomValue(ATOMS.loggedInUser);
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const { getAxiosClient } = useAuth();
  const router = useRouter();

  return (
    <Button
      title={`Checkout £${
        parseInt(cartDetails?.total) + parseInt(cartDetails?.deliveryFee)
      }`}
      variant="primary"
      className="py-6 h-[2.7rem] w-full"
      onClick={() => {
        if (loggedInUser?.email) {
          setSideModal({
            component: (
              <DeliveryModal
                setDeliveryDate={set_delivery_date}
                proceed={async () => {
                  setPaymentModal({
                    show: true,
                    amount:
                      parseInt(cartDetails?.total) +
                      parseInt(cartDetails?.deliveryFee),
                    onContinue: async () => {
                      const id = localStorage.getItem(DEVICE_ID);
                      const axiosClient = getAxiosClient(id!);
                      const response = await axiosClient.post("orders", {
                        cart_session_id: cartDetails?.session_id,
                        delivery_address: {
                          address_: loggedInUser?.address?.address_,
                          city: loggedInUser?.address?.city,
                          country: loggedInUser?.address?.country,
                        },
                        delivery_date,
                        coupon,
                      });

                      return {
                        clientSecret: response?.data?.data?.client_secret,
                        returnUrl: "https://jobofa.com/text",
                      };
                    },
                  });
                }}
              />
            ),
            show: true,
          });
        } else {
          setSideModal({
            ...sideModal,
            show: false,
          });
          toast({
            variant: "default",
            title: "Error",
            description: "Please login/register to continue",
          });
          router.push("/auth");
        }
      }}
    />
  );
};
