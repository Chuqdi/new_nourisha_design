import Button from "@/components/ui/Button";
import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { useSetAtom } from "jotai";
import AddAddressBook from "./AddAddressBook";

export default function AddressBook() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);

  return (
    <SidebarHOC isBack title="Address Book">
      <div className="w-full">
        <div>
          <Button
            title="Add new address"
            className="h-8 rounded-[0.1rem]"
            variant="primary"
            onClick={() =>
              setSideModal({ show: true, component: <AddAddressBook /> })
            }
          />
        </div>
      </div>

      <div className="border-[1px] border-[#F2F4F7] rounded-[0.25rem] p-3">
        <h3 className="font-inter text-sm font-bold text-[#303237]">
          Country/City
        </h3>
        <div className="text-[#303237] font-inter text-sm">
          163 sinari Daranijo street, off ligali ayorinde, Victoria Island ,{" "}
          <br />
          Lagos
        </div>

        <div className="flex justify-between items-center mt-2">
          <Button
            className="rounded-[0.15rem] h-[2rem]"
            variant="primary"
            title="Set as default"
          />
          <div className="flex items-center gap-2">
            <button className="bg-[#04A76C] h-[2rem] flex justify-center items-center text-center w-[3.875rem] rounded-sm text-white">
              Edit
            </button>

            <button className="bg-[#FF4159] h-[2rem] flex justify-center items-center text-center w-[3.875rem] rounded-sm text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </SidebarHOC>
  );
}
