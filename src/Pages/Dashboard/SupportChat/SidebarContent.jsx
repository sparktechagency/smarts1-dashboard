import React, { useState, useRef } from "react";
import { Input, Avatar, Badge } from "antd";
import { IoIosSearch } from "react-icons/io";
import { nanoid } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";
import man from "../../../assets/man.png";
import { useGetChatQuery } from "../../../redux/apiSlices/chatApi";
import { imageUrl } from "../../../redux/api/baseApi";
import dayjs from "dayjs";
import GroupChatAvatar from "./GroupChatAvatar";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function SidebarContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const usersContainerRef = useRef(null);
  const { data: chatData } = useGetChatQuery();

  console.log("chatData", chatData);
  const navigate = useNavigate();
  // Filter & prioritize searched user
  const filteredUsers = people
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      a.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ? 1 : -1
    );

  const ChatPage = (id) => {
    navigate(`/chat/${id}`);
    window.location.reload();
  };
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                      <p>{item?.lastMessage?.text}</p>
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

// Dummy Data
const people = [...Array(30)].map((_, i) => ({
  id: nanoid(),
  name: `John Doe ${i + 1}`,
  lastSeen: Math.floor(Math.random() * 10) + 1,
  newMessageCount: i % 3 === 0 ? Math.floor(Math.random() * 5) : 0,
  avatar: i % 2 === 0 ? man : "",
}));
