import React, { useEffect, useState } from "react";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import * as auth0 from "@auth0/auth0-react";
import { Toaster, toast } from "sonner";
import { SYMFONY_API_URL } from "../../env";
import { Ticket } from "../../models/Ticket";
import * as context from "./CartProvider";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";

const Payment: React.FC<{ totalPrice: number }> = ({ totalPrice }) => {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const { t, i18n } = useTranslation(['str']);
  const { tickets, removeTicket, uniqueTickets, delteAllDuplicateTickets, buyTickets, deleteAllTickets } =
    context.useCart();
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    loginWithPopup,
    getAccessTokenSilently,
  } = auth0.useAuth0();

  let token: any = {};
  const fetchData = async () => {
    let options = {
      audience: 'http://localhost/8100',
      scope: 'read:records',
      responseType: 'token',
      algorithm: 'HS256',
      detailedResponse: true
    }
    token = await getAccessTokenSilently(options);
    console.log(token);
  }
  fetchData();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("http://localhost:5252/config");
        const { publishableKey } = await response.json();
        const stripe = await loadStripe(publishableKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error("Error loading Stripe:", error);
      }
    };

    fetchConfig();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("http://localhost:5252/create-payment-intent", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalPrice }),
        });
        const data = await response.json();
        if (response.ok) {
          setClientSecret(data.clientSecret);
          console.log("Client Secret: " + data.clientSecret);
        } else {
          throw new Error(data.error?.message || "Failed to create payment intent");
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (totalPrice > 0) {
      createPaymentIntent();
    }
  }, [totalPrice]);


  async function buyTicketsCart(): Promise<void> {
    // Solo puede comprar 5 entradas para 3 eventos como máximo en cada periodo
    if (tickets.length >= 15) {
      toast.warning(t('logInPage.cart.maxBuy'));
      return;
    }
    async function getUserIdWithRetry(): Promise<string> {
      let userId: string | undefined;
      while (!userId || userId === undefined) {
        await new Promise((resolve) => setTimeout(resolve, 0));
        if (user && user.sub) {
          userId = user.sub.split("|")[1];
        }
      }
      return userId!;
    }

    try {
      const userId = await getUserIdWithRetry();


      if (!userId) {
        toast.error(t('logInPage.cart.toastErrorUserID'));
        console.error(t('logInPage.cart.toastErrorUserID'));
        return;
      }

      const response = await fetch(`${SYMFONY_API_URL}/user/${userId}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prepareTicketsForAPI(tickets, clientSecret)),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const responseData = await response.json();
      console.log(responseData);

      toast.promise(Promise.resolve(responseData), {
        loading: t('logInPage.cart.buyingTickets'),
        success: t('logInPage.cart.buyTicketsSuccess'),
        error: t('logInPage.cart.toastErrorBuyTickets'),
      });

      buyTickets();



      fetch('http://localhost:5252/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: 'Bought Tickets',
          text: generateEmailText(tickets,),
          to: user?.email
        })
      })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));


    } catch (error) {
      toast.error(t('logInPage.cart.toastErrorBuyTickets'));
      console.error(t('logInPage.cart.toastErrorBuyTickets'), error);
    }
  }


  function generateEmailText(tickets: Ticket[]): any {
    const ticketObjects = tickets.map(ticket => {
      return ({
        "type": ticket.type,
        "price": ticket.price,
        "date": ticket?.date?.toLocaleDateString(),
        "sport": ticket?.sport?.name,
        "zone": ticket?.zone?.name,
        "sit": ticket?.sit?.seat
      });
    });
    return ticketObjects;
  }

  const prepareTicketsForAPI = (tickets: Ticket[], transaction: string): APIPostTicket[] => {
    return tickets.map(ticket => ({
        sport_id: ticket.sport?.id?.toString() ?? "0",
        zone_id: ticket.zone?.id?.toString() ?? "0",
        price: ticket.price?.toString() ?? "0",
        date: ticket.date ? formatDateForAPI(new Date(ticket.date)) : "01/01/1970" ,
        transaction: transaction
    }));
  };

const formatDateForAPI = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm buyTicketsCart={buyTicketsCart} clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};

export default Payment;
