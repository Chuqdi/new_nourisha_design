"use client"
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "@/HOC/UserContext";
import PaymentMethodModal from "./PaymentMethodModal";
import { toast } from "@/ui/use-toast";
import useAuth from "@/hooks/useAuth";

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
export default function DeliveryModal({
  proceed,
  setDeliveryDate,
 
}: {
  proceed: () => Promise<void>;
  setDeliveryDate:(d:string)=> void,
}) {
  const [delivery_date, set_delivery_date] = useState("");

  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const userCtx = useContext(UserContext);
  const user = userCtx?.user;
  const { axiosClient } = useAuth();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    country: user?.address?.country,
    city: user?.address?.city,
    address_: user?.address?.address_,
    postcode: user?.address?.postcode,
  });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!delivery_date) {
      toast({
        variant: "destructive",
        title: "Please select a delivery date",
      });
      return;
    }
    setLoading(true);
    try {
      await axiosClient.put(`customers/me`, { address });
      userCtx?.setUser({
        ...user,
        //@ts-ignore
        address: {
          ...user?.address,
          ...address,
        },
      });

      proceed();
      setSideModal({
        ...sideModal,
        show: false,
      });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(()=>{
    setDeliveryDate(delivery_date)
  }, [delivery_date])
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

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div>
          <label>Delivery date</label>
          <Input
            value={delivery_date}
            type="date"
            onChange={(e) => set_delivery_date(e.target.value)}
            className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          />
        </div>

        <div>
          <label>Country</label>
          <Input
            value={address?.country}
            name="country"
            onChange={(e) =>
              setAddress({
                ...address,
                [e.target.name]: e.target.value,
              })
            }
            className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          />
        </div>
        <div>
          <label>Town/city</label>
          <Input
            value={address?.city}
            name="city"
            onChange={(e) =>
              setAddress({
                ...address,
                [e.target.name]: e.target.value,
              })
            }
            className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          />
        </div>
        <div>
          <label>House address</label>
          <Input
            value={address?.address_}
            name="address_"
            onChange={(e) =>
              setAddress({
                ...address,
                [e.target.name]: e.target.value,
              })
            }
            className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          />
        </div>
        <div>
          <label>Post Code</label>
          <Input
            value={address?.postcode}
            name="postcode"
            onChange={(e) =>
              setAddress({
                ...address,
                [e.target.name]: e.target.value,
              })
            }
            className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          />
        </div>
        <Button
          variant="primary"
          className="h-[3rem] mt-8"
          title="Proceed"
          disabled={loading}
        />
      </form>
    </div>
  );
}
