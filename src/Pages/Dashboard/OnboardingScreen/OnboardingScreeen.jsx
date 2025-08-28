import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Image,
  Input,
  Modal,
  Table,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ButtonEDU from "../../../components/common/ButtonEDU";
import GetPageName from "../../../components/common/GetPageName";
import { imageUrl } from "../../../redux/api/baseApi";
import { useDeleteImageMutation, useUpdateImageMutation } from "../../../redux/apiSlices/settingSlice";
import {
  useAddSliderMutation,
  useGetOnBoardImageQuery
} from "../../../redux/apiSlices/sliderSlice";

function OnboardingScreeen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [editingKey, setEditingKey] = useState(null);  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);

  const { data: slidersData, refetch } = useGetOnBoardImageQuery();
  const [addSlider] = useAddSliderMutation();

  const [updateImage] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation()

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
  try {
    const formData = new FormData();

    if (uploadFile && typeof uploadFile !== "string") {
      formData.append("image", uploadFile);
    }

    formData.append(
      "data",
      JSON.stringify({
        title: values?.title,
        description: values?.description,
        imageType: "onboardingImage",
        altText: values?.title,
      })
    );

    let res;
    if (isEditing) {
      // Update existing row
      res = await updateImage({ id: editingKey, formData });
      console.log("update slider", res);
      refetch()
    } else {
      // Add new row
      res = await addSlider(formData);
      console.log("add slider", res);
      refetch()
    }

    if (res?.error) {
      message.error(res?.error?.data?.message || "Something went wrong!");
    } else {
      message.success(
        res?.data?.data?.message ||
          (isEditing ? "Slider updated successfully!" : "Slider added successfully!")
      );
    }
    handleCancel();
  } catch (error) {
    console.error("Slider error:", error);
    message.error("Unexpected error occurred!");
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
    setUploadedImage(null);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingKey(record?._id);
    setUploadedImage(record?.image);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key, name) => {
    console.log("sdfsdf", key);
    
    setDeletingRecord({ key, name });
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = async () => {
    try {
      const res = await deleteImage(deletingRecord?.key);

      console.log("delete image", res);    
       message.success("Slider deleted successfully!");
    setIsDeleteModalOpen(false); 
      refetch() 
    } catch (error) {
      console.log("slider delete error", error);      
    }
   
  };

  const onCancelDelete = () => {
    message.info("Delete action canceled.");
    setIsDeleteModalOpen(false);
  };

  const columns = [
    {
      title: "Sl",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => (
        <p className=" text-black text-[16px]">
          {index < 10 ? index + 1 : index + 1}
        </p>
      ),
    },
    {
      title: "Slider Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Image
          width={60}
          height={35}
          src={`${imageUrl}${image}`}
          className="rounded-md"
          alt="slider"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-4">
          <FiEdit2
            style={{ fontSize: 24 }}
            className="text-black hover:text-blue-500 cursor-pointer"
            onClick={() => handleEdit(record)}
          />
          <RiDeleteBin6Line
            style={{ fontSize: 24 }}
            className="text-black hover:text-red-500 cursor-pointer"
            onClick={() => handleDelete(record._id, record.title)}
          />
        </div>
      ),
    },
  ];

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
            cellPaddingBlock: 10,
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
          },
          Form: {
            labelFontSize: 16,
          },
          Button: {
            defaultHoverBg: "#18a0fb ",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "#18a0fb ",
          },
        },
      }}
    >
      <div className=" py-5">
        <div className="flex justify-between items-center py-5">
          <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
          <Button
            icon={<PlusOutlined className="mr-2" />}
            className="bg-smart h-9 text-white px-4 py-2.5 rounded-md flex items-center"
            onClick={showModal}
          >
            Add New
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={slidersData?.data?.result}
          pagination={{
            pageSizeOptions: [5, 10, 15, 20],
            defaultPageSize: 5,
            position: ["bottomCenter"],
          }}
        />
        {/* </ConfigProvider> */}

        {/* Delete Confirmation Modal */}
        <Modal
          title="Delete Confirmation"
          visible={isDeleteModalOpen}
          onCancel={onCancelDelete}
          footer={null}
          centered
        >
          <div className="flex flex-col justify-between gap-5">
            <div className="flex justify-center">
              Are you sure you want to delete{" "}
              <span className="font-bold ml-1">{deletingRecord?.name}</span>?
            </div>
            <div className="flex justify-center gap-4">
              <ButtonEDU actionType="cancel" onClick={onCancelDelete}>
                Cancel
              </ButtonEDU>
              <ButtonEDU actionType="delete" onClick={onConfirmDelete}>
                Delete
              </ButtonEDU>
            </div>
          </div>
        </Modal>

        {/* Modal Form */}
        <Modal
          title={isEditing ? "Edit Slider" : "Add Slider"}
          open={isModalOpen}
          onCancel={handleCancel}
          centered
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input placeholder="Enter slider name" className="h-12" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ message: "Please enter the name!" }]}
            >
              <Input placeholder="Enter slider name" className="h-12" />
            </Form.Item>

            <Form.Item label="Upload Image">
              {uploadedImage ? (
                <div className="relative">
                  {/* <img src={`${imageUrl}${uploadedImage}`} alt="Uploaded" width={100} /> */}
                  <img
                    src={
                      uploadedImage && uploadedImage.startsWith("data:image")
                        ? uploadedImage
                        : `${imageUrl}${uploadedImage}`
                    }
                    alt="Uploaded"
                    width={100}
                  />
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
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default OnboardingScreeen;
