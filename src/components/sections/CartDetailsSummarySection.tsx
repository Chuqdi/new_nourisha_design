"use client";
import {  useAtomValue, useSetAtom } from "jotai";
import Button from "../ui/Button";
import { ATOMS } from "@/store/atoms";
import { ICartDetail, ICartItem } from "@/config/types";
import DeliveryModal from "./Modals/DeliveryModal";
import {  useEffect, useState } from "react";
import useCart from "@/hooks/useCart";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/ui/use-toast";
import Link from "next/link";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

function Main() {
  const user = useAtomValue(ATOMS.loggedInUser);
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const [loading, setLoading] = useState(false);
  const { getAxiosClient } = useAuth();
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());

  const { getCartSessionDetails, emptyCart } = useCart();
  const [session_id, set_session_id] = useState();

  const { data: CartSessionData, isLoading } = useQuery(
    "GET_CART_SESSION",
    getCartSessionDetails
  );

  const onSubmit = async () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    const address = user?.address;
    setLoading(true);
    await axiosClient
      .post(`orders`, {
        cart_session_id: session_id,
        delivery_address: {
          address_: address?.address_,
          city: address?.city,
          country: address?.country,
        },

        delivery_date,
      })
      .then(() => {
        toast({
          title: "Success🎉",
          variant: "default",
          description: "Order sent successfully",
        });
        emptyCart();
      })
      .catch((err) => {
        const message = err?.response?.data?.message;

        toast({
          variant: "destructive",
          title: message ?? "Error placing order",
        });
      })
      .finally(() => setLoading(false));
  };

  const createOrder = async () => {
    setLoading(true);
    onSubmit();
  };

  useEffect(() => {
    if (CartSessionData?.data?.data?.cart?.session_id) {
      set_session_id(CartSessionData?.data?.data?.cart?.session_id);
    }
  }, [CartSessionData]);

  return user?._id ? (
    <div className="w-full  rounded-[0.75rem] mt-4 bg-[#F2F4F7] py-4 px-3 flex flex-col gap-3 mb-8">
      <h4 className="text-[#323546] text-[1.5rem] font-NewSpiritBold">
        Cart summary
      </h4>

      <div className="flex flex-col gap-4">
        {cartItems?.map((item, index) => (
          <div
            className="flex justify-between items-center"
            key={`cart_item_${index}`}
          >
            <div className="flex items-center gap-1">
              <div className="relative">
                <p className="absolute right-0 top-0 bg-black text-white font-inter font-bold min-w-6 min-h-6 flex justify-center items-center rounded-full text-sm">
                  {item?.quantity}
                </p>
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={item?.item?.image_url}
                />
              </div>
              <p className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem]">
                {item?.item?.name}
              </p>
            </div>
            <p className="text-black-900 text-sm font-inter tracking-[-0.0131313rem] leading-[1.3125rem]">
              £{item?.item.price.amount}
            </p>
          </div>
        ))}
      </div>
      <div className="border" />

      <div className=" flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p>Delivery fee</p>
          <p className="font-bold font-inter text-lg">
            £{cartDetails?.deliveryFee}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p>Sub total</p>
          <p className="font-bold font-inter text-lg">£{cartDetails?.total}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>Total</p>
          <p className="font-bold font-inter text-lg">
            £{parseInt(cartDetails?.total) + parseInt(cartDetails?.deliveryFee)}
          </p>
        </div>
      </div>

      <Button
        onClick={() =>
          setSideModal({
            component: (
              <DeliveryModal
                proceed={createOrder}
                setDeliveryDate={set_delivery_date}
              />
            ),
            show: true,
          })
        }
        fullWidth
        disabled={loading || isLoading}
        title="Proceed"
        variant="primary"
      />
    </div>
  ) : (
    <div className="w-full  rounded-[0.75rem] mt-4 bg-[#F2F4F7] py-4 px-3  flex-col gap-3 mb-8 text center ">
      <h4 className="text-[#323546] text-[1.5rem] font-NewSpiritBold">
        Cart summary
      </h4>
      <p className="text-center">
        <Link
          href="/auth"
          className="text-base text-center font-inter mt-4 text-primary-orange-900 w-full"
        >
          Login to view details...
        </Link>
      </p>
    </div>
  );
}

export default Main;
