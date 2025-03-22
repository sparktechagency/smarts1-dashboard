// import React from "react";
// import { Modal, Form, Input, Button, Upload } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

// const EditModal = ({ isModalOpen, handleOk, handleCancel }) => {
//   const [form] = Form.useForm();

//   // Default values (could be fetched dynamically)
//   const initialValues = {
//     providersname: "John Doe",
//     email: "johndoe@gmail.com",
//     category: "Plumbing",
//     phoneNumber: "+1234567890",
//     address: "10 Warehouse Road, Apapa, Lagos",
//     earn: "$5000",
//   };

//   // Handle form submission
//   const onFinish = (values) => {
//     console.log("Updated Values:", values);
//     handleOk(); // Close modal after submission
//   };

//   return (
//     <Modal
//       title="Edit Service Provider"
//       open={isModalOpen}
//       onCancel={handleCancel}
//       footer={[
//         <Button key="cancel" onClick={handleCancel}>
//           Cancel
//         </Button>,
//         <Button key="submit" type="primary" onClick={() => form.submit()}>
//           Save Changes
//         </Button>,
//       ]}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         initialValues={initialValues}
//         onFinish={onFinish}
//       >
//         {/* Name */}
//         <Form.Item
//           label="Provider's Name"
//           name="providersname"
//           rules={[{ required: false, message: "Name is required" }]}
//         >
//           <Input placeholder="Enter provider's name" />
//         </Form.Item>

//         {/* Email */}
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             { required: false, type: "email", message: "Enter a valid email" },
//           ]}
//         >
//           <Input placeholder="Enter email" />
//         </Form.Item>

//         {/* Category */}
//         <Form.Item
//           label="Category"
//           name="category"
//           rules={[{ required: false, message: "Category is required" }]}
//         >
//           <Input placeholder="Enter category" />
//         </Form.Item>

//         {/* Phone Number */}
//         <Form.Item
//           label="Phone Number"
//           name="phoneNumber"
//           rules={[{ required: false, message: "Phone number is required" }]}
//         >
//           <Input placeholder="Enter phone number" />
//         </Form.Item>

//         {/* Address */}
//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: false, message: "Address is required" }]}
//         >
//           <Input placeholder="Enter address" />
//         </Form.Item>

//         {/* Earnings */}
//         <Form.Item
//           label="Earnings"
//           name="earn"
//           rules={[{ required: false, message: "Earnings are required" }]}
//         >
//           <Input placeholder="Enter earnings" />
//         </Form.Item>

//         {/* File Upload */}
//         <Form.Item label="Upload Profile Picture">
//           <Upload beforeUpload={() => false} maxCount={1}>
//             <Button icon={<UploadOutlined />}>Click to Upload</Button>
//           </Upload>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default EditModal;
import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ServiceEditModal = ({
  isModalOpen,
  handleCancel,
  providerData,
  onSave,
}) => {
  const [form] = Form.useForm();

  // Populate form with provider data when modal opens
  useEffect(() => {
    if (providerData) {
      form.setFieldsValue(providerData);
    }
  }, [providerData, form]);

  const handleFormSubmit = (values) => {
    const updatedProvider = { ...providerData, ...values };
    onSave(updatedProvider);
  };

  return (
    <Modal
      title="Edit Service Provider"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save Changes
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Provider's Name"
          name="providersname"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Earnings" name="earn" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Upload Profile Picture">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceEditModal;
