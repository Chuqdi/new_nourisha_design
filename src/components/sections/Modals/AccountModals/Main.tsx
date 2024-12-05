import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/config";
import Modal from "@/components/ui/Modal";
import MyProfile from "./MyProfile";
import Order from "./Orders";
import Referal from "./Referal";
import DownloadAppModal from "../DownloadAppModal";
import { useLogout } from "@/hooks/useLogout";
import { FC } from "react";
import { useRouter } from "next/navigation";

export interface MenuItem {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
}

const Main: FC = () => {
  const router = useRouter();
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const [showGiftCardModal, setShowGiftCardModal] = useAtom(
    ATOMS.showGiftCardModal
  );
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const handleLogout = useLogout();

  const options: MenuItem[] = [
    {
      title: "My profile",
      onClick: () =>
        setSideModal({
          show: true,
          component: <MyProfile />,
        }),
      icon: (
        <Icon
          color="#FE7E00"
          icon="hugeicons:user-circle"
          className="w-6 h-6"
        />
      ),
    },
    {
      title: "Order History",
      onClick: () =>
        setSideModal({
          show: true,
          component: <Order />,
        }),
      icon: <Icon color="#FE7E00" icon="oui:package" className="w-6 h-6" />,
    },
    {
      title: "Refer a friend",
      onClick: () => setSideModal({ show: true, component: <Referal /> }),
      icon: <Icon color="#FE7E00" icon="ph:gift-light" className="w-6 h-6" />,
    },
    {
      title: "Gift card",
      onClick: () => setShowGiftCardModal(true),
      icon: (
        <Icon
          color="#FE7E00"
          icon="hugeicons:location-03"
          className="w-6 h-6"
        />
      ),
    },
  ];

  const renderMenuItem = (navItem: MenuItem, index: number): JSX.Element => (
    <button
      onClick={navItem.onClick}
      className="flex items-center justify-between h-[3.5rem] py-3 w-full hover:bg-[#0000002e] px-4 rounded-md"
      key={`navItem_${index}`}
    >
      <div className="flex items-center gap-3">
        {navItem.icon}
        <p className="text-black-900 text-sm tracking-[-0.01313rem]">
          {navItem.title}
        </p>
      </div>
      <Icon icon="mingcute:right-fill" />
    </button>
  );

  return (
    <SidebarHOC title="Account">
      <Modal
        close={() => setShowGiftCardModal(false)}
        center
        large={isMobile}
        medium={!isMobile}
        show={showGiftCardModal}
      >
        <DownloadAppModal />
      </Modal>

      <div className="w-full">
        <p className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem] mb-3">
          My account
        </p>
        <div className="px-4 py-3 border rounded-[0.4rem]">
          {options.map(renderMenuItem)}
        </div>
      </div>

      <button
        onClick={() => {
          handleLogout();
          setSideModal({ ...sideModal, show: false });
          router.push("/auth");
        }}
        className="flex items-center justify-between h-[3.5rem] py-1 px-4 border rounded-[0.4rem] w-full hover:bg-[#0000002e]"
      >
        <div className="flex items-center gap-3">
          <Icon color="#FF4159" icon="hugeicons:logout-01" />
          <p className="text-[#FF4159] text-sm tracking-[-0.01313rem]">
            Logout
          </p>
        </div>
        <Icon icon="mingcute:right-fill" />
      </button>
    </SidebarHOC>
  );
};

export default Main;
