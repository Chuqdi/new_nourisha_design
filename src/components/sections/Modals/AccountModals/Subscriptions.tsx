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
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IPlan } from "@/config/types";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "@/ui/use-toast";
import Modal from "@/components/ui/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";

const PaymentModal = ({ plan, close }: { plan: IPlan; close: () => void }) => {
  const elements = useElements();
  const stripe = useStripe();
  const { axiosClient } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [paymentLoading, setPaymentLoadng] = useState(false);

  const handleSubmitPayment = async () => {
    if (elements == null || stripe == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    setPaymentLoadng(true);
    let data = {
      plan_id: plan?._id,
    };

    await axiosClient
      .post("billings/subscribe", data)
      .then(async (response) => {
        const return_url = "https://www.jobofa.com";
        const clientSecret = response?.data?.data?.client_secret;

        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url,
          },
        });
        toast({
          variant: "default",
          title: "Payment Successful",
          description: "You have successfully subscribed",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Request could not be completed",
        });
      });
    setPaymentLoadng(false);
  };
  return (
    <div className="bg-white p-4 rounded flex flex-col gap-3">
      <button onClick={close} className="w-full flex justify-end">
        <Icon color="#000" icon="fluent-mdl2:cancel" className="w-6 h-6" />
      </button>
      <PaymentElement />
      <Button
        variant="primary"
        fullWidth
        title="Subscribe"
        disabled={!stripe || !elements || paymentLoading}
        onClick={handleSubmitPayment}
      />
    </div>
  );
};

const Checkout = ({
  plan,
  activePlan,
}: {
  activePlan?: IPlan;
  plan: IPlan;
}) => {
  const gradientColors = [
    "linear-gradient(208deg, #E2D8FD 16.32%, #E2D8FD 105.01%)",
    "linear-gradient(208deg, #FE7E00 16.32%, #FE0000 105.01%)",
    "linear-gradient(181deg, #7DB83A 0.55%, #FEF761 99.53%)",
  ];
  const textColors = ["#9572F9", "#9572F9", "#9572F9"];
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
        <div className="flex items-center gap-2">
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

        {/* <div className="mt-2 gap-3 flex flex-col my-6">
  {pricing.options.map((p, i) => (
    <div
      className="flex items-center gap-3"
      key={`pricing_option_${i}`}
    >
      <div className="w-[1.13638rem] h-[1.13638rem] rounded-full border-[1px] border-[#04A76C] flex justify-center items-center">
        <Icon color="#04A76C" icon="bi:check" />
      </div>
      <p>{p}</p>
    </div>
  ))}
</div> */}

        <Button
          variant="primary"
          fullWidth
          title={activePlan?._id === plan?._id ? "Active" : "Subscribe"}
          disabled={activePlan?._id === plan?._id}
          onClick={() => setShowPaymentModal(true)}
        />
        <p className="text-black-900 text-sm text-center font-inter my-4">
          + £10 For deliveries during the week
        </p>
        <p className="text-black-900 text-sm text-center font-inter my-4">
          + £18 For weekend deliveries
        </p>
      </div>

      <Modal show={showPaymentModal}>
        <PaymentModal close={() => setShowPaymentModal(false)} plan={plan} />
      </Modal>
    </div>
  );
};

const SingleSubscription = ({
  plan,
  activePlan,
}: {
  activePlan?: IPlan;
  plan: IPlan;
}) => {
  const [options, setOptions] = useState({
    mode: "subscription",
    amount: Math.round(plan.amount!),
    currency: "gbp",
    appearance: {},
    setup_future_usage: "off_session",
  });
  const stripePromise = loadStripe(process.env.STRIPE_PK_TEST!);
  return (
    //@ts-ignore
    <Elements stripe={stripePromise} options={options}>
      <Checkout activePlan={activePlan} plan={plan} />
    </Elements>
  );
};

export default function Subscription() {
  const { axiosClient } = useAuth();

  const [activePlan, setActivePlan] = useState<IPlan>();
  const getSubscrptionList = () => {
    return axiosClient.get("plans");
  };

  const { data, isLoading } = useQuery(
    queryKeys.GET_BILLING_PLANS,
    getSubscrptionList
  );

  const getActiveSubscriptionDetails = () => {
    return axiosClient.get("subscriptions/me");
  };

  const {
    data: SubscriptionDetails,
    isLoading: LoadingSubscriptionDetails,
  } = useQuery("GET_ACTIVE_SUBSCRIPTION_DETAILS", getActiveSubscriptionDetails);

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
