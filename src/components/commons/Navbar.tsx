"use client";

import useNavbar from "@/hooks/useNavbar";
import Logo from "../ui/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../ui/Button";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/config";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import MainAccount from "../sections/Modals/AccountModals/Main";
import { useContext, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { UserContext } from "@/HOC/UserContext";

export default function Navbar() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const navbarOptions = useNavbar();
  const router = useRouter();
  const user = useContext(UserContext);
  const [showMobileNavbar, setMobileNavbar] = useState(false);
  const sideBarOptions = [
    {
      image: "cart.svg",
      onClick:()=> router.push("/single_meals")
    },
    {
      image: "apple.svg",
      isOnlyDesktop: true,
    },
    {
      image: "play_store.svg",
      isOnlyDesktop: true,
    },
    {
      image: "uk.svg",
      options: [],
    },
  ];
  return (
    <div className="fixed flex justify-between items-center shadow-navbar h-16 py-[1.275rem] px-[1.5rem] rounded-[5rem]    z-[9999] bg-white w-[95%] md:w-[95%] mx-auto right-0 left-0">
      <Logo className="h-6" />
      {!isMobile && (
        <div className="flex gap-10">
          {navbarOptions.map((option, index) => (
            <Link
              href={option.page}
              className={` font-inter text-sm ${
                option.isActive ? "text-primary-orange-900" : "text-black-900"
              }`}
              key={`navbar_item_${index}`}
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}
      <div className="flex gap-[1.33rem]">
        {sideBarOptions.map(
          (option, index) =>
            !(isMobile && option.isOnlyDesktop) && (
              <div
                className="cursor-pointer h-8 w-10 rounded-[2rem] flex justify-center items-center bg-[#F2F4F7] gap-1 p-[0.5rem]"
                key={`sidebar_${index}`}
                onClick={()=> {
                  option?.onClick && option?.onClick();
                }}
              >
                <img
                  className="h-[1.25rem]"
                  src={`/images/navbar/${option.image}`}
                />
                {option.options && (
                  <Icon className=" w-8 h-8" icon="icon-park-outline:down" />
                )}
              </div>
            )
        )}
        {!isMobile && (
          <div>
            <Button
              onClick={() => {
                user?.user?._id
                  ? setSideModal({
                      show: true,
                      component: <MainAccount />,
                    })
                  : router.push("/auth");
              }}
              title={user?.user?._id ? "Dashboard" : "Login"}
              variant="secondary"
            />
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setMobileNavbar(true)}
            className="w-[2rem] h-[2rem] rounded-[2rem] bg-[#F2F4F7] flex justify-center items-center"
          >
            <Icon
              color="#FE7E00"
              className="text-[1.25rem]"
              icon="heroicons-solid:menu"
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isMobile && showMobileNavbar && (
          <MobileNavbar close={() => setMobileNavbar(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
