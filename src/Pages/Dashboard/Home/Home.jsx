import React, { useState } from "react";
import UserStatistics from "./UserStatistics";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import CustomerServiceChart from "./CustomerServiceChart";
import AppDownloadStat from "./AppDownloadStat";
import RevenueAnalysis from "./RevenueAnalysis";
import TinyChart from "./TinyChart";
import { useGetDashboardSummaryQuery } from "../../../redux/apiSlices/dashboardSlice";
import { DashboardStats } from "./DashboardStats";
dayjs.extend(customParseFormat);

const stats = [
  {
    label: "Total User",
    value: "3765",
    percent: +2.6,
    color: "#00a76f",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
  {
    label: "Total Service Provider",
    value: "3765",
    percent: +2.6,
    color: "#00b8d9",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
  {
    label: "Total Revenue",
    value: "3765",
    percent: +2.6,
    color: "#18a0fb",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
  {
    label: "Total Download",
    value: "3765",
    percent: -2.6,
    color: "#ff5630",
    icon: [<IoTrendingUp size={20} />, <IoTrendingDown size={20} />],
  },
];

export const Card = ({ item }) => {
  return (
    <div
      className={`flex w-full items-center justify-evenly h-24 rounded-xl bg-white gap-10 ${item.bg}`}
    >
      <div className="h-[80%] py-1.5 flex flex-col items-start justify-between">
        <p>{item.label}</p>
        <p className="text-[24px] font-bold">{item.value}</p>
        {item.percent > 0 ? (
          <p>
            <span className="text-green-400 flex gap-2">
              {item.icon[0]}% last 7 days
            </span>
          </p>
        ) : (
          <p>
            <span className="text-red-400 flex gap-2">
              {item.icon[1]}% last 7 days
            </span>
          </p>
        )}
      </div>
      <div className="h-[60%] flex items-center justify-end  w-20 ">
        <TinyChart color={item.color} />
      </div>
    </div>
  );
};

const Home = () => {
  const {data: statsData} = useGetDashboardSummaryQuery();

  console.log("statsData",statsData);
  
  return (
    <div className="">
      {/* <div className="flex flex-col flex-wrap items-end gap-5 justify-between w-full bg-transparent rounded-md">
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 w-full">
          {stats.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div> */}

 <div className="flex flex-col flex-wrap items-end gap-5 justify-between w-full bg-transparent rounded-md">
   <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 w-full">
      {/* Card 1: Total Users */}
       <DashboardStats
        label="Total User"
        value={statsData?.totalUsers?.count}
        percent={statsData?.totalUsers?.percentageChange}
        color="#00a76f"
        icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
      /> 

      {/* Card 2: Total Service Providers */}
      <DashboardStats
        label="Total Service Provider"
        value={statsData?.totalServiceProviders?.count}
        percent={statsData?.totalServiceProviders?.percentageChange}
        color="#00b8d9"
        icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
      />

      {/* Card 3: Total Revenue */}
      <DashboardStats
        label="Total Revenue"
        value={statsData?.totalRevenue?.amount}
        percent={statsData?.totalRevenue?.percentageChange}
        color="#18a0fb"
        icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
      />

      {/* Card 4: Total Downloads */}
      {/* <DashboardStats
        label="Total Download"
        value={statsData.totalDownloads.count}
        percent={statsData.totalDownloads.percentageChange}
        color="#ff5630"
        icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
      /> */}
      </div>
    </div>

      <div className="w-full h-[330px]  bg-white rounded-lg mt-4 relative flex flex-col justify-evenly">
        <CustomerServiceChart />
      </div>
      <div className="w-full h-[300px] mt-4 flex items-center justify-between bg-transparent rounded-lg">
        <AppDownloadStat />
        <RevenueAnalysis />
      </div>
    </div>
  );
};

export default Home;
