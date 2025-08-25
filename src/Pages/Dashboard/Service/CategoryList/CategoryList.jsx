import React, { useState } from "react";
import {
  Table,
  ConfigProvider,
  message,
  Button,
  Popover,
  Form,
  Input,
  Tooltip,
} from "antd";
import { EditOutlined, PlusOutlined, SearchOutlined, StopOutlined } from "@ant-design/icons";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import GetPageName from "../../../../components/common/GetPageName";

// Import the modal components
import AddEditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { HiDotsVertical } from "react-icons/hi";
import cleaning from "../../../../assets/cleaning.png";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetServiceCategoryQuery } from "../../../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../../../redux/api/baseApi";
import { GoTrash } from "react-icons/go";
function CategoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editingKey, setEditingKey] = useState(null);  

  const [tableData, setTableData] = useState([
    {
      key: "1",
      category: "Mountain Escape",
      serial: 1,
      icon: cleaning,
      totalService: "20",
      priceRange: "$100 - $200",
    },
    {
      key: "2",
      category: "Sunset Glow",
      serial: 2,
      icon: cleaning,
      totalService: "15",
      priceRange: "$50 - $150",
    },
    {
      key: "3",
      category: "City Lights",
      serial: 3,
      icon: cleaning,
      totalService: "30",
      priceRange: "$200 - $300",
    },
    {
      key: "4",
      category: "Forest Adventure",
      serial: 4,
      icon: cleaning,
      totalService: "25",
      priceRange: "$150 - $250",
    },
    {
      key: "5",
      category: "Ocean Breeze",
      serial: 5,
      icon: cleaning,
      totalService: "18",
      priceRange: "$80 - $180",
    },
    {
      key: "6",
      category: "Desert Oasis",
      serial: 6,
      icon: cleaning,
      totalService: "22",
      priceRange: "$120 - $220",
    },
  ]);
  const [filteredData, setFilteredData] = useState(tableData); // state for filtered data
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: serviceCategory } = useGetServiceCategoryQuery();


  console.log("serviceCategory", serviceCategory);
  
  const showModal = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUploadedImage(null);
    setEditingKey(null);
  };

  const handleFormSubmit = (values) => {
    if (!uploadedImage && !isEditing) {
      message.error("Please upload an image!");
      return;
    }

    if (isEditing) {
      // Update existing row
      const updatedData = tableData.map((item) =>
        item.key === editingKey
          ? {
              ...item,
              category: values.category,
              icon: uploadedImage || item.icon, // Retain old image if no new one is uploaded
              totalService: values.totalService,
              priceRange: values.priceRange,
            }
          : item
      );
      setTableData(updatedData);
      setFilteredData(updatedData); // Update filtered data too
      message.success("Slider updated successfully!");
    } else {
      // Add new row
      setTableData([
        ...tableData,
        {
          key: (tableData.length + 1).toString(),
          category: values.category,
          serial: tableData.length + 1,
          icon: uploadedImage, // Ensure uploaded image is set
          totalService: values.totalService,
          priceRange: values.priceRange,
        },
      ]);
      setFilteredData([
        ...filteredData,
        {
          key: (tableData.length + 1).toString(),
          category: values.category,
          serial: tableData.length + 1,
          icon: uploadedImage,
          totalService: values.totalService,
          priceRange: values.priceRange,
        },
      ]);
      message.success("Slider added successfully!");
    }

    handleCancel();
  };

  const handleImageUpload = (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingKey(record.key);
    setUploadedImage(record.icon);
    form.setFieldsValue({
      category: record.category,
      totalService: record.totalService,
      priceRange: record.priceRange,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (key, category) => {
    setDeletingRecord({ key, category });
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = () => {
    const newData = tableData.filter((item) => item.key !== deletingRecord.key);
    setTableData(newData);
    setFilteredData(newData); // Update filtered data after delete
    message.success("Slider deleted successfully!");
    setIsDeleteModalOpen(false);
  };

  const onCancelDelete = () => {
    message.info("Delete action canceled.");
    setIsDeleteModalOpen(false);
  };

  const handleSearch = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = tableData.filter(
      (item) =>
        item.category.toLowerCase().includes(lowercasedValue) ||
        item.totalService.toLowerCase().includes(lowercasedValue) ||
        item.priceRange.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered); // Set filtered data
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "logo",
      key: "logo",
      render: (text) => <img width={60} 
                  src={text && text.startsWith("http")
                  ? text
                  : text
                  ? `${imageUrl}${text}`
                  : "/placeholder.png"} alt="slider" />,
    },
    {
      title: "Total Service",
      dataIndex: "totalService",
      key: "totalService",
    },
    {
      title: "Price Range",
      dataIndex: "priceRange",
      key: "priceRange",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/${record.name
              .toLowerCase()
              .replace(/\s+/g, "-")}-services`}
          >
            <button className="pt-2">
              <IoEye size={23} />
            </button>
          </Link>                            
           <Tooltip title="Edit">
            <IoEye
              size={20}
              style={{ cursor: "pointer" }}
              // onClick={() =>handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Banned">
            <StopOutlined
              size={20}
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => console.log("Banned:", record)}
            />
          </Tooltip>

          <Tooltip title="Delete">
            <GoTrash
              size={20}
              style={{ color: "red", cursor: "pointer" }}
              // onClick={()=>handleDeleteCoupon(record?._id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Search by Category, Total Service, or Price Range"
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            className="h-9"
            allowClear
          />
          <button
            className="bg-smart h-9 text-white px-4 py-2.5 rounded-md flex items-center"
            onClick={showModal}
          >
            <PlusOutlined className="mr-2" size={5} />
            <h1 className="text-[16px]">Add New</h1>
          </button>
        </div>
      </div>

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
            },
            Button: {
              defaultHoverBg: "#18a0fb ",
              defaultHoverColor: "white",
              defaultHoverBorderColor: "#18a0fb ",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={serviceCategory?.result}
          rowKey="key"
          pagination={{
          defaultPageSize: serviceCategory?.meta?.limit,
          position: ["bottomRight"],
          size: "default",
          current: currentPage,
          total: serviceCategory?.meta?.total,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page) => setCurrentPage(page),
        }}
        />
      </ConfigProvider>

      <AddEditCategoryModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleFormSubmit={handleFormSubmit}
        form={form}
        uploadedImage={uploadedImage}
        handleImageUpload={handleImageUpload}
        isEditing={isEditing}
      />
      <DeleteCategoryModal
        isDeleteModalOpen={isDeleteModalOpen}
        deletingRecord={deletingRecord}
        onConfirmDelete={onConfirmDelete}
        onCancelDelete={onCancelDelete}
      />
    </div>
  );
}

export default CategoryList;
