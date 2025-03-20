"use client";
import * as React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useGetOrderQuery } from "lib/apis/orderSlice";
export default function Orders() {
  const { data: orders, isLoading } = useGetOrderQuery(null);
  console.log("🚀 ~ Orders ~ orders:", orders?.data);

  const [productDeatails, setProductDetails] = React.useState(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div
          className={`w-[30%] h-[30%] bg-primary text-white fixed  ${
            productDeatails ? "-mt-[0%]" : "-mt-[100%]"
          } transition-all  duration-1000 z-40`}
        >
          <h3>Inputs Details</h3>
          <XCircleIcon
            className="w-9 h-w-9 absolute top-0 right-0 cursor-pointer"
            onClick={() => setProductDetails(false)}
          />
        </div>

        <Button onClick={() => setProductDetails(true)}>Click</Button>
        <section className="px-8 bg-blueGray-50 ">
          <div className="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      Your Cart
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </div>
                </div>
              </div>

              <table className="items-center bg-transparent w-full border-collapse text-2xl ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ID
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Brand
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Price
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders?.data?.map((order, index) => {
                    return (
                      <tr key={order?.id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.user?.name ? (
                            order.user.name
                          ) : (
                            <div>
                              <p className="text-red-500">Not Found</p>
                            </div>
                          )}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.country}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.city}
                        </th>

                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.phone}
                        </th>

                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.shippingAddress1}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.shippingAddress2}
                        </th>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left text-blueGray-700">
                          {order?.status}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
