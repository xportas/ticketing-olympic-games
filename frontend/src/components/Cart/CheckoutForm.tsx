import React, { useState, FormEvent } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface CheckoutFormProps {
    buyTicketsCart: () => Promise<void>;
    clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ buyTicketsCart, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.");
      return;
    }
  
    setIsProcessing(true);
  
    try {
      await buyTicketsCart();
  
      stripe.confirmPayment({
        elements,
        confirmParams: {
          },
        redirect: 'if_required'
    });
  
    } catch (error) {
      console.error("Error processing the payment:", error);
      setMessage("An unexpected error occurred while buying tickets.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={isProcessing || !stripe || !elements} className="mt-4 inline-flex bg-slate-50 font-medium w-full ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300">
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;
