import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { useSetAtom } from "jotai";
import AddAddressBook from "./AddAddressBook";
import {  useContext,} from "react";
import { UserContext } from "@/HOC/UserContext";

export default function AddressBook() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const { user } = useContext(UserContext);


  return (
    <SidebarHOC isBack title="Address">
      <div className="border-[1px] border-[#F2F4F7] rounded-[0.25rem] p-3">
        <h3 className="font-inter text-sm font-bold text-[#303237]">
          {user?.address?.city}/{user?.address?.country}
        </h3>
        <div className="text-[#303237] font-inter text-sm">
          {user?.address?.address_}
          <br />
          {user?.address?.postcode}
        </div>

        <div className="flex justify-end items-center mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setSideModal({ show: true, component: <AddAddressBook /> })
              }
              className="bg-[#04A76C] h-[2rem] flex justify-center items-center text-center w-[3.875rem] rounded-sm text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </SidebarHOC>
  );
}
