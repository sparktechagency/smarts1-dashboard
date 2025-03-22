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

function CustomerServiceChart() {
  const [visibleBars, setVisibleBars] = useState({
    Customer: true,
    ServiceProvider: true,
  });

  const data = [
    { month: "Jan", Customer: 4000, ServiceProvider: 2400 },
    { month: "Feb", Customer: 3000, ServiceProvider: 1398 },
    { month: "Mar", Customer: 2000, ServiceProvider: 9800 },
    { month: "Apr", Customer: 2780, ServiceProvider: 3908 },
    { month: "May", Customer: 1890, ServiceProvider: 4800 },
    { month: "Jun", Customer: 2390, ServiceProvider: 3800 },
    { month: "Jul", Customer: 3490, ServiceProvider: 4300 },
    { month: "Aug", Customer: 2000, ServiceProvider: 9800 },
    { month: "Sep", Customer: 2780, ServiceProvider: 3908 },
    { month: "Oct", Customer: 1890, ServiceProvider: 4800 },
    { month: "Nov", Customer: 2390, ServiceProvider: 3800 },
    { month: "Dec", Customer: 3490, ServiceProvider: 4300 },
  ];

  const handleLegendClick = (dataKey) => {
    setVisibleBars({
      ...visibleBars,
      [dataKey]: !visibleBars[dataKey],
    });
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
        <PickDate />
      </div>

      <div className="w-full h-full py-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
            {visibleBars.Customer && (
              <Bar dataKey="Customer" fill="#18A0FB" barSize={35} radius={4} />
            )}
            {visibleBars.ServiceProvider && (
              <Bar
                dataKey="ServiceProvider"
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
        <div className="absolute w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-smart -left-2"></div>

        {/* Tooltip Content */}
        <div className="bg-smart p-2 text-white rounded shadow-md">
          {payload.map((pld, index) => (
            <div key={index}>{pld.value}K</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
