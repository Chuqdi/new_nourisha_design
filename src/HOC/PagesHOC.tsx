"use client";
import SideModal from "@/components/ui/SideModal";
import { ATOMS } from "@/store/atoms";
import { useAtomValue } from "jotai";


export default  function PagesHOC  ({ children }: { children: React.ReactNode }) {
    const showSideModal = useAtomValue(ATOMS.showSideModal);
    return (
      <div>
        {children}
        <SideModal show={showSideModal.show}>{showSideModal.component}</SideModal>
      </div>
    );
  };