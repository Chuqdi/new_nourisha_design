import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SidebarHOC from "@/HOC/SidebarHOC";

export default function ChangePassword() {
  return (
    <SidebarHOC isBack title="Change password">
      <div className="w-full">
        <form className="w-full flex flex-col gap-6">
          <div>
            <label>Old Password</label>
            <Input
              type="password"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <div>
            <label>New Password</label>
            <Input
              type="password"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <div>
            <label>Repeat New Password</label>
            <Input
              type="password"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              placeholder=""
            />
          </div>

          <Button title="Save changes" variant="primary" fullWidth />
        </form>
      </div>
    </SidebarHOC>
  );
}
