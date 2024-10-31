import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Modal({
  show,
  className,
  large,
  medium,
  close,
  center,
  children,
}: {
  show: boolean;
  large?: boolean;
  medium?: boolean;
  close: () => void;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const app_wrapper = document?.getElementById("app_wrapper");
    if (show) {
      app_wrapper!.style.overflowY = "hidden";
    } else {
      app_wrapper!.style.overflowY = "scroll";
    }
  }, [show]);

  useEffect(() => {
    return () => {
      // const app_wrapper = document?.getElementById("app_wrapper");
      // app_wrapper!.style.overflowY = "scroll";
    };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1,  }}
          exit={{ opacity: 0 }}
          className={`fixed top-0 left-0 w-full h-full bg-[#00000077] opacity-75 z-[99999999] flex justify-center ${
            center ? "items-center" : "items-end md:items-center"
          } `}
        >
          <div
            className="z-1 absolute right-0 left-0 top-0 bottom-0"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
          />
          <div
            className={`w-full z-20  ${className} ${
              large ? "md:w-[70%]" : medium?"md:w-[65%]":"md:w-[50%]"
            }`}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
