// import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useAtom, useAtomValue } from "jotai";
import { ATOMS } from "@/store/atoms";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

const Payment = ({
  close,
  getClientSecret,
}: {
  close: () => void;
  getClientSecret: () => Promise<{ clientSecret: string; returnUrl: string }>;
}) => {
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [paymentLoading, setPaymentLoadng] = useState(false);
  const { amount } = useAtomValue(ATOMS.paymentModal);

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

    await getClientSecret()
      .then(async ({ clientSecret, returnUrl }) => {
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url:
              returnUrl ?? "https://www.eatnourisha.com?show_payment_modal=1",
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
      <div className="w-full flex justify-end">
        <div onClick={close} className="w-fit flex justify-end">
          <Icon color="#000" icon="fluent-mdl2:cancel" className="w-6 h-6" />
        </div>
      </div>
      <PaymentElement />
      <Button
        variant="primary"
        fullWidth
        title={`Pay £${amount}`}
        disabled={!stripe || !elements || paymentLoading}
        onClick={handleSubmitPayment}
      />
    </div>
  );
};

const PaymentModal = ({
  close,
  getClientSecret,
}: {
  close: () => void;
  getClientSecret: () => Promise<{ clientSecret: string; returnUrl: string }>;
}) => {
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [paymentModal, setPaymentModal] = useAtom(ATOMS.paymentModal);
  const router = useRouter();
  const pathname = usePathname();
  const [options, setOptions] = useState<StripeElementsOptions>({});
  useEffect(() => {
    getClientSecret()
      .then(({ clientSecret, returnUrl }) => {
        setOptions({
          clientSecret,
        });
      })
      .catch((e) => {
        setError(e?.response?.data?.message);
        alert(e?.response?.data?.message ?? "Unable to load payment modal");
        setPaymentModal({
          ...paymentModal,
          show: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   if (!paymentModal?.show) {
  //     router.replace(pathname, undefined);
  //   }
  // }, [paymentModal?.show]);

  const stripePromise = loadStripe(process.env.STRIPE_PK_TEST!);
  return loading ? (
    <div className="w-full h-[3rem] flex justify-center items-center  bg-white rounded-md">
      <p className="animate-pulse">Loading...</p>
    </div>
  ) : error ? (
    <div className="w-full h-[3rem] flex justify-center items-center  bg-white rounded-md">
      <p>{error}</p>
    </div>
  ) : (
    <Elements options={options} stripe={stripePromise}>
      <Payment close={close} getClientSecret={getClientSecret} />
    </Elements>
  );
};

export default PaymentModal;
