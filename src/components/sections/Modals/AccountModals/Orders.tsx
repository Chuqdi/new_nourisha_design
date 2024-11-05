import queryKeys from "@/config/queryKeys";
import { IMeal, IOrder } from "@/config/types";
import SidebarHOC from "@/HOC/SidebarHOC";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "react-query";

function SingleListItem({ order }: { order: IOrder }) {
  const [showDetails, setShowDetails] = useState(false);
  const [meal, setMeal] = useState<IMeal | null>(null);
  const { getAxiosClient } = useAuth();
  const isProcessing = useMemo(()=> order?.status === "processing", []);
  const itemsCount = useMemo(()=> order?.orderExtras?.length, [])

  const getMealItem = () => {
    const deviceID = window.localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(deviceID!);
    return axiosClient.get(
      `meals/pack/${order?.orderExtras[order?.orderExtras?.length - 1]?.item}`
    );
  };
  const { data, isLoading, } = useQuery(["SINGLE_MEAL"], getMealItem);


  useEffect(() => {
    if (data?.data?.data) {
      setMeal(data.data.data);
    }
  }, [data]);
  return (
    <div
      onClick={() => setShowDetails(true)}
      className="cursor-pointer flex items-center justify-between"
    >
      {(isLoading || !meal?._id) && (
        <div className="w-full flex justify-center items-center">
          <Icon color="#000000ac" className="w-6 h-6" icon="eos-icons:loading" />
        </div>
      )}
      {!isLoading && !!meal?._id && (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`${meal?.image_url}`}
              className="w-14 h-14 object-cover rounded-lg"
            />
            <div>
              <p className="text-303237 font-PlusSan text-sm">
                {/* {order?.items?.map((item, key) => (
                  <span key={key}>
                    {`${order?.orderExtras?.length}`}
                    {key !== order.items.length - 1 && ","}
                  </span>
                ))} */}

                {
                  !!itemsCount && `${itemsCount} item${!!(itemsCount>1)?'s':""}`}
                
              </p>
              <p className="font-PlusSan text-[#667085] text-[0.75rem]">
                {moment(order?.delivery_date).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <p className="text-475569 text-base font-bold font-PlusSan">
              ${order.total}
            </p>
            <div className={`text-[0.75rem]  font-semibold  p-2 rounded-md ${isProcessing?'bg-[#ffa6002d] text-primary-main':'bg-[#1b881b] text-white'}`}>
              {
                isProcessing
                ?
                "Processing"
                :
                "Payment recieved"
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Order() {
  const [activeCategory, setActiveCategory] = useState<"OPEN" | "CLOSED">(
    "OPEN"
  );
  const { getAxiosClient } = useAuth();

  // const { apiClient, useQuery } = useContext(ApiClientContext);

  const getOrders = () => {
    const deviceID = window.localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(deviceID!);

    return axiosClient.get(
      activeCategory === "CLOSED"
        ? "orders/closed/orders"
        : "orders/open/orders"
    );
  };
  const { data, isLoading, refetch } = useQuery(
    [queryKeys.GET_ORDERS, activeCategory],
    getOrders,
    { enabled: false }
  );

  useEffect(() => {
    if (window && window.localStorage && localStorage) {
      refetch();
    }
  }, []);

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
        (data?.data?.data as [])?.map((order, key) => (
          <SingleListItem key={`order_${key}`} order={order} />
        ))}
      {isLoading &&
        [1, 2, 3, 4, 5].map((_, index) => (
          <Skeleton key={`skeleton_${index}`} className="h-14" />
        ))}

      {!isLoading && !data?.data?.data?.length && (
        <div className="flex justify-center items-center mt-30">
          <img src="/images/no_order.png" />
        </div>
      )}
    </SidebarHOC>
  );
}
