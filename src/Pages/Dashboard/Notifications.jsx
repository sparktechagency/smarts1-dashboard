import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Pagination } from "antd";
import {
  useGetAdminNotificationQuery,
  useNotificationQuery,
  useReadAllNotificationMutation,
  useReadMutation,
} from "../../redux/apiSlices/notificationSlice";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { MdNotificationsActive } from "react-icons/md";
import { use } from "react";
import { useUpdateSearchParams } from "../../utility/updateSearchParams";
import { getSearchParams } from "../../utility/getSearchParams";

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: notificationsData, refetch } = useGetAdminNotificationQuery();
  const [readAllNotification] = useReadAllNotificationMutation()
  const [read] = useReadMutation();

  const { page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  // --------------- Action  -------------------
  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    updateSearchParams({
      limit: notificationsData?.data?.meta?.limit,
      page: currentPage,
    });
  }, [currentPage]);
  
  const handleReadNotification = async () =>{
    try {
      await readAllNotification();
      refetch()
    } catch (error) {
      console.log("error aa", error);
      
    }
  }
  return (
    <div className="px-14 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px]">All Notifications</h2>
        <Button onClick={()=>handleReadNotification()} type="primary" className="bg-dandy text-white h-10 px-4 rounded-md">
          Read All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:gap-3">
        {notificationsData?.data?.result?.map((notification, index) => {
          return (
            <div
              key={index}
              className={`${notification?.read  == false && "bg-white px-2 py-2.5 rounded-md"} border-b-[1px] pb-2 border-[#d9d9d9]  flex items-center gap-3`}
            >
              <div className="w-10 h-10 rounded-full bg-orange-800 flex items-center justify-center text-slate-300">
                <MdNotificationsActive size={25} /> 
              </div>
              {/* <img
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "100%",
                  border: "2px solid gray",
                }}
                src="https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg"
              /> */}
              <div className="flex w-full justify-between">
                <div className="">
                  <h1 className="font-semibold">{notification?.title}</h1>
                  <p>{notification?.message}</p>
                </div>

                <p className="">
                  {notification?.createdAt
                    ? (() => {
                        const diffInMinutes = dayjs().diff(
                          dayjs(notification?.createdAt),
                          "minute"
                        );

                        if (diffInMinutes < 60) {
                          return `${diffInMinutes} min ago`;
                        }

                        const diffInHours = dayjs().diff(
                          dayjs(notification?.createdAt),
                          "hour"
                        );
                        if (diffInHours < 24) {
                          return `${diffInHours} hr${
                            diffInHours > 1 ? "s" : ""
                          } ago`;
                        }

                        const diffInDays = dayjs().diff(
                          dayjs(notification?.createdAt),
                          "day"
                        );
                        return `${diffInDays} day${
                          diffInDays > 1 ? "s" : ""
                        } ago`;
                      })()
                    : "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-6">
        <ConfigProvider
          theme={{
            components: {},
            token: {
              colorPrimary: "white",
            },
          }}
        >
          <Pagination
            current={currentPage}
            size={notificationsData?.data?.meta?.limit}
            total={notificationsData?.data?.meta?.total}
            onChange={(page) => setCurrentPage(page)}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Notifications;
