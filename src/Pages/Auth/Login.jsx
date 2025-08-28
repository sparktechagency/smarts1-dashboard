import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";
import { useLoginMutation } from "../../redux/apiSlices/authSlice";
import toast from "react-hot-toast";
import { useForm } from "antd/es/form/Form";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [login, {isLoading}] = useLoginMutation();

  const [form] = useForm()

    useEffect(() => {
    const storedData = localStorage.getItem("auth");
    if (storedData) {
      form.setFieldsValue(JSON.parse(storedData));
    }
  }, []);


  const onFinish = async (values) => {

    try {
      console.log("values", values)
      // const res = await login(values);
  const res = await login(values).unwrap();  
    
    console.log("res", res);
    
    toast.success(res?.message);
    Cookies.set("accessToken", res?.data?.accessToken);
    Cookies.set("refreshToken", res?.data?.refreshToken);
  
    if (res?.success && values?.remember) {
      localStorage.setItem("auth",JSON.stringify({email: values?.email, password: values?.password,}));
    }

    navigate("/")

    form.resetFields();
    } catch (error) {
      console.log("sdafasdf", error)
      //  toast.error((error)?.data?.message)
       toast.error(error)
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-[25px] font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label={
            <p className="text-black font-normal text-base">Enter Your Email</p>
          }
          rules={[
            {
              required: true,
              message: `Please Enter your email`,
            },
          ]}
        >
          <Input
            placeholder={`Enter Your email`}
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<p className="text-black font-normal text-base">Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Enter your password"
            style={{
              height: 45,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Form.Item
            style={{ marginBottom: 0 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot text-smart/80 hover:text-smart font-semibold"
            href="/auth/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <button
            htmlType="submit"
            type="submit"
            style={{
              width: "100%",
              height: 47,
              color: "white",
              fontWeight: "400px",
              fontSize: "18px",

              marginTop: 20,
            }}
            className="flex items-center justify-center bg-smart hover:bg-smart/90 rounded-lg text-base"
          >
            {/* {isLoading? < Spinner/> : "Sign in"} */} Sign in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
