import { COUNTRIES } from "@/config";
import {
  ICartItem,
  IFoodBox,
  IFoodBoxDayType,
  ILocalCartItem,
  IMeal,
  IUser,
} from "@/config/types";
import useCart from "@/hooks/useCart";
import useFoodbox from "@/hooks/useFoodbox";
import useLocalCart from "@/hooks/useLocalCart";
import useUser from "@/hooks/useUser";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtomValue, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export const CartManipulator = ({
  meal,
  item,
  small,
  activeCountry,
}: {
  item: ICartItem | ILocalCartItem;
  meal: IMeal;
  small?: boolean;
  activeCountry?: string;
}) => {
  const { addItemToCart, removeItemFrommCart } = useCart();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { getUser } = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const setMealExtraModal = useSetAtom(ATOMS.showMealExtraSelection);
  const { addItem, removeItem } = useLocalCart();

  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  const onUpdateCart = (c: () => void, isExceededQuantity?:boolean) => {
    if (
      activeCountry?.toUpperCase() === "Asia".toUpperCase() &&
      pathName !== "/food_box"
    ) {
      router.push("/meal_plans?onAsian=1");
      return;
    }
    if (user?.email) {
      c();
      if (
        !!meal?.expected_proteins?.length ||
        !!meal?.expected_swallows?.length

      ) {
       !isExceededQuantity && setTimeout(() => {
        setMealExtraModal({
          meal,
          day: undefined,
          show: true,
        });
      }, 4000);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please login to continue",
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
    <div
      className={`bg-[#F2F4F7] border-[1px] border-[#F2F4F7] rounded-[3rem]   px-[0.25rem] justify-between  items-center flex ${
        small ? "w-[4.6125rem] h-[1.5rem]" : "w-[7.68rem] h-[2.5rem]"
      }`}
    >
      <button
        onClick={() => {
          isLoggedIn
            ? onUpdateCart(() => removeItemFrommCart(item?.item?._id!, 1))
            : removeItem(meal, 1);
        }}
        className={`bg-white justify-center items-center ${
          small ? "w-[0.975rem] h-[0.975rem] text-sm" : "w-8 h-8 text-3xl"
        }  p-2 rounded-full flex `}
      >
        -
      </button>
      <p
        className={`text-black-900 font-inter text-base tracking-[-0.015rem] leading-[1.5rem] ${
          small ? "text-sm" : ""
        }`}
      >
        {item?.quantity ?? "0"}
      </p>
      <button
        onClick={() => {
          isLoggedIn
            ? onUpdateCart(() => addItemToCart(meal, 1, item?.quantity), item?.quantity + 1 > parseInt(item?.item?.available_quantity!))
            : addItem(meal, 1);
        }}
        className={`bg-primary-orange-900 text-white justify-center items-center  rounded-full flex  ${
          small ? "w-[0.975rem] h-[0.975rem] text-sm" : "w-8 h-8 text-3xl"
        }`}
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
  const pathName = usePathname();
  const { getCartItem} = useLocalCart();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const { getUser } = useUser();
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
    () => isLoggedIn?cartItems.find((i) => i?.item?._id === meal?._id):getCartItem(meal),

    [cartItems, localCartItem]
  );

  useEffect(() => {
    setUser(getUser());
  }, []);

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
      {pathName?.toUpperCase() !== "/food_box".toUpperCase() && (
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
                  if (
                    !!meal?.expected_proteins?.length ||
                    !!meal?.expected_swallows?.length
                  ) {
                    setMealExtraModal({
                      meal,
                      day: activeWeek,
                      show: true,
                    });
                  }
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
