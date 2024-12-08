import { ICartItem, ILocalCartItem, IMeal } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useCart from "@/hooks/useCart";
import useLocalCart from "@/hooks/useLocalCart";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { useAtom, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { Button } from "../Button";

const CartManipulator = ({
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
  const { addItemToCart, removeItemFrommCart, checkMealExistsInCart } =
    useCart();
  const { user } = useContext(UserContext);
  const router = useRouter();
  const pathName = usePathname();
  const setMealExtraModal = useSetAtom(ATOMS.showMealExtraSelection);
  const [isLoading] = useAtom(ATOMS.cartIsLoading);
  const { addItem, removeItem } = useLocalCart();

  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  const onUpdateCart = (
    c: (proteinId?: string | null, extraId?: string | null) => void,
    isExceededQuantity?: boolean
  ) => {
    if (
      activeCountry?.toUpperCase() === "Asia".toUpperCase() &&
      pathName !== "/food-box"
    ) {
      router.push("/meal-plans?onAsian=1");
      return;
    }

    if (user?.email) {
      const mealExists = checkMealExistsInCart(meal);
      if ((meal?.isProtein || meal?.isSwallow) && !mealExists) {
        !isExceededQuantity &&
          setMealExtraModal({
            meal,
            onContinue: (proteinId: string, extraId: string) => {
              c(proteinId, extraId);
            },
            day: undefined,
            show: true,
          });
      } else {
        c();
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

  const addMealLocally = (isExceededQuantity?: boolean) => {
    addItem(meal, 1);
    if (meal?.isProtein || meal?.isSwallow) {
      !isExceededQuantity &&
        setMealExtraModal({
          meal,
          day: undefined,
          show: true,
          onContinue: (proteinId: string, extraId: string) => {},
        });
    }
  };

  return (
    <div
      className={`bg-[#F2F4F7] border-[1px] border-[#F2F4F7] rounded-[3rem]   px-[0.25rem] justify-between  items-center flex ${
        small ? "w-[4.6125rem] h-[1.5rem]" : "w-[7.68rem] h-[2.5rem]"
      }`}
    >
      <Button
        disabled={parseInt(meal?.available_quantity ?? "0") === 0 || isLoading}
        onClick={() => {
          isLoggedIn
            ? onUpdateCart(() => removeItemFrommCart(item?.item?._id!, 1))
            : removeItem(meal, 1);
        }}
        className={`bg-white text-black hover:bg-gray-200 hover:bg-opacity-90 justify-center items-center ${
          small ? "w-[0.975rem] h-[0.975rem] text-sm" : "w-8 h-8 text-3xl"
        }  p-2 rounded-full flex `}
      >
        -
      </Button>
      <p
        className={`text-black-900 font-inter text-base tracking-[-0.015rem] leading-[1.5rem] ${
          small ? "text-sm" : ""
        }`}
      >
        {item?.quantity ?? "0"}
      </p>
      <Button
        disabled={parseInt(meal?.available_quantity ?? "0") === 0 || isLoading}
        onClick={() => {
          isLoggedIn
            ? onUpdateCart(
                (proteinId, extraId) =>
                  addItemToCart(meal, 1, item?.quantity, proteinId, extraId),
                item?.quantity + 1 > parseInt(item?.item?.available_quantity!)
              )
            : addMealLocally(
                item?.quantity + 1 > parseInt(item?.item?.available_quantity!)
              );
        }}
        className={`bg-primary-orange-900 hover:bg-opacity-90 hover:bg-primary-orange-900 text-white justify-center items-center  rounded-full flex  ${
          small ? "w-[0.975rem] h-[0.975rem] text-sm" : "w-8 h-8 text-3xl"
        }`}
      >
        +
      </Button>
    </div>
  );
};

export default CartManipulator;
