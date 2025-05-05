"use client";

import {
  CheckBadgeIcon,
  CreditCardIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

const Cancel = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 marginGlobal p-5">
      <NoSymbolIcon className="w-28 h-28 text-red-400" />
      <div className="text-3xl font-bold text-gray-600">Thank you!</div>
      <div className="font-bold text-xl text-green-500">
        You Are Canceled The Payment
      </div>
      <Link href={"/product"}>
        <Button variant="filled">Shopping</Button>
      </Link>
    </div>
  );
};

export default Cancel;
