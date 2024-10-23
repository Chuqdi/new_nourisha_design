import { IUser } from "@/config/types";
import { LOGGED_IN_USER } from "@/HOC/UserContext";

export default () => {
  const getUser = () => {
    const u = localStorage.getItem(LOGGED_IN_USER);
    return u ? JSON.parse(u) : undefined;
  };

  const setUser = (user: IUser) => {
    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
  };
  return {
    getUser,
    setUser,
  };
};
