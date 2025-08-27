import React, { useState } from "react";
import {
  Collapse,
  Modal,
  Form,
  Input,
  ConfigProvider,
  message,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FaqPopover from "../../../components/common/PopContent";
import ButtonEDU from "../../../components/common/ButtonEDU";
import {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "../../../redux/apiSlices/faqSlice";
import toast from "react-hot-toast";

const defaultText = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

// FAQ Header Component
export const HeadFaq = ({ showModal }) => (
  <div className="flex justify-between items-center py-5">
    <h1 className="text-[20px] font-medium">FAQ</h1>
    <button
      className="bg-smart text-white px-4 py-2 text-sm rounded-md shadow-md"
      onClick={showModal}
    >
      <PlusOutlined size={24} className="mr-2" />
      Add New
    </button>
  </div>
);

// FAQ Collapse Component
export default function FaqCollapse() {
  const [activeKeys, setActiveKeys] = useState(["1"]);

  const { data: faqData, refetch } = useGetFAQQuery();
  const [addFAQ] = useAddFAQMutation();
  const [updateFAQ ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation()

  const [faqs, setFaqs] = useState([
    { key: "1", question: "What is a dog?", answer: defaultText },
    { key: "2", question: "What is a cat?", answer: defaultText },
    { key: "3", question: "What is a bird?", answer: defaultText },
  ]);

  // State for Add/Edit FAQ Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFaq, setEditFaq] = useState(null);
  const [form] = Form.useForm(); 

  // State for Delete Confirmation Modal
  const [deleteFaq, setDeleteFaq] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Open modal for adding a new FAQ
  const showAddModal = () => {
    setEditFaq(null);
    form.resetFields(); 
    setIsModalOpen(true);
  };

  // Open modal for editing an existing FAQ
  const showEditModal = (faq) => {
    setEditFaq(faq);
    form.setFieldsValue(faq); 
    setIsModalOpen(true);
  };

  // Open delete confirmation modal
  const showDeleteModal = (faq) => {
    setDeleteFaq(faq);
    setIsDeleteModalOpen(true);
  };

  // Handle Save (Both Add & Edit)
  const handleSave = async (values) => {    
    try {
      if (editFaq) {
        
      const res = await updateFAQ({id: editFaq?._id, data: values});

        console.log("update faq", res);
        toast.success("FAQ added successfully!");
        refetch()
        setIsModalOpen(false);
      } else {
        const res = await addFAQ(values);

        console.log("add faq", res);
        toast.success("FAQ added successfully!");
        refetch()
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Handle Delete FAQ
  const handleDelete = async () => {
    try {
      const res = await deleteFAQ(deleteFaq?._id);
      console.log("delete faq", res);
      toast.success(res?.data?.message)
      refetch()
      setIsDeleteModalOpen(false);      
    } catch (error) {
      console.log("error", error);      
      setIsDeleteModalOpen(false);
      toast.success("FAQ delete successfully!");
    }    
  };

  // Generate FAQ items
  const getItems = () =>
    faqData?.data?.result.map(({ _id, question, answer, type }) => ({
      _id,
      label: (
        <div className="flex items-center justify-between ">
          <div className="">
            {question}
            <span className="ml-2 text-orange-600">({type})</span>
          </div>
          <FaqPopover
            onEdit={() => showEditModal({ _id, question, answer, type, })}
            onDelete={() => showDeleteModal({ _id, question })}
          />
        </div>
      ),
      children: <p className="border-l-2 border-[#18a0fb] pl-4">{answer}</p>,
    }));

  return (
    <div className="h-full ">
      <HeadFaq showModal={showAddModal} />

      <Collapse
        bordered={false}
        activeKey={activeKeys}
        onChange={setActiveKeys}
        expandIcon={({ isActive }) => (
          <div
            className="flex items-center justify-center w-6 h-6 transition-transform duration-300 "
            style={{ transform: `rotate(${isActive ? 180 : 0}deg)` }}
          >
            <PlusOutlined className="text-smart" />
          </div>
        )}
        items={getItems()}
        className="shadow-md bg-white"
      />

      {/* Add/Edit FAQ Modal */}
      <Modal
        title={editFaq ? "Edit FAQ" : "Add FAQ"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        footer={null}
        width={600} // wider modal
      >
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
                itemMarginBottom: 12,
              },
              Input: {
                borderRadius: 8,
                controlHeight: 44, // makes Input height consistent
              },
              Select: {
                borderRadius: 8,
                controlHeight: 44, // fixes h-12 issue
              },
              TextArea: {
                borderRadius: 8,
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            className="flex flex-col gap-5"
          >
            {/* Question */}
            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please enter the question" }]}
            >
              <Input placeholder="Enter the question" />
            </Form.Item>

            {/* Type */}
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select a type" }]}
            >
              <Select
                placeholder="Select type"
                options={[
                  { label: "Service", value: "Service" },
                  { label: "Settings", value: "Settings" },
                ]}
              />
            </Form.Item>

            {/* Answer */}
            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: "Please enter the answer" }]}
            >
              <Input.TextArea placeholder="Enter the answer" rows={5} />
            </Form.Item>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4">
              <ButtonEDU
                actionType="cancel"
                onClick={() => {
                  form.resetFields();
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </ButtonEDU>
              <ButtonEDU actionType="save" htmlType="submit">
                Save
              </ButtonEDU>
            </div>
          </Form>
        </ConfigProvider>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete FAQ"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        centered
        footer={null}
      >
        <p>Are you sure you want to delete this FAQ?</p>
        <div className="flex justify-center gap-4 mt-4">
          <ButtonEDU
            actionType="cancel"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </ButtonEDU>
          <ButtonEDU actionType="delete" onClick={handleDelete}>
            Delete
          </ButtonEDU>
        </div>
      </Modal>
    </div>
  );
}
