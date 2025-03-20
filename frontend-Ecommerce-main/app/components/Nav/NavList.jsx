"use client";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { List, ListItem } from "@material-tailwind/react";
import { useGetTokenQuery } from "lib/apis/authSlice";
import { useAppSelector } from "lib/hooks";
import Link from "next/link";

export default function NavList() {
  const { data } = useGetTokenQuery(null);
  const cart = useAppSelector((state) => state.cart);

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link href="/">
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium">
          Home
        </ListItem>
      </Link>

      <Link href="/">
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium">
          About Us
        </ListItem>
      </Link>
      <Link href="/">
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium">
          Servises
        </ListItem>
      </Link>

      <Link href="/product">
        <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium">
          Products
        </ListItem>
      </Link>
      <Link href="/cart">
        {cart?.length > 0 && !data?.user && (
          <ListItem className="flex items-center gap-2 py-2 pr-4 font-medium relative">
            <BellAlertIcon className="h-[25px] w-[25px] text-blue-500" />
            <span className="absolute top-0 right-0 text-xs font-bold leading-none text-white p-1 bg-teal-400 rounded-full">
              {cart.length}
            </span>
          </ListItem>
        )}
      </Link>
    </List>
  );
}
