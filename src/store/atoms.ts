import { atom } from "jotai";
import {
  cartDetails,
  cartIsLoading,
  cartItems,
  couponCode,
  DELIVERY_DATE,
  device_id,
  FOOD_BOX,
  foodInfoModal,
  localCartItems,
  mealExtraSelection,
  paymentModal,
  SHOW_SIDE_MODAL,
  showGiftCardModal,
  showMealExtraSelection,
  showMobileCartModal,
} from "./jotaiDefaultValues";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { ILocalCartItem } from "@/config/types";


export const ATOMS = {
  showSideModal: atom(SHOW_SIDE_MODAL),
  foodBox: atom(FOOD_BOX),
  cartItems: atom(cartItems),
  showGiftCardModal:atom(showGiftCardModal),
  cartDetails: atom(cartDetails),
  cartIsLoading: atom(cartIsLoading),
  foodInfoModal: atom(foodInfoModal),
  device_id: atomWithStorage(device_id, ""),
  localCartItems: atomWithStorage(
    "localCartItem",
    localCartItems as ILocalCartItem[]
  ),
  paymentModal: atom(paymentModal),
  mealExtraSelection: atomWithStorage("mealExtraSelection",mealExtraSelection),
  showMealExtraSelection: atom(showMealExtraSelection),
  couponCode: atom(couponCode),
  DELIVERY_DATE:atom(DELIVERY_DATE),
  showMobileCartModal: atom(showMobileCartModal),
};
