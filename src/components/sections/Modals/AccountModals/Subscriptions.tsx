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
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPlan } from "@/config/types";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "@/ui/use-toast";
import Modal from "@/components/ui/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import PaymentModal from "../PaymentModal";
import { ATOMS } from "@/store/atoms";
import { useAtom, useSetAtom } from "jotai";

const SingleSubscription = ({
  plan,
  activePlan,
}: {
  activePlan?: IPlan;
  plan: IPlan;
}) => {
  const { axiosClient } = useAuth();
  const setPaymentModal = useSetAtom(ATOMS.paymentModal);
  const [sideModal, setSideModal] = useAtom(ATOMS.showSideModal);

  const gradientColors = [
    "linear-gradient(208deg, #E2D8FD 16.32%, #E2D8FD 105.01%)",
    "linear-gradient(208deg, #FE7E00 16.32%, #FE0000 105.01%)",
    "linear-gradient(181deg, #7DB83A 0.55%, #FEF761 99.53%)",
  ];
  const textColors = ["#9572F9", "#9572F9", "#9572F9"];

  return (
    <div
      className="p-3 rounded-[0.75rem]"
      style={{
        background:
          gradientColors[Math.floor(Math.random() * gradientColors.length)],
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
          <div className="bg-[#E6FEF2] rounded-[0.375rem] py-0 px-2 flex justify-center items-center h-8 text-primary-Green-900">
            {plan.subscription_interval}ly
          </div>
        </div>
        <div className="w-4/5">
          <HTMLRenderer html={plan?.description} />
        </div>

        <Button
          variant="primary"
          fullWidth
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
                };
                await axiosClient
                  .post("billings/subscribe", data)
                  .then(async (response) => {
                    return_url = "https://www.jobofa.com";
                    clientSecret = response?.data?.data?.client_secret;
                  });

                return {
                  clientSecret,
                  returnUrl: "https://jobofa.com/text",
                };
              },
            });
          }}
        />
        <p className="text-black-900 text-sm text-center font-inter my-4">
          + £10 For deliveries during the week
        </p>
        <p className="text-black-900 text-sm text-center font-inter my-4">
          + £18 For weekend deliveries
        </p>
      </div>
    </div>
  );
};

export default function Subscription() {
  const { axiosClient } = useAuth();

  const [activePlan, setActivePlan] = useState<IPlan>();
  const getSubscrptionList = () => {
    return axiosClient.get("plans?country=nigeria");
  };

  const { data, isLoading } = useQuery(
    queryKeys.GET_BILLING_PLANS,
    getSubscrptionList
  );

  const getActiveSubscriptionDetails = () => {
    return axiosClient.get("subscriptions/me");
  };

  const { data: SubscriptionDetails, isLoading: LoadingSubscriptionDetails } =
    useQuery("GET_ACTIVE_SUBSCRIPTION_DETAILS", getActiveSubscriptionDetails);

  useEffect(() => {
    if (SubscriptionDetails?.data?.data) {
      setActivePlan(SubscriptionDetails?.data?.data);
    }
  }, [SubscriptionDetails]);

  return (
    <SidebarHOC isBack title="Subscriptions">
      {LoadingSubscriptionDetails && (
        <p className="text-sm text-center font-inter">
          Loading subscriptions...
        </p>
      )}
      <div className="w-full grid grid-cols-1 gap-4">
        {data?.data?.data?.data?.map((plan: IPlan, index: number) => (
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
