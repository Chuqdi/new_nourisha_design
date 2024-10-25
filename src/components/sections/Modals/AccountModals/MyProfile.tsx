import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SidebarHOC from "@/HOC/SidebarHOC";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";
import ChangePassword from "./ChangePassword";
import { FormEvent,  useContext,  useEffect,  useState } from "react";
import useAuthToken from "@/hooks/useAuthToken";
import axios from "axios";
import { toast } from "@/ui/use-toast";
import { IUser } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";


export default function MyProfile() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuthToken();
  const token = getToken();
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    address_: user?.address?.address_,
    city: user?.address?.city,
    country: user?.address?.country,
    postcode: user?.address?.postcode,
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { address_, city, country, postcode } = formData;
    await axios
      .put(
        `${process.env.API_URL}customers/me`,
        {
          gender: "male",
          avatar: "profileImage",
          address: {
            address_,
            city,
            country,
            postcode,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "device-id": `29a1df4646cb3417c19994a59a3e022a`,
          },
        }
      )
      .then((data) => {
        setUser(data?.data?.data);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated",
          variant: "default",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      });
    setIsLoading(false);
  };



  useEffect(()=>{
    setFormData({
      address_: user?.address?.address_,
      city: user?.address?.city,
      country: user?.address?.country,
      postcode: user?.address?.postcode,
    })
  }, [ user ])
  return (
    <SidebarHOC isBack title="My Profile">
      <div className="w-full">
        <form name="edit_profile_form" onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div>
            <label>Address</label>
            <Input
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              onChange={(e) =>
                setFormData({ ...formData, address_: e.target.value })
              }
              value={formData.address_}
              placeholder="John Smith"
            />
          </div>

          <div>
            <label>Town/City</label>
            <Input
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              value={formData.city}
              placeholder="Enter city location"
            />
          </div>

          <div>
            <label>Country</label>
            <Input
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              value={formData.country}
              placeholder="Enter country location"
            />
          </div>

          <div>
            <label>Postal code</label>
            <Input
              type="tel"
              className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem]"
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              value={formData.postcode}
              placeholder="Enter postcode"
            />
          </div>

        

          <Button className="h-[3rem]" disabled={isLoading} title="Save changes" variant="primary" fullWidth />
        </form>

        <button
          onClick={() =>
            setSideModal({ show: true, component: <ChangePassword /> })
          }
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
