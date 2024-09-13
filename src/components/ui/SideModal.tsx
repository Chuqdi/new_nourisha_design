import { ATOMS } from "@/store/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function SideModal({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  const cartLoading = useAtomValue(ATOMS.cartIsLoading);

  useEffect(() => {
    const app_wrapper = document.getElementById("app_wrapper");

    if (show) {
      app_wrapper!.style.overflowY = "hidden";
    } else {
      app_wrapper!.style.overflowY = "scroll";
    }
  }, [show]);

  useEffect(() => {
    const app_wrapper = document.getElementById("app_wrapper");

    return () => {
      app_wrapper!.style.overflowY = "scroll";
    };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={
            `
            fixed top-0 left-0 w-full h-full bg-[#00000077] opacity-75  flex justify-end items-end md:items-center z-[${cartLoading ?"999999":"99999999"}]
            `
          }
        >
          <div className="w-full md:w-[40%] ">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
