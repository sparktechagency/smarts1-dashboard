// import React, { useState } from "react";
// import {
//   ConfigProvider,
//   Form,
//   Modal,
//   Select,
//   InputNumber,
//   Input,
//   Radio,
//   DatePicker,
//   Button,
//   Checkbox,
// } from "antd";
// import ButtonEDU from "../../../components/common/ButtonEDU";

// function AddCouponModal({ isModalOpen, setIsModalOpen }) {
//   // Define state for the selected radio value
//   const [selectedService, setSelectedService] = useState("allServices");
//   const [searchQuery, setSearchQuery] = useState(""); // State for the search query
//   const [services] = useState([
//     "Residential cleaning",
//     "Deep cleaning",
//     "Spring cleaning",
//     "Laundry services",
//     "Dry cleaning services",
//     "Green cleaning",
//     "Sanitization and disinfection",
//     "Ceiling and wall cleaning",
//   ]); // List of services

//   // State for the form inputs
//   const [offerName, setOfferName] = useState("");
//   const [discountType, setDiscountType] = useState("");
//   const [discountValue, setDiscountValue] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [selectedServices, setSelectedServices] = useState([]);

//   const handleChangeSelect = (value) => {
//     setDiscountType(value); // Update the discount type
//   };

//   const onChangeStartDate = (date, dateString) => {
//     setStartDate(date); // Update start date state
//   };

//   const onChangeEndDate = (date, dateString) => {
//     setEndDate(date); // Update end date state
//   };

//   // Update state when the radio selection changes
//   const handleRadioChange = (e) => {
//     setSelectedService(e.target.value); // Store the selected value in state
//     if (e.target.value === "allServices") {
//       // If "All Services" is selected, automatically select all services
//       setSelectedServices(services);
//     } else {
//       setSelectedServices([]); // Reset selected services if "Custom Services" is selected
//     }
//   };

//   const handleServiceSelection = (checkedValues) => {
//     setSelectedServices(checkedValues); // Update selected services for custom services
//   };

//   // Filter services based on search query
//   const filteredServices = services.filter((service) =>
//     service.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle Save button click
//   const handleSave = () => {
//     const couponData = {
//       offerName,
//       discountType,
//       discountValue,
//       selectedService,
//       selectedServices,
//       startDate,
//       endDate,
//     };

//     console.table(couponData); // Log the coupon data in table format

//     // Reset form after saving
//     setOfferName("");
//     setDiscountType("");
//     setDiscountValue("");
//     setSelectedService("allServices");
//     setSelectedServices([]);
//     setStartDate(null); // Reset start date
//     setEndDate(null); // Reset end date
//     setSearchQuery(""); // Reset the search query

//     // Close the modal after saving
//     setIsModalOpen(false);
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Button: {},
//         },
//       }}
//     >
//       <Modal
//         centered
//         width={700}
//         title="Add Coupon Code"
//         visible={isModalOpen} // Bind the modal visibility with the parent's state
//         footer={null}
//         onCancel={() => setIsModalOpen(false)} // Close the modal when Cancel is clicked
//       >
//         <div className="">
//           <Form layout="vertical" className="flex flex-col">
//             <Form.Item label="Offer Name" className="mb-2 " required>
//               <Input
//                 placeholder="Enter Offer Name"
//                 className="h-9"
//                 value={offerName}
//                 onChange={(e) => setOfferName(e.target.value)} // Update offer name state
//               />
//             </Form.Item>
//             <Form.Item label="Discount Type" className="mb-2" required>
//               <Select
//                 className="w-full h-9"
//                 placeholder="Choose a discount type"
//                 value={discountType}
//                 onChange={handleChangeSelect}
//                 options={[
//                   {
//                     value: "fixedAmount",
//                     label: "Fixed Amount",
//                   },
//                   {
//                     value: "percentage",
//                     label: "Percentage",
//                   },
//                 ]}
//               />
//             </Form.Item>
//             <Form.Item label="Discount Value" className="mb-2" required>
//               <InputNumber
//                 type="number"
//                 controls={false}
//                 placeholder="Discount Value"
//                 className="w-full h-9 flex items-center"
//                 value={discountValue}
//                 onChange={setDiscountValue} // Update discount value state
//               />
//             </Form.Item>
//             <Form.Item label="Applicable Services" className="mb-2" required>
//               <Radio.Group
//                 name="radiogroup"
//                 value={selectedService} // Bind the value to the state
//                 onChange={handleRadioChange} // Update the state when value changes
//                 options={[
//                   {
//                     value: "allServices",
//                     label: "All Services",
//                   },
//                   {
//                     value: "customServices",
//                     label: "Custom Services",
//                   },
//                 ]}
//               />
//             </Form.Item>
//             {selectedService === "customServices" && (
//               <Form.Item label="Select Services" className="mb-2">
//                 <Input
//                   placeholder="Search Services"
//                   className="h-9"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)} // Update search query
//                 />
//                 <div className="flex flex-col h-24 overflow-y-auto mt-1 border rounded pl-2">
//                   <Checkbox.Group
//                     options={filteredServices}
//                     value={selectedServices}
//                     onChange={handleServiceSelection} // Update selected services
//                   />
//                 </div>
//               </Form.Item>
//             )}
//             <div className="w-full flex gap-4 mb-4">
//               <Form.Item label="Start Date" className="w-full mb-2" required>
//                 <DatePicker
//                   value={startDate} // Bind value to startDate state
//                   onChange={onChangeStartDate}
//                   className="w-full h-9"
//                 />
//               </Form.Item>
//               <Form.Item label="End Date" className="w-full mb-2" required>
//                 <DatePicker
//                   value={endDate} // Bind value to endDate state
//                   onChange={onChangeEndDate}
//                   className="w-full h-9"
//                 />
//               </Form.Item>
//             </div>

//             <Form.Item>
//               <div className="w-full flex items-end gap-4">
//                 <ButtonEDU
//                   actionType="cancel"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </ButtonEDU>
//                 <ButtonEDU actionType="save" onClick={handleSave}>
//                   Save
//                 </ButtonEDU>
//               </div>
//             </Form.Item>
//           </Form>
//         </div>
//       </Modal>
//     </ConfigProvider>
//   );
// }

// export default AddCouponModal;

import React, { useState } from "react";
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

function AddCouponModal({ isModalOpen, setIsModalOpen }) {
  // Define state for the selected radio value
  const [selectedService, setSelectedService] = useState("allServices");
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [services] = useState([
    "Residential cleaning",
    "Deep cleaning",
    "Spring cleaning",
    "Laundry services",
    "Dry cleaning services",
    "Green cleaning",
    "Sanitization and disinfection",
    "Ceiling and wall cleaning",
  ]); // List of services

  // State for the form inputs
  const [offerName, setOfferName] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleChangeSelect = (value) => {
    setDiscountType(value); // Update the discount type
  };

  const onChangeStartDate = (date, dateString) => {
    setStartDate(date); // Update start date state
  };

  const onChangeEndDate = (date, dateString) => {
    setEndDate(date); // Update end date state
  };

  // Update state when the radio selection changes
  const handleRadioChange = (e) => {
    setSelectedService(e.target.value); // Store the selected value in state
    if (e.target.value === "allServices") {
      // If "All Services" is selected, automatically select all services
      setSelectedServices(services);
    } else {
      setSelectedServices([]); // Reset selected services if "Custom Services" is selected
    }
  };

  const handleServiceSelection = (checkedValues) => {
    setSelectedServices(checkedValues); // Update selected services for custom services
  };

  // Filter services based on search query
  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Save button click
  const handleSave = (values) => {
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

    console.table(couponData); // Log the coupon data in table format

    // Reset form after saving
    setOfferName("");
    setDiscountType("");
    setDiscountValue("");
    setSelectedService("allServices");
    setSelectedServices([]);
    setStartDate(null); // Reset start date
    setEndDate(null); // Reset end date
    setSearchQuery(""); // Reset the search query

    // Close the modal after saving
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
        title="Add Coupon Code"
        visible={isModalOpen} // Bind the modal visibility with the parent's state
        footer={null}
        onCancel={() => setIsModalOpen(false)} // Close the modal when Cancel is clicked
      >
        <div className="">
          <Form
            layout="vertical"
            className="flex flex-col"
            onFinish={handleSave} // Trigger the handleSave function when the form is valid
          >
            <Form.Item label="Offer Name" className="mb-2 " required>
              <Input
                placeholder="Enter Offer Name"
                className="h-9"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)} // Update offer name state
              />
            </Form.Item>
            <Form.Item label="Discount Type" className="mb-2" required>
              <Select
                className="w-full h-9"
                placeholder="Choose a discount type"
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
            <Form.Item label="Discount Value" className="mb-2" required>
              <InputNumber
                type="number"
                controls={false}
                placeholder="Discount Value"
                className="w-full h-9 flex items-center"
                value={discountValue}
                onChange={setDiscountValue} // Update discount value state
              />
            </Form.Item>
            <Form.Item label="Applicable Services" className="mb-2" required>
              <Radio.Group
                name="radiogroup"
                value={selectedService} // Bind the value to the state
                onChange={handleRadioChange} // Update the state when value changes
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
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <div className="flex flex-col h-24 overflow-y-auto mt-1 border rounded pl-2">
                  <Checkbox.Group
                    options={filteredServices}
                    value={selectedServices}
                    onChange={handleServiceSelection} // Update selected services
                  />
                </div>
              </Form.Item>
            )}
            <div className="w-full flex gap-4 mb-4">
              <Form.Item label="Start Date" className="w-full mb-2" required>
                <DatePicker
                  value={startDate} // Bind value to startDate state
                  onChange={onChangeStartDate}
                  className="w-full h-9"
                />
              </Form.Item>
              <Form.Item label="End Date" className="w-full mb-2" required>
                <DatePicker
                  value={endDate} // Bind value to endDate state
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
        </div>
      </Modal>
    </ConfigProvider>
  );
}

export default AddCouponModal;
