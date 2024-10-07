import { atom } from "jotai";
import {
  cartDetails,
  cartIsLoading,
  cartItems,
  couponCode,
  device_id,
  FOOD_BOX,
  foodInfoModal,
  mealExtraSelection,
  paymentModal,
  SHOW_SIDE_MODAL,
  showMealExtraSelection,
  showMobileCartModal,
} from "./jotaiDefaultValues";
import { atomWithStorage } from 'jotai/utils'

export const ATOMS = {
  showSideModal: atom(SHOW_SIDE_MODAL),
  foodBox: atom(FOOD_BOX),
  cartItems: atom(cartItems),
  cartDetails: atom(cartDetails),
  cartIsLoading: atom(cartIsLoading),
  foodInfoModal: atom(foodInfoModal),
  device_id:atomWithStorage(device_id,""),
  paymentModal: atom(paymentModal),
  mealExtraSelection: atom(mealExtraSelection),
  showMealExtraSelection: atom(showMealExtraSelection),
  couponCode:atom(couponCode),
  showMobileCartModal:atom(showMobileCartModal)
};
