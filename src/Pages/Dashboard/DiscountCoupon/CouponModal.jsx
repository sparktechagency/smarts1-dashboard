import React, { useState, useEffect } from "react";
import {
  ConfigProvider,
  Form,
  Modal,
  Select,
  InputNumber,
  Input,
  Radio,
  DatePicker,
  Button,
  Checkbox,
  message,
} from "antd";
import ButtonEDU from "../../../components/common/ButtonEDU";

function CouponModal({ isModalOpen, setIsModalOpen, isEditing, couponData }) {
  const [selectedService, setSelectedService] = useState("allServices");
  const [searchQuery, setSearchQuery] = useState("");
  const [services] = useState([
    "Residential cleaning",
    "Deep cleaning",
    "Spring cleaning",
    "Laundry services",
    "Dry cleaning services",
    "Green cleaning",
    "Sanitization and disinfection",
    "Ceiling and wall cleaning",
  ]);

  const [offerName, setOfferName] = useState("");
  const [discountType, setDiscountType] = useState("fixedAmount");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  // Populate the form with existing coupon data when editing
  useEffect(() => {
    if (isEditing && couponData) {
      setOfferName(couponData.offerName);
      setDiscountType(couponData.discountType);
      setDiscountValue(couponData.discountValue);
      setStartDate(couponData.startDate);
      setEndDate(couponData.endDate);
      setSelectedService(couponData.selectedService);
      setSelectedServices(couponData.selectedServices || []);
    }
  }, [isEditing, couponData]);

  const handleChangeSelect = (value) => {
    setDiscountType(value);
  };

  const onChangeStartDate = (date, dateString) => {
    setStartDate(date);
  };

  const onChangeEndDate = (date, dateString) => {
    setEndDate(date);
  };

  const handleRadioChange = (e) => {
    setSelectedService(e.target.value);
    if (e.target.value === "allServices") {
      setSelectedServices(services);
    } else {
      setSelectedServices([]);
    }
  };

  const handleServiceSelection = (checkedValues) => {
    setSelectedServices(checkedValues);
  };

  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (
      !offerName ||
      !discountType ||
      !discountValue ||
      !startDate ||
      !endDate ||
      (selectedService === "customServices" && selectedServices.length === 0)
    ) {
      message.error("Please fill in all required fields.");
      return;
    }

    const couponData = {
      offerName,
      discountType,
      discountValue,
      selectedService,
      selectedServices,
      startDate,
      endDate,
    };

    console.table(couponData);

    if (isEditing) {
      // Handle editing logic here (e.g., update coupon data)
      console.log("Updating coupon data...");
    } else {
      // Handle adding new coupon here
      console.log("Adding new coupon...");
    }

    setOfferName("");
    setDiscountType("");
    setDiscountValue("");
    setSelectedService("allServices");
    setSelectedServices([]);
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");

    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {},
        },
      }}
    >
      <Modal
        centered
        width={700}
        title={isEditing ? "Edit Coupon Code" : "Add Coupon Code"}
        visible={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" className="flex flex-col" onFinish={handleSave}>
          <Form.Item label="Offer Name" className="mb-2" required>
            <Input
              placeholder="Enter Offer Name"
              className="h-9"
              value={offerName}
              onChange={(e) => setOfferName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Discount Type" className="mb-2" required>
            <Select
              className="w-full h-9"
              placeholder="Choose a discount type"
              defaultValue="fixedAmount"
              value={discountType}
              onChange={handleChangeSelect}
              options={[
                {
                  value: "fixedAmount",
                  label: "Fixed Amount",
                },
                {
                  value: "percentage",
                  label: "Percentage",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={
              discountType === "fixedAmount"
                ? "Fixed Value"
                : "Percentage Value"
            }
            className="mb-2"
            required
          >
            <InputNumber
              type="number"
              controls={false}
              placeholder={
                discountType === "fixedAmount"
                  ? "Fixed Value"
                  : "Percentage Value"
              }
              className="w-full h-9 flex items-center"
              value={discountValue}
              onChange={setDiscountValue}
            />
          </Form.Item>
          <Form.Item label="Applicable Services" className="mb-2" required>
            <Radio.Group
              name="radiogroup"
              value={selectedService}
              onChange={handleRadioChange}
              options={[
                {
                  value: "allServices",
                  label: "All Services",
                },
                {
                  value: "customServices",
                  label: "Custom Services",
                },
              ]}
            />
          </Form.Item>
          {selectedService === "customServices" && (
            <Form.Item label="Select Services" className="mb-2">
              <Input
                placeholder="Search Services"
                className="h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex flex-col h-24 overflow-y-auto mt-1 border rounded pl-2">
                <Checkbox.Group
                  options={filteredServices}
                  value={selectedServices}
                  onChange={handleServiceSelection}
                />
              </div>
            </Form.Item>
          )}
          <div className="w-full flex gap-4 mb-4">
            <Form.Item label="Start Date" className="w-full mb-2" required>
              <DatePicker
                value={startDate}
                onChange={onChangeStartDate}
                className="w-full h-9"
              />
            </Form.Item>
            <Form.Item label="End Date" className="w-full mb-2" required>
              <DatePicker
                value={endDate}
                onChange={onChangeEndDate}
                className="w-full h-9"
              />
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
              <ButtonEDU actionType="save" htmlType="submit">
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
