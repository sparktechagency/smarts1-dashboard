import React, { useEffect, useState } from "react";
import man from "../../../assets/man.png";
import { FaFeather } from "react-icons/fa6";
import { Avatar, Button, ConfigProvider, Form, Input, Upload, message } from "antd";
import { HiMiniPencil } from "react-icons/hi2";

import { imageUrl } from "../../../redux/api/baseApi";

import { useUser } from "../../../provider/User";
import { useGetProfileQuery, useUpdateAdminProfileMutation } from "../../../redux/apiSlices/settingSlice";

function Profile() {
  const [showButton, setShowButton] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const { data: profileData, refetch } = useGetProfileQuery();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    if (profileData) {      
      
      setUser({
        name: profileData?.data?.full_name || "",
        email: profileData?.data?.email || "",
        phone: profileData?.data?.phone || "",
        role: profileData?.data?.role || "",
        image: profileData?.data?.image || "",
      });
    }
  }, [profileData]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#49b0f1",
            defaultActiveBg: "#49b0f1",
            defaultHoverBg: "#49b0f1",
            defaultHoverColor: "#ffffff",
          },
        },
      }}
    >
      <div className="bg-quilocoP w-4/5 min-h-72 flex flex-col justify-start items-center px-4 border bg-white rounded-lg">
        <div className="relative mt-6 flex flex-col items-center justify-center">
          <Avatar
            size={90}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : user?.image
                ? `${imageUrl}${user.image}`
                : "/placeholder.png"
            }

            className="border rounded-full border-slate-500 !object-cover"
          />
          {showButton && (
            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("You can only upload image files!");
                  return Upload.LIST_IGNORE;
                }
                setUploadedImage(file);
                return false;
              }}
            >
              <button>
                <FaFeather
                  size={30}
                  className="text-white absolute top-16 left-20 border rounded-full bg-smart p-1"
                />
              </button>
            </Upload>
          )}
          <h3 className="text-black text-xl mt-2">{user?.name}</h3>
        </div>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              setShowButton(!showButton);
              if (!showButton) setUploadedImage(null);
            }}
            icon={
              showButton ? null : (
                <HiMiniPencil size={20} className="text-white" />
              )
            }
            className="bg-smart/80 border-none text-white min-w-20 min-h-8 text-xs rounded-lg"
          >
            {showButton ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        <ProfileDetails
        profileRefetch={refetch}
          showButton={showButton}
          setShowButton={setShowButton}
          user={user}
          uploadedImage={uploadedImage}
        />
      </div>
    </ConfigProvider>
  );
}

export default Profile;

const ProfileDetails = ({ showButton, profileRefetch, setShowButton, user, uploadedImage }) => {
  const [form] = Form.useForm();
  const { updateUser } = useUser();
const [updateAdminProfile] = useUpdateAdminProfileMutation()
  
  // ✅ use RTK mutation
  

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
  }, [user, form]);
  
  const handleFinish = async (values) => {
    try {           
      const formData = new FormData();

      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      const data = {
        full_name: values?.name,
        phone: values?.phone,
      };

      formData.append("data", JSON.stringify(data));

      const response = await updateAdminProfile(formData).unwrap();
      if (response.success) {
        message.success("Profile updated successfully!");
        setShowButton(false);        
        profileRefetch()        
        if (updateUser && response.data) {
          updateUser(response.data); // ✅ update global context
        }
      }
    } catch (error) {
      message.error(error?.data?.message);
      console.log("error", error);
      
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#49b0f1",
            defaultActiveBg: "#49b0f1",
            defaultHoverBg: "#49b0f1",
            defaultHoverColor: "#ffffff",
          },
          Input: {
            colorText: "black",
            colorBgBase: "white",
            colorBorder: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="w-full"
      >
        <div className="flex justify-between gap-2 w-full">
          <Form.Item
            name="name"
            label={<p className="text-black">Name</p>}
            className="w-full"
          >
            <Input
              className="bg-white border border-black h-12 rounded-lg"
              readOnly={!showButton}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<p className="text-black">Email</p>}
            className="w-full"
          >
            <Input
              className="bg-white border border-black h-12 rounded-lg"
              readOnly
            />
          </Form.Item>
        </div>

        <div className="flex justify-between gap-2 w-full">
          <Form.Item
            name="phone"
            label={<p className="text-black">Phone</p>}
            className="w-full"
          >
            <Input
              className="bg-white border border-black h-12 rounded-lg"
              readOnly={!showButton}
            />
          </Form.Item>
          <Form.Item
            name="role"
            label={<p className="text-black">Role</p>}
            className="w-full"
          >
            <Input
              className="bg-white border border-black h-12 rounded-lg"
              readOnly
            />
          </Form.Item>
        </div>

        {showButton && (
          <Form.Item>
            <Button
              block
              htmltype="submit"              
              className="bg-smart/80 border-none text-white min-w-20 min-h-10 text-xs rounded-lg"
            >
             Save Changes
            </Button>
          </Form.Item>
        )}
      </Form>
    </ConfigProvider>
  );
};
