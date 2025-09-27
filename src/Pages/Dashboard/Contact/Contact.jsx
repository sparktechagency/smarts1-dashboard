import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Flex } from "antd";
import { LiaMailchimp, LiaPhoneVolumeSolid } from "react-icons/lia";
import { PiMapPinAreaLight } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import ButtonEDU from "../../../components/common/ButtonEDU";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../../redux/apiSlices/cmsSlice";
import toast from "react-hot-toast";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateContect] = useUpdateContactMutation();
  const { data: contactData } = useGetContactQuery();
  
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });
  
  const [editedContact, setEditedContact] = useState({ ...contactInfo });
  const showModal = () => {
    setEditedContact({ ...contactInfo }); // Reset edits to original contact info
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setContactInfo({
      phone: contactData?.data?.phone,
      email: contactData?.data?.email,
      address: contactData?.data?.address,
    });    
  }, [contactData]);
  

  const handleUpdate = async () => {
    try {
      const data = { contactInfo: editedContact };
      const res = await updateContect(data);
      console.log("updateContect", res);
      toast.success("Contact Update Successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log("contact error", error);
    }
    // setIsModalOpen(false);
  };

  const handleChange = (key, value) => {
    setEditedContact((prev) => ({ ...prev, [key]: value }));
  };

  const contactFields = [
    { key: "phone", label: "Phone Number", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "address", label: "Address", type: "text" },
  ];

  return (
    <div className="py-5">
      <h1 className="text-[20px] font-medium mb-5">Contact</h1>
      <Flex vertical justify="center" gap={30} className="w-full">
        <div className="flex items-center justify-normal bg-white p-12 w-full max-w-[800px] gap-4 rounded-xl ">
          <div className="flex items-center gap-10">
          <div className="">
            <div className="bg-white flex justify-center rounded-xl shadow-[0px_0px_15px_4px_rgba(0,_0,_0,_0.1)] p-4 hover:bg-smart text-smart hover:text-white">
                <LiaPhoneVolumeSolid size={50} />
              </div>
              <div className="flex flex-col items-center mt-5">
                <h2 className="text-xl font-semibold">Phone</h2>
                <p className="text-gray-600">{contactInfo?.phone}</p>
              </div>
          </div>
          <div className="">
            <div className="bg-white flex justify-center rounded-xl text-center shadow-[0px_0px_15px_4px_rgba(0,_0,_0,_0.1)] p-4 hover:bg-smart text-smart hover:text-white">
                <IoMailOutline size={50} />
              </div>
              <div className="flex flex-col items-center mt-5">
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-gray-600">{contactInfo?.email}</p>
              </div>
          </div>
          <div className="">
            <div className="bg-white flex justify-center rounded-xl shadow-[0px_0px_15px_4px_rgba(0,_0,_0,_0.1)] p-4 hover:bg-smart text-smart hover:text-white">
                <PiMapPinAreaLight size={50} className="text-center" />
              </div>
              <div className="flex flex-col items-center mt-5">
                <h2 className="text-xl font-semibold">Address</h2>
                <p className="text-gray-600">{contactInfo?.address}</p>
              </div>
          </div>
          </div>
        </div>
        <button
          onClick={showModal}
          className="w-full max-w-[800px] h-12 bg-white rounded-lg border border-1 border-smart text-smart font-bold tracking-wider hover:bg-smart hover:text-white hover:transition-all duration-500"
        >
          Edit Info
        </button>
      </Flex>

      {/* Edit Contact Modal */}
      <Modal
        title="Edit Contact"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
      >
        <div className="py-5">
          <Form
            layout="vertical"
            onFinish={handleUpdate}
            initialValues={editedContact}
          >
            {contactFields.map((field, i) => (
              <Form.Item
                key={i}
                label={field.label}
                name={field.key}
                rules={[
                  {
                    required: true,
                    message: `Please enter the ${field.label.toLowerCase()}`,
                  },
                  field.key === "email" && {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:
                      "Please enter a valid email address (e.g. test@example.com)",
                  },
                ].filter(Boolean)}
              >
                <Input
                  type={field.type}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="h-12 rounded-xl"
                  value={editedContact[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              </Form.Item>
            ))}

            <div className="flex justify-end gap-4">
              <ButtonEDU actionType="cancel" onClick={handleCancel}>
                Cancel
              </ButtonEDU>
              <ButtonEDU actionType="update" htmltype="submit">
                Update
              </ButtonEDU>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
