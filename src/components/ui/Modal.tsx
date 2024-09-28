import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Modal({
  show,
  className,
  large,
  center,
  children,
}: {
  show: boolean;
  large?: boolean;
  center?:boolean;
  className?:string;
  children: React.ReactNode;
}) {
  const app_wrapper = document.getElementById("app_wrapper");
  useEffect(() => {
    if (show) {
      app_wrapper!.style.overflowY = "hidden";
    } else {
      app_wrapper!.style.overflowY = "scroll";
    }
  }, [show]);

  useEffect(() => {
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
          className={`fixed top-0 left-0 w-full h-full bg-[#00000077] opacity-75 z-[99999999] flex justify-center ${center?"items-center":"items-end md:items-center"} `}
        >
          <div className={`w-full  ${className} ${ large?'md:w-[70%]':'md:w-[50%]'}`}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
