import { ICartDetail, ICartItem } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useCart from "@/hooks/useCart";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtomValue, useSetAtom } from "jotai";
import { CartManipulator } from "../SingleCartItemSection";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DeliveryModal from "./DeliveryModal";
import { useContext, useState } from "react";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

const Checkout = () => {
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const user = useContext(UserContext);
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const { axiosClient } = useAuth();

  return (
    <Button
      title={`Checkout £${
        parseInt(cartDetails?.total) + parseInt(cartDetails?.deliveryFee)
      }`}
      variant="primary"
      onClick={() => {
        if (user?.user?._id) {
          setSideModal({
            component: (
              <DeliveryModal
                setDeliveryDate={set_delivery_date}
                proceed={async () =>
                  setPaymentModal({
                    show: true,
                    onContinue: async () => {
                      const response = await axiosClient.post("orders", {
                        cart_session_id: cartDetails?.session_id,
                        delivery_address: {
                          address_: user?.user?.address?.address_,
                          city: user?.user?.address?.city,
                          country: user?.user?.address?.country,
                        },
                        delivery_date,
                      });


                      return {
                        clientSecret: response?.data?.data?.client_secret,
                        returnUrl: "htttps://jobofa.com/text",
                      };
                      
                    },
                  })
                }
              />
            ),
            show: true,
          });
        } else {
          toast({
            variant: "default",
            title: "Error",
            description: "Please login/register to continue",
          });
        }
      }}
    />
  );
};

function CartItem({ item }: { item: ICartItem }) {
  const { removeItemFrommCart } = useCart();

  const onRemoveItem = () => {
    removeItemFrommCart(item?.item?._id!, item?.quantity);
  };
  return (
    <div className=" p-2 rouned-[0.5rem] border-[1px] border-[#EDF0F5] flex flex-col gap-5">
      <div className="flex items-start gap-3">
        <div>
          <img
            className="w-[3.5rem] h-[3.5rem] rounded-[0.75rem] object-cover"
            src={item?.item?.image_url}
          />
        </div>
        <div>
          <p className="text-black-900 text-sm font-bold font-inter">
            {item?.item?.name}
          </p>
          <p className="text-[0.75rem] font-inter bg-[#FFF2E5] p-1 rounded w-fit flex justify-center items-center">
            €{item?.item?.price?.amount}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={onRemoveItem}
          className="text-[#FF4159] text-sm font-inter flex items-center"
        >
          <Icon
            color="#FF4159"
            className="w-4 h-4"
            icon="gravity-ui:trash-bin"
          />
          <p>Remove</p>
        </button>
        <CartManipulator meal={item?.item} item={item} />
      </div>
    </div>
  );
}

function CartModal() {
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;

  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];

  return (
    <SidebarHOC title="Cart">
      <div className="flex flex-col gap-3">
        <p className="text-black-900 text-sm font-inter">Cart Summary</p>

        <div className="flex flex-col gap-3">
          {cartItems?.map((item, index) => (
            <CartItem key={`cart_item_${index}`} item={item} />
          ))}
        </div>

        <div>
          <label>Coupon Code</label>
          <Input placeholder="Enter coupon code here..." />
        </div>

        <div className=" flex flex-col gap-2 border-[1px] border-[#EDF0F5] rounded-[0.5rem] bg-[#F4F5F8] p-3">
          <div className="flex items-center justify-between">
            <p className="font-inter text-sm">Delivery fee</p>
            <p className="font-bold font-inter text-sm">
              £{cartDetails?.deliveryFee}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-inter text-sm">Sub total</p>
            <p className="font-bold font-inter text-sm">
              £{cartDetails?.total}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-inter text-sm">Total</p>
            <p className="font-bold font-inter text-sm">
              £
              {parseInt(cartDetails?.total) +
                parseInt(cartDetails?.deliveryFee)}
            </p>
          </div>
        </div>
        <Checkout />
      </div>
    </SidebarHOC>
  );
}

export default CartModal;
