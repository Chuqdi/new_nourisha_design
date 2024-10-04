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
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        updateLocalStorageStates(data);
      });
    RefreshCart();
  };

  const addItemToCart = async (item: IMeal, quantity?: number) => {
    if (user?.user?._id) {
      const data = {
        itemId: item._id,
        quantity: quantity ?? 1,
        device_id: device_id,
        temp_id: device_id,
      };

      await axiosClient.put("cart", data).then((data) => {
        updateLocalStorageStates(data);
      });
      RefreshCart();
    } else {
      toast({
        variant: "destructive",
        title: "Please login to access cart functionality",
      });
    }
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
