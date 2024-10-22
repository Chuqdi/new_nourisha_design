import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { DEVICE_ID } from "./useFingerPrint";

export default () => {
  const [coupon, setCoupon] = useState("");
  const [disCountedAmount, setDisCountedAmount] = useState(0);
  const [loadingDiscount, setLoadingDiscount] = useState(false);
  const { getAxiosClient } = useAuth();

  const discountEvent = async () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    setLoadingDiscount(true);

    await axiosClient
      .get(`discounts/promos/code/${coupon.trim()}`)
      .then((data) => {
        const couponDiscount = data?.data?.data;
        if (couponDiscount?.coupon) {
          if (couponDiscount?.coupon?.percent_off) {
            const discountPercentage = couponDiscount?.coupon?.percent_off;
            const discountedAmount =
              //@ts-ignore
              cartDetails?.total! -
              //@ts-ignore
              (cartDetails?.total! * (100 - discountPercentage)) / 100;
            setDisCountedAmount(discountedAmount);
          } else if (couponDiscount?.coupon?.amount_off) {
            const discountedAmount = Math.round(
              couponDiscount?.coupon?.amount_off
            );
            setDisCountedAmount(discountedAmount);
          }
        } else {
          setDisCountedAmount(0);
        }
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message
          ? err?.response?.data?.message
          : "Discount code could not be applied";
        !!coupon.length && alert(errorMessage);
      });
    setLoadingDiscount(false);
  };

  useEffect(() => {
    discountEvent();
  }, [coupon]);

  return {
    coupon,
    setCoupon,
    disCountedAmount,
    setDisCountedAmount,
    loadingDiscount,
    setLoadingDiscount,
  };
};
