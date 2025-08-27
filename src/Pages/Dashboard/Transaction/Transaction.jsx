import React, { useEffect, useState } from "react";
import { Table, Avatar, ConfigProvider, Input, Button, Form } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoEye, IoSearch } from "react-icons/io5";

import GetPageName from "../../../components/common/GetPageName";
import { LuDownload } from "react-icons/lu";

import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";
import { useGetTransactionsQuery } from "../../../redux/apiSlices/transactionSlice";
import dayjs from "dayjs";
import { imageUrl } from "../../../redux/api/baseApi";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";


// UserAvatar Component
const UserAvatar = ({ shop }) => (
  <div className="flex gap-2 items-center">
    <Avatar shape="circle" size={30} src={"shop"} />
    <p>John Doe</p>
  </div>
);

// Sample Data
const initialData = [
  {
    key: 1,
    date: "2021-09-01",
    customername: "",
    name: "John Lennon",
    bookingID: "#1214454",
    ammount: 5,
    status: "Sent",
  },
  {
    key: 2,
    date: "2021-10-15",
    customername: "",
    name: "Paul McCartney",
    bookingID: "#121idj54",
    ammount: 10,
    status: "Pending",
  },
  {
    key: 3,
    date: "2021-10-15",
    customername: "",
    name: "George Harrison",
    bookingID: "#1256789",
    ammount: 15,
    status: "Pending",
  },
  {
    key: 4,
    date: "2021-11-20",
    customername: "",
    name: "Ringo Starr",
    bookingID: "#1239874",
    ammount: 20,
    status: "Sent",
  },
  {
    key: 5,
    date: "2021-11-20",
    customername: "",
    name: "Ringo Starr",
    bookingID: "#1239874",
    ammount: 20,
    status: "Unpaid",
  },
];



function Transaction() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
  const [form] = useForm()
   const { data: transactionsData, isLoading, refetch } = useGetTransactionsQuery();
   const updateSearchParams = useUpdateSearchParams();
   const { searchTerm } = getSearchParams();
    

  useEffect(() => {
    refetch();    
  }, [searchTerm]);  

  useEffect(() => {
    updateSearchParams({ page: currentPage });
  }, [currentPage]);

  // Handle search input change
  const handleSearch = (value) => console.log(value);


  // Handle delete function
  const handleDelete = () => {
    // Delete only the selected rows
    setData(data.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
  };

  // Columns Definition
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <p>{dayjs(date).format("DD MMM YY")}</p>,
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => 
      <div className="flex items-center gap-2.5">
          <img
            src={ user?.image && user?.image.startsWith("http")
                  ? user?.image
                  : user?.image
                  ? `${imageUrl}${user?.image}`
                  : "/placeholder.png"}
            alt={user?.full_name}
            className="rounded-full w-8 h-8 shrink-0"
          />
          <span>{user?.full_name}</span>
        </div>
,
    },
    {
      title: "Bookinng ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text)=> text.split("").slice(0, 20)
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.ammount - b.ammount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={`${
            status.charAt(0).toLocaleUpperCase() ===
            "Sent".charAt(0).toLocaleUpperCase()
              ? "text-green-500 bg-green-50 border border-green-500 w-20 px-1.5 py-0.5 rounded-lg"
              : status.charAt(0).toUpperCase() ===
                "Paid".charAt(0).toLocaleUpperCase()
              ? "text-sky-500 bg-sky-50 border border-sky-500 w-20 px-1.5 py-0.5 rounded-lg"
              : "text-red-500 bg-red-50 border border-red-500 w-20 px-1.5 py-0.5 rounded-lg"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <IoEye
            style={{ fontSize: 24 }}
            className="text-black hover:text-blue-500 cursor-pointer"
          />          
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
            // itemBg: "#000000",
          },

          Button: {
            defaultHoverBg: "#18a0fb ",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "#18a0fb ",
          },
        },
      }}
    >
      <div className="flex items-center justify-between md:flex-row flex-col">
        <h1 className="text-2xl font-semibold">Transaction</h1>
        <div className="w-full max-w-[250px] mt-3 md:mt-0 pt-0">
          <Form form={form}>
            <FormItem name="search">
              <Input
                onChange={(value) => {
                  updateSearchParams({ searchTerm: value.target.value });
                }}
                defaultValue={searchTerm}
                name="search"
                style={{                  
                  height: 40,
                  borderRadius: 14,
                  // border: "none",
                  color: "#767676",
                  fontSize: 15,
                }}
                className="font-medium"
                prefix={<IoSearch size={16} />}
                placeholder="Search by transaction id..."
              />
            </FormItem>
          </Form>
        </div>
        </div>

      {/* <Head
        onSearch={handleSearch}
        pagename="Transactions"        
        handleDelete={handleDelete}
        filteredData={transactionsData?.result}
      /> */}

      <Table         
        columns={columns}
        dataSource={transactionsData?.result}
        pagination={{
          size: transactionsData?.meta?.limit,
          position: ["bottomRight"],          
          current: currentPage,
          total: transactionsData?.meta?.total,
          // showSizeChanger: true,
          // showQuickJumper: true,
          onChange: (page) => setCurrentPage(page),
        }}

      />
    </ConfigProvider>
  );
}

export default Transaction;

// Head Component (for Search Bar and Delete Button)
function Head({ onSearch, selectedRowKeys, handleDelete, filteredData }) {
  const updateSearchParams = useUpdateSearchParams();
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
            // itemBg: "#000000",
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

        <div className="flex gap-3 items-center">
          <Input
            placeholder="Search by Recipient, Ocation, Price, or Status"
            onChange={(e) => {
                  updateSearchParams({ searchTerm: e.target.value });
                }}
            prefix={<SearchOutlined />}
            // style={{ width: 200, height: 41 }}
            className="h-9 gap-2"
            allowClear
          />

          {/* Show delete button only if more than one row is selected */}

          {/* {selectedRowKeys.length > 1 && (
            <Button
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="bg-[#18a0fb] text-white border-none h-9"
            >
              {selectedRowKeys.length === filteredData.length
                ? "Delete All"
                : "Delete Selected"}
            </Button>
          )} */}
          <Button
            icon={<LuDownload size={20} />}
            className="bg-[#f1f1f1] hover:bg-smart text-black border h-9"
          >
            Export
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
}
