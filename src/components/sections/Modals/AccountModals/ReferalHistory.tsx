import SidebarHOC from "@/HOC/SidebarHOC";
import { useState } from "react";
import ReferalInput from "../../ReferalInput";

export default function ReferalHistory() {
  const [pending, setPending] = useState(false);
  return (
    <SidebarHOC isBack title="Referral history">
      <div className="flex gap-3 flex-col">
        <div
          onClick={() => setPending(true)}
          className="bg-[#F5F5F5] h-[2.5rem] flex p-1 justify-between"
        >
          <div
            className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer ${
              pending ? "bg-white" : "bg-transparent"
            }`}
          >
            Pending
          </div>
          <div
            onClick={() => setPending(false)}
            className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer  ${
              !pending ? "bg-white" : "bg-transparent"
            }`}
          >
            Completed
          </div>
        </div>

        <div className="text-primary-orange-900 text-[0.75rem] font-inter flex justify-center items-center bg-[#fe7e0033] rounded-[0.25rem] p-2">
          Your friend(s) need to subscribe to a meal plan before tou can get the
          reward
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {[1, 2, 3].map((referal, index) => (
            <div
              key={`referal_index_${index}`}
              className="flex justify-between items-center py-2 px-5"
            >
              <div className="flex gap-3">
                <img src="/images/person.png" className="w-10 h-10" />
                <div>
                  <h4 className="text-[#303237] font-inter text-sm font-bold">
                    FREEBORN EHIRHERE
                  </h4>
                  <p className="text-[#7E8494] text-[0.75rem] font-inter">
                    has subscribed to a meal plan
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[0.75rem] text-[#7E8494] font-inter">
                  2023-04-23
                </p>
                <p className="text-[0.75rem] text-[#7E8494] font-inter">£10</p>
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
