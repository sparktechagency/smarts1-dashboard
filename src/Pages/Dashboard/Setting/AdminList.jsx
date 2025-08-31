import React, { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Flex,
  Input,
  Table,
  Popover,
  Button,
  Modal,
  Form,
  ConfigProvider,
  message,
  Select,
} from "antd";
import { MoreOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";

import ButtonEDU from "../../../components/common/ButtonEDU";
import { MdMoreVert } from "react-icons/md";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "../../../redux/apiSlices/settingSlice";
import toast from "react-hot-toast";

const AdminList = () => {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const addFormRef = useRef(null);
  const editFormRef = useRef(null);

  const { data: adminListData, refetch } = useGetAllAdminQuery();
  const [createAdmin] = useCreateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  useEffect(() => {
    const mergedAdmins = [
      ...(adminListData?.SUPER_ADMIN?.data || []),
      ...(adminListData?.ADMIN?.data || []),
    ];

    setAdmins(mergedAdmins);
    setFilteredData(mergedAdmins);
  }, [adminListData]);

  // Search functionality
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = admins.filter(
      (item) =>
        item?.name?.toLowerCase().includes(value) ||
        item?.email?.toLowerCase().includes(value) ||
        item?.role?.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
  };

  // Open Add Admin Modal
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Close Add Admin Modal
  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
    addFormRef.current?.resetFields();
    message.info("Admin addition cancelled.");
  };

  const handleAddAdmin = async (values) => {
    console.log("add admin", values);
    try {
      const res = await createAdmin(values);

      if (res?.error) {
        toast.error(res?.error?.data?.error[0].message);
      } else {
        addFormRef.current?.resetFields();
        toast.success("Created admin  successfully");
        setIsAddModalOpen(false);
        refetch();
      }
    } catch (error) {
      console.log("createAdmin error", error);
    }
  };

  // Open Edit Admin Modal
  const showEditModal = (record) => {
    setSelectedAdmin(record);
    setIsEditModalOpen(true);
    setTimeout(() => {
      editFormRef.current?.setFieldsValue(record);
    }, 0);
  };

  // Close Edit Admin Modal
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    editFormRef.current?.resetFields();
    message.info("Admin edit cancelled.");
  };

  const handleEditAdmin = (values) => {
    setIsEditModalOpen(false);

    message.success("Admin updated successfully!");
  };

  // Open Delete Admin Modal
  const showDeleteModal = (record) => {
    setSelectedAdmin(record);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete Admin
  const handleConfirmDelete = async () => {
    if (!selectedAdmin) return;
    console.log("record", selectedAdmin);
    try {
      await  deleteAdmin(selectedAdmin?._id)
      setIsDeleteModalOpen(false);
      refetch()
      message.success("Admin deleted successfully!");
    } catch (error) {
      console.log("admin error", error);
      
    }
  };

  const handleMenuClick = (e) => {
    const selected = items.find((item) => item.key === e.key);
    if (selected) {
      setSelectedRecipient(selected.label);
    }
  };

  return (
    <div className="w-[60%] bg-white rounded-lg shadow-lg p-5">
      <TableHead
        searchText={searchText}
        handleSearch={handleSearch}
        onAdd={showAddModal}
      />
      <TableBody
        filteredData={filteredData}
        onEdit={showEditModal}
        onDelete={showDeleteModal}
      />

      {/* Add Admin Modal */}
      <Modal
        title="Add Admin"
        open={isAddModalOpen}
        onCancel={handleCancelAdd}
        footer={null}
        className="z-50"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form layout="vertical" ref={addFormRef} onFinish={handleAddAdmin}>
            <Form.Item
              label="Name"
              name="full_name"
              rules={[{ required: true, message: "Please enter Name" }]}
            >
              <Input placeholder="Name" className="h-10" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                {
                  validator: (_, value) => {
                    // Ensure no characters after .com
                    if (value && value.includes(".com")) {
                      const emailAfterDot = value.split(".com")[1];
                      if (emailAfterDot && emailAfterDot.length > 0) {
                        return Promise.reject(
                          "No characters should be after .com"
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" className="h-10" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Set a Password" className="h-10" />
            </Form.Item>
            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelAdd}>
                Cancel
              </ButtonEDU>
              <ButtonEDU
                actionType="save"
                onClick={() => addFormRef.current?.submit()}
              >
                Save
              </ButtonEDU>
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Edit Admin Modal */}
      <Modal
        title="Edit Admin"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
        className="z-50"
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form layout="vertical" ref={editFormRef} onFinish={handleEditAdmin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter Email" },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
                {
                  validator: (_, value) => {
                    // Ensure no characters after .com
                    if (value && value.includes(".com")) {
                      const emailAfterDot = value.split(".com")[1];
                      if (emailAfterDot && emailAfterDot.length > 0) {
                        return Promise.reject(
                          "No characters should be after .com"
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Email" className="h-10" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please enter Role" }]}
            >
              <Input placeholder="Role" className="h-10" />
            </Form.Item>

            <div className="flex justify-end gap-4 mt-4">
              <ButtonEDU actionType="cancel" onClick={handleCancelEdit}>
                Cancel
              </ButtonEDU>
              <ButtonEDU
                actionType="save"
                onClick={() => editFormRef.current?.submit()}
              >
                Save
              </ButtonEDU>
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Delete Admin Modal */}
      <Modal
        title="Delete Admin"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={null}
        centered
        className="z-50"
      >
        <DeleteAdmin
          name={selectedAdmin?.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
const TableHead = ({ searchText, handleSearch, onAdd }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Input
        placeholder="Search admins..."
        value={searchText}
        onChange={handleSearch}
        className="w-1/3 h-10"
        allowClear
      />
      <ButtonEDU actionType="add" onClick={onAdd}>
        <div className="flex items-center justify-center gap-2">
          <FaPlus size={15} /> Add new
        </div>
      </ButtonEDU>
    </div>
  );
};
const TableBody = ({ filteredData, onEdit, onDelete }) => (
  <Table
    rowKey={(record) => record.key}
    columns={columns(onEdit, onDelete)}
    dataSource={filteredData}
    pagination={false}
    className="mt-5"
  />
);

const DeleteAdmin = ({ name, onConfirm, onCancel }) => (
  <Flex
    vertical
    justify="space-between"
    className="w-full h-full mb-3 mt-3"
    gap={20}
  >
    <Flex align="center" justify="center">
      Are you sure you want to delete{" "}
      <span className="font-bold ml-1">{name}</span>?
    </Flex>
    <div className="flex items-center justify-center gap-4">
      <ButtonEDU actionType="cancel" onClick={onCancel}>
        Cancel{" "}
      </ButtonEDU>
      <ButtonEDU actionType="delete" onClick={onConfirm}>
        Delete
      </ButtonEDU>
    </div>
  </Flex>
);

const columns = (onEdit, onDelete) => [
  { title: "Name", dataIndex: "full_name", key: "full_name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    key: "action",
    render: (_, record) => (
      <Button
        disabled={record?.role === "SUPER_ADMIN"}
        onClick={() => onDelete(record)}
        danger
      >
        <DeleteFilled />
      </Button>
    ),
  },
];
export default AdminList;
