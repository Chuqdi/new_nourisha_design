import { ICartDetail, ICartItem, ILocalCartItem, IUser } from "@/config/types";
import useCart from "@/hooks/useCart";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";
import { useContext, useEffect, useMemo, useState } from "react";
import { CartManipulator } from "./SingleCartItemSection";
import CheckoutSection from "./CheckoutSection";
import Input from "../ui/Input";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/config";
import { useRouter } from "next/navigation";
import useLocalCart from "@/hooks/useLocalCart";
import usePromotionCode from "@/hooks/usePromotionCode";
import { UserContext } from "@/HOC/UserContext";

function CartItem({ item }: { item: ICartItem | ILocalCartItem }) {
  const { removeItemFrommCart } = useCart();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { clearItemFromCart } = useLocalCart();

  const onUpdateCart = (c: () => void) => {
    if (user?.email) {
      c();
    } else {
      toast({
        variant: "destructive",
        title: "Please login to access cart functionality",
        onClick: () => {
          router.push("/auth");
        },
      });
    }
  };
  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  return (
    <div className="p-2 rouned-[0.5rem] border-[1px] border-[#EDF0F5] flex flex-col gap-5 bg-white">
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
        <CartManipulator small meal={item?.item} item={item} />
        <button
          onClick={() =>
            isLoggedIn
              ? onUpdateCart(() =>
                  removeItemFrommCart(item?.item?._id!, item?.quantity)
                )
              : clearItemFromCart(item?.item)
          }
          className="text-[#FF4159] text-sm font-inter flex items-center"
        >
          <Icon
            color="#FF4159"
            className="w-4 h-4"
            icon="gravity-ui:trash-bin"
          />
        </button>
      </div>
    </div>
  );
}

function CartSideSection() {
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const localCartItems = useAtomValue(ATOMS.localCartItems) as ILocalCartItem[];
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const { user } = useContext(UserContext);
  const [showCartSideModal, setShowCartSideModal] = useAtom(
    ATOMS.showMobileCartModal
  );
  const {
    coupon,
    setCoupon,
    disCountedAmount,
    loadingDiscount,
    discountEvent,
  } = usePromotionCode();

  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  const { getCartTotal } = useLocalCart();

  const total = useMemo(() => {
    if (isLoggedIn) {
      let t = parseInt(cartDetails?.total!);

      if (!!disCountedAmount) {
        t = t - disCountedAmount;
      }
      return t;
    } else {
      return getCartTotal()?.total;
    }
  }, [
    disCountedAmount,
    loadingDiscount,
    cartDetails?.total,
    localCartItems,
    isLoggedIn,
  ]);

  useEffect(() => {
    discountEvent(total);
  }, [coupon]);
  return (
    <div className="bg-[#F2F4F7] p-2  w-full md:w-[19.5rem] rounded-none md:rounded-[0.75rem]  flex flex-col justify-between gap-4 max-h-[80vh] md:max-h-fit overflow-y-scroll md:overflow-y-auto  md:max-h-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          {isMobile && (
            <button
              className="w-10 h-10 rounded-full flex justify-center items-center bg-white"
              onClick={() =>
                setShowCartSideModal({
                  ...showCartSideModal,
                  show: false,
                })
              }
            >
              <Icon className="w-6 h-6" icon="proicons:cancel" />
            </button>
          )}
          <h4 className="text-[#323546] text-[1.5rem] font-NewSpiritBold">
            Cart({!isLoggedIn ? localCartItems?.length : cartItems?.length})
          </h4>
        </div>
        {isMobile && (
          <button
            onClick={() =>
              setShowCartSideModal({
                ...showCartSideModal,
                showDetails: !showCartSideModal?.showDetails,
              })
            }
          >
            {showCartSideModal.showDetails ? (
              <Icon icon="lsicon:down-outline" className="w-10 h-10" />
            ) : (
              <Icon icon="lsicon:up-outline" className="w-10 h-10" />
            )}
          </button>
        )}
      </div>
      <div className="bg-[#D9D9D9] w-full h-[0.0625rem]" />

      {(!isMobile || (isMobile && showCartSideModal.showDetails)) && (
        <div className="w-full flex flex-col gap-4">
          {!(isLoggedIn ? cartItems : localCartItems).length && (
            <div className="text-center font-inter text-sm text-black-900 w-full flex flex-col items-center justify-center gap-2">
              <img src="/images/no_data.png" className="h-[12.5rem] w-auto" />
              <div>No item(s) in your cart.</div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {(!isLoggedIn ? localCartItems : cartItems)?.map((item, index) => (
              <CartItem key={`cart_item_${index}`} item={item} />
            ))}
          </div>

          <div className="bg-[#D9D9D9] w-full h-[0.0625rem]" />

          {!!cartItems.length && (
            <div>
              <label>Coupon Code</label>
              <Input
                value={coupon}
                onChange={(e) => {
                  if (isLoggedIn) {
                    setCoupon(e.target.value);
                  } else {
                    alert("Please login/register to use coupon code");
                  }
                }}
                placeholder="Enter coupon code here..."
                className="bg-white"
              />
            </div>
          )}

          {!!disCountedAmount && (
            <div className="flex justify-between items-center mt-3 px-1">
              <p className="text-[#008000] font-inter text-sm">
                Discount applied
              </p>
              <p className="text-center font-NewSpiritRegular ">
                <span className="text-sm text-black-900 font-inter font-extrabold">
                  -£{disCountedAmount}
                </span>
              </p>
            </div>
          )}
          {loadingDiscount && (
            <p className="text-center text-sm font-NewSpiritRegular">
              Loading...
            </p>
          )}

          {!!(isLoggedIn ? cartItems : localCartItems).length && (
            <div className=" flex flex-col gap-2 border-[1px] border-[#EDF0F5] rounded-[0.5rem] bg-[#F4F5F8] p-3">
              <div className="flex items-center justify-between">
                <p className="font-inter text-sm">Delivery fee</p>
                <p className="font-bold font-inter text-sm">
                  £{isLoggedIn ? cartDetails?.deliveryFee : "10"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-inter text-sm">Total</p>
                <p className="font-bold font-inter text-sm">£{total}</p>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className={`w-full ${showCartSideModal?.showDetails ? "pb-8" : "pb-2"}`}
      >
        {!!(isLoggedIn ? cartItems : localCartItems).length && (
          <CheckoutSection total={total} coupon={coupon} />
        )}
      </div>
    </div>
  );
}

export default CartSideSection;
