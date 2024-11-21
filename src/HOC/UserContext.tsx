"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUser } from "../config/types";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/ui/Modal";
import LoginModal from "@/components/sections/Modals/LoginModal";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

// Constants
const VIEWED_LOGOUT_MODAL = "viewed_logout_modal";
export const LOGGED_IN_USER = "logged_in_user";

// Enhanced Context Type
interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => void;
}

// Create context with more robust default value
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
  refreshUser: () => {},
});

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { getAxiosClient } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Improved user retrieval from local storage
  const getUserFromStorage = useCallback((): IUser | null => {
    try {
      const storedUser = localStorage.getItem(LOGGED_IN_USER);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  }, []);

  // Fetch user data
  const fetchUser = async () => {
    const id = localStorage.getItem(DEVICE_ID);
    if (!id) return null;

    try {
      const axiosClient = getAxiosClient(id);
      const response = await axiosClient.get("customers/me");
      return response?.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  };

  // Use query for user data with improved error handling
  const { data, isLoading, isError, refetch } = useQuery(
    ["user", "me"],
    fetchUser,
    {
      staleTime: 1800000, // 30 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 2,
      initialData: getUserFromStorage,
      onError: (error) => {
        console.error("User fetch error:", error);
        setUser(null);
      },
    }
  );

  // User state management
  const [user, setUser] = useState<IUser | null>(data || null);

  // Persist user to local storage
  useEffect(() => {
    if (data) {
      localStorage.setItem(LOGGED_IN_USER, JSON.stringify(data));
      setUser(data);
    }
  }, [data]);

  // Login modal display logic
  useEffect(() => {
    if (isError && !user?.email) {
      const hasViewedLogoutModal =
        localStorage.getItem(VIEWED_LOGOUT_MODAL) === "1";

      if (!hasViewedLogoutModal) {
        const timer = setTimeout(() => {
          setShowLoginModal(true);
          localStorage.setItem(VIEWED_LOGOUT_MODAL, "1");
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [isError, user]);

  // Logout handler
  const logout = useCallback(() => {
    // Clear user data
    localStorage.removeItem(LOGGED_IN_USER);
    setUser(null);

    // Clear query cache
    queryClient.clear();

    // Optional: Add any additional logout logic like API call
    setShowLoginModal(true);
  }, [queryClient]);

  // Refresh user data
  const refreshUser = useCallback(() => {
    refetch();
  }, [refetch]);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      isAuthenticated: !!user?.email,
      logout,
      refreshUser,
    }),
    [user, isLoading, logout, refreshUser]
  );

  return (
    <UserContext.Provider value={contextValue}>
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
          <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center z-[9999]">
            <div className="animate-pulse">
              <img
                src="/images/logo2.svg"
                alt="Loading"
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
