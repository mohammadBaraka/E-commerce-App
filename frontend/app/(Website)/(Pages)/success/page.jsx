"use client";
import { useCreateOrderMutation } from "lib/apis/orderSlice";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { msgError, msgSuccess } from "utils/handleMessage";
import { clear } from "lib/slices/CartSlise";
import { useAppDispatch } from "lib/hooks";
import ProcessingLoader from "components/ProcessingLoader/ProcessingLoader";

const Success = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();

  const hasOrdered = useRef(false);

  useEffect(() => {
    if (hasOrdered.current) return;

    const alreadyOrdered = localStorage.getItem("orderCreated");
    if (alreadyOrdered === "true") return;

    const data = localStorage.getItem("orderData");
    if (!data) return msgError("Missing order data.");

    const inputs = JSON.parse(data);

    hasOrdered.current = true;

    createOrder(inputs).then((res) => {
      if (res?.error?.status === 500) {
        return msgError("Something went wrong when creating the order.");
      }

      dispatch(clear());
      localStorage.setItem("orderCreated", "true");
      msgSuccess(res?.data?.message || "Order Created Successfully!");
      router.push("/payment-success");
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2 marginGlobal p-5">
      <div className="font-bold text-xl text-green-500 flex gap-4 items-center">
        <h2>Processing your order!</h2>
        <ProcessingLoader />
      </div>
    </div>
  );
};

export default Success;
