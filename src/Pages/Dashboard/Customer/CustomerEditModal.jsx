import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CustomerEditModal = ({
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
      title="Edit Customer"
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
          label="Customer Name"
          name="customerName"
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
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Spent" name="spent" rules={[{ required: true }]}>
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

export default CustomerEditModal;
