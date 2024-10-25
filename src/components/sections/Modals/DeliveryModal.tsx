"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom,} from "jotai";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/HOC/UserContext";
import { toast } from "@/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import FoodDeliveryDateSelection from "@/components/commons/FoodboxDatePicker";

export const Checkbox = ({
  checked,
  onSelect,
}: {
  checked: boolean;
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
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
  hidDeliveryDate,
}: {
  proceed: () => Promise<void>;
  setDeliveryDate: (d: string) => void;
  hidDeliveryDate?: boolean;
}) {
  const [delivery_date, set_delivery_date] = useState("");
  const router = useRouter();
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const userCtx = useContext(UserContext);
  const { getAxiosClient } = useAuth();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [todaysDate, setTodaysDate] = useState<string>(null!);
  const [address, setAddress] = useState({
    country: user?.address?.country,
    city: user?.address?.city,
    address_: user?.address?.address_,
    postcode: user?.address?.postcode,
  });
  const inputRef = useRef<HTMLInputElement>(null!);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!delivery_date && !hidDeliveryDate) {
      alert("Please select a delivery date");
      return;
    }

    if (!user?.email) {
      toast({
        variant: "default",
        title: "Error",
        description: "Please login to proceed",
        onClick: () => {
          router.push("/auth");
        },
      });
      setSideModal({
        ...sideModal,
        show: false,
      });
      router.push("/auth");

      return;
    }
    setLoading(true);
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    try {
      await axiosClient.put(`customers/me`, { address });
      // .catch((e) => {
      //   router.push("/auth");
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: "Failed to update address, please login to continue",
      //   });
      // });
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

  useEffect(() => {
    setDeliveryDate(delivery_date);
  }, [delivery_date]);



  useEffect(() => {
    setAddress({
      country: user?.address?.country,
      city: user?.address?.city,
      address_: user?.address?.address_,
      postcode: user?.address?.postcode,
    });
  }, [user]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const minDate = today.toISOString().split("T")[0];
    setTodaysDate(minDate);
    inputRef?.current?.setAttribute("min", minDate);
  }, []);
  return (
    <div className="w-full bg-white h-[100vh] flex flex-col gap-6 py-8 px-3 max-h-[80vh] md:max-h-[100vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
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

      <form
        name="delivery_form"
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
      >
        {!hidDeliveryDate && (
          <div className="w-full">
            <label>Delivery date</label>
            <FoodDeliveryDateSelection
            delivery_date={delivery_date}
            set_delivery_date={set_delivery_date}
            />
          </div>
        )}

        <div>
          <label>Country</label>
          <Input
            value={address?.country}
            name="country"
            placeholder="Enter your country"
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
            placeholder="Enter your city"
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
            placeholder="Enter your address"
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
            placeholder="Enter your postcode"
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
