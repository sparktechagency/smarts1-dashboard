import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { MdOutlineDateRange } from "react-icons/md";
import { DatePicker } from "antd";
import PickDate from "../../../components/common/PickDate";
import { useGetRevenueAnalyticsQuery } from "../../../redux/apiSlices/dashboardSlice";

function generateRandomData() {
  return [
    { name: "Jan", pv: getRandomPv(), amt: 2400 },
    { name: "Feb", pv: getRandomPv(), amt: 2210 },
    { name: "Mar", pv: getRandomPv(), amt: 2290 },
    { name: "Apr", pv: getRandomPv(), amt: 2000 },
    { name: "May", pv: getRandomPv(), amt: 2181 },
    { name: "Jun", pv: getRandomPv(), amt: 2500 },
    { name: "Jul", pv: getRandomPv(), amt: 2100 },
    { name: "Aug", pv: getRandomPv(), amt: 2600 },
    { name: "Sep", pv: getRandomPv(), amt: 2700 },
    { name: "Oct", pv: getRandomPv(), amt: 2800 },
    { name: "Nov", pv: getRandomPv(), amt: 3000 },
    { name: "Dec", pv: getRandomPv(), amt: 3200 },
  ];
}

function getRandomPv() {
  return Math.floor(Math.random() * (10000 - 2000) + 2000);
}

const data = generateRandomData();


const initialYear = new Date().getFullYear();

export default function RevenueAnalysis() {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [year, setYear] = useState(initialYear);

  const { data: revenueData } = useGetRevenueAnalyticsQuery(year);

  console.log("revenueData", revenueData);

  const onChange = (date) => {
    setYear(date.get("year"));
    setIsDateSelected(!isDateSelected);
  };

  return (
    <div className="w-[68%] h-full rounded-lg bg-white">
      <div className="flex items-center justify-between px-6 my-5 relative">
        <h1 className="text-2xl font-semibold">Revenue Analytics</h1>

        <DatePicker
          // onChange={(value) => setYear(value.get("year"))}
          onChange={onChange}
          picker="year"
          className="border-1 h-8 w-28 py-2 rounded-lg"
          suffixIcon={
            <div
              className="rounded-full w-6 h-6 p-1 flex items-center justify-center"
              style={{
                backgroundColor: isDateSelected ? "#18a0fb" : "#c3e3f7",
              }}
            >
              <MdOutlineDateRange
                color={isDateSelected ? "white" : "#18a0fb"}
              />
            </div>
          }
        />
      </div>

      <ResponsiveContainer width="100%" height={205}>
        <AreaChart
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18A0FB" stopOpacity={1} />
              <stop offset="100%" stopColor="#18A0FB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="none"
            strokeWidth={0.2}
            vertical={false}
          />
          <XAxis dataKey="name" style={{ fontSize: "14px" }} />
          <YAxis hide={false} style={{ fontSize: "14px" }} />
          {/* <Tooltip cursor={{ fill: "transparent" }} /> */}
          <Tooltip
            content={<CustomTooltip />}
            // cursor={{ fill: "transparent" }}
            isAnimationActive={true}
            cursor={false}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke=""
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        {/* Arrow (pointing left) */}
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white -left-1.5"></div>

        {/* Tooltip Content */}
        <div className="bg-white p-2 text-black text-[14px] rounded shadow-md ">
          {payload.map((pld, index) => (
            <div key={index}>{pld.value}K</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
