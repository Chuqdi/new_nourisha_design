import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";
import ChangePassword from "./ChangePassword";

export default function MyProfile() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);

  return (
    <SidebarHOC isBack title="My Profile">
      <div className="w-full">
        <form className="w-full flex flex-col gap-6">
          <div>
            <label>First name</label>
            <Input
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <div>
            <label>Last name</label>
            <Input
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <div>
            <label>Email address</label>
            <Input
              type="email"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <div>
            <label>Phone number</label>
            <Input
              type="tel"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <div>
            <label>Gender</label>
            <Input
              type="tel"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <Button title="Save changes" variant="primary" fullWidth />
        </form>

        <button
          onClick={()=> setSideModal({show:true, component:<ChangePassword />})}
          className="flex items-center justify-between h-[3.5rem] py-3 w-full mt-8 border px-4"
        >
          <div className="flex items-center gap-3">
            <Icon
              color="#FE7E00"
              icon="hugeicons:user-circle"
              className="w-6 h-6"
            />
            <p className="text-black-900 text-sm tracking-[-0.01313rem]">
              Change password
            </p>
          </div>
          <Icon icon="mingcute:right-fill" />
        </button>
      </div>
    </SidebarHOC>
  );
}
