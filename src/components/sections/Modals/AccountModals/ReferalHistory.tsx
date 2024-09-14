import queryKeys from "@/config/queryKeys";
import { IReferal } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useAuth from "@/hooks/useAuth";
import moment from "moment";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";
import ReferalInput from "../../ReferalInput";

export default function ReferalHistory() {
  const [activeCategory, setActiveCategory] = useState<"COMPLETED" | "PENDING">(
    "COMPLETED"
  );
  const { axiosClient } = useAuth();
  // const { apiClient, useQuery } = useContext(ApiClientContext);

  const getOrders = () => {
    return axiosClient.get(
      activeCategory === "COMPLETED"
        ? "referrals/completed"
        : "referrals/pending"
    );
  };
  const { data, isLoading } = useQuery(
    [queryKeys.GET_REFERALS, activeCategory],
    getOrders
  );

  return (
    <SidebarHOC isBack title="Referral history">
      <div className="flex gap-3 flex-col">
        <div className="bg-[#F5F5F5] h-[2.5rem] flex p-1 justify-between">
          <div
            onClick={() => setActiveCategory("COMPLETED")}
            className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer  ${
              activeCategory === "COMPLETED" ? "bg-white" : "bg-transparent"
            }`}
          >
            Completed
          </div>

          <div
            onClick={() => setActiveCategory("PENDING")}
            className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer ${
              activeCategory === "PENDING" ? "bg-white" : "bg-transparent"
            }`}
          >
            Pending
          </div>
        </div>

        <div className="text-primary-orange-900 text-[0.75rem] font-inter flex justify-center items-center bg-[#fe7e0033] rounded-[0.25rem] p-2">
          Your friend(s) need to subscribe to a meal plan before you can get the
          reward
        </div>

        {isLoading &&
          [1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={`skeleton_${index}`} className="h-14" />
          ))}

        {!isLoading && !(data?.data?.data?.data as IReferal[])?.length && (
          <div>No {activeCategory.toLowerCase()} referals</div>
        )}

        <div className="flex flex-col gap-3 mt-4">
          {(data?.data?.data?.data as IReferal[])?.map((referal, index) => (
            <div
              key={`referal_index_${index}`}
              className="flex justify-between items-center py-2 px-5"
            >
              <div className="flex gap-3">
                <img src="/images/person.png" className="w-10 h-10" />
                <div>
                  <h4 className="text-[#303237] font-inter text-sm font-bold">
                    {referal?.invitee?.first_name} {referal?.invitee?.last_name}
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-[0.75rem] text-[#7E8494] font-inter">
                  {moment(referal?.createdAt).format("YYYY-MM-DD HH:mm")}
                </p>
                <p className="text-[0.75rem] text-[#7E8494] font-inter text-right">
                  £{referal?.reward}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <ReferalInput />
      </div>
    </SidebarHOC>
  );
}
