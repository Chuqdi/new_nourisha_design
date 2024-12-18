"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "@/HOC/UserContext";
import { toast } from "@/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import FoodDeliveryDateSelection from "@/components/commons/FoodboxDatePicker";
import useDeliveryDate from "@/hooks/useDeliveryDate";
import { IAddress, IUser } from "@/config/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cities } from "@/lib/utils";

// Type definitions
interface DeliveryModalProps {
  proceed: (delivery: string, address: IAddress) => Promise<void>;
  setDeliveryDate: (d: string) => void;
  hidDeliveryDate?: boolean;
}

export default function DeliveryModal({
  proceed,
  setDeliveryDate,
  hidDeliveryDate = false,
}: DeliveryModalProps) {
  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const userCtx = useContext(UserContext);
  const { getAxiosClient } = useAuth();
  const { data, isLoading, convertDateFormat } = useDeliveryDate();
  const { user } = useContext(UserContext);  

  // State
  const [delivery_date, set_delivery_date] = useState(
    searchParams?.get("delivery_date") || ""
  );
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<IAddress>({
    country: user?.address?.country || "",
    city: user?.address?.city || "",
    address_: user?.address?.address_ || "",
    postcode: user?.address?.postcode || "",
  });

  // Event Handlers
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (country: string) => {
    setAddress((prev) => ({
      ...prev,
      country,
      city: "", // Reset city when country changes
    }));
  };

  const handleCityChange = (city: string) => {
    setAddress((prev) => ({
      ...prev,
      city,
    }));
  };

  const handleClose = () => {
    setSideModal({ show: false, component: undefined });
  };

  const validateForm = (): boolean => {
    if (!hidDeliveryDate && !delivery_date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a delivery date",
      });
      return false;
    }

    if (!user?.email) {
      toast({
        variant: "default",
        title: "Error",
        description: "Please login to proceed",
        onClick: () => router.push("/auth"),
      });
      handleClose();
      router.push("/auth");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();    

    if (!validateForm()) return;
    if (!user) return;

    setLoading(true);

    try {
      const axiosClient = getAxiosClient(deviceId!);      
      await axiosClient.put(`customers/me`, { address });

      // Create a properly typed user object for the update
      const updatedUser: IUser = {
        ...user,
        address: {
          ...user.address,
          ...address,
        },
        // Ensure all required fields are present
        phone: user.phone,
        preference: user.preference || {
          allergies: [],
          auto_renew: false,
        },
        control: user.control || {},
      };

      userCtx?.setUser(updatedUser);
      await proceed(delivery_date, address);
      handleClose();
    } catch (error) {
      console.error("Error updating delivery details:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update delivery details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    setDeliveryDate(delivery_date);
  }, [delivery_date, setDeliveryDate]);

  useEffect(() => {
    if (user?.address) {      
      setAddress({
        country: user.address.country || "",
        city: user.address.city || "",
        address_: user.address.address_ || "",
        postcode: user.address.postcode || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const id = localStorage.getItem(DEVICE_ID);
    setDeviceId(id);
  }, []);

  const renderDeliveryDate = () => {
    if (hidDeliveryDate) {
      return (
        <div className="w-full flex flex-col justify-center">
          <p className="text-[#5C556C] font-inter text-base">
            Thank you for your order! Your meal will be freshly prepared and
            delivered. Please keep an eye on your notifications for real-time
            updates.
          </p>
          <p className="text-center font-inter text-sm mt-2">DELIVERY DATE</p>
          <div className="rounded-[0.75rem] mx-auto bg-[#DEF54C] p-4 text-center font-NewSpiritBold text-2xl">
            {isLoading ? (
              <Icon
                color="#000"
                icon="eos-icons:loading"
                className="w-6 h-6 mx-auto"
              />
            ) : (
              convertDateFormat(data?.data?.data)
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <label>Delivery date</label>
        <FoodDeliveryDateSelection
          delivery_date={delivery_date}
          set_delivery_date={set_delivery_date}
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-white h-[100vh] flex flex-col gap-6 py-8 px-3 max-h-[80vh] md:max-h-[100vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h4 className="text-black-900 text-2xl font-NewSpiritBold">
            Delivery address
          </h4>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="bg-[#EDEDF3] p-3 rounded-full"
          aria-label="Close modal"
        >
          <Icon color="#030517" className="w-6 h-6" icon="fluent-mdl2:cancel" />
        </button>
      </div>

      <p className="text-[#5C556C] font-inter text-base">
        Kindly provide the following information to complete your order. Your
        meal will be delivered to this address
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {renderDeliveryDate()}

        <div>
          <label>District</label>
          <Select value={address.country} onValueChange={handleCountryChange}>
            <SelectTrigger className="bg-[#F2F4F7]">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(cities).map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>City</label>
          <Select
            value={address.city}
            onValueChange={handleCityChange}
            disabled={!address.country}
          >
            <SelectTrigger className="bg-[#F2F4F7]">
              <SelectValue
                placeholder={
                  address.country ? "Select a city" : "Select country first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {address.country &&
                cities[address.country as keyof typeof cities].map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          value={address.address_}
          name="address_"
          type="text"
          disabled={loading || isLoading}
          placeholder="Enter your address"
          onChange={handleAddressChange}
          className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          required
        />

        <Input
          value={address.postcode}
          name="postcode"
          type="text"
          disabled={loading || isLoading}
          placeholder="Enter your postcode"
          onChange={handleAddressChange}
          className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem]"
          required
        />

        <Button
          variant="primary"
          className="h-[3rem] mt-8"
          title="Proceed"
          disabled={loading || isLoading}
          type="submit"
        />
      </form>
    </div>
  );
}
