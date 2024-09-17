"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import MealSelectionSection from "@/components/sections/MealSelectionSection";
import PaymentModal from "@/components/sections/Modals/PaymentModal";
import Modal from "@/components/ui/Modal";
import { ICartDetail } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { useAtom, useAtomValue } from "jotai";

export default function Main() {
  const [paymentModal, setPaymentModal] = useAtom(ATOMS.paymentModal);
  const cartDetails = useAtomValue(ATOMS.cartDetails) as ICartDetail;

  return (
    <div
      className={`
      w-full h-full relative pt-6
      `}
    >
      <Modal show={paymentModal.show}>
        <PaymentModal
          getClientSecret={paymentModal.onContinue}
          close={() => setPaymentModal({ ...paymentModal, show: false })}
          amount={
            parseInt(cartDetails?.total) + parseInt(cartDetails?.deliveryFee)
          }
        />
      </Modal>
      <Navbar />
      <div className="flex flex-col gap-6 mt-32">
        <h3 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Single Meal Orders
        </h3>

        <p className="text-black-900 font-inter text-lg text-center w-full md:w-2/5 mx-auto">
          Craving something specific? Order single meals and satisfy your hunger
          right away.
        </p>
      </div>

      <div className="mt-8 mx-1.25 md:mx-6.25 flex items-start flex-col-reverse md:flex-row gap-4">
        <div className="w-full ">
          <MealSelectionSection
            colCountClass={"md:grid-cols-3 grid-cols-1"}
            isSingle
          />
        </div>
        {/* <div className="mt-0 md:mt-[5.4rem] w-full md:w-[40%]">
          <CartDetailsSummarySection />
        </div> */}
      </div>
      <div className="w-full mt-6.25">
        <img src="/images/zigzag.png" className="w-full" />
      </div>
      <div className="mt-8 mx-6.25">
        <DownloadTheAppWidgetSection />
      </div>

      <div className="mt-[5rem] mx-1.25 md:mx-6.25">
        <Footer />
      </div>
    </div>
  );
}