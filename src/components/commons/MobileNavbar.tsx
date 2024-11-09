"use client";
import useNavbar from "@/hooks/useNavbar";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "../ui/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../ui/Button";
import MainAccount from "../sections/Modals/AccountModals/Main";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import { useContext, useMemo } from "react";
import { UserContext } from "@/HOC/UserContext";
import { useRouter } from "next/navigation";

export default function MobileNavbar({ close }: { close: () => void }) {
  const navbarOptions = useNavbar();
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const router = useRouter();
  const { user } = useContext(UserContext);

  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  return (
    <motion.div className="bg-white fixed top-[0rem] right-0 bottom-0 left-0 max-h-[100vh] overflow-y-scroll ">
      <div className="flex justify-between items-center px-4">
        <Logo className="w-40 h-40 object-contain" />
        <Icon
          color="#030517"
          className="w-6 h-6 cursor-pointer"
          icon="fluent-mdl2:cancel"
          onClick={close}
        />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        {navbarOptions.map((option, index) => (
          <Link
            onClick={close}
            href={option.page}
            className={` font-inter text-sm border-b w-full text-center h-[3rem] ${
              option.isActive ? "text-primary-orange-900" : "text-black-900"
            }`}
            key={`navbar_item_${index}`}
          >
            {option.name}
          </Link>
        ))}
      </div>

      <div className="w-full mt-10 p-4 flex flex-col gap-4">
        <Button
          className="h-[2.7rem] py-6"
          fullWidth
          onClick={() => {
            router.push("/single-meals");
            close();
          }}
          title="Start order"
          variant="primary"
        />
        <Button
          className="h-[2.7rem] py-6 mb-3"
          fullWidth
          onClick={() => {
            close();
            isLoggedIn
              ? setSideModal({
                  show: true,
                  component: <MainAccount />,
                })
              : router.push("/auth");
          }}
          title={isLoggedIn ? "Dashboard" : "Login"}
          variant="secondary"
        />
      </div>
    </motion.div>
  );
}
