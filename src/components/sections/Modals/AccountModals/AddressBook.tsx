import Button from "@/components/ui/Button";
import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { useSetAtom } from "jotai";
import AddAddressBook from "./AddAddressBook";
import { UserContext } from "@/HOC/UserContext";
import { useContext } from "react";

export default function AddressBook() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const userCtx = useContext(UserContext);
  const user = userCtx?.user;
  return (
    <SidebarHOC isBack title="Address">
      {/* <div className="w-full">
        <div>
          <Button
            title="Add new address"
            className="h-8 rounded-[0.1rem]"
            variant="primary"
           
          />
        </div>
      </div> */}

      <div className="border-[1px] border-[#F2F4F7] rounded-[0.25rem] p-3">
        <h3 className="font-inter text-sm font-bold text-[#303237]">
          { user?.address?.city }/{ user?.address?.country }
        </h3>
        <div className="text-[#303237] font-inter text-sm">
          { user?.address?.address_ }
          <br />
          { user?.address?.postcode }
        </div>

        <div className="flex justify-end items-center mt-2">
          {/* <Button
            className="rounded-[0.15rem] h-[2rem]"
            variant="primary"
            title="Set as default"
          /> */}
          <div className="flex items-center gap-2">
            <button
             onClick={() =>
              setSideModal({ show: true, component: <AddAddressBook /> })
            }
             className="bg-[#04A76C] h-[2rem] flex justify-center items-center text-center w-[3.875rem] rounded-sm text-white">
              Edit
            </button>

            {/* <button className="bg-[#FF4159] h-[2rem] flex justify-center items-center text-center w-[3.875rem] rounded-sm text-white">
              Delete
            </button> */}
          </div>
        </div>
      </div>
    </SidebarHOC>
  );
}
