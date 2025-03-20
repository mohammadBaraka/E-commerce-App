"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeModernIcon,
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  BookOpenIcon,
  ServerIcon,
} from "@heroicons/react/24/solid";
import { useGetTokenQuery } from "lib/apis/authSlice";
export default function Nav() {
  const activeLink = "bg-gray-300";
  const path = usePathname();
  const { data: user, isLoading } = useGetTokenQuery(null);

  return (
    <div className="flex flex-col gap-5 gb-red-500 fixed shadow-xl min-h-screen w-[15%] left-0 top-0">
      <h2 className="text-sm py-2 font-bold text-white bg-teal-500   xl:text-2xl text-center ">
        Dashboard
      </h2>
      <ul className="flex flex-col pl-4 gap-7 mt-4">
        <Link
          href="/dashboard"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl  ${
            path === "/dashboard" && activeLink
          }`}
        >
          <div className="flex justify-between items-center">
            <HomeModernIcon className="w-10 h-10" />
            <li className="hidden xl:flex pr-4">Dashboard</li>
          </div>
        </Link>
        <Link
          href="/dashboard/add-product"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            path === "/dashboard/add-product" && activeLink
          }`}
        >
          <div className="flex justify-between items-center">
            <AdjustmentsHorizontalIcon className="w-10 h-10" />

            <li className="hidden xl:flex pr-4">Add Product</li>
          </div>
        </Link>

        <Link
          href="/dashboard/add-category"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            path === "/dashboard/add-category" && activeLink
          }`}
        >
          <div className="flex justify-between items-center">
            <ArchiveBoxIcon className="w-10 h-10" />

            <li className="hidden xl:flex pr-4">Add Category</li>
          </div>
        </Link>

        <Link
          href="/dashboard/orders"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            path === "/dashboard/orders" && activeLink
          }`}
        >
          <div className="flex justify-between items-center">
            <BookOpenIcon className="w-10 h-10" />

            <li className="hidden xl:flex pr-4">Orders</li>
          </div>
        </Link>

        <Link
          href="/dashboard/setting"
          className={` pl-3 py-2 text-xl font-bold rounded-l-xl ${
            path === "/dashboard/setting" && activeLink
          }`}
        >
          <div className="flex justify-between items-center">
            <ServerIcon className="w-10 h-10" />

            <li className="hidden xl:flex pr-4">Settings</li>
          </div>
        </Link>
      </ul>
    </div>
  );
}
