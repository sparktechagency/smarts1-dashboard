import React, { useState } from "react";
import SelectDuration from "../../../components/common/SelectDuration";
import { Card } from "../Home/Home";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import BookigListTable from "./BookigListTable";
import {
  useGetBookingSummaryCountQuery,
  useGetBookingSummaryQuery,
} from "../../../redux/apiSlices/bookingSlice";
import { DashboardStats } from "../Home/DashboardStats";
import { DatePicker } from "antd";


function BookingList() {

  const currentDate = new Date().toISOString().split('T')[0]; 
 
  const [date, setDate] = useState(currentDate);
  
  const { data: bookingStatsData } = useGetBookingSummaryCountQuery(date);
  
 

  const onChange = (date, dateString) => {
    setDate(dateString);
    console.log(date, dateString); 
  };

  return (
    <div>
      <div className="w-full flex justify-end mb-5">
         <DatePicker onChange={onChange} />
      </div>
      <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-10 w-full">
        
        <DashboardStats
          label="Total Bookings"
          value={bookingStatsData?.total}
          percent={false}
          color="#18a0fb"
          icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
        />
        <DashboardStats
          label="Bookings in Progress"
          value={bookingStatsData?.inProgress}
          percent={false}
          color="#18a0fb"
          icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
        />
        <DashboardStats
          label="Completed Bookings"
          value={bookingStatsData?.completed}
          percent={false}
          color="#18a0fb"
          icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
        />
        <DashboardStats
          label="Canceled Bookings"
          value={bookingStatsData?.cancel}
          percent={false}
          color="#18a0fb"
          icon={[<IoTrendingUp size={20} />, <IoTrendingDown size={20} />]}
        />
      </div>
      <BookigListTable />
    </div>
  );
}

export default BookingList;
