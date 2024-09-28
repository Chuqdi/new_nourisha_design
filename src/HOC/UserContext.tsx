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

const VIEWED_LOGOUT_MODAL = "viewed_logout_modal";
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
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { axiosClient } = useAuth();

  const fetchUser = async () => {
    return axiosClient.get("customers/me");
  };

  const { data, isLoading, isError } = useQuery(
    queryKeys.AUTH_USER_ME,
    fetchUser,
    {
      // cacheTime: 1000,
      retry: false,
    }
  );

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
    <UserContext.Provider value={{ user, setUser }}>
      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center z-[9999999999999999]">
            <div className="animate-pulse">
              <img src="/images/logo2.png" />
            </div>
          </div>
        ) : (
          <>
            <Modal center large show={showLoginModal}>
              <LoginModal
                setUser={setUser}
                close={() => setShowLoginModal(false)}
              />
            </Modal>
            {children}
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default UserContextProvider;
