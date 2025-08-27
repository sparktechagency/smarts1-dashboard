import React from "react";
import { Modal, Form, Input, Upload, ConfigProvider, message } from "antd";
import { CloseCircleOutlined, CloudUploadOutlined } from "@ant-design/icons";
import ButtonEDU from "../../../components/common/ButtonEDU";
import { imageUrl } from "../../../redux/api/baseApi";

function EditSpecServiceModal({
  isEditing,
  isModalOpen,
  setIsModalOpen,
  uploadedImage,
  setUploadedImage,
  form,
  handleFormSubmit,
  handleCancel,
  handleImageUpload,
}) {
  const handleFormSubmitWithValidation = async (values) => {


    if (!values.name || !values.serviceCharge) {
      message.error("Please fill in all required fields!");
      return;
    }

    // Call the provided handleFormSubmit function
    handleFormSubmit(values);
  };

  return (
    <Modal
      title={isEditing ? "Edit Service" : "Add Service"}
      open={isModalOpen}
      onCancel={handleCancel}
      centered
      footer={null}
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmitWithValidation}
        >
          <Form.Item
            label="Service Name"
            name="name"
            rules={[{ required: true, message: "Please enter Service Name!" }]}
          >
            <Input placeholder="Enter Service name" className="h-12" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="serviceCharge"
            rules={[{ required: true, message: "Please enter Price!" }]}
          >
            <Input placeholder="Enter price" className="h-12" />
          </Form.Item>

          <Form.Item label="Upload Image">
            {uploadedImage ? (
              <div className="relative">
                {/* <img src={`${imageUrl}${uploadedImage}`} alt="Uploaded" width={100} /> */}
                <img 
                src={uploadedImage && uploadedImage.startsWith('data:image') ? uploadedImage : `${imageUrl}${uploadedImage}`}
                 alt="Uploaded" width={100} />
                <CloseCircleOutlined
                  className="absolute top-0 right-0 text-red-500 cursor-pointer"
                  onClick={() => setUploadedImage(null)}
                />
              </div>
            ) : (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                onChange={handleImageUpload}
              >
                <button style={{ border: 0, background: "none" }}>
                  <CloudUploadOutlined style={{ fontSize: 24 }} />
                  <div>Upload</div>
                </button>
              </Upload>
            )}
          </Form.Item>

          <div className="flex justify-end">
            <ButtonEDU actionType="save">Save</ButtonEDU>
          </div>
        </Form>
      </ConfigProvider>
    </Modal>
  );
}

export default EditSpecServiceModal;
