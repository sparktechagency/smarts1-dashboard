import React, { useState } from "react";
import { Button, Dropdown, Form, Input, Menu, ConfigProvider, message } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegPaperPlane } from "react-icons/fa6";
import { usePushNotificationMutation } from "../../../redux/apiSlices/notificationSlice";
// import purle from "../../../assets/gtdandy/purple.jpg";
function PushNotification() {
  const [form] = Form.useForm();
  const [selectedRecipient, setSelectedRecipient] = useState("All Users");
  const [pushNotification, {isLoading}]  = usePushNotificationMutation();


  // Dropdown menu items
  const items = [
    {
      label: "All Users",
      key: "0",
    },
    {
      label: "Customers Only",
      key: "1",
    },
    {
      label: "Service Providers Only",
      key: "2",
    },
  ];

  // Handle dropdown selection
  const handleMenuClick = (e) => {
    const selected = items.find((item) => item.key === e.key);
    if (selected) {
      setSelectedRecipient(selected.label);
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    const data = {            
      title: "Admin Notification",
      heading: values?.heading,
      message: values?.message
    }
    try {
      const res = await pushNotification(data);

      message.success(res?.data?.message);
      form.resetFields()
      
    } catch (error) { 
      console.log("error notification", error);      
    }
  };

  return (
    <>
      <div className="p-10 bg-white shadow-md rounded-md max-w-lg mx-auto">
        <h1 className="text-[24px] font-semibold mb-4 border-b-2">
          Send Push Notification
        </h1>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelFontSize: 16,
              },
            },
          }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Title */}
            <Form.Item
              label="Title"
              name="heading"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                placeholder="Enter notification title..."
                className="h-11"
              />
            </Form.Item>

            {/* Message Details */}
            <Form.Item
              label="Message Details"
              name="message"
              rules={[{ required: true, message: "Message is required" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter notification message..."
              />
            </Form.Item>

            {/* Recipient Type Dropdown */}
            <Form.Item label="Select Recipient Type" name="recipient">
              <Dropdown
                overlay={<Menu onClick={handleMenuClick} items={items} />}
                trigger={["click"]}
                className="h-11"
              >
                <Button className="w-full text-left bg-gradient-to-b from-sky-50 via-white to-sky-50 ">
                  {selectedRecipient}
                  <IoMdArrowDropdown size={20} />
                </Button>
              </Dropdown>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="block"
                htmltype="submit"
                className="w-full bg-smart hover:bg-smart/90 text-white h-11 text-base gap-4"
              >
                Send Notification
                <FaRegPaperPlane />
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
}

export default PushNotification;
