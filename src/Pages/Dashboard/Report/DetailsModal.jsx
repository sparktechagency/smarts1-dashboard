import React from "react";
import { Button, Divider, Image, Modal } from "antd";
import evidence from "../../../assets/evidence.png"; // Image path
import { imageUrl } from "../../../redux/api/baseApi";
import { useUpdateReportStatusMutation } from "../../../redux/apiSlices/reportedSlice";
import { useBannedProvidersMutation } from "../../../redux/apiSlices/serviceProviderSlice";

function DetailsModal({ isModalOpen, setIsModalOpen, record }) {
  const [updateReportStatus] = useUpdateReportStatusMutation();

  const [bannedProviders]= useBannedProvidersMutation()
  console.log("relect", record);;
  
  if (!record) {
    return null; 
  }
  
const handleReject = async () =>{
  try {
       
    const res = await updateReportStatus({id: record?._id, status: "Resolved"});

    console.log("report resolved", res);
    
  } catch (error) {
    console.log("rejected add", error);
    
  }
}

const handleBlockProvider = async () =>{
  try {
    const status = "blocked"
       const providerBanned = await bannedProviders({ id: record?.refferenceId?.serviceProvider?._id, status });
       console.log("providerBanned", providerBanned);

    const res = await updateReportStatus({id: record?._id, status: "Resolved"});

    console.log("report resolved", res);
    
  } catch (error) {
    console.log("rejected add", error);
    
  }
}
  return (
    <Modal
      centered
      width={700}
      title="Report Details"
      visible={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)} // Close modal on cancel
    >

      <Divider />
      <div className="grid grid-cols-2 gap-2">
        <p>
          <strong>Report ID:</strong> {record?._id || "N/A"}
        </p>
        <p>
          <strong>Service Provider:</strong>{" "}
          {record?.refferenceId?.serviceProvider?.full_name || "N/A"}
        </p>
        <p>
          <strong>Reported By:</strong> {record?.createdBy?.full_name || "N/A"}
        </p>
        <p >
          <strong>Reported Type:</strong> <span className="text-red-500">{record?.report_type || "N/A"}</span> 
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`text-${
              record.status === "Resolved" ? "green-500" : "red-500"
            }`}
          >
            {" "}
            {record?.status || "N/A"}
          </span>
        </p>
      </div>

      <div className="mt-3">
        <p className="mb-2">
          <strong>Description:</strong>
        </p>
        <div className="border rounded-md p-3">
          {/* <p>{record.description || }</p> */}
          <p>{record?.description}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-2">
          <strong>Evidence:</strong>
        </p>
        <div className="border rounded-md flex items-center justify-center p-2  gap-5">
          {record?.images &&
            record?.images.map((img, index) => (
              <Image
                key={index} // Ensure each item has a unique key
                className="border rounded-md"
                width={record?.images.length > 4 ? "25%" : "100%"} // Adjust width based on number of images
                height={150}
                src={`https://images.pexels.com/photos/296115/pexels-photo-296115.jpeg`} // Image path
                alt={`Image ${index + 1}`} // Alt text for accessibility
              />
            ))}
        </div>
        <div className="flex items-center gap-5 mt-5 justify-end">
        <Button disabled={record?.status == "Resolved"} onClick={()=>handleBlockProvider()} type="primary" size="large" style={{background: record?.status == "Resolved" ?  "rgba(180,0,0, .2" : "rgba(180,0,0, 1)"}}>Block Provider</Button>
        <Button onClick={()=>handleReject()} type="primary" size="large" style={{background: "blue"}}>Rejected</Button>

        </div>

      </div>
    </Modal>
  );
}

export default DetailsModal;
