// import React, { useState } from "react";
// import { Table, ConfigProvider, Input, Button } from "antd";
// import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
// import GetPageName from "../../../components/common/GetPageName";
// import PopOver from "../../../components/common/PopOver";
// import { FaPlus } from "react-icons/fa";
// import CouponModal from "./CouponModal";

// function DiscountCoupon() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [userData, setUserData] = useState(data);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state

//   const handleSearch = (value) => {
//     setSearchQuery(value);
//   };

//   // Improved search filter function
//   const filteredData = userData.filter((user) => {
//     const searchTerm = searchQuery.toLowerCase();
//     return (
//       user.offerName.toLowerCase().includes(searchTerm) ||
//       user.discountType.toLowerCase().includes(searchTerm) ||
//       user.discountValue.toLowerCase().includes(searchTerm) ||
//       user.applicableServices.toLowerCase().includes(searchTerm) ||
//       user.startDate.toLowerCase().includes(searchTerm) ||
//       user.endDate.toLowerCase().includes(searchTerm) ||
//       user.status.toLowerCase().includes(searchTerm)
//     );
//   });

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: setSelectedRowKeys,
//   };

//   const handleEdit = (record) => {
//     setSelectedProvider(record); // Store selected provider's data
//     setIsModalOpen(true); // Open modal
//   };

//   const handleDeleteSelected = () => {
//     setUserData(userData.filter((user) => !selectedRowKeys.includes(user.key)));
//     setSelectedRowKeys([]);
//   };

//   // Handle Add Coupon button click to open the modal
//   const handleAddCoupon = () => {
//     setIsModalOpen(true); // Open the modal when Add Coupon is clicked
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Table: {
//             rowSelectedBg: "#f6f6f6",
//             headerBg: "#f6f6f6",
//             headerSplitColor: "none",
//             headerBorderRadius: "none",
//             cellFontSize: "16px",
//           },
//           Pagination: {
//             borderRadius: "3px",
//             itemActiveBg: "#18a0fb",
//           },
//           Button: {
//             defaultHoverBg: "#18a0fb ",
//             defaultHoverColor: "white",
//             defaultHoverBorderColor: "#18a0fb ",
//           },
//         },
//       }}
//     >
//       <div className="flex justify-between items-center py-5">
//         <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
//         <div className="flex gap-3">
//           <Input
//             placeholder="Search by Offer Name, Discount Type, Value, or Dates"
//             onChange={(e) => handleSearch(e.target.value)}
//             prefix={<SearchOutlined />}
//             className="h-9 gap-2"
//             allowClear
//           />
//           {selectedRowKeys.length > 0 && (
//             <Button
//               icon={<DeleteOutlined />}
//               onClick={handleDeleteSelected}
//               className="bg-smart hover:bg-smart text-white border-none h-9"
//             >
//               Delete Selected
//             </Button>
//           )}
//           <Button
//             icon={<FaPlus />}
//             className="bg-smart hover:bg-smart text-white border-none h-9"
//             onClick={handleAddCoupon} // Open modal on click
//           >
//             Add Coupon
//           </Button>
//         </div>
//       </div>

//       <Table
//         rowSelection={rowSelection}
//         columns={columns(handleEdit)} // Pass handleEdit and handleBan to columns
//         dataSource={filteredData}
//         pagination={{
//           defaultPageSize: 5,
//           position: ["bottomRight"],
//           size: "default",
//           total: filteredData.length,
//           showSizeChanger: true,
//           showQuickJumper: true,
//         }}
//       />

//       {/* Pass isModalOpen and setIsModalOpen to the AddCouponModal */}
//       <CouponModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
//     </ConfigProvider>
//   );
// }

// export default DiscountCoupon;

// const columns = (handleEdit, handleBan) => [
//   {
//     title: "Offer Name",
//     dataIndex: "offerName",
//     key: "offerName",
//   },

//   {
//     title: "Discount Type",
//     dataIndex: "discountType",
//     key: "discountType",
//   },
//   {
//     title: "Discount Value",
//     dataIndex: "discountValue",
//     key: "discountValue",
//   },
//   {
//     title: "Applicable Services",
//     dataIndex: "applicableServices",
//     key: "applicableServices",
//   },
//   {
//     title: "Start Date",
//     dataIndex: "startDate",
//     key: "startDate",
//   },
//   {
//     title: "End Date",
//     dataIndex: "endDate",
//     key: "endDate",
//   },
//   {
//     title: "Status",
//     dataIndex: "status",
//     key: "status",
//   },
//   {
//     key: "action",
//     render: (text, record) => (
//       <PopOver
//         onEdit={() => handleEdit(record)}
//         onBan={() => handleBan(record)} // Pass the handleBan function
//       />
//     ),
//   },
// ];

// const data = [
//   {
//     key: 1,
//     offerName: "Summer Sale",
//     discountType: "Percentage",
//     discountValue: "20%",
//     applicableServices: "All Products",
//     startDate: "2025-06-01",
//     endDate: "2025-06-30",
//     status: "Active",
//   },
//   {
//     key: 2,
//     offerName: "New Year Discount",
//     discountType: "Flat Rate",
//     discountValue: "$50",
//     applicableServices: "Selected Items",
//     startDate: "2025-12-25",
//     endDate: "2026-01-05",
//     status: "Inactive",
//   },
//   {
//     key: 3,
//     offerName: "Black Friday Deal",
//     discountType: "Buy One Get One",
//     discountValue: "BOGO",
//     applicableServices: "Electronics & Gadgets",
//     startDate: "2025-11-25",
//     endDate: "2025-11-30",
//     status: "Active",
//   },
// ];

import React, { useState } from "react";
import { Table, ConfigProvider, Input, Button, Popover } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import CouponModal from "./CouponModal";
import GetPageName from "../../../components/common/GetPageName";
import PopOver from "../../../components/common/PopOver";
import { HiDotsVertical } from "react-icons/hi";

function DiscountCoupon() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [isEdit, setIsEdit] = useState(false); // Edit mode flag
  const [selectedRecord, setSelectedRecord] = useState(null); // Store selected record for editing

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
            placeholder="Search by Offer Name, Discount Type, Value, or Dates"
            onChange={(e) => handleSearch(e.target.value)}
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
        columns={columns(handleEdit)} // Pass handleEdit to columns
        dataSource={filteredData}
        pagination={{
          defaultPageSize: 5,
          position: ["bottomRight"],
          size: "default",
          total: filteredData.length,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      {/* Pass isModalOpen, setIsModalOpen, and selectedRecord to the CouponModal */}
      <CouponModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        record={selectedRecord} // Pass selectedRecord for editing
        isEdit={isEdit} // Pass edit flag to set modal title and functionality
      />
    </ConfigProvider>
  );
}

export default DiscountCoupon;

const columns = (handleEdit) => [
  {
    title: "Offer Name",
    dataIndex: "offerName",
    key: "offerName",
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
    dataIndex: "applicableServices",
    key: "applicableServices",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    key: "action",
    render: (text, record) => (
      <Popover
        content={
          <div className="flex items-center gap-2">
            <Button
              icon={<EditFilled />}
              type="text"
              onClick={() => handleEdit(record)} // Handle edit action
            />
            <Button
              icon={<DeleteFilled />}
              type="text"
              danger
              // Add delete logic here if necessary
            />
          </div>
        }
        trigger="hover"
        placement="bottom"
      >
        <button>
          <HiDotsVertical size={25} />
        </button>
      </Popover>
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
