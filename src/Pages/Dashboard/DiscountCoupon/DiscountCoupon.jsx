import React, { useEffect, useState } from "react";
import { Table, ConfigProvider, Input, Button, Popover, Space, Tooltip } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditFilled,
  DeleteFilled,
  StopOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import CouponModal from "./CouponModal";
import GetPageName from "../../../components/common/GetPageName";

import { HiDotsVertical } from "react-icons/hi";
import { useDeleteCouponMutation, useGetCouponsQuery, useUpdateCouponMutation } from "../../../redux/apiSlices/couponSlice";
import { GoTrash } from "react-icons/go";
import dayjs from "dayjs";
import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";
import toast from "react-hot-toast";

function DiscountCoupon() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data: couponsData, isLoading, isError, refetch } = useGetCouponsQuery();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation()
    const {searchTerm} = getSearchParams();

    const  updateSearchParams  = useUpdateSearchParams();
    
    useEffect(()=>{
    refetch()
    },[searchTerm])

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  // Improved search filter function
  const filteredData = userData.filter((user) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.offerName.toLowerCase().includes(searchTerm) ||
      user.discountType.toLowerCase().includes(searchTerm) ||
      user.discountValue.toLowerCase().includes(searchTerm) ||
      user.applicableServices.toLowerCase().includes(searchTerm) ||
      user.startDate.toLowerCase().includes(searchTerm) ||
      user.endDate.toLowerCase().includes(searchTerm) ||
      user.status.toLowerCase().includes(searchTerm)
    );
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleEdit = (record) => {      
    setSelectedRecord(record); // Store selected record for editing
    setIsEdit(true); // Set edit mode flag to true
    setIsModalOpen(true); // Open modal
  };

  const handleDeleteSelected = () => {
    setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
    setSelectedRowKeys([]);
  };

  const handleAddCoupon = () => {
    setIsEdit(false); // Set to Add mode
    setSelectedRecord(null); // Clear selected record for new coupon
    setIsModalOpen(true); // Open the modal when Add Coupon is clicked
  };

  const handleDeleteCoupon = async(id)=>{
    console.log("id", id)
    try {
      const res = await deleteCoupon(id);
      refetch()
      console.log("delete", res);
      
    } catch (error) {
        console.log("error", error);
        
    }
  }

    const handleCouponStatusToggle = async(record)=>{
    try {          
     
     
      const res = await updateCoupon({code: record?.code, isActive: record?.isActive ? false : true});  
     console.log("coupon status", res);
     toast.success("Coupon status change")
      refetch();      
  } catch (error) {
    // This catch will rarely run unless there’s a JS error, not an API error
    console.log("unexpected error", error);
    toast.error("Unexpected error occurred");
  }
  }

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
            placeholder="Search ..."            
             onChange={(value) => {updateSearchParams({ searchTerm: value.target.value })}}
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
            icon={<FaPlus />}
            className="bg-smart hover:bg-smart text-white border-none h-9"
            onClick={handleAddCoupon} // Open modal on click
          >
            Add Coupon
          </Button>
        </div>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns(handleEdit, handleDeleteCoupon, handleCouponStatusToggle)} // Pass handleEdit to columns
        dataSource={couponsData?.result}
        pagination={{
          defaultPageSize: couponsData?.meta?.limit,
          position: ["bottomRight"],
          size: "default",
          current: currentPage,
          total: couponsData?.meta?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page) => setCurrentPage(page),  
        }}
      />      

      {/* Pass isModalOpen, setIsModalOpen, and selectedRecord to the CouponModal */}
      <CouponModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        couponData={selectedRecord}
        isEdit={isEdit} 
        refetch={refetch}
      />
    </ConfigProvider>
  );
}

export default DiscountCoupon;

const columns = (handleEdit, handleDeleteCoupon, handleCouponStatusToggle) => [
  {
    title: "Coupon Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Offer Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Discount Type",
    dataIndex: "discountType",
    key: "discountType",
  },
  {
    title: "Discount Value",
    dataIndex: "discountValue",
    key: "discountValue",
  },
  {
    title: "Applicable Services",
    dataIndex: "serviceCategory",
    key: "serviceCategory",
    render: (serviceCategory)=> serviceCategory?.name
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render:(text)=> dayjs(text).format("DD MMMM YYYY")
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render:(text)=> dayjs(text).format("DD MMMM YYYY")
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render:(isActive)=> isActive ? <span className="text-green-600">Active</span>  : <span className="text-red-600">Inactive</span>
  },
  {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              size={20}
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() =>handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Banned">
            <StopOutlined
              size={20}
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleCouponStatusToggle(record)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <GoTrash
              size={20}
              style={{ color: "red", cursor: "pointer" }}
              onClick={()=>handleDeleteCoupon(record?._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
];

const data = [
  {
    key: 1,
    offerName: "Summer Sale",
    discountType: "Percentage",
    discountValue: "20%",
    applicableServices: "All Products",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    status: "Active",
  },
  {
    key: 2,
    offerName: "New Year Discount",
    discountType: "Flat Rate",
    discountValue: "$50",
    applicableServices: "Selected Items",
    startDate: "2025-12-25",
    endDate: "2026-01-05",
    status: "Inactive",
  },
  {
    key: 3,
    offerName: "Black Friday Deal",
    discountType: "Buy One Get One",
    discountValue: "BOGO",
    applicableServices: "Electronics & Gadgets",
    startDate: "2025-11-25",
    endDate: "2025-11-30",
    status: "Active",
  },
];
