import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SidebarHOC from "@/HOC/SidebarHOC";

export default function AddAddressBook() {
  return (
    <SidebarHOC isBack title="Add new address">
      <form className="flex flex-col gap-6">
        <div>
          <label>Country</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>
        <div>
          <label>Town/city</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>
        <div>
          <label>House address</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>
        <div>
          <label>Post Code</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>
        <Button variant="primary" className="h-[3rem] mt-8" title="Save address" />
      </form>
    </SidebarHOC>
  );
}
