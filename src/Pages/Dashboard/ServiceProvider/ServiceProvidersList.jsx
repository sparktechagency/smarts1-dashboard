import React, { useEffect, useState } from "react";
import {
  Table,
  Avatar,
  ConfigProvider,
  Input,
  Button,
  message,
  Space,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  StopOutlined,
} from "@ant-design/icons";
import GetPageName from "../../../components/common/GetPageName";
import PopOver from "../../../components/common/PopOver";

import { LuDownload } from "react-icons/lu";

import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";
import {
  useBannedProvidersMutation,
  useDeleteServiceProviderMutation,
  useGetServiceProvidersQuery,
} from "../../../redux/apiSlices/serviceProviderSlice";
import { GoTrash } from "react-icons/go";
import DeleteCategoryModal from "../Service/CategoryList/DeleteCategoryModal";
import toast from "react-hot-toast";

function ServiceProvider() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userData, setUserData] = useState([]); // Initialize with empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const {
    data: serviceProvidersData,
    isLoading,
    refetch,
  } = useGetServiceProvidersQuery();
  const [deleteServiceProvider] = useDeleteServiceProviderMutation();
  const [bannedProviders]= useBannedProvidersMutation()

  const updateSearchParams = useUpdateSearchParams();
  const { searchTerm, page } = getSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);


  console.log("isDeleteModalOpen", isDeleteModalOpen);


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

  const onConfirmDelete = async () => {
    try {
      const res = await deleteServiceProvider(deletingRecord?._id);
      console.log("delete customer", res);

      refetch();
      toast.success(res?.data?.message);
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.error?.data?.message);
      console.log("delete error 111", error?.error?.data);
    }
  };

  const onCancelDelete = () => {
    message.info("Delete action canceled.");
    setIsDeleteModalOpen(false);
  };

  // handle Banned Customer
  const handleBannedProvider = async (id, status) => {
    try {
      const res = await bannedProviders({ id, status });
      console.log("banned res", res);
      toast.success("Banned provider successfully")
      refetch();
    } catch (error) {
      console.log("banned customer error", error);
    }
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
        </div>
      </div>

      <Table        
        rowKey="_id"
        columns={columns(
          setDeletingRecord,
         setIsDeleteModalOpen,
         handleBannedProvider
         
        )} // Pass handleEdit and handleBan to columns
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

      <DeleteCategoryModal
        title={deletingRecord?.full_name}
        isDeleteModalOpen={isDeleteModalOpen}
        deletingRecord={deletingRecord}
        onConfirmDelete={onConfirmDelete}
        onCancelDelete={onCancelDelete}
      />
    </ConfigProvider>
  );
}

export default ServiceProvider;

const columns = (
  setDeletingRecord,
  setIsDeleteModalOpen,
  handleBannedProvider
) => [
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <span className="capitalize">{text}</span> ,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="Blocked">
          <StopOutlined
            size={20}
            style={{ color: record?.status == "active" ? "blue" : "red", cursor: "pointer" }}
            onClick={() => handleBannedProvider(record?._id, "blocked")}
          />
        </Tooltip>

        {/* <Tooltip title="Delete">
          <GoTrash
            size={20}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              setIsDeleteModalOpen(true);
              setDeletingRecord(record);
            }}
          />
        </Tooltip> */}

        <Tooltip title="Delete">
          <GoTrash
            size={20}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {              
              setDeletingRecord(record);
              setIsDeleteModalOpen(true)
            }}
          />
        </Tooltip>        
      </Space>
    ),
  },
];
