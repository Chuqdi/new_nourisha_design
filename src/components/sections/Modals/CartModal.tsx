import { ICartDetail, ICartItem, ILocalCartItem, IUser } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useCart from "@/hooks/useCart";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";
import { CartManipulator } from "../SingleCartItemSection";
import Input from "@/components/ui/Input";
import { useEffect, useMemo, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CheckoutSection from "../CheckoutSection";
import useUser from "@/hooks/useUser";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useLocalCart from "@/hooks/useLocalCart";

function CartItem({ item }: { item: ICartItem | ILocalCartItem }) {
  const { removeItemFrommCart } = useCart();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { getUser } = useUser();
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

  useEffect(() => {
    setUser(getUser());
  }, []);

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
  const [coupon, setCoupon] = useState("");
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const [disCountedAmount, setDisCountedAmount] = useState(0);
  const [loadingDiscount, setLoadingDiscount] = useState(false);
  const { getAxiosClient } = useAuth();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { getUser } = useUser();
  const localCartItems = useAtomValue(ATOMS.localCartItems);
  const { getCartTotal } = useLocalCart();

  const discountEvent = async () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    setLoadingDiscount(true);

    await axiosClient
      .get(`discounts/promos/code/${coupon.trim()}`)
      .then((data) => {
        const couponDiscount = data?.data?.data;
        if (couponDiscount?.coupon) {
          if (couponDiscount?.coupon?.percent_off) {
            const discountPercentage = couponDiscount?.coupon?.percent_off;
            const discountedAmount =
              //@ts-ignore
              cartDetails?.total! -
              //@ts-ignore
              (cartDetails?.total! * (100 - discountPercentage)) / 100;
            setDisCountedAmount(discountedAmount);
          } else if (couponDiscount?.coupon?.amount_off) {
            const discountedAmount = couponDiscount?.coupon?.amount_off;
            setDisCountedAmount(discountedAmount);
          }
        } else {
          setDisCountedAmount(0);
        }
      })
      .catch(() => {});
    setLoadingDiscount(false);
  };

  const isLoggedIn = useMemo(() => !!user?.email, [user]);

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
    discountEvent();
  }, [coupon]);

  useEffect(() => {
    setUser(getUser());
  }, []);

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
                href="/single_meals"
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

        {!!cartItems.length && (
          <CheckoutSection total={total} coupon={coupon} />
        )}
      </div>
    </SidebarHOC>
  );
}

export default CartModal;
