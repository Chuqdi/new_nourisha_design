"use client"
import { useToast } from "@/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import useAuthToken from "./useAuthToken";
import useFingerPrint from "./useFingerPrint";

const  useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const device_id = useFingerPrint();
  const axiosClient = axios.create({
    baseURL: `/`,
  });
  const { getToken } = useAuthToken();
  const token = getToken();
  axiosClient.interceptors.request.use(async function (req: any) {
    req.headers["device-id"] = `29a1df4646cb3417c19994a59a3e022a`;
    req.headers["Authorization"] = `Bearer ${token}`;
    req.headers["device_id"] = device_id;
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
