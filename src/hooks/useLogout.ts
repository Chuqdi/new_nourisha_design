import { useRouter } from "next/navigation";
import useAuthToken from "@/hooks/useAuthToken";
import { useContext } from "react";
import { UserContext, LOGGED_IN_USER } from "@/HOC/UserContext";
import { ATOMS } from "@/store/atoms";
import { useAtom } from "jotai";

export const useLogout = () => {
  const { deleteToken } = useAuthToken();
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);

  const handleLogout = () => {
    deleteToken();
    localStorage.removeItem(LOGGED_IN_USER);

    if (localStorage.getItem("device-id")) {
      console.log(`deleting device id ${localStorage.getItem("device-id")}`);
      localStorage.removeItem("device-id");
    }

    setSideModal({ ...sideModal, show: false });
    setUser(null);
    router.push("/auth");
  };

  return handleLogout;
};
