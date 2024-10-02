import { useContext, useEffect, useMemo } from "react";
import { ICartDetail, ICartItem, IMeal } from "../config/types";
import { useAtom, useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import queryKeys from "../config/queryKeys";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthToken from "./useAuthToken";
import useAuth from "./useAuth";
import { UserContext } from "@/HOC/UserContext";

const CART_SESSION_ID = "cart_session_id";
export const CART_TEMP_ID = "cart_temp_id";
const useCart = () => {
  const [cartItems, setCartItems] = useAtom<ICartItem[]>(ATOMS.cartItems);
  const setCartDetails = useSetAtom(ATOMS.cartDetails);
  const setCartIsLoading = useSetAtom(ATOMS.cartIsLoading);
  const { axiosClient } = useAuth();
  const { getToken } = useAuthToken();
  const device_id = navigator?.userAgent?.replace(/\s+/g, "_");
  const token = getToken();
  const user = useContext(UserContext);
  const getCartSessionDetails = () => {
    const cartSessionId = localStorage.getItem(CART_SESSION_ID);
    return axiosClient.get(
      user?.user?._id ? "cart" : `cart/web?session_id=${cartSessionId}`
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
        device_id: device_id,
        temp_id: device_id,
      })
      .then((data) => {
        updateLocalStorageStates(data);
      });
    RefreshCart();
  };

  const removeItemFrommCart = async (itemId: string, quantity: number) => {
    await axios
      .delete(`${process.env.API_URL}cart`, {
        data: {
          itemId,
          quantity,
          device_id: device_id,
        },
        headers: {
          "device-id": "29a1df4646cb3417c19994a59a3e022a",
          Authorization: `Bearer ${token}`,
          device_id: device_id,
          temp_id: device_id,
        },
      })
      .then((data) => {
        updateLocalStorageStates(data);
      });
    RefreshCart();
  };

  const addItemToCart = async (item: IMeal) => {
    const data = {
      itemId: item._id,
      quantity: 1,
      device_id: device_id,
      temp_id: device_id,
    };

    await axiosClient.put("cart", data).then((data) => {
      updateLocalStorageStates(data);
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
