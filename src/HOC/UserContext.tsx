"use client";
import { createContext, useEffect, useState } from "react";
import { IUser } from "../config/types";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import LoginModal from "@/components/sections/Modals/LoginModal";
import { ATOMS } from "@/store/atoms";
import { useSetAtom } from "jotai";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

const VIEWED_LOGOUT_MODAL = "viewed_logout_modal";
export const LOGGED_IN_USER = "logged_in_user";
export const UserContext = createContext<
  | {
      setUser: (user: IUser) => void;
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
  const { getAxiosClient } = useAuth();
  // const setloggedInUser = useSetAtom(ATOMS.loggedInUser);

  const fetchUser = async () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get("customers/me");
  };

  const { data, isLoading, isError } = useQuery(
    ["queryKeys.AUTH_USER_ME"],
    fetchUser,
    {
      staleTime: 1800000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (data?.data?.data) {
      alert(data?.data?.data)
      localStorage.setItem(LOGGED_IN_USER, JSON.stringify(data?.data?.data));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      localStorage.setItem(LOGGED_IN_USER, "");
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
    <UserContext.Provider value={{ setUser, isLoading }}>
      <div className="flex-1 w-full">
        <Modal
          close={() => setShowLoginModal(false)}
          center
          large
          show={showLoginModal}
        >
          <LoginModal
            setUser={setUser}
            close={() => setShowLoginModal(false)}
          />
        </Modal>
        {isLoading ? (
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center z-[9999999999999999]">
            <div className="animate-pulse">
              <img
                src="/images/logo2.svg"
                className="w-[35rem] md:w-[45rem] h-auto"
              />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </UserContext.Provider>
  );
}

export default UserContextProvider;
