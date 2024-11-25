import { useEffect, useState, useCallback } from "react";
import useAuth from "./useAuth";
import { DEVICE_ID } from "./useFingerPrint";

interface CouponResponse {
  data: {
    data: {
      coupon?: {
        percent_off?: number;
        amount_off?: number;
      };
    };
  };
}

interface DiscountError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function roundUpToTwoDecimalPoints(num: number): number {
  return Math.ceil(num * 100) / 100;
}

export default function usePromotionCode() {
  const [coupon, setCoupon] = useState("");
  const [disCountedAmount, setDisCountedAmount] = useState(0);
  const [loadingDiscount, setLoadingDiscount] = useState(false);
  const { getAxiosClient } = useAuth();

  const calculateDiscountAmount = useCallback(
    (
      couponData: CouponResponse["data"]["data"]["coupon"],
      expectedAmount: number
    ): number => {
      if (!couponData) return 0;

      if (couponData.percent_off) {
        return roundUpToTwoDecimalPoints(
          (couponData.percent_off / 100) * expectedAmount
        );
      }

      if (couponData.amount_off) {
        return roundUpToTwoDecimalPoints(couponData.amount_off);
      }

      return 0;
    },
    []
  );

  const handleDiscountError = useCallback(
    (error: DiscountError) => {
      const errorMessage =
        error?.response?.data?.message || "Discount code could not be applied";

      if (coupon.trim().length) {
        alert(errorMessage);
        setDisCountedAmount(0);
      }
    },
    [coupon]
  );

  const discountEvent = useCallback(
    async (expectedAmount: number) => {
      const deviceId = localStorage.getItem(DEVICE_ID);
      if (!deviceId) {
        console.error("Device ID not found");
        return;
      }

      const trimmedCoupon = coupon.trim();
      if (!trimmedCoupon) {
        setDisCountedAmount(0);
        return;
      }

      setLoadingDiscount(true);
      try {
        const axiosClient = getAxiosClient(deviceId);
        const response = await axiosClient.get<CouponResponse["data"]>(
          `discounts/promos/code/${trimmedCoupon}`
        );

        const couponData = response?.data?.data?.coupon;
        const discountAmount = calculateDiscountAmount(
          couponData,
          expectedAmount
        );
        setDisCountedAmount(discountAmount);
      } catch (error) {
        handleDiscountError(error as DiscountError);
      } finally {
        setLoadingDiscount(false);
      }
    },
    [coupon, getAxiosClient, calculateDiscountAmount, handleDiscountError]
  );

  useEffect(() => {
    if (!coupon.trim()) {
      setDisCountedAmount(0);
    }
  }, [coupon]);

  return {
    coupon,
    setCoupon,
    disCountedAmount,
    setDisCountedAmount,
    loadingDiscount,
    setLoadingDiscount,
    discountEvent,
  };
}
