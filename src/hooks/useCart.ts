import { useEffect, useMemo, useRef } from "react";
import { ICartDetail, ICartItem, IMeal, IUser } from "../config/types";
import { useAtom, useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import queryKeys from "../config/queryKeys";
import { useQuery } from "react-query";
import useAuthToken from "./useAuthToken";
import useAuth from "./useAuth";
import { LOGGED_IN_USER } from "@/HOC/UserContext";
import { toast } from "@/ui/use-toast";
import { DEVICE_ID } from "./useFingerPrint";

const CART_SESSION_ID = "cart_session_id";
export const CART_TEMP_ID = "cart_temp_id";
const useCart = () => {
  const [cartItems, setCartItems] = useAtom<ICartItem[]>(ATOMS.cartItems);
  const setCartDetails = useSetAtom(ATOMS.cartDetails);
  const setCartIsLoading = useSetAtom(ATOMS.cartIsLoading);
  const { getAxiosClient } = useAuth();
  const { getToken } = useAuthToken();
  const token = getToken();
  const [showCartSideModal, setShowCartSideModal] = useAtom(
    ATOMS.showMobileCartModal
  );





  const getCartSessionDetails = () => {
    let user = localStorage?.getItem(LOGGED_IN_USER);
    let u = JSON.parse(user ?? "") as IUser;
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);

    return axiosClient.get(!!token && !!u ? "cart" : "");
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

  const updateItemBE = async (itemId: string, quantity: number) => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);

    const res = axiosClient
      .put("cart", {
        itemId,
        quantity,
      })
      .then((data) => {
        // updateLocalStorageStates(data);
      });
    RefreshCart();
    setShowCartSideModal({
      ...showCartSideModal,
      show: true,
    });
  };

  const removeItemFrommCart = async (itemId: string, quantity: number) => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);

    await axiosClient
      .delete(`cart`, {
        data: {
          itemId,
          quantity,
        },
      })
      .then((data) => {
        // updateLocalStorageStates(data);
      })
      .catch((e) => {
        toast({
          variant: "default",
          title: e?.response?.data?.message,
        });
      });
    RefreshCart();
    setShowCartSideModal({
      ...showCartSideModal,
      show: true,
    });

  };

  const addItemToCart = async (item: IMeal, quantity: number) => {
    const data = {
      itemId: item?._id,
      quantity,
    };
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);

    await axiosClient
      .put("cart", data)
      .then((data) => {
        // updateLocalStorageStates(data);
      })
      .catch((e) => {
        toast({
          variant: "default",
          title: e?.response?.data?.message,
        });
      });
    RefreshCart();
    setShowCartSideModal({
      ...showCartSideModal,
      show: true,
    });
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
