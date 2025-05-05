"use client";
import styles from "../../register/Register.module.css";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import { useCreateOrderMutation } from "lib/apis/orderSlice";
import { useAppSelector, useAppDispatch } from "lib/hooks";
import { msgError } from "utils/handleMessage";
import Loader from "components/Loader/Loader";
import { useGetTokenQuery } from "lib/apis/authSlice";
import { mainUrl } from "utils/mainUrl";

export default function Ordering() {
  const { data: userData, isLoading: loadingData } = useGetTokenQuery();

  const carts = useAppSelector((state) => state.cart);

  const totalPrice = carts.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const orderItems = carts.map((item) => ({
    quantity: item?.quantity,
    product: item?.id,
  }));

  const [inputs, setInputs] = React.useState({
    orderItems,
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    user: userData?.userId,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async () => {
    if (
      !inputs.shippingAddress1 ||
      !inputs.city ||
      !inputs.zip ||
      !inputs.country ||
      !inputs.phone
    ) {
      return msgError("All fields are required.");
    }

    try {
      const res = await fetch(`${mainUrl}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: carts, totalPrice }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        localStorage.setItem("orderData", JSON.stringify(inputs));
      } else {
        msgError("Something went wrong during payment processing.");
      }
    } catch (err) {
      msgError("Payment failed. Please try again.");
    }
  };

  return (
    <>
      {loadingData ? <Loader /> : null}
      {carts.length > 0 && (
        <section className="flex justify-center items-center p-4 min-h-screen marginGlobal">
          <form className={styles.form} onClick={(e) => e.preventDefault()}>
            <p className={styles.title}>Ordering</p>
            <p className={styles.message}>Cash On Delivery</p>
            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="shippingAddress1"
                  onChange={handleChange}
                />
                <span>Shipping Address 1</span>
              </label>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="shippingAddress2"
                  onChange={handleChange}
                />
                <span>Shipping Address 2</span>
              </label>
            </div>
            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="city"
                  onChange={handleChange}
                />
                <span>City</span>
              </label>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="zip"
                  onChange={handleChange}
                />
                <span>Zip Code</span>
              </label>
            </div>
            <div className={styles.flex}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder=""
                  name="country"
                  onChange={handleChange}
                />
                <span>Country</span>
              </label>
              <label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder=""
                  name="phone"
                  onChange={handleChange}
                />
                <span>Phone</span>
              </label>
            </div>

            <button
              onClick={handlePayment}
              className={`${styles.submit} flex gap-2 items-center`}
            >
              Pay Now <CreditCardIcon className="w-6 h-6" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
