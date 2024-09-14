import queryKeys from "@/config/queryKeys";
import { IOrder } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useAuth from "@/hooks/useAuth";
import moment from "moment";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";

function SingleListItem({ order }: { order: IOrder }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div
      onClick={() => setShowDetails(true)}
      className="cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <img
          src={`${order.items[0].item.image_url}`}
          className="w-14 h-14 object-cover rounded-lg"
        />
        <div>
          <p className="text-303237 font-PlusSan text-sm">
            {order.items.map((item, key) => (
              <span key={key}>
                {item?.item?.name}
                {key !== order.items.length - 1 && ","}
              </span>
            ))}
          </p>
          <p className="font-PlusSan text-[#667085] text-[0.75rem]">
            {moment(order.delivery_date).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end">
        <p className="text-475569 text-base font-bold font-PlusSan">
          ${order.total}
        </p>
        <div className="text-[0.75rem] text-primary-main font-semibold bg-[#ffa6002d] p-2 rounded-md">
          Processing
        </div>
      </div>
    </div>
  );
}

export default function Order() {
  const [activeCategory, setActiveCategory] = useState<"OPEN" | "CLOSED">(
    "OPEN"
  );
  const { axiosClient } = useAuth();
  // const { apiClient, useQuery } = useContext(ApiClientContext);

  const getOrders = () => {
    return axiosClient.get(
      activeCategory === "CLOSED"
        ? "orders/closed/orders"
        : "orders/open/orders"
    );
  };
  const { data, isLoading } = useQuery(
    [queryKeys.GET_ORDERS, activeCategory],
    getOrders
  );

  return (
    <SidebarHOC isBack title="Orders">
      <div className="bg-[#F5F5F5] h-[2.5rem] flex p-1 justify-between">
        <div
          onClick={() => setActiveCategory("OPEN")}
          className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer ${
            activeCategory === "OPEN" ? "bg-white" : "bg-transparent"
          }`}
        >
          Open Orders
        </div>
        <div
          onClick={() => setActiveCategory("CLOSED")}
          className={`flex-1 flex justify-center items-center text-center text-[#081E4B] cursor-pointer  ${
            activeCategory === "CLOSED" ? "bg-white" : "bg-transparent"
          }`}
        >
          Closed orders
        </div>
      </div>

      {!isLoading &&
        (data?.data?.data?.data as [])?.map((order, key) => (
          <SingleListItem key={`order_${key}`} order={order} />
        ))}
      {isLoading &&
        [1, 2, 3, 4, 5].map((_, index) => (
          <Skeleton key={`skeleton_${index}`} className="h-14" />
        ))}

      {!isLoading && !data?.data?.data?.data?.length && (
        <div className="flex justify-center items-center mt-30">
          <img src="/images/no_order.png" />
        </div>
      )}
    </SidebarHOC>
  );
}
