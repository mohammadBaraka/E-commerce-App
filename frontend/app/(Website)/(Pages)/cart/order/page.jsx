"use client";
import styles from "../../register/Register.module.css";
import { CheckBadgeIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useCreateOrderMutation } from "lib/apis/orderSlice";
import { useAppSelector, useAppDispatch } from "lib/hooks";
import { msgSuccess, msgError } from "utils/handleMessage";
import Loader from "components/Loader/Loader";
import { useGetTokenQuery } from "lib/apis/authSlice";
import { clear } from "lib/slices/CartSlise";
import { Button } from "@material-tailwind/react";

const KEY = process.env.NEXT_PUBLIC_REACT_APP_KEY;
export default function Ordering() {
  const dispatch = useAppDispatch();
  const { data: userData, isLoading: loadingData } = useGetTokenQuery();

  const [createOrder, { data, isError, isLoading, isSuccess }] =
    useCreateOrderMutation();
  const carts = useAppSelector((state) => state.cart);
  const totalPrice = carts.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  const orderItems = carts.map((item) => {
    const order = {
      quantity: item?.quantity,
      product: item?.id,
    };
    return order;
  });

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
  const handleSubmit = () => {
    createOrder(inputs).then((res) => {
      if (res?.error?.status === 500)
        return msgError("All Failds Are Reauired");
      dispatch(clear());
      msgSuccess(res?.data?.message || "Ordering Created Success!");
    });
  };

  return (
    <>
      {isLoading || loadingData ? <Loader /> : null}
      {carts.length > 0 ? (
        <section className="flex justify-center items-center p-4 min-h-screen marginGlobal">
          <form className={styles.form} onClick={(e) => e.preventDefault()}>
            <p className={styles.title}>Ordering </p>
            <p className={styles.message}>Cash On Deleviry</p>
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
                <span>phone</span>
              </label>
            </div>

            <StripeCheckout
              name="E-commerce"
              image={"/logo.png"}
              currncy="USD"
              amount={totalPrice * 100}
              stripeKey={KEY}
              token={handleSubmit}
            >
              <button className={`${styles.submit} flex gap-2 items-center`}>
                Pay Now <CreditCardIcon className="w-6 h-6" />
              </button>
            </StripeCheckout>
          </form>
        </section>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 marginGlobal p-5">
          <CheckBadgeIcon className="w-28 h-w-28 text-primary" />
          <div className="text-3xl font-bold text-gray-600">Thank you!</div>
          <div className="font-bold text-xl text-green-500">
            Pyment Has Been Success!
          </div>
          <Link href={"/product"}>
            <Button variant="full">continue shopping</Button>
          </Link>
        </div>
      )}
    </>
  );
}
