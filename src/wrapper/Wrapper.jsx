import { useParams } from "react-router-dom";
import ChatRoom from "../Pages/Dashboard/SupportChat/ChatRoom";
import SupportChat from "../Pages/Dashboard/SupportChat/SupportChat";

export function SupportChatWrapper() {
  const { chatRoomId } = useParams();
  return <SupportChat key={chatRoomId} chatRoomId={chatRoomId} />;
}


export function ChatRoomWrapper() {
  const { chatRoomId } = useParams();
  return <ChatRoom key={chatRoomId} />;
}
