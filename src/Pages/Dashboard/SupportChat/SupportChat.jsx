import React, { useState } from "react";
import SidebarContent from "./SidebarContent";
// import { Outlet, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import ChatHeader from "./ChatHeader";

function SupportChat({ chatRoomId }) {
  const [sharedFn, setSharedFn] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReceiveFn = (fn) => {
    setSharedFn(() => fn);
  };
console.log("handleReceiveFn", chatRoomId);

  return (
    <div className="w-full h-[85vh] flex relative rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[25%] h-full bg-slate-300 rounded-l-lg">
        <SidebarContent
          chatRoomId={chatRoomId}  // <-- pass here
          onShareFn={handleReceiveFn}
          loading={loading}
        />
      </div>

      {/* Chat Area */}
      <div className="w-[75%] h-full bg-green-400-200">
        <div className="h-full bg-slate-200 rounded-r-lg">
          <ChatRoom sharedFn={sharedFn} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}


export default SupportChat;
