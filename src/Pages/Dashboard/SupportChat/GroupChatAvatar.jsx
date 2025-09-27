import React from "react";
import { Avatar } from "antd";
import { imageUrl } from "../../../redux/api/baseApi";

const GroupChatAvatar = ({ members }) => {
  if (!members || members.length === 0) return null;

  
  // 1 member → full circle
  if (members.length === 1) {
    return <Avatar src={`${imageUrl}${members[0]?.image}`} size={40} />;
  }

  // 2 members → 50/50 split
  if (members.length === 2) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden" style={{ boxShadow: "0 0 0 2px white" }}>
        <Avatar
          src={`${imageUrl}${members[0]?.image}`}
          alt={members[0]?.name}
          className="absolute top-0 left-0 w-1/2 h-full !rounded-none object-cover"
          style={{ objectPosition: "center", boxShadow: "0 0 0 1px white" }}
        />
        <Avatar
          src={`${imageUrl}${members[0]?.image}`}
          alt={members[1]?.name}
          className="absolute top-0 right-0 w-1/2 h-full !rounded-none object-cover"
          style={{ objectPosition: "center", boxShadow: "0 0 0 1px white" }}
        />
      </div>
    );
  }

  // 3 members → your 3-slice layout
  if (members.length >= 3) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden" style={{ boxShadow: "0 0 0 2px white" }}>
        {/* Top Right */}
        <Avatar
          src={`${imageUrl}${members[0]?.image}`}
          alt={members[0]?.name}
          className="absolute top-0 right-0 w-1/2 h-1/2 !rounded-none object-cover"
          style={{ objectPosition: "center", boxShadow: "0 0 0 1px white" }}
        />
        {/* Bottom Right */}
        <Avatar
          src={`${imageUrl}${members[1]?.image}`}
          alt={members[1]?.name}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 !rounded-none object-cover"
          style={{ objectPosition: "center", boxShadow: "0 0 0 1px white" }}
        />
        {/* Left Half */}
        <Avatar
          src={`${imageUrl}${members[2]?.image}`}
          alt={members[2]?.name}
          className="absolute top-0 left-0 w-1/2 h-full !rounded-none object-cover"
          style={{ objectPosition: "center", boxShadow: "0 0 0 1px white" }}
        />
      </div>
    );
  }
};

export default GroupChatAvatar;
