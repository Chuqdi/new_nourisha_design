import { useEffect, useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useQuery, useQueryClient, useMutation } from "react-query";
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
  const queryClient = useQueryClient();

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

  // Add Item to Cart Mutation
  const addItemMutation = useMutation(
    async ({
      item,
      quantity,
      currentQuantity,
      proteinId,
      extraId,
    }: {
      item: IMeal;
      quantity: number;
      currentQuantity: number;
      proteinId?: string | null;
      extraId?: string | null;
    }) => {
      const availableQuantity = parseInt(item?.available_quantity ?? "0");
      if (currentQuantity + quantity > availableQuantity) {
        throw new Error(`Only ${availableQuantity} items available`);
      }

      const deviceId = localStorage.getItem(DEVICE_ID);
      if (!deviceId) {
        throw new Error("Device ID not found");
      }

      const axiosClient = getAxiosClient(deviceId);
      return axiosClient.put("cart", {
        itemId: item._id,
        quantity,
        proteinId: proteinId ?? null,
        swallowId: extraId ?? null,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.GET_CART_ITEMS);
        setShowCartSideModal((prev) => ({ ...prev, show: true }));
      },
      onError: (error: any) => {
        toast({
          variant: "default",
          title: error.message || "Failed to add item to cart",
        });
      },
    }
  );

  // Update Item in Cart Mutation
  const updateItemMutation = useMutation(
    async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const deviceId = localStorage.getItem(DEVICE_ID);
      if (!deviceId) {
        throw new Error("Device ID not found");
      }

      const axiosClient = getAxiosClient(deviceId);
      return axiosClient.put("cart", { itemId, quantity });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.GET_CART_ITEMS);
      },
      onError: (error: any) => {
        toast({
          variant: "default",
          title: error?.response?.data?.message || "Operation failed",
        });
      },
    }
  );

  // Remove Item from Cart Mutation
  const removeItemMutation = useMutation(
    async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const deviceId = localStorage.getItem(DEVICE_ID);
      if (!deviceId) {
        throw new Error("Device ID not found");
      }

      const axiosClient = getAxiosClient(deviceId);
      return axiosClient.delete("cart", {
        data: { itemId, quantity },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.GET_CART_ITEMS);
      },
      onError: (error: any) => {
        toast({
          variant: "default",
          title: error?.response?.data?.message || "Operation failed",
        });
      },
    }
  );

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

  const addItemToCart = async (
    item: IMeal,
    quantity: number,
    currentQuantity: number,
    proteinId?: string | null,
    extraId?: string | null
  ) => {
    await addItemMutation.mutateAsync({
      item,
      quantity,
      currentQuantity,
      proteinId,
      extraId,
    });
  };

  const updateItemBE = async (itemId: string, quantity: number) => {
    await updateItemMutation.mutateAsync({ itemId, quantity });
  };

  const removeItemFrommCart = async (itemId: string, quantity: number) => {
    await removeItemMutation.mutateAsync({ itemId, quantity });
  };

  const checkMealExistsInCart = (item: IMeal) =>
    cartItems?.some((cartItem) => cartItem?.item?._id === item?._id);

  useEffect(() => {
    setCartIsLoading(
      IsLoadingCartItem ||
        isRefetching ||
        removeItemMutation.isLoading ||
        addItemMutation.isLoading ||
        updateItemMutation.isLoading
    );
  }, [
    IsLoadingCartItem,
    isRefetching,
    setCartIsLoading,
    addItemMutation.isLoading,
    removeItemMutation.isLoading,
    updateItemMutation.isLoading,
  ]);

  useEffect(() => {
    if (data?.data?.data) {
      setCartItems(data.data.data.items?.data ?? []);
      setCartDetails(data.data.data.cart);
    }
  }, [data, setCartItems, setCartDetails]);

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
