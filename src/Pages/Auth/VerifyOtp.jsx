import { Button, Form, message, Typography } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import {
  useForgotPasswordMutation,
  useOtpVerifyMutation,
} from "../../redux/apiSlices/authSlice";
const { Text } = Typography;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify] = useOtpVerifyMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const onFinish = async () => {
    try {
      const res = await otpVerify({ email: email, oneTimeCode: Number(otp) });  
      console.log("fsadfsad", res);
          
      if (res?.error) {
        message.error(res?.error?.data?.message);
      } else {
        localStorage.setItem("resetToken", res?.data?.data?.verifyToken);
        navigate(`/auth/reset-password?email=${email}`);
      }
    } catch (error) {
      console.log("verify error", error);
    }
  };

  const handleResendEmail = async () => {
    const res = await forgotPassword({ email });
    console.log("forgoty values ", res);
      message.success("OTP has been sent to your email");
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
        <p className="w-[80%] mx-auto">
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </p>
      </div>

      <Form layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputStyle={{
              height: 50,
              width: 50,
              borderRadius: "8px",
              margin: "16px",
              fontSize: "20px",
              border: "1px solid #18a0fb ",
              color: "#18a0fb",
              outline: "none",
              marginBottom: 10,
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <Text>Don't received code?</Text>

          <p
            onClick={handleResendEmail}
            className="login-form-forgot font-medium"
            style={{ color: "#18a0fb ", cursor: "pointer" }}
          >
            Resend
          </p>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              height: 45,
              border: "1px solid #18a0fb ",
              outline: "none",
              boxShadow: "none",
              background: "#18a0fb ",
              color: "white",
            }}
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOtp;
