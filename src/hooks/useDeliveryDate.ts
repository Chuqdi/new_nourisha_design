import { useEffect, useState } from "react";
import { DEVICE_ID } from "./useFingerPrint";
import { useQuery } from "react-query";
import useAuth from "./useAuth";

export default () => {
  const [id, setId] = useState<string | null>(null);
  const { getAxiosClient } = useAuth();

  function convertDateFormat(dateString: string): string {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate() -1).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}

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
    convertDateFormat
  }
};
