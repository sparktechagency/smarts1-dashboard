import {
  DeleteOutlined,
  SearchOutlined,
  StopOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  ConfigProvider,
  Input,
  message,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import GetPageName from "../../../components/common/GetPageName";
import { useBannedCustomersMutation, useDeleteCustomerMutation, useGetCustomersQuery } from "../../../redux/apiSlices/customersSlice";
import { getSearchParams } from "../../../utility/getSearchParams";
import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import DeleteCategoryModal from "../Service/CategoryList/DeleteCategoryModal";
import CustomerEditModal from "./CustomerEditModal";

function Customer() {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const { data: customersData, isLoading, refetch } = useGetCustomersQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [bannedCostomers] = useBannedCustomersMutation()

  const updateSearchParams = useUpdateSearchParams();
  const { searchTerm, page } = getSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);

  useEffect(() => {
    refetch();
  }, [searchTerm, page]);

  useEffect(() => {
    updateSearchParams({ page: currentPage });
  }, [currentPage]);


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
        provider.banned ? "unbanned" : "Blocked"
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


  const onConfirmDelete = async () => {
    try {
      const res = await deleteCustomer(deletingRecord?._id);
      console.log("delete customer", res);
      
      refetch();
      toast.success(res?.data?.message);
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.error?.data?.message)
      console.log("delete error 111", error?.error?.data);
    }
  };

  const onCancelDelete = () => {
    message.info("Delete action canceled.");
    setIsDeleteModalOpen(false);
  };


  // handle Banned Customer
const handleBannedCustomer = async (id, status) =>{
  try {    
    const res = await bannedCostomers({id, status});
    console.log("banned res", res);
    toast.success("Banned costomer successfully")
    refetch()
  } catch (error) {
    console.log("banned customer error", error);
    
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
            placeholder="Search by Name, Email or Phone"
            onChange={(value) => {
              updateSearchParams({ searchTerm: value.target.value });
            }}
            // onChange={(e) => console.log(e.target.value)}
            prefix={<SearchOutlined />}
            className="h-9 gap-2"
            allowClear
          />
        </div>
      </div>

      <Table      
        columns={columns(handleEdit, handleBan, setDeletingRecord, setIsDeleteModalOpen, handleBannedCustomer)} // Pass handleEdit and handleBan to columns
        dataSource={customersData?.result}
        loading={isLoading}
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

      <DeleteCategoryModal
      name={deletingRecord?.full_name}
        isDeleteModalOpen={isDeleteModalOpen}
        deletingRecord={deletingRecord}
        onConfirmDelete={onConfirmDelete}
        onCancelDelete={onCancelDelete}
      />
    </ConfigProvider>
  );
}

export default Customer;

const columns = (handleEdit, handleBan, setDeletingRecord, setIsDeleteModalOpen, handleBannedCustomer) => [
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
    title: "Status",
    dataIndex: "status",
    key: "status",
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
            onClick={() => handleBannedCustomer(record?._id, "blocked")}
          />
        </Tooltip>

        <Tooltip title="Delete">
          <GoTrash
            size={20}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {setIsDeleteModalOpen(true); setDeletingRecord(record)}}
          />
        </Tooltip>
      </Space>
    ),
  },
];
