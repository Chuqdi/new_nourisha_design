import { COUNTRIES } from "@/config";
import { MEALEXTRASELECTIONS } from "@/config/storageKeys";
import {
  ICartItem,
  IExtraItem,
  IFoodBox,
  IFoodBoxDayType,
  IMeal,
} from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useFoodbox from "@/hooks/useFoodbox";
import useLocalCart from "@/hooks/useLocalCart";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useContext, useMemo } from "react";
import { Button } from "../Button";
import CartManipulator from "../commons/CartManipulator";
import { Badge } from "../ui/Badge";

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
  const {
    addFoodBox,
    removeFoodBox,
    checkIfBothMealsAreSelected,
    getMealCountInStore,
  } = useFoodbox();
  const boxStore = useAtomValue(ATOMS.foodBox) as IFoodBox;
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const setFoodInfoModal = useSetAtom(ATOMS.foodInfoModal);
  const setMealExtraModal = useSetAtom(ATOMS.showMealExtraSelection);
  const pathName = usePathname();
  const { getCartItem } = useLocalCart();
  const { user } = useContext(UserContext);
  const [mealExtraSelection, setMealExtraSelection] = useAtom(
    ATOMS.mealExtraSelection
  );
  const localCartItem = useAtomValue(ATOMS?.localCartItems);

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
  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  const isMealSelected = useMemo(() => {
    return {
      //@ts-ignore
      first_meal: activeDayMeal?.first_meal?._id === meal?._id,
      //@ts-ignore
      last_meal: activeDayMeal?.last_meal?._id === meal?._id,
    };
  }, [activeDayMeal]);
  const cartItemMeal = useMemo(
    () =>
      isLoggedIn
        ? cartItems.find((i) => i?.item?._id === meal?._id)
        : getCartItem(meal),

    [cartItems, localCartItem]
  );

  const addMealToFoodbox = () => {
    if (getMealCountInStore(meal) + 1 > parseInt(meal?.available_quantity!)) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Meal available quantity exceeded. Please choose a different meal.",
      });
      return;
    }
    if (meal?.isProtein || meal?.isSwallow) {
      setMealExtraModal({
        meal,
        day: activeWeek,
        show: true,
        onContinue: (
          proteinId: string,
          extraId: string,
          protein?: IExtraItem,
          swallow?: IExtraItem
        ) => {
          addFoodBox(activeWeek!, meal!);
          const extrasValue = [
            ...(!!mealExtraSelection?.length ? mealExtraSelection : []),
            {
              day: activeWeek,
              extra: swallow,
              meal,
              protein,
            },
          ];
          setMealExtraSelection(extrasValue);

          localStorage.setItem(
            MEALEXTRASELECTIONS,
            JSON.stringify(extrasValue)
          );
        },
      });
    } else {
      addFoodBox(activeWeek!, meal!);
    }
    const bothSelected = checkIfBothMealsAreSelected(activeWeek!);
    if (bothSelected?.isFirstMealAlreadySelected)
      goToNextWeek && goToNextWeek();
  };

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
      {parseInt(meal?.available_quantity ?? "0") === 0 && (
        <>
          <div className="absolute inset-0 bg-[#F2F4F7] opacity-45"></div>
          <Badge className="text-red-500 text-base top-[calc(50%-50px)] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] font-inter absolute shadow-[0_0_20px_rgba(0_0_0_/_60%)]">
            Sold Out
          </Badge>
        </>
      )}
      <img
        alt=""
        src={meal?.image_url}
        className="w-full h-[15.5625rem] rounded-[0.75rem] object-cover "
      />
      {pathName?.toUpperCase() !== "/food-box".toUpperCase() && (
        <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem] font-bold mt-4">
          £{meal?.price?.amount}
        </p>
      )}
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
              className="w-[4rem] md:w-[6.56rem] h-[2.5rem] border-[1px] border-primary-orange-900 py-4 px-0 flex  items-center rounded-[0.5rem] justify-center !opacity-100"
            >
              <p className=" !opacity-100 text-primary-orange-900 text-[0.75rem] md:text-sm font-inter ">
                Meal Info
              </p>
            </button>
            <div className="flex flex-col items-center gap-2">
              <Button
                disabled={parseInt(meal?.available_quantity ?? "0") === 0}
                onClick={addMealToFoodbox}
                className="w-8 h-8 rounded-full justify-center items-center bg-primary-orange-900 flex hover:bg-primary-orange-900 hover:bg-opacity-90"
              >
                <Icon
                  className="w-6 h-6 text-3xl"
                  color="#fff"
                  icon="icon-park-outline:plus"
                />
              </Button>
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

          <CartManipulator
            activeCountry={country?.name}
            meal={meal}
            item={cartItemMeal!}
          />
        </div>
      )}
    </div>
  );
}
