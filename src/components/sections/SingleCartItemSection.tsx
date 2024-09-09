import { COUNTRIES } from "@/config";
import { ICartItem, IFoodBox, IFoodBoxDayType, IMeal } from "@/config/types";
import useCart from "@/hooks/useCart";
import useFoodbox from "@/hooks/useFoodbox";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";

export default function SingleCartItemSection({
  country,
  isHome,
  meal,
  isFoodBox,
  activeWeek,
}: {
  isHome?: boolean;
  meal: IMeal;
  isFoodBox?: boolean;
  activeWeek?: IFoodBoxDayType;
  country: (typeof COUNTRIES)[0];
}) {
  const { addFoodBox, removeFoodBox } = useFoodbox();
  const boxStore = useAtomValue(ATOMS.foodBox) as IFoodBox;
  const { addItemToCart, removeItemFrommCart } = useCart();
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];

  const [mealAddedToCart, setMealAddedToCart] = useState(false);
  const activeDayBox = useMemo(() => {
    if (boxStore) {
      //@ts-ignore
      return boxStore[activeWeek!];
    } else {
      return {};
    }
  }, [activeWeek, boxStore]) as IFoodBox;
  //@ts-ignore
  const activeDayMeal = useMemo(() => activeDayBox?.meals, [activeDayBox]) as {
    meals: { first_meal: IMeal; last_meal: IMeal };
  };
  const isMealSelected = useMemo(
    () =>
      //@ts-ignore
      activeDayMeal?.first_meal?._id === meal?._id ||
      //@ts-ignore
      activeDayMeal?.last_meal?._id === meal?._id,
    [activeDayMeal]
  );
  const cartItemMeal = useMemo(
    () => cartItems.find((i) => i?.item?._id === meal?._id),

    [cartItems]
  );


  return (
    <div className="flex-1 bg-white p-2 border-[1px] border-[#F2F4F7] shadow-cartItem rounded-[0.75rem] relative">
      {isHome && (
        <div className="absolute right-[1.04169rem] w-9 h-9 flex justify-center items-center border overflow-hidden rounded-full top-4">
          <p className="text-[4rem]">{country.flag}</p>
        </div>
      )}
      <img
        src={meal?.image_url}
        className="w-full h-[15.5625rem] rounded-[0.75rem] object-cover "
      />
      {isHome && (
        <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem] font-bold mt-4">
          £{meal?.price?.amount}
        </p>
      )}
      <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem]">
        {meal?.name}
      </p>
      {isFoodBox ? (
        <div className=" flex w-full justify-end">
          {isMealSelected ? (
            <button
              onClick={() => removeFoodBox(activeWeek!, meal?._id!)}
              className="flex items-center gap-1"
            >
              <div className="bg-[#E6FEF2] text-[#04A76C] font-inter tracking-[-0.015rem] leading-[1.5rem] h-8 p-2 flex justify-center items-center rounded">
                Selected
              </div>
              <Icon
                className="w-5 h-5"
                color="#FF4159"
                icon="icomoon-free:bin"
              />
            </button>
          ) : (
            <button
              onClick={() => {
                addFoodBox(activeWeek!, meal!);
              }}
              className="w-8 h-8 rounded-full justify-center items-center bg-primary-orange-900 flex "
            >
              <Icon
                className="w-6 h-6 text-3xl"
                color="#fff"
                icon="icon-park-outline:plus"
              />
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-between items-center mt-3">
          <button className="w-[6.56rem] h-[2.5rem] border-[1px] border-primary-orange-900 py-4 px-3 flex  items-center rounded-full justify-center">
            <p className="text-primary-orange-900 text-sm font-inter ">
            £{((cartItemMeal?.quantity ?? 0) * (cartItemMeal?.item?.price?.amount ?? 0)) ?? "0"}
            </p>
          </button>

          <div className="bg-[#F2F4F7] border-[1px] border-[#F2F4F7] rounded-[3rem] w-[7.68rem] h-[2.5rem] px-[0.25rem] justify-between  items-center flex ">
            <button 
              onClick={() => {
                removeItemFrommCart(meal?._id!, 1,);
                setMealAddedToCart(true);
                setTimeout(() => {
                  setMealAddedToCart(false);
                }, 1500);
              }}
            className="bg-white justify-center items-center w-8 h-8 p-2 rounded-full flex text-3xl">
              -
            </button>
            <p className="text-black-900 font-inter text-base tracking-[-0.015rem] leading-[1.5rem]">
              {cartItemMeal?.quantity ?? "0"}
            </p>
            <button
              onClick={() => {
                addItemToCart(meal);
                setMealAddedToCart(true);
                setTimeout(() => {
                  setMealAddedToCart(false);
                }, 1500);
              }}
              className="bg-primary-orange-900 text-white justify-center items-center w-8 h-8 p-2 rounded-full flex text-3xl"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
