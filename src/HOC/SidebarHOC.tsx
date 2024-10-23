import MainAccount from "@/components/sections/Modals/AccountModals/Main";
import { CART_MODAL_OPEN } from "@/config/storageKeys";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";

export default function SidebarHOC({
  children,
  title,
  className,
  isBack,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  isBack?: boolean;
}) {
  const setSideModal = useSetAtom(ATOMS.showSideModal);

  return (
    <div
      className={`w-full bg-white h-[100vh] flex flex-col gap-6 py-8 px-3 max-h-[80vh] md:max-h-[100vh] overflow-y-scroll ${className}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex  items-center gap-3">
          {isBack && (
            <Icon
              onClick={() =>
                setSideModal({ show: true, component: <MainAccount /> })
              }
              color="#030517"
              className="w-7 h-7 cursor-pointer"
              icon="fluent-mdl2:back"
            />
          )}
          <h4 className="text-black-900 text-2xl font-NewSpiritBold">
            {title}
          </h4>
        </div>
        <button
          onClick={() => {
            localStorage.setItem(CART_MODAL_OPEN, "0");
            setSideModal({ show: false, component: undefined });
          }}
          className="bg-[#EDEDF3] p-3 rounded-full"
        >
          <Icon color="#030517" className="w-6 h-6" icon="fluent-mdl2:cancel" />
        </button>
      </div>
      {children}
    </div>
  );
}
