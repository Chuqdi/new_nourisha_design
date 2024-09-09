import { useEffect, useMemo } from "react";
import { ICartDetail, ICartItem, IMeal } from "../config/types";
import { useAtom, useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import queryKeys from "../config/queryKeys";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthToken from "./useAuthToken";
import useAuth from "./useAuth";

const CART_ITEMS = "cart_item";
const useCart = () => {
  const [cartItems, setCartItems] = useAtom<ICartItem[]>(ATOMS.cartItems);
  const setCartDetails = useSetAtom(ATOMS.cartDetails);
  const setCartIsLoading = useSetAtom(ATOMS.cartIsLoading);
  const { axiosClient } = useAuth();
  const { getToken } = useAuthToken();
  const token = getToken();

  const getCartSessionDetails = () => {
    return axiosClient.get("cart");
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
      totalDeliveryPrice += item.item.price.deliveryFee * item.quantity;
      totalSubPrice += item.item.price.amount * item.quantity;
    });
    return {
      totalDeliveryPrice,
      totalSubPrice,
      total: totalDeliveryPrice + totalSubPrice,
    };
  }, [cartItems]);

  const updateItemBE = async (itemId: string, quantity: number) => {
    axiosClient.put("cart", {
      itemId,
      quantity,
    });
    RefreshCart();
  };

  const removeItemFrommCart = async (itemId: string, quantity: number) => {
    await axios.delete(`${process.env.API_URL}cart`, {
      data: {
        itemId,
        quantity,
      },
      headers: {
        "device-id": "29a1df4646cb3417c19994a59a3e022a",
        Authorization: `Bearer ${token}`,
      },
    });
    RefreshCart();
  };

  const addItemToCart = async (item: IMeal) => {
    const data = {
      itemId: item._id,
      quantity: 1,
    };

    await axiosClient.put("cart", data);
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
