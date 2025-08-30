import React from "react";
import SidebarContent from "./SidebarContent";
// import { Outlet, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import ChatHeader from "./ChatHeader";

function SupportChat() {
  return (
    <div className="w-full h-[85vh] flex relative rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[25%] h-full bg-slate-300  rounded-l-lg">
        <SidebarContent />
      </div>

      {/* Chat Area */}
      <div className="w-[75%] h-full bg-green-400-200">
        {/* <div className="h-[100px] bg-blue-400">
          <ChatHeader />
        </div> */}
        <div className=" h-full bg-slate-200 rounded-r-lg">
          <ChatRoom />
          {/* <Outlet /> */}
        </div>
        {/* <div className="w-full absolute bottom-0 h-[100px] bg-amber-400">
          keyboard
        </div> */}
      </div>
    </div>
  );
}

export default SupportChat;
