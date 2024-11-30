import { ICartDetail, ICartItem, ILocalCartItem, IUser } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useCart from "@/hooks/useCart";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtomValue } from "jotai";
import { CartManipulator } from "../SingleCartItemSection";
import Input from "@/components/ui/Input";
import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CheckoutSection from "../CheckoutSection";
import { useRouter, useSearchParams } from "next/navigation";
import useLocalCart from "@/hooks/useLocalCart";
import usePromotionCode, {
  roundUpToTwoDecimalPoints,
} from "@/hooks/usePromotionCode";
import { CART_MODAL_OPEN } from "@/config/storageKeys";
import { UserContext } from "@/HOC/UserContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

function CartItem({ item }: { item: ICartItem | ILocalCartItem }) {
  const { removeItemFrommCart } = useCart();
  const { user } = useContext(UserContext);

  const router = useRouter();
  const { clearItemFromCart } = useLocalCart();
  const isLoggedIn = useMemo(() => !!user?.email, [user]);

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
  const { user } = useContext(UserContext);
  const {
    coupon,
    setCoupon,
    disCountedAmount,
    loadingDiscount,
    discountEvent,
  } = usePromotionCode();
  const localCartItems = useAtomValue(ATOMS.localCartItems);
  const { getCartTotal } = useLocalCart();

  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [isWeekend, setIsWeekend] = useState(
    searchParams.get("isWeekend") === "true"
  );

  const deliveryFee = useMemo(() => {
    if (isLoggedIn) {
      // If logged in, use cart details and add weekend fee
      const baseFee = parseInt(cartDetails?.deliveryFee || "10");
      return isWeekend ? baseFee + 8 : baseFee;
    } else {
      // If not logged in, use default fee and add weekend fee
      const baseFee = 10;
      return isWeekend ? baseFee + 8 : baseFee;
    }
  }, [isLoggedIn, cartDetails?.deliveryFee, isWeekend]);

  // Update URL and state when weekend toggle changes
  const handleWeekendToggle = (value: string) => {
    const newWeekendStatus = value === "true";
    setIsWeekend(newWeekendStatus);

    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());

    // Set or remove the weekend parameter
    if (newWeekendStatus) {
      params.set("isWeekend", "true");
    } else {
      params.delete("isWeekend");
    }

    // Replace the current URL with updated params
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const total = useMemo(() => {
    if (isLoggedIn) {
      let t = parseInt(cartDetails?.total!);

      // Subtract discount if applicable
      if (!!disCountedAmount) {
        t = t - disCountedAmount;
      }

      // Add weekend delivery fee
      t += isWeekend ? 8 : 0;

      return roundUpToTwoDecimalPoints(t);
    } else {
      let localTotal = getCartTotal()?.total;

      // Add weekend delivery fee to local cart total
      if (isWeekend) {
        localTotal = (localTotal || 0) + 8;
      }

      return localTotal;
    }
  }, [
    disCountedAmount,
    loadingDiscount,
    cartDetails?.total,
    localCartItems,
    isLoggedIn,
    isWeekend,
  ]);

  useEffect(() => {
    discountEvent(total);
  }, [coupon]);

  return (
    <SidebarHOC title="Cart">
      <div className="flex flex-col gap-3">
        {(isLoggedIn ? !cartItems.length : !localCartItems.length) && (
          <p className="text-black-900 text-sm font-inter">Cart Summary</p>
        )}
        {(isLoggedIn ? !cartItems.length : !localCartItems.length) && (
          <div className="text-center font-inter text-sm text-black-900 w-full flex flex-col items-center justify-center gap-2">
            <img src="/images/no_data.png" className="h-[12.5rem] w-auto" />
            <div>
              No item(s) in your cart.
              {/* <Link
                onClick={() => {
                  setSideModal({ ...sideModal, show: false });
                }}
                className="text-primary-orange-900"
                href="/single-meals"
              >
                add here...
              </Link> */}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {(isLoggedIn ? cartItems : localCartItems)?.map((item, index) => (
            <CartItem key={`cart_item_${index}`} item={item} />
          ))}
        </div>

        {!!(isLoggedIn ? cartItems : localCartItems).length && (
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
              <p className="font-inter text-sm">
                Delivery fee
                {isWeekend && (
                  <span className="text-green-600 ml-2">
                    (+£8 Weekend Rate)
                  </span>
                )}
              </p>
              <p className="font-bold font-inter text-sm">£{deliveryFee}</p>
            </div>

            <div className="flex flex-col gap-2 my-2">
              <p className="font-inter text-sm">Delivery Type</p>
              <RadioGroup
                defaultValue={isWeekend ? "true" : "false"}
                onValueChange={handleWeekendToggle}
                className="flex items-center space-x-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="weekday" />
                  <label
                    htmlFor="weekday"
                    className="font-inter font-normal text-sm"
                  >
                    Weekday
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="weekend" />
                  <label
                    htmlFor="weekend"
                    className="font-inter font-normal text-sm"
                  >
                    Weekend
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-inter text-sm">Total</p>
              <p className="font-bold font-inter text-sm">£{total}</p>
            </div>
          </div>
        )}

        {!!(isLoggedIn ? cartItems.length : localCartItems.length) && (
          <CheckoutSection isWeekend={isWeekend} total={total} coupon={coupon} />
        )}
      </div>
    </SidebarHOC>
  );
}

export default CartModal;
