import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";
import MyProfile from "./MyProfile";
import Subscription from "./Subscriptions";
import Referal from "./Referal";
import AddressBook from "./AddressBook";
import Order from "./Orders";

export default function MainAccount() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);

  const options = [
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
      title: "Orders",
      onClick: () =>
        setSideModal({
          show: true,
          component: <Order />,
        }),
      icon: <Icon color="#FE7E00" icon="oui:package" className="w-6 h-6" />,
    },
    {
      title: "Refer a friend",
      onClick:  () => setSideModal({ show: true, component: <Referal /> }),
      
      icon: <Icon color="#FE7E00" icon="ph:gift-light" className="w-6 h-6" />,
    },
    // {
    //   title: "Gift card",
    //   onClick: () => {},
    //   icon: (
    //     <Icon
    //       color="#FE7E00"
    //       icon="hugeicons:location-03"
    //       className="w-6 h-6"
    //     />
    //   ),
    // },

    {
      title: "Address Book",
      onClick: () => setSideModal({ show:true, component:<AddressBook />}),
      icon: (
        <Icon
          color="#FE7E00"
          icon="hugeicons:location-03"
          className="w-6 h-6"
        />
      ),
    },
    {
      title: "Subscriptions",
      onClick: () => setSideModal({ show: true, component: <Subscription /> }),
      icon: (
        <Icon
          color="#FE7E00"
          icon="hugeicons:organic-food"
          className="w-6 h-6"
        />
      ),
    },
  ];

  return (
    <SidebarHOC title="Account">
      <div className="w-full">
        <p className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem] ">
          My account
        </p>
        <div className="px-4 py-3 border rounded-[0.4rem]">
          {options.map((navItem, index) => (
            <button
              onClick={() => navItem.onClick()}
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
          ))}
        </div>
      </div>
      <button className="flex items-center justify-between h-[3.5rem] py-1 w-full px-4 border rounded-[0.4rem]">
        <div className="flex items-center gap-3">
          <Icon color="#FF4159" icon="hugeicons:logout-01" />
          <p className="text-[#FF4159] text-sm tracking-[-0.01313rem] ">
            Logout
          </p>
        </div>
        <Icon icon="mingcute:right-fill" />
      </button>
    </SidebarHOC>
  );
}
