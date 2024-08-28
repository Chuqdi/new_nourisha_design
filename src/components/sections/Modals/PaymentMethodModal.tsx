import Button from "@/components/ui/Button";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";
import { useState } from "react";
import SelectDeliveryDayModal from "./SelectDeliveryDayModal";

export default function PaymentMethodModal() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      title: "Credit/Debit card",
      icon: (
        <Icon
          className="w-6 h-6"
          color="#000"
          icon="material-symbols-light:credit-card-outline"
        />
      ),
      onClick: () => {},
    },
    {
      title: "Paypal",
      icon: <Icon className="w-6 h-6" icon="logos:paypal" />,
      onClick: () => {},
    },
  ]);

  return (
    <div className="w-full bg-white h-[100vh] flex flex-col gap-6 py-8 px-3 max-h-[80vh] md:max-h-[100vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h4 className="text-black-900 text-2xl font-NewSpiritBold">
            Payment method
          </h4>
        </div>
        <button
          onClick={() => setSideModal({ show: false, component: undefined })}
          className="bg-[#EDEDF3] p-3 rounded-full"
        >
          <Icon color="#030517" className="w-6 h-6" icon="fluent-mdl2:cancel" />
        </button>
      </div>

      <p className="text-[#5C556C] font-inter text-base px-4">
        Choose a payment type
      </p>

      <div className="px-4 flex flex-col gap-8">
        {paymentMethods.map((method, index) => (
          <div
            className="flex justify-center items-end rounded-[0.5rem] py-[0.75rem] px-[2rem] w-full h-[3rem] border-[1px] border-[#BDC0CE]"
            key={`payment_method_${index}`}
          >
            {method.icon}
            <p>{method.title}</p>
          </div>
        ))}
      </div>

      <div className="px-4">
        <p className="text-[#7E8494] text-sm font-inter">WE ACCEPT</p>
        <div className="flex items-center gap-6 mt-1">
          <Icon className="w-7 h-7" icon="logos:paypal" />
          <Icon className="w-7 h-7" icon="logos:mastercard" />
          <Icon className="w-7 h-7" icon="ri:visa-line" />
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-inter">Sub-total</p>
          <p className="text-[#565C69] text-sm font-semibold font-inter">
            £157.00
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-inter">Sub-total</p>
          <p className="text-[#565C69] text-sm font-semibold font-inter">
            £157.00
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-inter font-semibold">Total to pay</p>
          <p className="text-[#565C69] text-sm font-semibold font-inter">
            £157.00
          </p>
        </div>
      </div>

      <Button onClick={()=> setSideModal({ show:true, component:<SelectDeliveryDayModal />})}  title="Make payment" variant="primary" />
    </div>
  );
}
