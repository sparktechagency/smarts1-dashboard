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
  Image,
  Modal,
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
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetServiceCategoryQuery, useUpdateCategoryMutation } from "../../../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../../../redux/api/baseApi";
import { GoTrash } from "react-icons/go";
import CategoryDetailsModal from "./CategoryDetailsModal";
import toast from "react-hot-toast";
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
  
  const { data: serviceCategory, refetch } = useGetServiceCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation()
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("")
  const [uploadFile, setUploadFile] = useState(null);
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  
  // -------------- Column Sl No set -------------
    const pageSize = serviceCategory?.meta?.limit ?? 10;


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

  const handleFormSubmit = async (values) => {
    
    console.log("values", values)
    const formData = new FormData();

    if (uploadFile && typeof uploadFile !== "string") {
        formData.append("logo", uploadFile);
      }        
        formData.append("data", JSON.stringify({name: values?.name}))
    if (!uploadedImage && !isEditing) {
      message.error("Please upload an image!");
      return;
    }

    if (isEditing) {
      // Update existing row
      const res = await updateCategory(formData);
              
        toast.success(res?.data?.message);
        refetch()
      message.success("Slider updated successfully!");
    } else {
      // Add new row
      const res = await createCategory(formData); 
        console.log("addd", res);
        refetch()
        toast.success(res?.data?.message)
        handleCancel()      
    }

    handleCancel();
  };

  const handleImageUpload = (info) => {
     const file = info.file.originFileObj; // Extract the file from info
        if (!file) return;
        
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
          message.error("You can only upload image files!");
          return;
        }    
        setUploadFile(file);
        
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

  const handleDelete = (record) => {
    setDeletingRecord(record);
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = async() => {
    try {
      const res = await deleteCategory(deletingRecord?._id);
      refetch();
      message.success(res?.data?.message);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.log("delete error", error);
    }
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
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,

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
      render: (text) => <Image width={40} height={40}
                  src={text && text.startsWith("http")
                  ? text
                  : text
                  ? `${imageUrl}${text}`
                  : "/placeholder.png"} alt="slider" />,
    },
    {
      title: "Total Service",
      dataIndex: "serviceCount",
      key: "serviceCount",
    },
    {
      title: "Price Range",
      dataIndex: "priceRange",
      key: "priceRange",
      render: priceRange=> <span>{priceRange?.lowest} - {priceRange?.highest}</span>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center gap-2">                            
           <Tooltip title="Edit">
            <IoEye
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() =>{setOpenDetailModal(true); setSelectedCategory(record?._id)}}
            />
          </Tooltip>
          <Tooltip title="Blocked">
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
              onClick={()=>handleDelete(record)}
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
          position: ["bottomRight"],
          pageSize,
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
        setUploadedImage={setUploadedImage}
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
      <CategoryDetailsModal open={openDetailModal} setOpenDetailModal={setOpenDetailModal} category={selectedCategory} />      
    </div>
  );
}

export default CategoryList;
