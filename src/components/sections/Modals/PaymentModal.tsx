import Button from "@/components/ui/Button";
import { toast } from "@/components/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useAtomValue } from "jotai";
import { ATOMS } from "@/store/atoms";

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
  const { amount } = useAtomValue(ATOMS.paymentModal)

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
            return_url: returnUrl,
          },
        });

        console.log(error);
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
  const { amount } = useAtomValue(ATOMS.paymentModal)
  const [options, _] = useState<StripeElementsOptions>({
    mode: "subscription",
    amount: Math.round(amount),
    currency: "gbp",
    appearance: {},
    setup_future_usage: "on_session",
  });
  const stripePromise = loadStripe(process.env.STRIPE_PK_TEST!);
  return (
    <Elements stripe={stripePromise} options={options}>
      <Payment close={close} getClientSecret={getClientSecret} />
    </Elements>
  );
};

export default PaymentModal;
