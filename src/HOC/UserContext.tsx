"use client";
import { createContext, useEffect, useState } from "react";
import queryKeys from "../config/queryKeys";
import { useToast } from "../ui/use-toast";
import { IUser } from "../config/types";
import Logo from "@/components/ui/Logo";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";

export const UserContext = createContext<
  | {
      user: IUser;
      setUser: (user: IUser) => void;
    }
  | undefined
>({} as { user: IUser; setUser: (user: IUser) => void });

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const { toast } = useToast();
  const { axiosClient } = useAuth();
 

  const fetchUser = async () => {
    return axiosClient.get("customers/me");
  };

  const { data, isLoading, isError } = useQuery(
    queryKeys.AUTH_USER_ME,
    fetchUser,
    {
      cacheTime: 1000,
      retry:false,
    }
  );

  useEffect(() => {
    if (data?.data?.data) {
      setUser(data?.data?.data);
    }
  }, [data]);

  useEffect(() => {
    // if (isError) {
    //   toast({
    //     variant: "destructive",
    //     title: "Authentication failed",
    //     description: "Authentication failed",
    //   });
    //   if (!window.location.href.includes("auth") && window.location.href === "/") {
    //     // window.location.href = "/auth";
    //   }
    // }
  }, [isError]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center">
            <div className="animate-pulse">
              <Logo />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
