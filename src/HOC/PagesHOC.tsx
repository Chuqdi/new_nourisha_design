"use client";
import CartSideSection from "@/components/sections/CartSideSection";
import EnterCouponCodeModal from "@/components/sections/Modals/EnterCouponCodeModal";
import ExtraMealSelectionModal from "@/components/sections/Modals/ExtraMealSelectionModal";
import FoodInfoModal from "@/components/sections/Modals/FoodInfoModal";
import PaymentConfirmationModal from "@/components/sections/Modals/PaymentConfirmationModal";
import PaymentModal from "@/components/sections/Modals/PaymentModal";
import Modal from "@/components/ui/Modal";
import SideModal from "@/components/ui/SideModal";
import { BREAKPOINT } from "@/config";
import useFingerPrint, { DEVICE_ID } from "@/hooks/useFingerPrint";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { IPInfoContext } from "ip-info-react";
import { useAtom, useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function PagesHOC({ children }: { children: React.ReactNode }) {
  const showSideModal = useAtomValue(ATOMS.showSideModal);
  const cartLoading = useAtomValue(ATOMS.cartIsLoading);
  const [paymentModal, setPaymentModal] = useAtom(ATOMS.paymentModal);
  const [showMealExtraModal, setMealExtraModal] = useAtom(
    ATOMS.showMealExtraSelection
  );
  const [showMobileCartModal, setShowMobileCartModal] = useAtom(
    ATOMS.showMobileCartModal
  );
  const f = useFingerPrint();
  const [device_id, set_device_id] = useAtom(ATOMS.device_id);
  const [foodInfoModal, setFoodInfoModal] = useAtom(ATOMS.foodInfoModal);
  const pathName = useSearchParams();
  const [loadingDeviceId, setLoadingDeviceId] = useState(true);
  const [showPaymentConfirmationModal, setShowPaymentConfirmationModal] =
    useState(false);
  const [couponState, setCouponState] = useAtom(ATOMS.couponCode);
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });

  const userInfo = useContext(IPInfoContext);

  useEffect(() => {
    if (userInfo?.ip) {
      set_device_id(userInfo?.ip);
      localStorage.setItem(DEVICE_ID, userInfo?.ip);
      setLoadingDeviceId(false);
    }
  }, [userInfo?.ip]);

  useEffect(() => {
    const p =
      pathName.get("show_payment_modal") &&
      pathName.get("show_payment_modal") === "1";
    setShowPaymentConfirmationModal(!!p);
  }, []);

  useEffect(() => {
    if (paymentModal?.show) {
      setShowMobileCartModal({ ...showMobileCartModal, show: false });
    }
  }, [paymentModal?.show]);

  return (
    <div>
      <Modal close={() => {}} show={paymentModal.show}>
        <PaymentModal
          getClientSecret={paymentModal.onContinue}
          close={() => setPaymentModal({ ...paymentModal, show: false })}
          
        />
      </Modal>

      <Modal
        close={() => setCouponState({ ...couponState, show: false })}
        show={couponState.show}
      >
        <EnterCouponCodeModal />
      </Modal>

      <Modal
        close={() => setShowPaymentConfirmationModal(false)}
        show={showPaymentConfirmationModal}
      >
        <PaymentConfirmationModal
          close={() => setShowPaymentConfirmationModal(false)}
        />
      </Modal>

      <SideModal show={showMealExtraModal.show && !cartLoading}>
        <ExtraMealSelectionModal />
      </SideModal>

      <Modal
        close={() => {
          setFoodInfoModal({
            ...foodInfoModal,
            show: false,
          });
        }}
        show={foodInfoModal.show}
      >
        <FoodInfoModal />
      </Modal>
      {!loadingDeviceId && (
        <AnimatePresence>
          {showMobileCartModal.show && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed bottom-0  overflow-y-scroll left-0 w-full opacity-75 z-[99999999] flex justify-center bg-[#F2F4F7] `}
            >
              <div className="w-full">
                <CartSideSection />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {loadingDeviceId ? (
        <div
          style={{
            background: "#fff",
            zIndex: 9999999,
          }}
          className="fixed right-0 top-0 bottom-0 left-0 bg-[#000] pointer-events-none z-[999999999] flex justify-center items-center  flex-col"
        >
          <Icon color="#FE7E00" className="w-6 h-6" icon="eos-icons:loading" />
          <p>Retrieving cart details...</p>
        </div>
      ) : (
        cartLoading && (
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
        )
      )}
      {children}
      <SideModal show={showSideModal.show}>{showSideModal.component}</SideModal>
    </div>
  );
}
