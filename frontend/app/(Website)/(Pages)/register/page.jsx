"use client";
import Image from "next/image";
import styles from "./Register.module.css";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "lib/apis/authSlice";
import { msgError, msgSuccess } from "utils/handleMessage";
import Loader from "components/Loader/Loader";
export default function Register() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    password: "",
    street: "",
    zip: "",
    phone: 0,
    city: "",
    country: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(inputs).then((res) => {
      if (res?.error?.status === 400) {
        return msgError(res?.error?.data.message || "Something went wrong");
      }
      msgSuccess(res?.data?.message || "register successfully");
      router.push("/login");
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section
        className="flex justify-center items-center m-auto w-[100%] px-4 marginGlobal
         xl:grid xl:grid-cols-2 xl:w-[90%] min-h-screen pb-8"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>Register </p>
          <p className={styles.message}>
            Signup now and get full access to our app.
          </p>
          <label>
            <input
              className={styles.input}
              type="text"
              placeholder=""
              name="name"
              onChange={handleChange}
            />
            <span>Name</span>
          </label>

          <label>
            <input
              className={styles.input}
              type="email"
              placeholder=""
              name="email"
              onChange={handleChange}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className={styles.input}
              type="password"
              placeholder=""
              name="password"
              onChange={handleChange}
            />
            <span>Password</span>
          </label>

          <div className={styles.flex}>
            <label>
              <input
                className={styles.input}
                type="text"
                placeholder=""
                name="street"
                onChange={handleChange}
              />
              <span>Street</span>
            </label>

            <label>
              <input
                className={styles.input}
                type="text"
                placeholder=""
                name="zip"
                onChange={handleChange}
              />
              <span>Zib</span>
            </label>
          </div>
          <label>
            <input
              className={styles.input}
              required
              type="number"
              placeholder=""
              name="phone"
              onChange={handleChange}
            />
            <span>Phone Number</span>
          </label>

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
                name="country"
                onChange={handleChange}
              />
              <span>Country</span>
            </label>
          </div>
          <button className={styles.submit}>Submit</button>
          <p className={styles.signin}>
            Already have an acount ? <Link href="/login">Signin</Link>{" "}
          </p>
        </form>
        <div className="hidden xl:flex">
          <Image src={"/signup.svg"} alt="signup" width={800} height={800} />
        </div>
      </section>
    </>
  );
}
