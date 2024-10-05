import { ICartDetail, ICartItem } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useCart from "@/hooks/useCart";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { CartManipulator } from "../SingleCartItemSection";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DeliveryModal from "./DeliveryModal";
import { useContext, useState } from "react";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Checkout = ({ coupon }: { coupon: string }) => {
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const user = useContext(UserContext);
  const loggedInUser = useAtomValue(ATOMS.loggedInUser);
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const { axiosClient } = useAuth();
  const router = useRouter();

  return (
    <Button
      title={`Checkout £${
        parseInt(cartDetails?.total) + parseInt(cartDetails?.deliveryFee)
      }`}
      variant="primary"
      className="py-6 h-[2.7rem]"
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

function CartItem({ item }: { item: ICartItem }) {
  const { addItemToCart } = useCart();
  const user = useContext(UserContext);

  const loggedInUser = useAtomValue(ATOMS.loggedInUser);

  const onUpdateCart = (c: () => void) => {
    if (loggedInUser?.email) {
      c();
    } else {
      toast({
        variant: "destructive",
        title: "Please login to access cart functionality",
      });
    }
  };

  return (
    <div className="z-[999999999] p-2 rouned-[0.5rem] border-[1px] border-[#EDF0F5] flex flex-col gap-5">
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
            £{item?.item?.price?.amount}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {!user?.isLoading && (
          <button
            onClick={() => onUpdateCart(()=>addItemToCart(item?.item!, -item?.quantity))}
            className="text-[#FF4159] text-sm font-inter flex items-center"
          >
            <Icon
              color="#FF4159"
              className="w-4 h-4"
              icon="gravity-ui:trash-bin"
            />
            <p>Remove</p>
          </button>
        )}
        <CartManipulator meal={item?.item} item={item} />
      </div>
    </div>
  );
}

function CartModal() {
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const [coupon, setCoupon] = useState("");
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];

  return (
    <SidebarHOC title="Cart">
      <div className="flex flex-col gap-3">
        {!cartItems.length && (
          <p className="text-black-900 text-sm font-inter">Cart Summary</p>
        )}
        {!cartItems.length && (
          <div className="text-center font-inter text-sm text-black-900">
            No items in your cart,
            <Link
              onClick={() => {
                setSideModal({ ...sideModal, show: false });
              }}
              className="text-primary-orange-900"
              href="/single_meals"
            >
              add here...
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {cartItems?.map((item, index) => (
            <CartItem key={`cart_item_${index}`} item={item} />
          ))}
        </div>

        {!!cartItems.length && (
          <div>
            <label>Coupon Code</label>
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code here..."
            />
          </div>
        )}

        {!!cartItems.length && (
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
        )}

        {!!cartItems.length && <Checkout coupon={coupon} />}
      </div>
    </SidebarHOC>
  );
}

export default CartModal;
