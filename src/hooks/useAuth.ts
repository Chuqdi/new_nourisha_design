"use client";
import { useToast } from "@/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import useAuthToken from "./useAuthToken";
import { useAtomValue } from "jotai";
import { ATOMS } from "@/store/atoms";
import { DEVICE_ID } from "./useFingerPrint";

const useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { getToken } = useAuthToken();
  const token = getToken();

  const getAxiosClient = (device_id: string) => {
    const axiosClient = axios.create({
      baseURL: `${process.env.API_URL}/`,
    });
    axiosClient.interceptors.request.use(async function (req: any) {
      req.headers["device-id"] = device_id;
      req.headers["Authorization"] = `Bearer ${token}`;
      return req;
    });
    return axiosClient;
  };

  const makeRequest = async (path: string, data: any, useAlert?: boolean) => {
    let responseData: null | any = null;
    setIsLoading(true);
    const id = localStorage.getItem(DEVICE_ID);

    const axiosClient = getAxiosClient(id!);
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

        if (useAlert) {
          alert(errorMessage);
        } else {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
      });
    setIsLoading(false);
    return responseData;
  };

  return {
    makeRequest,
    isLoading,
    getAxiosClient,
  };
};

export default useAuth;
