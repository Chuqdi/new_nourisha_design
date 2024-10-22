import { LOCAL_CART_ITEMS } from "@/config/storageKeys";
import { ILocalCartItem, IMeal } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { useAtom } from "jotai";

export default () => {
  const [localCartItems, setLocalCartItems] = useAtom(ATOMS.localCartItems);

  const initializeCart = () => {
    const localCart = localStorage.getItem(LOCAL_CART_ITEMS);
    if (localCart) {
      const cartItems = JSON.parse(
        localStorage.getItem(LOCAL_CART_ITEMS)!
      ) as ILocalCartItem[];
      setLocalCartItems(cartItems);
    } else {
      setLocalCartItems([]);
      localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify([]));
    }
  };
  const addItem = (meal: IMeal, quantity: number) => {
    const mealExistInCart = (localCartItems as ILocalCartItem[]).find(
      (item) => item?.item?._id === meal?._id
    );

    if (mealExistInCart && !!mealExistInCart?.item?._id) {
      if (
        parseInt(meal?.available_quantity!) <
        mealExistInCart?.quantity + quantity
      ) {
        alert("Item available quantity exceeded");
        return;
      }
      const updatedItem = localCartItems.map((item) => {
        if (item?.item?._id === meal?._id) {
          return { ...item, quantity: item?.quantity + quantity };
        }
        return item;
      });
      setLocalCartItems(updatedItem as ILocalCartItem[]);
      localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(updatedItem));
    } else {
      const v = [{ item: meal, quantity, extra: {} }, ...localCartItems];
      setLocalCartItems(v);
      localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(v));
    }
  };

  const removeItem = (meal: IMeal, quantity: number) => {
    const mealExistInCart = localCartItems.find(
      (item) => item?.item?._id === meal?._id
    );

    if (!!mealExistInCart?.quantity && !!mealExistInCart?.item?._id) {
      const updatedItem = localCartItems.map((localitem) => {
        if (localitem?.item?._id === meal._id) {
          return { ...localitem, quantity: localitem?.quantity - quantity };
        }
        return localitem;
      });
      setLocalCartItems(updatedItem as ILocalCartItem[]);
      localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(updatedItem));
    }
  };
  const clearItemFromCart = (meal: IMeal) => {
    const localItems = JSON.parse(
      localStorage.getItem(LOCAL_CART_ITEMS)!
    ) as ILocalCartItem[];

    const updatedItems = localItems.filter(
      (item) => item?.item?._id !== meal?._id
    );
    setLocalCartItems(updatedItems);
    localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(updatedItems));
  };

  const getCartItem = (meal: IMeal) => {
    const localItems = JSON.parse(
      localStorage.getItem(LOCAL_CART_ITEMS)!
    ) as ILocalCartItem[];

    const mealExistInCart = localItems.find(
      (item) => item?.item?._id === meal?._id
    );
    return mealExistInCart;
  };

  const emptyCart = () => {
    setLocalCartItems([]);
    localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify([]));
  };

  const getCartTotal = () => {
    let total = 0;
    localCartItems.map((acc, item) => {
      total += acc?.item?.price?.amount * acc?.quantity;
    }, 0);
    return { total: total + 10 };
  };

  const prepareCartForAuth = () => {
    //@ts-ignore
    let value = [];
    localCartItems?.map((acc) => {
      value.push({
        itemId: acc?.item?._id,
        quantity: acc?.quantity,
        proteinId: null,
        swallowId: null,
      });
    });
    //@ts-ignore
    return value;
  };

  return {
    addItem,
    removeItem,
    prepareCartForAuth,
    emptyCart,
    getCartTotal,
    initializeCart,
    clearItemFromCart,
    getCartItem,
  };
};
