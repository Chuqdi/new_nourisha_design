"use client";
import SideModal from "@/components/ui/SideModal";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtomValue } from "jotai";
import UserContextProvider from "./UserContext";

export default function PagesHOC({ children }: { children: React.ReactNode }) {
  const showSideModal = useAtomValue(ATOMS.showSideModal);
  const cartLoading = useAtomValue(ATOMS.cartIsLoading);

  return (
    <UserContextProvider>
      <div>
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
        <SideModal show={showSideModal.show}>
          {showSideModal.component}
        </SideModal>
      </div>
    </UserContextProvider>
  );
}
