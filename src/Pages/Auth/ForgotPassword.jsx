import { Button, Form, Input, ConfigProvider, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/apiSlices/authSlice";

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation()

  const onFinish = async (values) => {    
    try {
      const res =  await forgotPassword(values)
      console.log("forgoty values ", res );
      
      if(res?.error?.data?.message){
        message.error(res?.error?.data?.message)
      }else{
        message.success(res?.data?.message)
        navigate(`/auth/verify-otp?email=${values?.email}`)
      }
    } catch (error) {
      console.log("forrgot error", error?.data);
      
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
        <p className="w-[90%] mx-auto text-base">
          Enter your email below to reset your password
        </p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: "black",
            },
          },
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<p className="text-base font-normal">Email</p>}
            name="email"
            id="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              style={{
                height: 45,
                border: "1px solid #d9d9d9",
                outline: "none",
                boxShadow: "none",
              }}
            />
          </Form.Item>

          <Form.Item>
            <button
              htmlType="submit"
              type="submit"
              style={{
                width: "100%",
                height: 45,
                color: "white",
                fontWeight: "400px",
                fontSize: "18px",

                marginTop: 20,
              }}
              className="flex items-center justify-center bg-smart rounded-lg"
            >
              Send OTP
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ForgotPassword;
