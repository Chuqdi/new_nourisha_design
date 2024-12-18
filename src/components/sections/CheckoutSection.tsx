import { ICartDetail } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { ATOMS } from "@/store/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import DeliveryModal from "./Modals/DeliveryModal";
import Button from "../ui/Button";
import { toast } from "@/ui/use-toast";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import { CART_MODAL_OPEN } from "@/config/storageKeys";

const CheckoutSection = ({
  coupon,
  total,
  isWeekend,
}: {
  isWeekend?: boolean;
  coupon: string;
  total: number;
}) => {
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const { user } = useContext(UserContext);
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const { getAxiosClient } = useAuth();
  const router = useRouter();

  return (
    <Button
      title={`Checkout £${total}`}
      variant="primary"
      className="py-6 h-[2.7rem] w-full"
      onClick={() => {
        localStorage.setItem(CART_MODAL_OPEN, "1");
        if (user?.email) {
          setSideModal({
            component: (
              <DeliveryModal
                setDeliveryDate={set_delivery_date}
                proceed={async (date, address) => {
                  setPaymentModal({
                    show: true,
                    amount: total,
                    onContinue: async () => {
                      const id = localStorage.getItem(DEVICE_ID);
                      const axiosClient = getAxiosClient(id!);
                      const data = {
                        cart_session_id: cartDetails?.session_id,
                        delivery_address: {
                          address_: address?.address_,
                          city: address?.city,
                          country: address?.country,
                        },
                        delivery_date: date,
                        coupon,
                        weekend_delivery: isWeekend || false,
                        delivery_period: isWeekend ? "weekend" : "in-week",
                        platform: "web",
                      };
                      const response = await axiosClient.post("orders", data);

                      sendGAEvent({
                        event: "purchase",
                        value: {
                          transaction_id: response?.data?.data?.client_secret,
                          value: total,
                          tax: null,
                          shipping: null,
                          currency: "gbp",
                          coupon,
                          plan: null,
                          customer_details: user,
                        },
                      });

                      return {
                        clientSecret: response?.data?.data?.client_secret,
                        returnUrl: `https://www.eatnourisha.com?reloadWindow=1`,
                      };
                    },
                    gtagEvent: () => {},
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
            variant: "destructive",
            title: "Error",
            description: "Please login to continue",
          });
          router.push("/auth");
        }
      }}
    />
  );
};

export default CheckoutSection;
