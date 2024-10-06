"use client";
import { useToast } from "@/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import useAuthToken from "./useAuthToken";
import  useFingerPrint, { DEVICE_ID } from "./useFingerPrint";

const useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const device_id = useFingerPrint();
  const axiosClient = axios.create({
    baseURL: `${process.env.API_URL}/`,
  });
  const { getToken } = useAuthToken();
  const token = getToken();
  axiosClient.interceptors.request.use(async function (req: any) {
    req.headers["device-id"] = device_id;
    req.headers["Authorization"] = `Bearer ${token}`;
    return req;
  });

  const makeRequest = async (path: string, data: any) => {
    let responseData: null | any = null;
    alert(device_id)
    setIsLoading(true);
    await axiosClient
      .post(path, data, {headers: {'Content-Type': 'application/json', 'device-id':device_id}})
      .then((response) => {
        responseData = response?.data?.data;
      })
      .catch((err) => {
        const status = err.response?.status;
        const errorMessage = err?.response?.data?.message
          ? err?.response?.data?.message
          : "Request could not be completed";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      });
    setIsLoading(false);
    return responseData;
  };

  return {
    axiosClient,
    makeRequest,
    isLoading,
  };
};

export default useAuth;
