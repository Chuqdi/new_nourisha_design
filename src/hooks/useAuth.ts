"use client";

import { useToast } from "@/ui/use-toast";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useCallback, useState } from "react";
import useAuthToken from "./useAuthToken";
import { DEVICE_ID } from "./useFingerPrint";

interface RequestError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

const API_URL = process.env.API_URL;

const useAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuthToken();
  const token = getToken();

  // Memoize the axios client creation
  const getAxiosClient = useCallback(
    (deviceId: string): AxiosInstance => {
      if (!API_URL) {
        throw new Error("API_URL environment variable is not defined");
      }

      if (!deviceId) {
        throw new Error("Device ID is not defined");
      }

      const axiosClient = axios.create({
        baseURL: API_URL,
        timeout: 10000, // Add reasonable timeout
        headers: {
          "Content-Type": "application/json",
          "device-id": deviceId,
          "x-access-token": token,
        },
      });

      // Add response interceptor for global error handling
      axiosClient.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          // Handle token expiration
          if (error.response?.status === 401) {
            // Handle token refresh or logout logic here
          }
          return Promise.reject(error);
        }
      );

      return axiosClient;
    },
    [token]
  );

  const handleError = useCallback(
    (error: RequestError, useAlert: boolean) => {
      const errorMessage =
        error?.response?.data?.message || "Request could not be completed";

      if (useAlert) {
        alert(errorMessage); // Consider using a more modern alert system
      } else {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const makeRequest = useCallback(
    async <T>(
      path: string,
      data: unknown,
      useAlert = false
    ): Promise<T | null> => {
      try {
        setIsLoading(true);
        const deviceId = localStorage.getItem(DEVICE_ID);

        if (!deviceId) {
          throw new Error("Device ID not found");
        }

        const axiosClient = getAxiosClient(deviceId);
        const response = await axiosClient.post<{ data: T }>(path, data);

        return response.data.data;
      } catch (error) {
        handleError(error as RequestError, useAlert);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getAxiosClient, handleError]
  );

  return {
    makeRequest,
    isLoading,
    getAxiosClient,
  };
};

export default useAuth;
