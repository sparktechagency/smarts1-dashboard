import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  ConfigProvider,
  Button,
  DatePicker,
} from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import GetPageName from "../../../components/common/GetPageName";
import SelectDuration from "../../../components/common/SelectDuration";
import { useGetBookingSummaryQuery } from "../../../redux/apiSlices/bookingSlice";
import { render } from "react-dom";
import { FaRegEye } from "react-icons/fa6";

const originData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  bookingID: `BKG-${1000 + i}`,
  customername: `Edward ${i}`,
  serviceProvider: `Provider ${i}`,
  status: i % 2 === 0 ? "Confirmed" : "Pending",
  scheduledTime: `2025-02-2${i} 10:00 AM`,
  location: `London Park no. ${i}`,
}));

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const BookingListTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [searchText, setSearchText] = useState("");
  const [editingKey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];
  // const [date, setDate] = useState(currentDate);
  const [date, setDate] = useState(currentDate);

  const { data: bookingData } = useGetBookingSummaryQuery({date, searchTerm: searchText});

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => setEditingKey("");

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => item.key === key);
      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setData(newData);
      }
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const onChange = (date, dateString) => {           
      setDate(dateString); // For debugging
  };


const columns = [
  { title: "Booking ID", dataIndex: "_id", width: "10%" },
  {
    title: "Customer",
    dataIndex: "user",
    width: "20%",    
    editable: true,
    render: (user) => user ? user?.full_name : '',
  },
  {
    title: "Service Provider",
    dataIndex: "serviceProvider",
    width: "20%",
    editable: true,
    render: (provider) => provider ? provider?.full_name : '',
  },
  { title: "Status", dataIndex: "status", width: "10%", editable: true,
    render: (status) => (
    <span className={`capitalize ${status === "cancelled" ? "text-red-600" : status === "inProgress" ? "text-blue-500" : "text-green-600"}`}>
      {status}
    </span>
  ),
   },
  {
    title: "Scheduled Time",
    dataIndex: "scheduledTime",
    width: "20%",
    editable: true,
  },
  { title: "Location", dataIndex: "servicingDestination", width: "25%", editable: true },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => {
      // const editable = isEditing(record);
      // return editable ? (
      //   <span>
      //     <Typography.Link
      //       onClick={() => save(record.key)}
      //       style={{ marginRight: 8 }}
      //       className="text-[14px] text-blue-600"
      //     >
      //       Save
      //     </Typography.Link>
      //     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      //       <a className="text-[14px] text-blue-600">Cancel</a>
      //     </Popconfirm>
      //   </span>
      // ) : (
      //   <div className="flex items-center gap-4 w-36">
      //     <button
      //       disabled={editingKey !== ""}
      //       onClick={() => edit(record)}
      //       className=" hover:text-sky-600"
      //     >
      //       <FiEdit3 size={20} />
      //     </button>
      //     <Popconfirm
      //       title="Are you sure to delete?"
      //       onConfirm={() => handleDelete(record.key)}
      //     >
      //       <button className=" hover:text-red-600">
      //         <RiDeleteBin6Line size={20} />
      //       </button>
      //     </Popconfirm>
      //   </div>
      // );

     return <button className=" hover:text-blue-600">
      <FaRegEye size={20} />
      </button>
    },
  },
];

  console.log("bookingData", bookingData);
  
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            rowSelectedBg: "#f6f6f6",
            headerBg: "#f6f6f6",
            headerSplitColor: "none",
            headerBorderRadius: "none",
            cellFontSize: "16px",
          },
          Pagination: {
            borderRadius: "3px",
            itemActiveBg: "#18a0fb",
            // itemBg: "#000000",
          },

          Button: {
            defaultHoverBg: "#18a0fb ",
            defaultHoverColor: "white",
            defaultHoverBorderColor: "#18a0fb ",
          },
        },
      }}
    >
      <div className="flex justify-between items-center py-5">
        <h1 className="text-[20px] font-medium">{GetPageName()}</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search by id or name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: 300, height: 40 }}
          />

          
            <DatePicker style={{height: 40 }} onChange={onChange} />          
        </div>
      </div>

      <Form form={form} component={false}>
        {/* <Table
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={filteredData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            defaultPageSize: 5,
            position: ["bottomRight"],
            size: "default",
            total: 50,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        /> */}

         <Table
      // rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      components={{ body: { cell: EditableCell } }}
      bordered
      dataSource={bookingData?.result}
      columns={columns}
      rowClassName="editable-row"
      pagination={{
        onChange: cancel,
        defaultPageSize: bookingData?.meta?.limit,
        position: ["bottomRight"],
        size: "default",
        total: bookingData?.meta?.total,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
      </Form>
    </ConfigProvider>
  );
};

export default BookingListTable;
