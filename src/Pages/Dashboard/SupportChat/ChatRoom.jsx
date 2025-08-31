import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Avatar } from "antd";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { FaPaperclip, FaPaperPlane, FaRegSmile } from "react-icons/fa";
import { MdOutlineReply } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import io from "socket.io-client";
import { imageUrl } from "../../../redux/api/baseApi";
import { useProfileQuery } from "../../../redux/apiSlices/authSlice";
import {
  useGetCharByRoomIdQuery,
  useSendMessageMutation,
} from "../../../redux/apiSlices/chatApi";

function ChatRoom({ sharedFn }) {
  const { chatRoomId } = useParams();
  const location = useLocation();
  const user = location.state?.user || {};
  // const socket = useMemo(() => io(imageUrl), []);
  const socket = useMemo(() => io("ws://10.10.7.79:6003"), []);
  const {
    data: chatData,
    refetch,
    isLoading,
  } = useGetCharByRoomIdQuery(chatRoomId, { refetchOnMountOrArgChange: true });
  const { data: profileData } = useProfileQuery();
  const [sendMessage] = useSendMessageMutation();

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const fileInputRef = useRef(null);

  const scrollContainerRef = useRef(null);
  const scrollToBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      } catch {
        el.scrollTop = el.scrollHeight;
      }
    });
  }, []);

  const handleGetAllChats = () => {
    if (sharedFn) {
      sharedFn();            
    }
  };
  useEffect(() => {
    setMessages([]);
  }, [chatRoomId]);

  useEffect(() => {
    if (chatData) {
      const formatted = chatData?.data?.messages?.map((msg) => ({
        id: msg?._id,
        text: msg?.text,
        sender: msg?.sender,
        time: new Date(msg?.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        replyTo: msg?.replyTo,
      }));
      setMessages((formatted || []).reverse());
    } else {
      setMessages([]);
    }
  }, [chatData, chatRoomId]);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    socket.on(`getMessage::${chatRoomId}`, (message) => {
      handleGetAllChats();
      refetch();
    });
    return () => {
      socket.off(`getMessage::${chatRoomId}`);
    };
  }, [socket, chatRoomId, refetch]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    const newMessage = {
      chatId: chatRoomId,
      text: messageText,
      sender: profileData?._id,
    };
    try {
      await sendMessage(newMessage);
      refetch();
      setMessageText("");
      setSelectedMessage(null);
      socket.emit("getMessage", newMessage);
    } catch (e) {
      console.log("error", e);
    }
  };

  const addEmoji = (emoji) => {
    setMessageText((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      file: {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "file",
      },
      replyTo: selectedMessage ? selectedMessage.id : null,
    };
    setMessages((prev) => [...prev, newMessage]);
    event.target.value = null;
    setSelectedMessage(null);
    socket.emit("send_message", newMessage);
  };

  const handleMessageClick = (msg) => setSelectedMessage(msg);

  return (
    <div className="h-full relative flex flex-col bg-white rounded-r-lg">
      <div className="flex items-center gap-3 p-4 border-b shadow-sm">
        <Avatar src={user.avatar} size={50} />
        <div>
          <h2 className="text-lg font-semibold">{user.name || "Unknown"}</h2>
          <p className="text-gray-500 text-sm">
            Last seen: {user.lastSeen} min ago
          </p>
        </div>
      </div>

      <button onClick={() => sharedFn && sharedFn()}>
        Call ChildA's function from ChildB
      </button>
      <div
        ref={scrollContainerRef}
        className="flex flex-col gap-3 p-4 flex-grow overflow-y-auto
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-slate-400
        dark:[&::-webkit-scrollbar-thumb]:bg-slate-200"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`group flex items-start gap-2 ${
              msg?.sender?.role === profileData?.role
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="relative flex items-end gap-2">
              {msg.sender === "other" && <Avatar src={user.avatar} size={40} />}
              <div
                className={`p-3 rounded-lg shadow-md max-w-[300px] ${
                  msg?.sender?.role === profileData?.role
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-tl-none"
                } ${
                  selectedMessage?.id === msg.id && msg.sender === "me"
                    ? "w-[300px] ml-2"
                    : ""
                }`}
              >
                {msg.replyTo && (
                  <div className="bg-gray-100 p-2 rounded-md mb-2 text-sm italic">
                    <p>{messages.find((m) => m.id === msg.replyTo)?.text}</p>
                  </div>
                )}
                {msg.text && (
                  <p
                    className={`text-sm ${
                      msg?.sender?.role === profileData?.role
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                {msg.file && msg.file.type === "image" && (
                  <img
                    src={msg.file.url}
                    alt="Sent"
                    className="rounded-md w-48 mt-2"
                    onLoad={scrollToBottom}
                  />
                )}
                {msg.file && msg.file.type === "file" && (
                  <a
                    href={msg.file.url}
                    download={msg.file.name}
                    className="text-blue-700 underline mt-2 block"
                  >
                    {msg.file.name}
                  </a>
                )}
                <p
                  className={`text-xs text-right mt-1 ${
                    msg?.sender?.role === profileData?.role
                      ? "text-slate-300"
                      : ""
                  }`}
                >
                  {msg.time}
                </p>
              </div>
              {msg?.sender?.role === profileData?.role && (
                <Avatar src={`${imageUrl}${msg?.sender?.image}`} size={40} />
              )}
              {msg?.sender?.role !== profileData?.role && (
                <MdOutlineReply
                  size={20}
                  onClick={() => handleMessageClick(msg)}
                  className="absolute hidden top-1/2 -z-5 -translate-y-1/2 right-0 invisible group-hover:visible group-hover:-right-6 transition-all duration-300 text-gray-400 hover:text-blue-600 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center p-4 border-t">
        <button
          className="p-2 text-gray-600"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaRegSmile size={24} />
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-14 left-4 z-10">
            <Picker data={data} onEmojiSelect={addEmoji} />
          </div>
        )}
        <button
          className="p-2 text-gray-600"
          onClick={() => fileInputRef.current?.click()}
        >
          <FaPaperclip size={24} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*, .pdf, .doc, .docx"
        />
        <input
          type="text"
          placeholder="Enter Message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-grow p-3 border rounded-lg focus:outline-none"
        />
        <button
          className="ml-2 bg-blue-500 text-white p-3 rounded-lg"
          onClick={handleSendMessage}
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
