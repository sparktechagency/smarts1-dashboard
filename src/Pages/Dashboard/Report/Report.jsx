import React, { useState } from "react";
import { Table, ConfigProvider, Button, DatePicker } from "antd";
import { FaSortAmountDown } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import DetailsModal from "./DetailsModal"; // Import the modal component

function Report() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isSortedAsc, setIsSortedAsc] = useState(true); // Track sorting order

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
          <Button
            icon={<FaSortAmountDown />}
            onClick={handleSortByDate} // Sort on click
            className="bg-white text-black border-none h-9"
          >
            Sort by Date
          </Button>

          <DatePicker picker="month" className="h-9" />
          {selectedRowKeys.length > 0 && (
            <Button
              icon={<RiDeleteBin6Line />}
              onClick={handleDeleteSelected}
              className="bg-smart hover:bg-smart text-white border-none h-9"
            >
              Delete Selected
            </Button>
          )}
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns(handleViewDetails)}
        dataSource={userData}
        pagination={{
          defaultPageSize: 5,
          position: ["bottomRight"],
          size: "default",
          total: userData.length,
          showSizeChanger: true,
          showQuickJumper: true,
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
    dataIndex: "reportID",
    key: "reportID",
  },
  {
    title: "Service Provider",
    dataIndex: "serviceProvider",
    key: "serviceProvider",
  },
  {
    title: "Reported By",
    dataIndex: "reportedBy",
    key: "reportedBy",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, record) => (
      <span
        className={`font-medium text-${
          record.status === "Resolve" ? "green-500" : "red-500"
        }`}
      >
        {record.status}
      </span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => new Date(text).toLocaleDateString(), // Format Date
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
        <RiDeleteBin6Line
          size={25}
          className="hover:text-red-500 cursor-pointer"
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
