import React, { useState, useRef, useEffect, useMemo } from "react";
import { Input, Avatar, Badge } from "antd";
import { IoIosSearch } from "react-icons/io";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import man from "../../../assets/man.png";
import { useGetChatQuery } from "../../../redux/apiSlices/chatApi";
import { imageUrl, socketUrl } from "../../../redux/api/baseApi";
import dayjs from "dayjs";
import GroupChatAvatar from "./GroupChatAvatar";
import relativeTime from "dayjs/plugin/relativeTime";
import { io } from "socket.io-client";
import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import { getSearchParams } from "../../../utility/getSearchParams";

dayjs.extend(relativeTime);

function SidebarContent({ onShareFn }) {
  const [searchQuery, setSearchQuery] = useState("");
  const usersContainerRef = useRef(null);
  const { data: chatData, refetch, isLoading } = useGetChatQuery();
  const { chatRoomId } = useParams();
  const socket = useMemo(() => io(socketUrl), []);
  const handleGetData = () => { refetch();};
  const navigate = useNavigate();



  const updateSearchParam = useUpdateSearchParams()
  const {searchTerm} = getSearchParams()


  
    useEffect(() => {       
      refetch();    
  }, [searchTerm]);

  useEffect(() => {


    socket.on(`getMessage::${chatRoomId}`, (message) => {
      refetch();
    });
    return () => {
      socket.off(`getMessage::${chatRoomId}`);
    };
    
  }, [socket, chatRoomId, refetch, ]);


  return (
    <div className="h-full flex flex-col bg-white rounded-lg border-r">
      {/* Header Section */}
      <div className="flex flex-col justify-start gap-2 p-4 bg-white sticky top-0 z-10 rounded-bl-lg rounded-br-lg rounded-tl-lg">
        <p className="text-[16px] font-semibold text-black">Support Chat</p>
        <Input
          prefix={<IoIosSearch />}
          placeholder="Search..."
          className="h-10 w-[90%] gap-2"
          allowClear          
          onChange={(e) => updateSearchParam({searchTerm : e.target.value})}
        />
        <p className="text-[#343A40] font-semibold">Recent</p>
      </div>

      {/* Scrollable User List */}
      <div
        ref={usersContainerRef}
        className="bg-white rounded-bl-lg flex-1 overflow-y-auto"
      >
        {chatData?.data?.length > 0 ? (
          chatData?.data?.map((item) => (
            <Link
              key={item?.id}
              to={`/chat/${item?._id}`}
              state={{ user: item }}
              // onClick={()=>ChatPage(item?._id)}
            >
              <div className="h-16 border-t hover:bg-slate-50 px-4">
                <div className="flex justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      dot
                      status="success"
                      className="border-2 rounded-full"
                    >
                      {/* <Avatar src={`${imageUrl}${item?.participants[0]?.image}` || ""}>
                        {!item?.avatar && item?.name?.charAt(0)}
                      </Avatar> */}

                      <GroupChatAvatar members={item?.participants} />
                    </Badge>
                    <div>
                      <h3>{item?.participants[0]?.full_name}</h3>
                      <p>{item?.lastMessage?.text.split("").slice(0,25)}
                        {item?.lastMessage?.text.split("").length > 25 && '...'}
                        </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <p>
                      {item?.lastMessage?.createdAt
                        ? (() => {
                            const diffInMinutes = dayjs().diff(
                              dayjs(item?.lastMessage?.createdAt),
                              "minute"
                            );

                            if (diffInMinutes < 60) {
                              return `${diffInMinutes} min ago`;
                            }

                            const diffInHours = dayjs().diff(
                              dayjs(item?.lastMessage?.createdAt),
                              "hour"
                            );
                            if (diffInHours < 24) {
                              return `${diffInHours} hr${
                                diffInHours > 1 ? "s" : ""
                              } ago`;
                            }

                            const diffInDays = dayjs().diff(
                              dayjs(item?.lastMessage?.createdAt),
                              "day"
                            );
                            return `${diffInDays} day${
                              diffInDays > 1 ? "s" : ""
                            } ago`;
                          })()
                        : "No messages yet"}
                    </p>

                    {item?.unreadMessagesCount > 0 && (
                      <p className="rounded-full  bg-[#EF476F2E] text-red-500 text-[12px] w-fit px-1.5">
                        {item?.unreadMessagesCount ?? 0}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No users found</p>
        )}
      </div>
    </div>
  );
}

export default SidebarContent;
