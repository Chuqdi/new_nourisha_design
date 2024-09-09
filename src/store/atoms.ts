import { atom } from "jotai";
import { cartDetails, cartIsLoading, cartItems, FOOD_BOX, SHOW_SIDE_MODAL } from "./jotaiDefaultValues";

export const ATOMS = {
  showSideModal: atom(SHOW_SIDE_MODAL),
  foodBox: atom(FOOD_BOX),
  cartItems: atom(cartItems),
  cartDetails: atom(cartDetails),
  cartIsLoading: atom(cartIsLoading),
};
