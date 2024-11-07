"use client";
import { createContext, useEffect, useState } from "react";
import { IUser } from "../config/types";
import { useQuery } from "react-query";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import LoginModal from "@/components/sections/Modals/LoginModal";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

const VIEWED_LOGOUT_MODAL = "viewed_logout_modal";
export const LOGGED_IN_USER = "logged_in_user";
export const UserContext = createContext<{
  setUser: (user: IUser) => void;
  isLoading: boolean;
  user: IUser | undefined;
}>(
  {} as {
    user: IUser | undefined;
    setUser: (user: IUser) => void;
    refreshUser: () => void;
    isLoading: boolean;
  }
);
function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // const [userFound, setUserFound] = useState(false);
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
      localStorage.setItem(LOGGED_IN_USER, JSON.stringify(data?.data?.data));
      setUser(data?.data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError && !user?.email) {
      // localStorage.setItem(LOGGED_IN_USER, "");
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

  // useEffect(() => {
  //   const s = localStorage.getItem(LOGGED_IN_USER) ?? "";
  //   if (!!s) {
  //     const localUser = JSON.parse(s);
  //     if (localUser?.email) {
  //       setUser(localUser);
  //       setUserFound(true);
  //     } else {
  //       setUser(undefined);
  //     }
  //   }
  // }, []);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
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
        {/* !userFound && */}
        { isLoading ? (
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
