import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PickDate from "../../../components/common/PickDate";
import { useGetMonthlyUsersQuery } from "../../../redux/apiSlices/dashboardSlice";
import { DatePicker } from "antd";
import { MdOutlineDateRange } from "react-icons/md";

const initialYear = new Date().getFullYear();

function CustomerServiceChart() {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [year, setYear] = useState(initialYear);

  const [visibleBars, setVisibleBars] = useState({
    Customer: true,
    ServiceProvider: true,
  });

  const { data: userData } = useGetMonthlyUsersQuery(year);

  const onChange = (date) => {
    setYear(date.get("year"));
    setIsDateSelected(!isDateSelected);
  };

  // Custom radio button legend
  const CustomLegend = () => {
    return (
      <div className="flex items-center justify-center gap-8  absolute top-1 right-[40%]">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="customerRadio"
            name="legendRadio"
            checked={visibleBars.Customer && !visibleBars.ServiceProvider}
            onChange={() =>
              setVisibleBars({ Customer: true, ServiceProvider: false })
            }
            className="cursor-pointer hidden"
          />
          <label
            htmlFor="customerRadio"
            className="flex items-center cursor-pointer"
          >
            <span className="inline-block w-4 h-4 mr-2 bg-smart rounded"></span>
            Customer
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="serviceProviderRadio"
            name="legendRadio"
            checked={!visibleBars.Customer && visibleBars.ServiceProvider}
            onChange={() =>
              setVisibleBars({ Customer: false, ServiceProvider: true })
            }
            className="cursor-pointer hidden"
          />
          <label
            htmlFor="serviceProviderRadio"
            className="flex items-center cursor-pointer"
          >
            <span className="inline-block w-4 h-4 mr-2 bg-[#b6e2fd] rounded"></span>
            Service Provider
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="bothRadio"
            name="legendRadio"
            checked={visibleBars.Customer && visibleBars.ServiceProvider}
            onChange={() =>
              setVisibleBars({ Customer: true, ServiceProvider: true })
            }
            className="cursor-pointer hidden"
          />
          <label
            htmlFor="bothRadio"
            className="flex items-center cursor-pointer"
          >
            <span className="inline-block w-4 h-4 mr-2 bg-gray-300 rounded"></span>
            All
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 mt-5 relative">
        <h1 className="text-2xl font-semibold">Customer & Service Provider</h1>
        <CustomLegend />
        <DatePicker
          // onChange={(value) => setYear(value.get("year"))}
          onChange={onChange}
          // defaultValue={initialYear}
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

      <div className="w-full h-full py-1">
        <ResponsiveContainer width="100%" height="100%">
          {/* <BarChart
            data={userData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="none"
              strokeWidth={0.2}
              vertical={false}
            />
            <XAxis dataKey="month" style={{ fontSize: "14px" }} />
            <YAxis hide={false} style={{ fontSize: "14px" }} />
            <Tooltip
              content={<CustomTooltip />}
              isAnimationActive={true}
              cursor={false}
            />

            <Bar dataKey="customers" fill="#18A0FB" barSize={35} radius={4} />
            <Bar
              dataKey="serviceProviders"
              fill="#B7E2FE"
              barSize={35}
              radius={4}
            />
          </BarChart> */}
          <BarChart
            data={userData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="none"
              strokeWidth={0.2}
              vertical={false}
            />
            <XAxis dataKey="month" style={{ fontSize: "14px" }} />
            <YAxis hide={false} style={{ fontSize: "14px" }} />
            <Tooltip
              content={<CustomTooltip />}
              isAnimationActive={true}
              cursor={false}
            />

            {/* Conditionally render the bars based on visibleBars */}
            {visibleBars.Customer && (
              <Bar dataKey="customers" fill="#18A0FB" barSize={35} radius={4} />
            )}
            {visibleBars.ServiceProvider && (
              <Bar
                dataKey="serviceProviders"
                fill="#B7E2FE"
                barSize={35}
                radius={4}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default CustomerServiceChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex items-center ml-4">
        {/* Arrow (pointing left) */}
        <div
          className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 -left-1.5"
          style={{
            borderRightColor:
              payload[0].dataKey === "Customer" ? "#18A0FB" : "#B7E2FE",
          }}
        ></div>

        {/* Tooltip Content */}
        <div className="bg-smart p-2 text-white rounded shadow-md">
          {payload.map((pld, index) => (
            <div
              key={index}
              className="px-1 py-.5 mb-2 rounded text-[14px] text-black"
              style={{
                backgroundColor:
                  pld.dataKey === "Customer" ? "#18A0FB" : "#B7E2FE",
              }}
            >
              {" "}
              <p className="capitalize">
                {pld?.dataKey} : {pld.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
