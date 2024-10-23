"use client";

import { BREAKPOINT } from "@/config";
import useNavbar from "@/hooks/useNavbar";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence } from "framer-motion";
import {  useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MainAccount from "../sections/Modals/AccountModals/Main";
import CartModal from "../sections/Modals/CartModal";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import MobileNavbar from "./MobileNavbar";
import useUser from "@/hooks/useUser";
import { IUser } from "@/config/types";
import { CART_MODAL_OPEN } from "@/config/storageKeys";

export default function Navbar() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const navbarOptions = useNavbar();
  const router = useRouter();
  const cartLoading = useAtomValue(ATOMS.cartIsLoading);
  const [showMobileNavbar, setMobileNavbar] = useState(false);
  const cartItems = useAtomValue(ATOMS.cartItems);
  const { getUser } = useUser();
  const [user, setUser] = useState<undefined | IUser>(undefined);
  const localCartItems = useAtomValue(ATOMS.localCartItems);
  const isLoggedIn = useMemo(() =>!!user?.email, [user]);
  const sideBarOptions = useMemo(()=>(
    [
      {
        image: "cart.svg",
        onClick: () => {
          localStorage.setItem(CART_MODAL_OPEN, "1");
          setSideModal({ show: true, component: <CartModal /> });
        },
        count: isLoggedIn?cartItems?.length:localCartItems?.length,
      },
      
    ]
  ), [user, localCartItems, cartItems]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    !cartLoading && (
      <div className="absolute flex justify-between items-center shadow-navbar h-16 py-[1.275rem] px-[1.5rem] rounded-[5rem]    z-[9999] bg-white w-[95%] md:w-[95%] mx-auto right-0 left-0">
        <Logo className="h-6" />
        {!isMobile && (
          <div className="flex gap-8">
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
              //@ts-ignore
              !(isMobile && option.isOnlyDesktop) && (
                <div
                  className="cursor-pointer h-8 w-10 rounded-[2rem] flex justify-center items-center bg-[#F2F4F7] gap-1 p-[0.5rem] relative"
                  key={`sidebar_${index}`}
                  onClick={() => {
                    option?.onClick && option?.onClick();
                  }}
                >
                  {!!option?.count && (
                    <div className="absolute text-[0.7rem] top-[-0.5rem] right-[-0.3rem] bg-[#FF4159] text-white flex justify-center items-center rounded-[6rem] min-h-[1.5rem] min-w-[1.5rem] overflow-hidden p-1">
                      {option.count}
                    </div>
                  )}
                  <img
                    className="h-[1.25rem]"
                    src={`/images/navbar/${option.image}`}
                  />
                  {/* @ts-ignore */}
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
                  user?.email 
                    ? setSideModal({
                        show: true,
                        component: <MainAccount />,
                      })
                    : router.push("/auth");
                }}
                title={user?.email ? "Dashboard" : "Login"}
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
    )
  );
}
