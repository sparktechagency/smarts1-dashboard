import { Col, Divider, Modal, Row } from "antd";
import dayjs from "dayjs";
import { FaRegEye } from "react-icons/fa6";




const BookingModal = ({ open, setOpen, data }) => {
  const handleClose = () => {
    setOpen(false);
  };

  console.log("mocal ", data);
  
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title={
        <p className="text-xl font-semibold text-primary text-center">
          Booking Details
        </p>
      }
      centered
      width={800}
    >
      <Divider />
      <Row gutter={[12, 30]}>
        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Booking ID</p>
          <p className="text-[15px] text-black font-medium ">{data?._id}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium  mb-1">Customer</p>
          <p className="text-[15px] text-black font-medium ">{data?.user?.full_name}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium  mb-1">
            Service Provider
          </p>
          <p className="text-[15px] text-black font-medium ">{data?.serviceProvider?.full_name}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium  mb-1">Status</p>
          <p className="text-[15px] font-medium">
            <span
              className={`capitalize ${
                data?.status === "in Progress"
                  ? "text-yellow-600"
                  : data?.status === "cancelled"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {data?.status}
            </span>
          </p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Scheduled Time
          </p>
          <p className="text-[15px] text-black font-medium">{ dayjs(data?.bookingDate).format("DD MMMM, YYYY")}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Location</p>
          <p className="text-[15px] text-black font-medium">{data?.servicingDestination}</p>
        </Col>
      </Row>
    </Modal>
  );
};

export default BookingModal;
