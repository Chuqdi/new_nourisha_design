import SidebarHOC from "@/HOC/SidebarHOC";
import { useState } from "react";

export default function Order() {
  const [pending, setPending] = useState(true);

  return (
    <SidebarHOC isBack title="Orders">
      <div
        onClick={() => setPending(true)}
        className="bg-[#F5F5F5] h-[2.5rem] flex p-1 justify-between"
      >
        <div
          className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer ${
            pending ? "bg-white" : "bg-transparent"
          }`}
        >
          Open Orders
        </div>
        <div
          onClick={() => setPending(false)}
          className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer  ${
            !pending ? "bg-white" : "bg-transparent"
          }`}
        >
          Closed orders
        </div>
      </div>
      <div className="flex justify-center items-center mt-30">
        <img src="/images/no_order.png" />
      </div>
    </SidebarHOC>
  );
}
