import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormatter from "../../components/Product/Currency/CurrencyFormatter";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utils/action.type";
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const handleChange = (e) => {
    e?.error?.message ? setError(e?.error?.message) : setError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      //1. contact the backend to get the client secret
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //2. client side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      dispatch({ type: Type.EMPTY_USER });
      navigate("/order", { state: { msg: "you have placed new order" } });
      setProcessing(false);
    } catch (err) {
      console.log(err);
      setProcessing(false);
    }
  };

  return (
    <>
      <div className={classes.payment__header}>
        {/* Header */}
        Checkout ({totalItem}) items
      </div>
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address </h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* Product Review */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* Card Form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card}>
            <form onSubmit={handlePayment}>
              {/* check if card is valid */}
              {error && (
                <small
                  style={{
                    color: "red",
                  }}
                >
                  {error}
                </small>
              )}
              {/* card element */}
              <CardElement onChange={handleChange} />
              {/* price */}
              <div className={classes.payment__price}>
                <span style={{ display: "flex", gap: "7px" }}>
                  <p> Total Order | </p>
                  <CurrencyFormatter amount={total} />
                </span>

                <button type="submit">
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12} />
                      <p>please wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
