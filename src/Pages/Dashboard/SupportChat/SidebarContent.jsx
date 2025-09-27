import { Badge, Input } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { socketUrl } from "../../../redux/api/baseApi";
import { useGetChatQuery } from "../../../redux/apiSlices/chatApi";
import { useGetProfileQuery } from "../../../redux/apiSlices/settingSlice";
import { getSearchParams } from "../../../utility/getSearchParams";
import { useUpdateSearchParams } from "../../../utility/updateSearchParams";
import GroupChatAvatar from "./GroupChatAvatar";
dayjs.extend(relativeTime);

function SidebarContent({ onShareFn, chatRoomId }) {
  const usersContainerRef = useRef(null);
  const { data: chatData, refetch, isLoading } = useGetChatQuery();
  const { data: profileData } = useGetProfileQuery();
  const socket = useMemo(() => io(socketUrl), []);
  const [user, setUser] = useState();

  const updateSearchParam = useUpdateSearchParams();
  const { searchTerm } = getSearchParams();

  useEffect(() => {
    if (profileData) {
      setUser(profileData?.data?._id);
    }
  }, [profileData]);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
   
    socket.on(`getMessage::${user}`, (message) => {
      refetch();
    });
    return () => {
      socket.off(`getMessage::${user}`);
    };
  }, [socket, user, refetch]);

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
          onChange={(e) => updateSearchParam({ searchTerm: e.target.value })}
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
                      <p>
                        {item?.lastMessage?.text.split("").slice(0, 25)}
                        {item?.lastMessage?.text.split("").length > 25 && "..."}
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
