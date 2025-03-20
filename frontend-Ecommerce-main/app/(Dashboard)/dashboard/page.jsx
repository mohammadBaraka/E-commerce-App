"use client";
import Loader from "components/Loader/Loader";
import { useGetTokenQuery } from "lib/apis/authSlice";
import { redirect } from "next/navigation";
import BarCharts from "./components/BarChar";
import BieChart from "./components/BieChart";
import LineCharts from "./components/Line";
import { mainData } from "./utils/MainData";

export default function Dashboard() {
  const {
    data: user,
    isLoading: userLoading,
    isSuccess,
  } = useGetTokenQuery(null);
  const admin = user?.user;
  if (isSuccess && !admin) redirect("login");
  return (
    <>
      {userLoading ? <Loader /> : null}

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-center px-8 ">
          {mainData?.map((item) => {
            return (
              <section
                key={item.id}
                className={`flex justify-between items-center px-3 py-4 gap-8 ${item.bgColor} text-white rounded-3xl`}
              >
                <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                  {item.icons}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-left">{item.title}</span>
                  <p className="text-2xl font-bold">{item.detials}</p>
                </div>
              </section>
            );
          })}
        </div>
        {/*//?CHARTS */}
        <div className="w-full h-[50%] mt-8 px-8">
          <LineCharts />

          <div
            className="mb-20  w-full h-[50%] mt-8 grid grid-cols-1 gap-8 
            xl:grid xl:grid-cols-2   
            md:grid md:grid-cols-1 "
          >
            <BarCharts />
            <BieChart />
          </div>
        </div>
      </div>
    </>
  );
}
