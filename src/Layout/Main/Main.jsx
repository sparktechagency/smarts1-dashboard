import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen  flex  bg-white ">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main Content */}
<div className="flex flex-col w-full">
  <Header toggleSidebar={toggleSidebar} />
  <div className="flex-1 p-4 bg-slate-100 overflow-y-auto min-h-0">
    <Outlet />
  </div>
</div>
    </div>
  );
};

export default Main;



// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { Outlet } from "react-router-dom";

// const Main = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed((prev) => !prev);
//   };

//   return (
//     <div className="h-screen w-screen flex bg-white">
//       {/* Sidebar */}
//       <Sidebar isCollapsed={isCollapsed} />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1 transition-all duration-300">
//         <Header toggleSidebar={toggleSidebar} />
//         <div className="p-4 bg-quilocoS h-full overflow-clip bg-slate-100">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;
