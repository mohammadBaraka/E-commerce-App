"use client";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    localStorage.removeItem("orderData");
    localStorage.removeItem("orderCreated");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2 marginGlobal p-5">
      <CheckBadgeIcon className="w-28 h-28 text-primary" />
      <div className="text-3xl font-bold text-gray-600">Thank you!</div>
      <div className="font-bold text-xl text-green-500">
        Payment Has Been Successful!
      </div>
      <Link href={"/product"}>
        <Button variant="filled">Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
