import React, { useEffect, useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button, message } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import GetPageName from "../../../components/common/GetPageName";
import PopOver from "../../../components/common/PopOver";

import { LuDownload } from "react-icons/lu";

import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";
import { useGetServiceProvidersQuery } from "../../../redux/apiSlices/serviceProviderSlice";

function ServiceProvider() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState([]); // Initialize with empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const { data: serviceProvidersData, isLoading, refetch } = useGetServiceProvidersQuery(); // Replace with service provider API query
  const updateSearchParams = useUpdateSearchParams();
  const { searchTerm, page } = getSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refetch();
  }, [searchTerm, page]);

  useEffect(() => {
    updateSearchParams({ page: currentPage });
  }, [currentPage]);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleEdit = (record) => {
    setSelectedProvider(record); // Store selected provider's data
    setIsModalOpen(true); // Open modal
  };

  const handleBan = (provider) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.key === provider.key ? { ...user, banned: !user.banned } : user
      )
    );
    message.success(
      `${provider.full_name} has been ${
        provider.banned ? "unbanned" : "banned"
      }`
    );
  };

  const handleSave = (updatedProvider) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.key === updatedProvider.key ? updatedProvider : user
      )
    );
    setIsModalOpen(false);
  };

  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]);
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
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search by Name, Email or Phone"
            onChange={(value) => {
              updateSearchParams({ searchTerm: value.target.value });
            }}
            prefix={<SearchOutlined />}
            className="h-9 gap-2"
            allowClear
          />
          {selectedRowKeys.length > 0 && (
            <Button
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              className="bg-smart hover:bg-smart text-white border-none h-9"
            >
              Delete Selected
            </Button>
          )}
          <Button
            icon={<LuDownload size={20} />}
            onClick={handleDeleteSelected}
            className="bg-[#f1f1f1] hover:bg-smart text-black border h-9"
          >
            Export
          </Button>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns(handleEdit, handleBan)} // Pass handleEdit and handleBan to columns
        dataSource={serviceProvidersData?.result}
        pagination={{
          defaultPageSize: serviceProvidersData?.meta?.limit,
          position: ["bottomRight"],
          size: "default",
          current: currentPage,
          total: serviceProvidersData?.meta?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page) => setCurrentPage(page),
        }}
      />      
    </ConfigProvider>
  );
}

export default ServiceProvider;

const columns = (handleEdit, handleBan) => [
  {
    title: "Provider Name",
    dataIndex: "full_name",
    key: "full_name",
    render: (text, record) => (
      <div className="flex items-center gap-2.5">
        <Avatar
          src={record.image ? record.image : "placeholder.png"}
          alt={text}
          shape="circle"
          size={40}
        />
        <div className="flex flex-col">
          <span className="font-semibold">{text}</span>
          <span className="text-[12px]">{record.email}</span>
        </div>
      </div>
    ),
  },

  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Revenue Percentage",
    dataIndex: "adminRevenuePercent",
    key: "adminRevenuePercent",
    render: (value) => `${value}%`,
  },
  {
    title: "Total Earned",
    dataIndex: "totalEarn",
    key: "totalEarn",
    render: (value) => `$${value}`,
  },
  {
    key: "action",
    render: (text, record) => (
      <PopOver
        onDelete={() => handleEdit(record)}
        onBan={() => handleBan(record)} // Pass the handleBan function
      />
    ),
  },
];
