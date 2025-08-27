import React, { useEffect, useState } from "react";
import { Table, ConfigProvider, Button, DatePicker, Select } from "antd";
import { FaSortAmountDown } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import DetailsModal from "./DetailsModal"; // Import the modal component
import { useGetReportedQuery } from "../../../redux/apiSlices/reportedSlice";
import dayjs from "dayjs";
import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";

function Report() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isSortedAsc, setIsSortedAsc] = useState(true); // Track sorting order
  const [currentPage, setCurrentPage] = useState(1)

  const { data: transactionData, refetch } = useGetReportedQuery();
  const updateSearchParams = useUpdateSearchParams()
  const {status, page} = getSearchParams()

  useEffect(()=>{
    refetch()
  },[status])

  useEffect(()=>{
    updateSearchParams({page: currentPage})
  },[currentPage])

  console.log("transactionData", currentPage);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };



  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleSortByDate = () => {
    const sortedData = [...userData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isSortedAsc ? dateA - dateB : dateB - dateA;
    });

    setUserData(sortedData);
    setIsSortedAsc(!isSortedAsc);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
            cellFontSize: "16px",
            cellPaddingBlock: 15,
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
          },
          Button: {
            defaultHoverBg: "#18a0fb ",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "#18a0fb ",
          },
        },
      }}
    >
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">Report Issues</h1>
        <div className="flex gap-3">
          <Select
            placeholder="Status"
            allowClear
            style={{ width: 120, height: 42 }}
            onChange={(value=>updateSearchParams({ status: value }))}
            options={[
              { value: "Resolved", label: "Resolved" },
              { value: "Under Review", label: "Under Review" },
            ]}
          />

          {/* {selectedRowKeys.length > 0 && (
            <Button
              icon={<RiDeleteBin6Line />}
              onClick={handleDeleteSelected}
              className="bg-smart hover:bg-smart text-white border-none h-9"
            >
              Delete Selected
            </Button>
          )} */}
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns(handleViewDetails)}
        dataSource={transactionData?.result}
        pagination={{
          size: transactionData?.meta?.total,
          total:  transactionData?.meta?.limit,          
          position: ["bottomRight"],
          current: currentPage,
          onChange: (page)=> setCurrentPage(page),          
        }}
      />

      {isModalOpen && selectedRecord && (
        <DetailsModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          record={selectedRecord}
        />
      )}
    </ConfigProvider>
  );
}

export default Report;

const columns = (handleViewDetails) => [
  {
    title: "Report ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Service Provider",
    dataIndex: "refferenceId",
    key: "refferenceId",
    render: provider=> provider?.serviceProvider?.full_name
  },
  {
    title: "Reported By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: reporter=> reporter?.full_name
  },
  {
    title: "Reported Type",
    dataIndex: "report_type",
    key: "report_type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <span
        className={`font-medium text-${
          record.status === "Resolved" ? "green-500" : "red-500"
        }`}
      >
        {record.status}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => dayjs(text).format("DD MMMM YY"), // Format Date
  },
  {
    key: "action",
    render: (text, record) => (
      <div className="flex items-center gap-3">
        <IoEye
          size={25}
          className="hover:text-sky-500 cursor-pointer"
          onClick={() => handleViewDetails(record)}
        />      
      </div>
    ),
  },
];

// Updated data with correct date format
const data = [
  {
    key: 1,
    reportID: "R001",
    serviceProvider: "Provider 1",
    reportedBy: "User 1",
    status: "Under Review",
    date: "2024-12-11", // Corrected Date Format
  },
  {
    key: 2,
    reportID: "R002",
    serviceProvider: "Provider 2",
    reportedBy: "User 2",
    status: "Resolve",
    date: "2024-06-11",
  },
  {
    key: 3,
    reportID: "R003",
    serviceProvider: "Provider 3",
    reportedBy: "User 3",
    status: "Resolve",
    date: "2024-12-05",
  },
  {
    key: 4,
    reportID: "R004",
    serviceProvider: "Provider 4",
    reportedBy: "User 4",
    status: "Under Review",
    date: "2024-10-01",
  },
];
