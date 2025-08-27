import React, { useState } from "react";
import {
  Table,
  ConfigProvider,
  message,
  Button,
  Popover,
  Form,
  Input,
  Modal,
  Avatar,
  Image,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import cleaning from "../../../../assets/cleaning.png";
import { IoMdArrowRoundBack } from "react-icons/io";
// import EditSpecServiceModal from "./EditSpecServiceModal";

import { Link } from "react-router-dom";
import EditSpecServiceModal from "../../DyanamicPage/EditSpecServiceModal";
import GetPageName from "../../../../components/common/GetPageName";
import DeleteSpecServiceModal from "../../DyanamicPage/DeleteSpecServiceModal";
import { useGetServiceCategoryByIdQuery } from "../../../../redux/apiSlices/categorySlice";
import { imageUrl } from "../../../../redux/api/baseApi";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../../../../redux/apiSlices/serviceSlice";
import toast from "react-hot-toast";

function CategoryDetailsModal({ category, open, setOpenDetailModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [tableData, setTableData] = useState([
    {
      key: "1",
      serviceName: "Car Cleaning",
      serial: 1,
      icon: cleaning,
      totalService: "20",
      price: "$100 - $200",
    },
    {
      key: "2",
      serviceName: "Pool Cleaning",
      serial: 2,
      icon: cleaning,
      totalService: "15",
      price: "$50 - $150",
    },
    {
      key: "3",
      serviceName: "Garden Cleaning",
      serial: 3,
      icon: cleaning,
      totalService: "30",
      price: "$200 - $300",
    },
    {
      key: "4",
      serviceName: "House Cleaning",
      serial: 4,
      icon: cleaning,
      totalService: "25",
      price: "$150 - $250",
    },
    {
      key: "5",
      serviceName: "Kitchen Cleaning",
      serial: 5,
      icon: cleaning,
      price: "$80 - $180",
    },
  ]);
  const [filteredData, setFilteredData] = useState(tableData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoryData, refetch } = useGetServiceCategoryByIdQuery(category);
  const [updateService] = useUpdateServiceMutation();
  const [createService] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const pageSize = categoryData?.meta?.limit ?? 10;

  const showModal = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setUploadedImage(null);
    setEditItemId(null);
  };
  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();

      if (uploadFile && typeof uploadFile !== "string") {
        formData.append("image", uploadFile);
      }

      if (isEditing) {
        formData.append(
          "data",
          JSON.stringify({
            name: values.name,
            serviceCharge: Number(values.serviceCharge),
          })
        );

        const res = await updateService({ id: editItemId, data: formData });        
        toast.success(res?.data?.message);
        refetch()
        handleCancel()
        return;       
      } else {
        formData.append(
          "data",
          JSON.stringify({
            name: values.name,
            serviceCharge: Number(values.serviceCharge),
            serviceCategory: category,
          })
        );

        const res = await createService(formData);
        console.log("addd", res);
        refetch()
        toast.success(res?.data?.message)
        handleCancel()
      }
    } catch (error) {
      console.log("error", error);
      message.error("An error occurred while submitting the form.");
    }
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
    setEditItemId(record._id);
    setUploadedImage(record.image);
    form.setFieldsValue({
      name: record.name,
      serviceCharge: record.serviceCharge,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (record) => {
    setDeletingRecord(record);
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = async () => {
    try {
      const res = await deleteService(deletingRecord?._id);
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
        item.serviceName.toLowerCase().includes(lowercasedValue) ||
        item.price.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          height={40}
          width={40}
          src={`${imageUrl}${image}`}
          className="rounded-xl shrink-0 !object-cover"
          alt="service"
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <button
              className="bg-sky-400/50 hover:bg-sky-400 p-2 rounded-lg"
              type="link"
              onClick={() => handleEdit(record)}
            >
              <FiEdit2 size={15} />
            </button>
            <button
              className="bg-red-400/50 hover:bg-red-400 p-2 rounded-lg"
              type="link"
              onClick={() => handleDelete(record)}
            >
              <RiDeleteBin6Line size={15} />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={() => setOpenDetailModal(false)}
      width={1000}
      footer={false}
    >
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium border px-2 py-1.5 rounded-md border-smart">
          <Avatar size={30} src={`${imageUrl}${categoryData?.logo}`} />{" "}
          {categoryData?.name} Category
        </h1>
        <div className="flex gap-3">
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
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={categoryData?.services}
          rowKey="key"
          pagination={{
            current: currentPage,
            pageSize,
            position: ["bottomRight"],
            total: categoryData?.meta?.total,
          }}
        />
      </ConfigProvider>

      {/* Full-page Modal for Editing */}

      <EditSpecServiceModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        form={form}
        handleFormSubmit={handleFormSubmit}
        handleCancel={handleCancel}
        handleImageUpload={handleImageUpload}
        isEditing={isEditing}
      />

      <DeleteSpecServiceModal
        isDeleteModalOpen={isDeleteModalOpen}
        deletingRecord={deletingRecord}
        onConfirmDelete={onConfirmDelete}
        onCancelDelete={onCancelDelete}
      />
    </Modal>
  );
}

export default CategoryDetailsModal;
