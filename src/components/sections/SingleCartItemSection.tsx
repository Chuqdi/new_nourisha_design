import { COUNTRIES } from "@/config";
import { ICartItem, IFoodBox, IFoodBoxDayType, IMeal } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useCart from "@/hooks/useCart";
import useFoodbox from "@/hooks/useFoodbox";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtomValue, useSetAtom } from "jotai";
import { useContext, useEffect, useMemo } from "react";

export const CartManipulator = ({
  meal,
  item,
}: {
  item: ICartItem;
  meal: IMeal;
}) => {
  const { addItemToCart, removeItemFrommCart } = useCart();
  const user = useContext(UserContext);
  const loggedInUser = useAtomValue(ATOMS.loggedInUser);

  const onUpdateCart = (c: () => void) => {
    if (loggedInUser?.email) {
      c();
    } else {
      toast({
        variant: "destructive",
        title: "Please login to continue",
      });
    }
  };

  return user?.isLoading ? (
    <div>
      <Icon color="#FE7E00" className="w-6 h-6" icon="eos-icons:loading" />
    </div>
  ) : (
    <div className="bg-[#F2F4F7] border-[1px] border-[#F2F4F7] rounded-[3rem] w-[7.68rem] h-[2.5rem] px-[0.25rem] justify-between  items-center flex ">
      <button
        onClick={() => {
          onUpdateCart(() => removeItemFrommCart(item?.item?._id!, 1));
        }}
        className="bg-white justify-center items-center w-8 h-8 p-2 rounded-full flex text-3xl"
      >
        -
      </button>
      <p className="text-black-900 font-inter text-base tracking-[-0.015rem] leading-[1.5rem]">
        {item?.quantity ?? "0"}
      </p>
      <button
        onClick={() => onUpdateCart(() => addItemToCart(meal, 1))}
        className="bg-primary-orange-900 text-white justify-center items-center w-8 h-8 p-2 rounded-full flex text-3xl"
      >
        +
      </button>
    </div>
  );
};

export default function SingleCartItemSection({
  country,
  isHome,
  meal,
  fromButtonNext,
  isFoodBox,
  activeWeek,
  goToNextWeek,
}: {
  isHome?: boolean;
  meal: IMeal;
  isFoodBox?: boolean;
  fromButtonNext?: boolean;
  activeWeek?: IFoodBoxDayType;
  country: (typeof COUNTRIES)[0];
  goToNextWeek?: () => void;
}) {
  const { addFoodBox, removeFoodBox, checkIfBothMealsAreSelected } =
    useFoodbox();
  const boxStore = useAtomValue(ATOMS.foodBox) as IFoodBox;
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const setFoodInfoModal = useSetAtom(ATOMS.foodInfoModal);
  const setMealExtraModal = useSetAtom(ATOMS.showMealExtraSelection);

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
  const isMealSelected = useMemo(() => {
    return {
      //@ts-ignore
      first_meal: activeDayMeal?.first_meal?._id === meal?._id,
      //@ts-ignore
      last_meal: activeDayMeal?.last_meal?._id === meal?._id,
    };
  }, [activeDayMeal]);
  const cartItemMeal = useMemo(
    () => cartItems.find((i) => i?.item?._id === meal?._id),

    [cartItems]
  );

  // useEffect(() => {

  //   if (bothSelected) {
  //     goToNextWeek && goToNextWeek();
  //   }
  // }, [activeDayMeal]);

  return (
    <div className="flex-1 bg-white p-2 border-[1px] border-[#F2F4F7] shadow-cartItem rounded-[0.75rem] relative">
      <div className="absolute top-2 left-0 right-6 w-full    flex justify-between items-center px-4 py-3 md:py-1">
        <p className="font-inter text-sm p-1 rounded-[0.5rem] bg-white">
          {meal?.calories}KCal
        </p>

        <div className="text-xl md:text-xlg">
          {
            COUNTRIES.find((country) =>
              country?.name
                ?.toLowerCase()
                ?.includes((meal?.country ?? "").toLowerCase())
            )?.flag
          }
        </div>
      </div>
      <img
        src={meal?.image_url}
        className="w-full h-[15.5625rem] rounded-[0.75rem] object-cover "
      />
      <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem] font-bold mt-4">
        £{meal?.price?.amount}
      </p>
      <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem]">
        {meal?.name}
      </p>

      {isFoodBox ? (
        <div>
          <div className="flex w-full justify-between items-center">
            <button
              onClick={() =>
                setFoodInfoModal({
                  show: true,
                  meal,
                })
              }
              className="w-[4rem] md:w-[6.56rem] h-[2.5rem] border-[1px] border-primary-orange-900 py-4 px-0 flex  items-center rounded-[0.5rem] justify-center"
            >
              <p className="text-primary-orange-900 text-[0.75rem] md:text-sm font-inter ">
                Meal Info
              </p>
            </button>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => {
                  addFoodBox(activeWeek!, meal!);
                  const bothSelected = checkIfBothMealsAreSelected(activeWeek!);
                  if (bothSelected?.isFirstMealAlreadySelected)
                    goToNextWeek && goToNextWeek();
                }}
                className="w-8 h-8 rounded-full justify-center items-center bg-primary-orange-900 flex "
              >
                <Icon
                  className="w-6 h-6 text-3xl"
                  color="#fff"
                  icon="icon-park-outline:plus"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between mt-2">
            {isMealSelected?.first_meal && (
              <button
                onClick={() => removeFoodBox(activeWeek!, meal?._id!)}
                className="flex items-center flex-1"
              >
                <div className="bg-[#E6FEF2] text-[#04A76C] font-inter tracking-[-0.015rem] leading-[1.5rem] h-8 p-2 flex justify-center items-center rounded text-sm md:text-base text-ellipsis text-nowrap flex-1">
                  First meal
                </div>
                <Icon
                  className="w-5 h-5"
                  color="#FF4159"
                  icon="icomoon-free:bin"
                />
              </button>
            )}

            {isMealSelected?.last_meal && (
              <button
                onClick={() => removeFoodBox(activeWeek!, meal?._id!)}
                className="flex items-center flex-1"
              >
                <div className="bg-[#E6FEF2] text-[#04A76C] font-inter tracking-[-0.015rem] leading-[1.5rem] h-8 p-2 flex justify-center items-center rounded text-sm md:text-base text-ellipsis text-nowrap flex-1">
                  Second meal
                </div>
                <Icon
                  className="w-5 h-5"
                  color="#FF4159"
                  icon="icomoon-free:bin"
                />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() =>
              setFoodInfoModal({
                show: true,
                meal,
              })
            }
            className="w-[4rem] md:w-[6.56rem] h-[2.5rem] border-[1px] border-primary-orange-900 py-4 px-0 flex  items-center rounded-[0.5rem] justify-center"
          >
            <p className="text-primary-orange-900 text-[0.75rem] md:text-sm font-inter ">
              Meal Info
            </p>
          </button>

          <CartManipulator meal={meal} item={cartItemMeal!} />
        </div>
      )}
    </div>
  );
}
