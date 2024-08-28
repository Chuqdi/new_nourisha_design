"use client";
import useNavbar from "@/hooks/useNavbar";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "../ui/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect } from "react";

export default function MobileNavbar({ close }: { close: () => void }) {
  const navbarOptions = useNavbar();

  return (
    <motion.div className="bg-white fixed top-[0rem] right-0 bottom-0 left-0 ">
      <div className="flex justify-between items-center px-4">
        <Logo className="w-40 h-40 object-contain" />
        <Icon color="#030517" className="w-10 h-10 cursor-pointer" icon="fluent-mdl2:cancel" onClick={close} />
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
    </motion.div>
  );
}
