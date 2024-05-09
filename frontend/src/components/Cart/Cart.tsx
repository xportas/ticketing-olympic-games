import * as auth0 from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { SYMFONY_API_URL } from "../../env";
import { Ticket } from "../../models/Ticket";
import * as context from "./CartProvider";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import Payment from "./Payment";

const Cart: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const {
    loginWithRedirect,
    isAuthenticated,
    user,
    loginWithPopup,
    getAccessTokenSilently,
  } = auth0.useAuth0();
  const { t, i18n } = useTranslation(['str']);
  const { tickets, removeTicket, uniqueTickets, delteAllDuplicateTickets, buyTickets, deleteAllTickets } =
    context.useCart();

  useEffect(() => {
    calculateTotalPrice();
  }, [tickets]);

  function calculateTotalPrice(): void {
    let total = 0;
    tickets.forEach((ticket) => {
      total += ticket.price || 0;
    });
    setTotalPrice(total);
  }

  function deleteTicket(ticket: Ticket): void {
    confirm(t('logInPage.cart.deleteTickets') + `${ticket.type}?`) &&
      delteAllDuplicateTickets(ticket);
  }

  function discountCode(): void {
    const discountCode = document.getElementById("discountCode") as HTMLInputElement;
    const code = discountCode.value;
    if (code === "miguel2024") {
      const discountedPrice = totalPrice * 0.8;
      setTotalPrice(discountedPrice);
      toast.success(t('logInPage.cart.discountAplicado'));
    }
  }

  function buy() {
    buyTickets();
  }

  function dropCart(): void {
    if(tickets.length > 0){
      confirm(t('logInPage.cart.emptyCart')) &&
      deleteAllTickets();
    }
    
  }

  function updateTotal(id: number, totalPrice: number): void {
    return;
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen px-2 text-center select-none">
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-8xl font-extrabold text-red-500">401</h1>
          <p className="text-4xl font-medium text-gray-800">
            {t('logInPage.cart.obligatoryLogIn')}
          </p>
          <p className="text-xl text-gray-800 mt-4">
            {t('logInPage.cart.apologizeLogIn')}
          </p>
          <div className="p-4">
            {/* <LoginButton /> */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => loginWithPopup()}
                className="inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 animate-fade-in-right text-base"
                aria-haspopup="true"
                aria-expanded="false"
                type="button"
              >
                <span className="">{t('logInPage.cart.logIn')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="">
      <div className="h-full mt-4 mb-4">
        <div className=" px-4 w-full">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4 lg:w-3/4 w-full  rounded-lg border-2 h-full">
              <h2 className="text-2xl font-medium pl-6 pt-6 pb-3 border-b-2">
              {t('logInPage.cart.cart')} {tickets.length > 0 ? `(${tickets.length})` : ""}
              </h2>
              <div className="bg-white p-6 mb-4 overflow-y-auto h-auto scroll-smooth">
                {tickets.length === 0 && (
                  <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    {t('logInPage.cart.emptyCart2')}
                  </div>
                )}
                {uniqueTickets.map((ticket) => (
                  <div key={ticket.id} className="relative ">
                    <button
                      onClick={() => deleteTicket(ticket)}
                      className="absolute right-0 top-0 m-0 flex items-center justify-center w-6 h-6 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:bg-red-600"
                    >
                      <svg
                        className="w-4 h-4 text-white dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <ProductCard ticket={ticket} updateTotal={updateTotal} />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/4 lg:w-1/4  w-full">
              <div className="bg-white rounded-lg border-2 p-6 relative">
                <h2 className="text-2xl font-medium mb-4">
                {t('logInPage.cart.payConfirm')}
                </h2>
                <button
                  onClick={dropCart}
                  className="absolute right-3 top-3 m-0 flex items-center justify-center w-6 h-6 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:bg-red-600"
                >
                  <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                  </svg>

                </button>

                {tickets.length === 0 && (
                  <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    {t('logInPage.cart.noTicketsInCart')}
                  </div>
                )}

                {uniqueTickets.map((ticket) => (
                  <div key={ticket.id}>
                    {tickets.filter((t) => t.id === ticket.id).length > 1 ? (
                      <div className="flex justify-between mb-4">
                        <p className="text-lg">
                          {ticket.type}
                          <span className="text-sm text-gray-700 ml-2">
                            x{tickets.filter((t) => t.type === ticket.type).length}
                          </span>
                        </p>
                        <p className="text-lg">
                          {ticket.price !== null
                            ? ticket.price *
                            tickets.filter((t) => t.type === ticket.type).length
                            : 0}{" "}
                          €
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-between mb-4">
                        <p className="text-lg">{ticket.type}</p>
                        <p className="text-lg">
                          {ticket.price !== null ? ticket.price : 0} €
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                <hr className="mb-4"></hr>

                <div className="flex justify-between">
                  <p className="text-lg">{t('logInPage.cart.subtotal')}</p>
                  <p className="text-lg">{totalPrice} €</p>
                </div>
                <div className="flex justify-between mb-4 text-gray-500">
                  <p className="text-sm">{t('logInPage.cart.iva')}</p>
                  <p className="text-sm truncate">
                    {(totalPrice * 0.21).toPrecision(3)} €
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">{t('logInPage.cart.total')}</p>
                  <p className="text-lg font-bold">
                    {totalPrice + totalPrice * 0.21} €
                  </p>
                </div>

                <hr className="mb-4"></hr>
                <p className="text-base">{t('logInPage.cart.discount')}</p>

                <input
                  id="discountCode"
                  onInput={discountCode}
                  type="text"
                  placeholder="Código de descuento"
                  className="w-full border-2 rounded-lg p-2 mb-4"
                ></input>

                <Payment totalPrice={totalPrice} />
               

                <hr className="m-2"></hr>
                <div className="flex items-center p-2">
                  <i className="fa-solid fa-lock mr-2"></i>
                  <p className=" font-medium text-base"> {t('logInPage.cart.securePays')}</p>
                </div>
                <div className="flex  p-2">
                  <p className="text-gray-500 font-medium text-sm">
                  {t('logInPage.cart.secureData')}
                  </p>
                </div>
                <div className="flex  p-2">
                  <p className="text-gray-500 font-medium text-sm">
                  {t('logInPage.cart.click')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Cart;
