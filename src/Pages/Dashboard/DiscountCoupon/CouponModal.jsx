import React, { useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Modal,
  Select,
  InputNumber,
  Input,
  Radio,
  DatePicker,
  message,
} from "antd";
import ButtonEDU from "../../../components/common/ButtonEDU";
import {
  useCreateCouponMutation,  
  useUpdateCouponMutation,
} from "../../../redux/apiSlices/couponSlice";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useGetServiceCategoryQuery } from "../../../redux/apiSlices/categorySlice";

function CouponModal({
  isModalOpen,
  setIsModalOpen,
  isEditing,
  couponData,
  refetch,
}) {
  const [form] = Form.useForm();
  const { data: serviceCategory } = useGetServiceCategoryQuery();
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  // populate when editing
  useEffect(() => {

    if (couponData) {
      form.setFieldsValue({
        code: couponData.code,
        name: couponData.name,
        discountType: couponData.discountType,
        discountValue: couponData.discountValue,
        serviceCategory: couponData.serviceCategory?._id,
        startDate: dayjs(couponData.startDate),
        endDate: dayjs(couponData.endDate),
      });
    } else {
      form.resetFields();
    }
  }, [isEditing, couponData, form]);

  const handleSave = async (values) => {
  if (
    !values.name ||
    !values.code ||
    !values.discountType ||
    !values.discountValue ||
    !values.serviceCategory
  ) {
    message.error("Please fill in all required fields.");
    return;
  }

  const payload = {
    ...values,
    startDate: values.startDate.format("YYYY-MM-DD"),
    endDate: values.endDate.format("YYYY-MM-DD"),
  };

  try {
    let res;
    if (couponData) {
      res = await updateCoupon(payload);
    } else {
      res = await createCoupon(payload);
    }

    // Check for errors in RTK Query response
    if (res?.error) {
      toast.error(res.error?.data?.message || "Something went wrong");
      console.log("coupon save error", res.error);
      return;
    }

    console.log("courpons", res);
    
    // Success
    refetch();
    setIsModalOpen(false);
    form.resetFields();
  } catch (error) {
    // This catch will rarely run unless there’s a JS error, not an API error
    console.log("unexpected error", error);
    toast.error("Unexpected error occurred");
  }
};

  return (
    <ConfigProvider>
      <Modal
        centered
        width={700}
        title={couponData ? "Edit Coupon Code" : "Add Coupon Code"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <Form.Item
            label="Coupon Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Coupon Name" className="h-9" />
          </Form.Item>

          <Form.Item
            label="Coupon Code"
            name="code"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Coupon Code" className="h-9" />
          </Form.Item>

          <Form.Item
            label="Discount Type"
            name="discountType"
            rules={[{ required: true }]}
          >
            <Select
              className="w-full h-9"
              options={[
                { value: "Flat", label: "Flat" },
                { value: "Percentage", label: "Percentage" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Discount Value"
            name="discountValue"
            rules={[{ required: true }]}
          >
            <InputNumber
              type="number"
              controls={false}
              className="w-full h-9 flex items-center"
            />
          </Form.Item>

          <Form.Item
            label="Select Service"
            name="serviceCategory"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              {serviceCategory?.result?.map((service) => (
                <Radio key={service._id} value={service._id}>
                  {service.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <div className="w-full flex gap-4 mb-4">
            <Form.Item
              label="Start Date"
              name="startDate"
              className="w-full"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full h-9" />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="endDate"
              className="w-full"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full h-9" />
            </Form.Item>
          </div>

          <Form.Item>
            <div className="w-full flex items-end gap-4">
              <ButtonEDU
                actionType="cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </ButtonEDU>
              <ButtonEDU
                actionType="save"
                htmlType="submit"
                loading={isLoading}
              >
                Save
              </ButtonEDU>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default CouponModal;
