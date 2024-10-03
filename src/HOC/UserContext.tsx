"use client";
import { createContext, useEffect, useState } from "react";
import queryKeys from "../config/queryKeys";
import { useToast } from "../ui/use-toast";
import { IUser } from "../config/types";
import Logo from "@/components/ui/Logo";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";
import dynamic from "next/dynamic";
import Modal from "@/components/ui/Modal";
import LoginModal from "@/components/sections/Modals/LoginModal";
import useFingerPrint, { DEVICE_ID } from "@/hooks/useFingerPrint";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";

const VIEWED_LOGOUT_MODAL = "viewed_logout_modal";
export const UserContext = createContext<
  | {
      user: IUser;
      setUser: (user: IUser) => void;
      refreshUser: () => void;
      isLoading: boolean;
    }
  | undefined
>(
  {} as {
    user: IUser;
    setUser: (user: IUser) => void;
    refreshUser: () => void;
    isLoading: boolean;
  }
);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { getToken } = useAuthToken();
  const { axiosClient } = useAuth();

  const fetchUser = async () => {
    axiosClient.get(`customers/me`,);
    return axiosClient.get("customers/me");
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["queryKeys.AUTH_USER_ME"],
    fetchUser,
    {
      staleTime: 1800000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
      retry:false,
    }
  );

  const refreshUser = () => {
    refetch();
  };

  useEffect(() => {
    if (data?.data?.data) {
      setUser(data?.data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        if (
          !localStorage.getItem(VIEWED_LOGOUT_MODAL) ||
          localStorage.getItem(VIEWED_LOGOUT_MODAL) !== "1"
        ) {
          setShowLoginModal(true);
          localStorage.setItem(VIEWED_LOGOUT_MODAL, "1");
        }
      }, 5000);
    }
  }, [isError]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, isLoading }}>
      <div className="flex-1 w-full">
        <Modal center large show={showLoginModal}>
          <LoginModal
            setUser={setUser}
            close={() => setShowLoginModal(false)}
          />
        </Modal>
        {children}
      </div>
    </UserContext.Provider>
  );
}

export default UserContextProvider;
