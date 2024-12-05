import { LOGGED_IN_USER, UserContext } from "@/HOC/UserContext";
import useAuthToken from "@/hooks/useAuthToken";
import { useContext } from "react";

export const useLogout = () => {
  const { deleteToken } = useAuthToken();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    deleteToken();
    localStorage.removeItem(LOGGED_IN_USER);

    if (localStorage.getItem("device-id")) {
      console.log(`deleting device id ${localStorage.getItem("device-id")}`);
      localStorage.removeItem("device-id");
    }

    setUser(null);
  };

  return handleLogout;
};
