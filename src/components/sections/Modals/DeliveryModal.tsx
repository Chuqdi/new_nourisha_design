import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";
import { FormEvent, useState } from "react";
import PaymentMethodModal from "./PaymentMethodModal";

export const Checkbox = ({
  checked,
  onSelect,
}: {
  checked: boolean;
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-6 h-6  rounded-[0.5rem] flex justify-center items-center ${
        checked ? "bg-[#04A76C]" : "bg-[#fff] border"
      }`}
    >
      <Icon color={checked ? "#fff" : "#000"} icon="gravity-ui:check" />
    </button>
  );
};
export default function DeliveryModal() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const [useDefaultAddress, setUseAddress] = useState(true);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSideModal({
      show: true,
      component: <PaymentMethodModal />,
    });
  };
  return (
    <div className="w-full bg-white h-[100vh] flex flex-col gap-6 py-8 px-3 max-h-[80vh] md:max-h-[100vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon color="#030517" className="w-6 h-6" icon="fluent-mdl2:back" />
          <h4 className="text-black-900 text-2xl font-NewSpiritBold">
            Delivery address
          </h4>
        </div>
        <button
          onClick={() => setSideModal({ show: false, component: undefined })}
          className="bg-[#EDEDF3] p-3 rounded-full"
        >
          <Icon color="#030517" className="w-6 h-6" icon="fluent-mdl2:cancel" />
        </button>
      </div>

      <p className="text-[#5C556C] font-inter text-base">
        Kindly provide the following information to complete your order. Your
        meal will be delivered to this address
      </p>

      <div className="flex items-start gap-3">
        <Checkbox
          checked={useDefaultAddress}
          onSelect={() => setUseAddress((value) => !value)}
        />
        <p className="text-black-900 text-base font-inter leading-[1.3rem]">
          Use default address in address book
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="">
          <label>Country</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>

        <div className="">
          <label>Town/city</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>

        <div className="">
          <label>House address</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>

        <div className="">
          <label>Post Code</label>
          <Input className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]" />
        </div>

        <Button
          fullWidth
          type="submit"
          variant="primary"
          title="Continue"
          className="h-[3rem]"
        />
      </form>
    </div>
  );
}
