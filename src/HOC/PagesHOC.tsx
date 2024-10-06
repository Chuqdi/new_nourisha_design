"use client";
import ExtraMealSelectionModal from "@/components/sections/Modals/ExtraMealSelectionModal";
import FoodInfoModal from "@/components/sections/Modals/FoodInfoModal";
import PaymentConfirmationModal from "@/components/sections/Modals/PaymentConfirmationModal";
import PaymentModal from "@/components/sections/Modals/PaymentModal";
import Modal from "@/components/ui/Modal";
import SideModal from "@/components/ui/SideModal";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagesHOC({ children }: { children: React.ReactNode }) {
  const showSideModal = useAtomValue(ATOMS.showSideModal);
  const cartLoading = useAtomValue(ATOMS.cartIsLoading);
  const [paymentModal, setPaymentModal] = useAtom(ATOMS.paymentModal);
  const [showMealExtraModal, setMealExtraModal] = useAtom(
    ATOMS.showMealExtraSelection
  );
  const foodInfoModal = useAtomValue(ATOMS.foodInfoModal);
  const pathName = useSearchParams();
  const [showPaymentConfirmationModal, setShowPaymentConfirmationModal] = useState(false);

  useEffect(() => {
    const p = pathName.get("show_payment_modal") && pathName.get("show_payment_modal") === "1";
    setShowPaymentConfirmationModal(!!p);
  }, []);

  return (
    <div>
      <Modal show={paymentModal.show}>
        <PaymentModal
          getClientSecret={paymentModal.onContinue}
          close={() => setPaymentModal({ ...paymentModal, show: false })}
        />
      </Modal>

      <Modal show={showPaymentConfirmationModal}>
        <PaymentConfirmationModal close={()=> setShowPaymentConfirmationModal(false)} />
      </Modal>

      <SideModal show={showMealExtraModal.show}>
        <ExtraMealSelectionModal />
      </SideModal>

      <Modal show={foodInfoModal.show}>
        <FoodInfoModal />
      </Modal>
      
      {cartLoading && (
        <div
          style={{
            background: "#1e1e1e7a",
            zIndex: 9999999,
          }}
          className="fixed right-0 top-0 bottom-0 left-0 bg-[#000] pointer-events-none z-[999999999] flex justify-center items-center"
        >
          <Icon
            className="w-10 h-10"
            color="#FE7E00"
            icon="eos-icons:loading"
          />
        </div>
      )}
      {children}
      <SideModal show={showSideModal.show}>{showSideModal.component}</SideModal>
    </div>
  );
}
