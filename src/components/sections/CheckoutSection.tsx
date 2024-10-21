import { ICartDetail, IUser } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { ATOMS } from "@/store/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import DeliveryModal from "./Modals/DeliveryModal";
import Button from "../ui/Button";
import { toast } from "@/ui/use-toast";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import useUser from "@/hooks/useUser";

export default ({ coupon, total, }: { coupon: string,total:number }) => {
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { getUser } = useUser();
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const { getAxiosClient } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <Button
      title={`Checkout £${
        total
      }`}
      variant="primary"
      className="py-6 h-[2.7rem] w-full"
      onClick={() => {
        if (user?.email) {
          setSideModal({
            component: (
              <DeliveryModal
                setDeliveryDate={set_delivery_date}
                proceed={async () => {
                  setPaymentModal({
                    show: true,
                    amount:total,
                    onContinue: async () => {
                      const id = localStorage.getItem(DEVICE_ID);
                      const axiosClient = getAxiosClient(id!);
                      const response = await axiosClient.post("orders", {
                        cart_session_id: cartDetails?.session_id,
                        delivery_address: {
                          address_: user?.address?.address_,
                          city: user?.address?.city,
                          country: user?.address?.country,
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
