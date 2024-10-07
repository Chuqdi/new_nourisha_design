import Button from "@/components/ui/Button";
import SidebarHOC from "@/HOC/SidebarHOC";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReferalInput from "../../ReferalInput";
import { useSetAtom } from "jotai";
import { ATOMS } from "@/store/atoms";
import ReferalHistory from "./ReferalHistory";
import queryKeys from "@/config/queryKeys";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "react-query";
import { DEVICE_ID } from "@/hooks/useFingerPrint";

export default function Referal() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const { getAxiosClient} = useAuth();

  const getReferalStats = () => {
    const id = localStorage.get(DEVICE_ID);
    const axiosClient = getAxiosClient(id);
    return axiosClient.get("referrals/stats");
  };
  const { data, } = useQuery(
    queryKeys.GET_REFERAL_STATS,
    getReferalStats
  );


  return (
    <SidebarHOC isBack title="Refer a friend">
      <div className="flex flex-col gap-4">
        <div className="bg-[#F9FAFB] h-[3.5rem] py-2 px-3 rounded-[0.25rem]">
          <p className="font-inter text-black-900 text-[0.75rem]">
            Pending reward
          </p>
          <h6 className="font-inter text-black-900 text-sm">{data?.data?.pending && `£${data?.data?.pending}`}</h6>
        </div>

        <div className="bg-[#F9FAFB] h-[3.5rem] py-2 px-3 rounded-[0.25rem] flex items-center justify-between">
          <div>
            <p className="font-inter text-black-900 text-[0.75rem]">
              Pending reward
            </p>
            <h6 className="font-inter text-black-900 text-sm">{data?.data?.total&&`£${data?.data?.total}`}</h6>
          </div>

          <Button
            className="h-[1.75rem] rounded-[0.25rem]"
            title="Withdraw"
            variant="primary"
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <img
              className="w-[7rem] h-[2.25rem]"
              src="/images/referals_image.png"
            />
            <Button
              variant="secondary"
              title="View history"
              className="rounded-[0.25rem] h-[1.75rem]"
              onClick={()=> setSideModal({show:true, component:<ReferalHistory />})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-inter text-[0.75rem] text-[#303237]">
            Total referals
          </p>
          <div className="w-full h-[0.5rem] bg-[#fe7e0033] rounded-[0.5rem]">
            <div className="h-full w-3/5 bg-[#FE7E00] rounded-[0.5rem]" />
          </div>
          <p className="text-center font-inter text-[0.75rem] text-[#303237]">
            {data?.data?.completed && `${data?.data?.completed} completed referrals`} 
          </p>
        </div>

        <div className="bg-[#FFE6E4] rounded-[0.5rem] p-3">
          <div className="w-full  flex justify-center items-center">
            <div className="flex justify-center items-center border-[2px] border-[#303237] rounded-[6rem] p-6 w-24 h-24">
              <Icon className="w-20 h-20" color="#303237" icon="ph:gift" />
            </div>
          </div>
          <h5 className="text-center font-inter text-2xl text-[#303237]">
            Earn a free meal
          </h5>
          <p className="text-[#7E8494] w-2/5 text-center mt-2 mx-auto text-[0.75rem] font-inter">
            Share you referral code to family and friends. Get a free meal when
            they register and subscribe to a plan
          </p>

          <ReferalInput />
        </div>
      </div>
    </SidebarHOC>
  );
}
