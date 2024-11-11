import useFoodbox from "@/hooks/useFoodbox";
import { Icon } from "@iconify/react/dist/iconify.js";
import { sendGAEvent } from "@next/third-parties/google";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const LineupOrderConfirmation = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const deliveryDate = searchParams.get("delivery_date");
  const { createLineUp, loadingLineUpCreation } = useFoodbox();
  useEffect(() => {
    createLineUp(deliveryDate!);
  }, []);
  return (
    <div className="bg-[#FE7E00] rounded-[1rem] flex flex-col items-center justify-center p-4">
      <img src="/images/icon_with_title.png" className="w-36 h-auto" />

      <div className="w-full flex flex-col items-center justify-center mt-8">
        <img src="/images/chef.png" className="w-[17.89019rem] h-auto" />
        <div className="w-[90%] md:w-[80%] mx-auto rounded-[0.718rem] bg-white p-3 flex flex-col gap-3 -mt-6">
          <p className="font-NewSpiritBold text-[1.077rem] text-center">
            Your order is being processed
          </p>
          <p className="text-center text-[#5C5F84] font-inter w-3/4 mx-auto">
            Our chefs will start making your order shortly
          </p>
          <p className="text-[#030517] text-[0.83769rem] font-inter text-center">
            YOUR DELIVERY DATE IS:
          </p>
          <div className=" bg-[#DEF54C] rounded-[0.8975rem] p-2 w-fit mx-auto font-bold font-NewSpiritBold">
            {moment(deliveryDate ? new Date(deliveryDate) : null).format(
              "MMM, YYYY-MM-DD"
            )}
          </div>
          <button
            onClick={onClose}
            disabled={loadingLineUpCreation}
            className={`w-full flex justify-center items-center bg-primary-orange-900 rounded-[0.47869rem] h-[3rem] font-inter text-white text-center ${
              loadingLineUpCreation && "opacity-80 pointer-events-none"
            }`}
          >
            {loadingLineUpCreation ? "Please wait" : "Go Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

function PaymentConfirmationModal({ close }: { close: () => void }) {
  const searchParams = useSearchParams();
  const triggeredEvent = useRef(false);
  const deliveryDate = searchParams.get("delivery_date");
  const onClose = () => {
    const reloadWindow = searchParams?.get("reloadWindow");
    if ((reloadWindow && reloadWindow === "1") || !!deliveryDate) {
      window.location.href = "/";
    }
    close();
  };

  useEffect(() => {
    const gtagEvent = searchParams.get("gtagEvent");
    if (gtagEvent) {
      try {
        const gtagEventData = JSON.parse(gtagEvent ?? "");
        sendGAEvent({
          event: "purchase",
          value: gtagEventData,
        });
        triggeredEvent.current = true;
        return JSON.parse(gtagEvent);
      } catch (e) {
        console.error("Invalid JSON in search param:", e);
        return null; // Return null if JSON is invalid
      }
    }
  }, [searchParams]);
  return !!deliveryDate ? (
    <LineupOrderConfirmation onClose={onClose} />
  ) : (
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
      <p className="font-inter text-sm text-center text-black-900 mt-4">
        You can access your order and any additional information through your
        account on our website.
      </p>
      <p className="font-inter text-sm text-black-900 text-center">
        If you have any questions or need further assistance, please don’t
        hesitate to reach out.
      </p>
    </div>
  );
}

export default PaymentConfirmationModal;
