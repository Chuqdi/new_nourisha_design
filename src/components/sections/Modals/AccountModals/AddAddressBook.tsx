import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SidebarHOC from "@/HOC/SidebarHOC";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { FormEvent, useContext, useState } from "react";
import { toast } from "@/ui/use-toast";


export default function AddAddressBook() {
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

      toast({
        variant: "default",
        title: "Address updated successfully",
      })
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <SidebarHOC isBack title="Add new address">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
          title="Save address"
          disabled={loading}
        />
      </form>
    </SidebarHOC>
  );
}
