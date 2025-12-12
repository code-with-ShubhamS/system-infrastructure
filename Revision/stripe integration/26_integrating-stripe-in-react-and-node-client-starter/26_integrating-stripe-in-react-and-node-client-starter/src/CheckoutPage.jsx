import React, { useCallback } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe("pk_test_51S6vy8Q09QrsnkGJPgNT2h8nWdNS08N1s9RcAYDq4QZ0fZItcLDfd5V9F8RLvKraLmWQnPJWsqKywJgEGqPE9osm00RaaTQwz5");

export const CheckoutForm = () => {
    const { state: payload } = useLocation();
    console.log(payload)
    
  const fetchClientSecret = useCallback(async() => {
    // Create a Checkout Session
    return fetch("http://localhost:4000/create-checkout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => data.url);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
