import { useEffect, useState } from "react";
import { DEVICE_ID } from "./useFingerPrint";
import { useQuery } from "react-query";
import useAuth from "./useAuth";

export default () => {
  const [id, setId] = useState<string | null>(null);
  const { getAxiosClient } = useAuth();

  const getDeliveryDate = () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get(`lineups/asian/delivery/dates`);
  };
  const { data, isLoading } = useQuery(
    ["GET_DELIVERY_DATE", id],
    getDeliveryDate
  );

  useEffect(() => {
    const ID = localStorage.getItem(DEVICE_ID);
    setId(ID);
  }, []);

  return {
    data,
    isLoading,
  }
};
