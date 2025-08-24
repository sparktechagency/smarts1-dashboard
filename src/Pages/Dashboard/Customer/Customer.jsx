import React, { useEffect, useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button, message } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import GetPageName from "../../../components/common/GetPageName";
import PopOver from "../../../components/common/PopOver";
import CustomerEditModal from "./CustomerEditModal";
import { LuDownload } from "react-icons/lu";
import { useGetCustomersQuery } from "../../../redux/apiSlices/customersSlice";
import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";

function Customer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const { data: customersData, isLoading, refetch } = useGetCustomersQuery();
  const  updateSearchParams  = useUpdateSearchParams();
  const {  searchTerm,  page } = getSearchParams();
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {    
    refetch();
  }, [ searchTerm,  page]);

  useEffect(() => {  
  updateSearchParams({ page:  currentPage});
}, [currentPage]);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Handle edit button click
  const handleEdit = (record) => {
    setSelectedProvider(record); // Store selected provider's data
    setIsModalOpen(true); // Open modal
  };

  // Handle ban functionality
  const handleBan = (provider) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.key === provider.key ? { ...user, banned: !user.banned } : user
      )
    );
    message.success(
      `${provider.customerName} has been ${
        provider.banned ? "unbanned" : "banned"
      }`
    );
  };

  // Handle saving edited provider
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
            // onChange={(e) => console.log(e.target.value)}
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
        dataSource={customersData?.result}
        pagination={{
          defaultPageSize: customersData?.meta?.limit,
          position: ["bottomRight"],
          size: "default",
          current: currentPage,
          total: customersData?.meta?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page) => setCurrentPage(page),  
        }}
      />
      {/* Edit Modal */}
      <CustomerEditModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        providerData={selectedProvider}
        onSave={handleSave}
      />
    </ConfigProvider>
  );
}

export default Customer;

const columns = (handleEdit, handleBan) => [
  {
    title: "Customer Name",
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
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Spent",
    dataIndex: "totalAmount",
    key: "totalAmount",
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

const data = [
  {
    key: 1,
    customerName: "John Doe",
    email: "johndoe@gmail.com",

    phoneNumber: "+1234567890",
    address: "10 Warehouse Road, Apapa, Lagos",
    spent: "$5000",
    avatar: "",
    banned: false, // Add banned field
  },
  {
    key: 2,
    customerName: "Jane Smith",
    email: "janesmith@gmail.com",

    phoneNumber: "+1234567891",
    address: "15 Broad Street, Lagos",
    spent: "$4500",
    avatar: "",
    banned: false, // Add banned field
  },
];
