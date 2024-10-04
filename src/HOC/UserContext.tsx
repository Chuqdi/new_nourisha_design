"use client";
import { createContext, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { IUser } from "../config/types";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import LoginModal from "@/components/sections/Modals/LoginModal";
import { ATOMS } from "@/store/atoms";
import { useAtom } from "jotai";

const VIEWED_LOGOUT_MODAL = "viewed_logout_modal";
export const LOGGED_IN_USER = "logged_in_user";
export const UserContext = createContext<
  | {
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
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { axiosClient } = useAuth();
  const [loggedInUser, setloggedInUser] = useAtom(ATOMS.loggedInUser);

  const fetchUser = async () => {
    return axiosClient.get("customers/me");
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["queryKeys.AUTH_USER_ME"],
    fetchUser,
    {
      staleTime: 1800000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: true,
      retry: false,
    }
  );

  const refreshUser = () => {
    refetch();
  };

  
  useEffect(() => {
    const u = localStorage.getItem(LOGGED_IN_USER);
    setloggedInUser(u ? JSON.parse(u) : undefined);
  }, []);
  useEffect(() => {
    if (data?.data?.data) {
      localStorage.setItem(LOGGED_IN_USER, JSON.stringify(data?.data?.data));
      setloggedInUser(data?.data?.data);
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
    <UserContext.Provider value={{ setUser, refreshUser, isLoading }}>
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
