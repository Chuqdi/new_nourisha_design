import { useEffect, useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useQuery } from "react-query";
import { toast } from "@/ui/use-toast";
import { ATOMS } from "@/store/atoms";
import { LOGGED_IN_USER } from "@/HOC/UserContext";
import { DEVICE_ID } from "./useFingerPrint";
import useAuth from "./useAuth";
import useAuthToken from "./useAuthToken";
import type { ICartDetail, ICartItem, IMeal, IUser } from "../config/types";
import queryKeys from "../config/queryKeys";

const useCart = () => {
  const [cartItems, setCartItems] = useAtom<ICartItem[]>(ATOMS.cartItems);
  const setCartDetails = useSetAtom(ATOMS.cartDetails);
  const setCartIsLoading = useSetAtom(ATOMS.cartIsLoading);
  const [showCartSideModal, setShowCartSideModal] = useAtom(
    ATOMS.showMobileCartModal
  );

  const { getAxiosClient } = useAuth();
  const { getToken } = useAuthToken();

  const getCartSessionDetails = () => {
    const token = getToken();
    const deviceId = localStorage.getItem(DEVICE_ID);
    if (!deviceId) throw new Error("Device ID not found");

    const user = localStorage.getItem(LOGGED_IN_USER);
    const parsedUser = user ? (JSON.parse(user) as IUser) : null;

    if (!token && !parsedUser) return null;

    const axiosClient = getAxiosClient(deviceId);
    return axiosClient.get("cart");
  };

  const {
    data,
    isLoading: IsLoadingCartItem,
    refetch: RefreshCart,
    isRefetching,
  } = useQuery(queryKeys.GET_CART_ITEMS, getCartSessionDetails);

  useEffect(() => {
    setCartIsLoading(IsLoadingCartItem || isRefetching);
  }, [IsLoadingCartItem, isRefetching, setCartIsLoading]);

  useEffect(() => {
    if (data?.data?.data) {
      setCartItems(data.data.data.items?.data ?? []);
      setCartDetails(data.data.data.cart);
    }
  }, [data, setCartItems, setCartDetails]);

  const getCartItemTotal = useMemo(() => {
    const totals = cartItems.reduce(
      (acc, item) => ({
        totalDeliveryPrice:
          acc.totalDeliveryPrice + item.item.price.deliveryFee * item.quantity,
        totalSubPrice:
          acc.totalSubPrice + item.item.price.amount * item.quantity,
        total: 0, // Will be calculated below
      }),
      { totalDeliveryPrice: 0, totalSubPrice: 0, total: 0 }
    );

    totals.total = totals.totalDeliveryPrice + totals.totalSubPrice;
    return totals;
  }, [cartItems]);

  const emptyCart = () => {
    setCartItems([]);
    setCartDetails({} as ICartDetail);
  };

  const handleCartOperation = async (operation: Promise<any>) => {
    try {
      await operation;
      await RefreshCart();
      setShowCartSideModal((prev) => ({ ...prev, show: true }));
    } catch (error: any) {
      toast({
        variant: "default",
        title: error?.response?.data?.message || "Operation failed",
      });
    }
  };

  const updateItemBE = async (itemId: string, quantity: number) => {
    const deviceId = localStorage.getItem(DEVICE_ID);
    if (!deviceId) {
      toast({
        variant: "default",
        title: "Device ID not found",
      });
      return;
    }

    const axiosClient = getAxiosClient(deviceId);
    await handleCartOperation(axiosClient.put("cart", { itemId, quantity }));
  };

  const removeItemFrommCart = async (itemId: string, quantity: number) => {
    const deviceId = localStorage.getItem(DEVICE_ID);
    if (!deviceId) {
      toast({
        variant: "default",
        title: "Device ID not found",
      });
      return;
    }

    const axiosClient = getAxiosClient(deviceId);
    await handleCartOperation(
      axiosClient.delete("cart", {
        data: { itemId, quantity },
      })
    );
  };

  const addItemToCart = async (
    item: IMeal,
    quantity: number,
    currentQuantity: number,
    proteinId?: string | null,
    extraId?: string | null
  ) => {
    const availableQuantity = parseInt(item?.available_quantity ?? "0");
    if (currentQuantity + quantity > availableQuantity) {
      toast({
        variant: "default",
        title: "Available quantity exceeded",
        description: `Only ${availableQuantity} items available`,
      });
      return;
    }

    const deviceId = localStorage.getItem(DEVICE_ID);
    if (!deviceId) {
      toast({
        variant: "default",
        title: "Device ID not found",
      });
      return;
    }

    const axiosClient = getAxiosClient(deviceId);
    await handleCartOperation(
      axiosClient.put("cart", {
        itemId: item._id,
        quantity,
        proteinId: proteinId ?? null,
        swallowId: extraId ?? null,
      })
    );
  };

  const checkMealExistsInCart = (item: IMeal) =>
    cartItems?.some((cartItem) => cartItem?.item?._id === item?._id);

  const returnValue = useMemo(
    () => ({
      addItemToCart,
      getCartItemTotal,
      getCartSessionDetails,
      RefreshCart,
      updateItemBE,
      removeItemFrommCart,
      emptyCart,
      checkMealExistsInCart,
    }),
    [cartItems]
  );

  return returnValue;
};

export default useCart;
