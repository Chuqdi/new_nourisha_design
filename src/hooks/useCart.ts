import { useContext, useEffect, useMemo, useState } from "react";
import { ICartDetail, ICartItem, IMeal, IUser } from "../config/types";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import queryKeys from "../config/queryKeys";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthToken from "./useAuthToken";
import useAuth from "./useAuth";
import { LOGGED_IN_USER, UserContext } from "@/HOC/UserContext";
import useFingerPrint, { DEVICE_ID } from "./useFingerPrint";
import { toast } from "@/ui/use-toast";

const CART_SESSION_ID = "cart_session_id";
export const CART_TEMP_ID = "cart_temp_id";
const useCart = () => {
  const [cartItems, setCartItems] = useAtom<ICartItem[]>(ATOMS.cartItems);
  const setCartDetails = useSetAtom(ATOMS.cartDetails);
  const setCartIsLoading = useSetAtom(ATOMS.cartIsLoading);
  const { axiosClient } = useAuth();
  const { getToken } = useAuthToken();
  const device_id = localStorage?.getItem(DEVICE_ID);
  const token = getToken();

  const getCartSessionDetails = () => {
    const cartSessionId = localStorage.getItem(CART_SESSION_ID);
    let user = localStorage?.getItem(LOGGED_IN_USER);
    let u = JSON.parse(user ?? "") as IUser;

    return axiosClient.get(
      !!token && !!u ? "cart" : ""
    );
  };
  const {
    data,
    isLoading: IsLoadingCartItem,
    refetch: RefreshCart,
    isRefetching,
  } = useQuery(queryKeys.GET_CART_ITEMS, getCartSessionDetails);

  const emptyCart = () => {
    setCartItems([]);
    setCartDetails({} as ICartDetail);
  };
  useEffect(() => {
    setCartIsLoading(isRefetching);
  }, [IsLoadingCartItem, isRefetching]);

  useEffect(() => {
    if (data?.data?.data) {
      setCartItems(data?.data?.data?.items?.data);
      setCartDetails(data?.data?.data?.cart);
    }
  }, [data]);

  const getCartItemTotal = useMemo(() => {
    let totalDeliveryPrice = 0;
    let totalSubPrice = 0;
    cartItems?.map((item) => {
      totalDeliveryPrice += item?.item?.price?.deliveryFee * item?.quantity;
      totalSubPrice += item?.item?.price?.amount * item?.quantity;
    });
    return {
      totalDeliveryPrice,
      totalSubPrice,
      total: totalDeliveryPrice + totalSubPrice,
    };
  }, [cartItems]);

  const updateLocalStorageStates = (data: any) => {
    localStorage.setItem(CART_SESSION_ID, data?.data?.data?.session_id);
    localStorage.setItem(CART_TEMP_ID, data?.data?.data?.temp_id);
  };

  const updateItemBE = async (itemId: string, quantity: number) => {
    const res = axiosClient
      .put("cart", {
        itemId,
        quantity,
      })
      .then((data) => {
        // updateLocalStorageStates(data);
      });
    RefreshCart();
  };

  const removeItemFrommCart = async (itemId: string, quantity: number) => {
    await axiosClient
      .delete(`cart`, {
        data: {
          itemId,
          quantity,
        },
      })
      .then((data) => {
        // updateLocalStorageStates(data);
      });
    RefreshCart();
  };

  const addItemToCart = async (item: IMeal, quantity: number) => {
    const data = {
      itemId: item?._id,
      quantity,
    };

    await axiosClient.put("cart", data).then((data) => {
      // updateLocalStorageStates(data);
    });
    RefreshCart();
  };

  const returnValue = useMemo(() => {
    return {
      addItemToCart,
      getCartItemTotal,
      getCartSessionDetails,
      RefreshCart,
      updateItemBE,
      removeItemFrommCart,
      emptyCart,
    };
  }, [cartItems]);
  return returnValue;
};
export default useCart;
