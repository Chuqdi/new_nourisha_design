import { LOGGED_IN_USER } from "@/HOC/UserContext";

export default () => {
  const getUser = () => {
    const u = localStorage.getItem(LOGGED_IN_USER);
    return u ? JSON.parse(u) : undefined;
  };
  return {
    getUser,
  };
};
