"use client";
import { useToast } from "@/ui/use-toast";
import axios from "axios";
import { useContext, useState } from "react";
import useAuthToken from "./useAuthToken";
import useFingerPrint, { DEVICE_ID } from "./useFingerPrint";
import { UserContext } from "@/HOC/UserContext";

const useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const device_id = localStorage?.getItem(DEVICE_ID)
  const user = useContext(UserContext);
  const axiosClient = axios.create({
    baseURL: `${process.env.API_URL}/`,
  });
  const { getToken } = useAuthToken();
  const token = getToken();
  axiosClient.interceptors.request.use(async function (req: any) {
    req.headers["device-id"] = "home-zuzu";
    req.headers["Authorization"] = `Bearer ${token}`;
    return req;
  });

  const makeRequest = async (path: string, data: any) => {
    let responseData: null | any = null;
    setIsLoading(true);
    await axiosClient
      .post(path, data)
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
