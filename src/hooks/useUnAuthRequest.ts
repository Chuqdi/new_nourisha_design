import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useState } from "react";

const useUnAuthRequest = <T>() => {
  const [response, setResponse] = useState<{
    isLoading: boolean;
    isError: boolean;
    data: T;
  }>({
    isLoading: false,
    isError: false,
    data: null as T,
  });


 

  const post = async (path: string, data: T) => {
    //Make a POST request to the unauthenticated API
    setResponse({
      data: {} as T,
      isError: false,
      isLoading: true,
    });
    await axios
      .post(`${BACKEND_URL}${path}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((apiResponse) => {
        setResponse({
          isLoading: false,
          isError: false,
          data: apiResponse?.data?.data,
        });
      })
      .catch((error) => {
        const message = error.response.data.message
          ? error.response.data.message
          : "Error making request";

        setResponse({
          ...response,
          isError: true,
          isLoading: false,
        });
        // onError(message);
      });
  };


  const getData =(path:string)=>{
    return  axios
    .get(`${process.env.API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "device-id": "29a1df4646cb3417c19994a59a3e022a",
      },
    })
  }

  const get = async (path: string) => {
    //Make a POST request to the unauthenticated API
    setResponse({
      data: {} as T,
      isError: false,
      isLoading: true,
    });
    await axios
      .get(`${BACKEND_URL}${path}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "device-id": "29a1df4646cb3417c19994a59a3e022a",
        },
      })
      .then((apiResponse) => {
        setResponse({
          isLoading: false,
          isError: false,
          data: apiResponse?.data?.data?.data,
        });
      })
      .catch((error) => {
        const message = error.response.data.message
          ? error.response.data.message
          : "Error making request";

        setResponse({
          ...response,
          isError: true,
          isLoading: false,
        });
        // onError(message);
      });
  };

  return {
    get,
    getData,
    post,
    response,
  };
};

export default useUnAuthRequest;
