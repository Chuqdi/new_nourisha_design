"use client";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "@/components/ui/Button";
//@ts-ignore
import HTMLRenderer from "react-html-renderer";
import SidebarHOC from "@/HOC/SidebarHOC";
import useAuth from "@/hooks/useAuth";
import queryKeys from "@/config/queryKeys";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { IPlan } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import Input from "@/components/ui/Input";

const SingleSubscription = ({
  plan,
  activePlan,
}: {
  activePlan?: IPlan;
  plan: IPlan;
}) => {
  const { getAxiosClient } = useAuth();
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);
  const searchParams = useSearchParams();
  const btnRef = useRef<HTMLButtonElement>(null!);
  const [isSelected, setSelected] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [ searchParamQuery, setSearchParamQuery] = useState("");

  const gradientColors = [
    "linear-gradient(181deg, #7DB83A 0.55%, #FEF761 99.53%)",
  ];
  const textColors = ["#9572F9", "#9572F9", "#9572F9"];

  useEffect(() => {
    const selectedPlan = searchParams.get("plan_id");
    if (searchParams.get("plan_id")) {
      if (selectedPlan && searchParams.get("plan_id")?.includes(plan?._id)) {
        setSelected(true);
      }
    }
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setSearchParamQuery(urlParams.toString())
  }, []);

  return (
    <div
      className="p-3 rounded-[0.75rem] border"
      style={{
        background: isSelected
          ? gradientColors[Math.floor(Math.random() * gradientColors.length)]
          : undefined,
      }}
    >
      <div className="bg-white p-3 rounded-[0.75rem]">
        <h3 className="text-black-900 font-inter text-[2.5rem] tracking-[-0.1rem] font-bold">
          £{plan.amount}
        </h3>
        <div className="flex items-center gap-2 justify-between">
          <p
            className="text-[2rem] font-NewSpiritBold"
            style={{
              color: textColors[Math.floor(Math.random() * textColors.length)],
            }}
          >
            {plan.name}
          </p>
          {isSelected && (
            <div className="bg-[#E6FEF2] rounded-[0.375rem] py-0 px-2 flex justify-center items-center h-8 text-primary-Green-900">
              Selected
            </div>
          )}
        </div>
        <div className="w-4/5">
          <HTMLRenderer html={plan?.description} />
        </div>

        <div className="w-full mt-3">
          <label>Do you have a coupon code?</label>
          <Input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
          />
        </div>

        <Button
          variant="primary"
          fullWidth
          ref={btnRef}
          id={`subscription_click_btn_${plan?._id}`}
          className="py-6 h-[2.75rem] mt-3"
          title={activePlan?._id === plan?._id ? "Active" : "Subscribe"}
          disabled={activePlan?._id === plan?._id}
          onClick={() => {
            setSideModal({
              ...sideModal,
              show: false,
            });
            setPaymentModal({
              show: true,
              amount: plan?.amount!,
              onContinue: async () => {
                let return_url,
                  clientSecret = "";
                let data = {
                  plan_id: plan?._id,
                  coupon,
                };
                const id = localStorage.getItem(DEVICE_ID);
                const axiosClient = getAxiosClient(id!);
                await axiosClient
                  .post("billings/subscribe", data)
                  .then(async (response) => {
                    return_url = `https://www.eatnourisha.com/food_box?${searchParamQuery}`;
                    clientSecret = response?.data?.data?.client_secret;
                  });

                return {
                  clientSecret,
                  returnUrl: `https://www.eatnourisha.com/food_box?${searchParamQuery}&show_payment_modal=1`,
                };
              },
             
            });
          }}
        />
        <p className="text-black-900 text-sm text-center font-inter my-4">
          + £8 For weekend deliveries
        </p>
      </div>
    </div>
  );
};

export default function Subscription() {
  const { getAxiosClient } = useAuth();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [activePlan, setActivePlan] = useState<IPlan>();
  const searchParams = useSearchParams();
  const searchContinent = searchParams?.get("search_continent");
  const searchPlan = searchParams?.get("plan");
  const getSubscrptionList = () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get(
      `plans?continent=${searchContinent === "Asian" ? "Asian" : "African"}`
    );
  };

  //weekend = false

  const { data, isLoading } = useQuery(
    queryKeys.GET_BILLING_PLANS,
    getSubscrptionList
  );

  const getActiveSubscriptionDetails = () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get("subscriptions/me");
  };

  const { data: SubscriptionDetails, isLoading: LoadingSubscriptionDetails } =
    useQuery("GET_ACTIVE_SUBSCRIPTION_DETAILS", getActiveSubscriptionDetails);

  useEffect(() => {
    if (SubscriptionDetails?.data?.data) {
      setActivePlan(SubscriptionDetails?.data?.data);
    }
  }, [SubscriptionDetails]);

  function filterById(items: IPlan[], id?: string | null) {
    if (!id) {
      return items;
    }

    if (!!items?.filter((item) => item._id === id)?.length) {
      return items?.filter((item) => item._id === id);
    }

    return items;

    // const itemIndex = items.findIndex((item) => item._id === id);
    // if (itemIndex === -1) {
    //   return items;
    // }

    // const [selectedItem] = items.splice(itemIndex, 1);
    // return [selectedItem, ...items];
  }

  useEffect(() => {
    if (data?.data?.data?.data) {
      const selectedPlan = searchParams.get("plan_id");
      setPlans(filterById(data?.data?.data?.data as IPlan[], selectedPlan));
    }
  }, [data?.data?.data]);

  return (
    <SidebarHOC isBack title="Subscriptions">
      {LoadingSubscriptionDetails && (
        <p className="text-sm text-center font-inter">
          Loading subscriptions...
        </p>
      )}
      <div className="w-full grid grid-cols-1 gap-4">
        {plans.map((plan: IPlan, index: number) => (
          <SingleSubscription
            activePlan={activePlan}
            key={`plan_${index}`}
            plan={plan}
          />
        ))}
      </div>
    </SidebarHOC>
  );
}
