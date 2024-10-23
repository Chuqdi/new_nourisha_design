import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import React from "react";

function PaymentConfirmationModal({ close }: { close: () => void }) {
  const searchParams = useSearchParams();
  const onClose = () => {
    const reloadWindow = searchParams?.get("reloadWindow");
    if (reloadWindow && reloadWindow === "1") {
      window.location.href = "/";
    }
    close();
  };
  return (
    <div className="bg-white rounded-[0.75rem] p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-black font-inter text-2xl">Payment successful</h3>
        <button
          className="w-10 h-10 flex justify-center items-center bg-[#EDEDF3] rounded-full"
          onClick={onClose}
        >
          <Icon className="w-4 h-4" color="#000" icon="iconoir:cancel" />
        </button>
      </div>
      <p className="font-inter text-[0.75rem] text-center text-black-900 mt-4">
        You can access your order and any additional information through your
        account on our website.
      </p>
      <p className="font-inter text-[0.75rem] text-black-900 text-center">
        If you have any questions or need further assistance, please don’t
        hesitate to reach out.
      </p>
    </div>
  );
}

export default PaymentConfirmationModal;
