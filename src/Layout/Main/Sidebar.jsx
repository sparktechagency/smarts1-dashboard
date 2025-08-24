import { FaHandsHelping } from "react-icons/fa";
import { FaDiagramProject, FaQuoteRight } from "react-icons/fa6";
import { CgTemplate } from "react-icons/cg";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuClipboardList, LuGift } from "react-icons/lu";
import { TbBellBolt, TbDashboard, TbListDetails } from "react-icons/tb";
import { HiOutlineUsers, HiUsers } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { PiMessengerLogoBold, PiWallet } from "react-icons/pi";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TfiLayoutSlider, TfiLayoutSliderAlt } from "react-icons/tfi";
import {
  RiContactsBook3Line,
  RiMoneyDollarCircleLine,
  RiSettings5Line,
} from "react-icons/ri";
import {
  MdHandyman,
  MdOutlineHomeRepairService,
  MdOutlineReportProblem,
} from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
    const [openKeys, setOpenKeys] = useState([]);

     useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);
  
  const handleLogout = () => {
    console.log("hit on l");
    
    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    window.location.reload()        
  };

  const menuItems = [
    {
      key: "/",
      icon: <RxDashboard size={24} />,
      label: <Link to="/">Overview</Link>,
    },
    {
      key: "/booking-list",
      icon: <LuClipboardList size={25} />,
      label: isCollapsed ? (
        <Link to="/booking-list">Bookings</Link>
      ) : (
        <Link to="/booking-list">Bookings</Link>
      ),
    },
    {
      key: "subMenuSetting2",
      icon: <HiOutlineUsers size={24} className="text-black" />,
      label: "User",
      children: [
        {
          key: "/customer-list",
          icon: <HiUsers size={23} />,
          label: isCollapsed ? (
            <Link to="/customer-list">Customer</Link>
          ) : (
            <Link to="/customer-list">Customer</Link>
          ),
        },
        {
          key: "/service-provider-list",
          icon: <FaHandsHelping size={24} />,
          label: isCollapsed ? (
            <Link to="/service-provider-list">Service Providers</Link>
          ) : (
            <Link to="/service-provider-list">Service Providers</Link>
          ),
        },
      ],
    },
    {
      key: "/discount-coupon",
      icon: <LuGift size={25} />,
      label: isCollapsed ? (
        <Link to="/discount-coupon">Discount Coupon</Link>
      ) : (
        <Link to="/discount-coupon">Discount Coupon</Link>
      ),
    },
    {
      key: "/transaction",
      icon: <PiWallet size={25} />,
      label: isCollapsed ? (
        <Link to="/transaction">Transaction</Link>
      ) : (
        <Link to="/transaction">Transaction</Link>
      ),
    },
    {
      key: "/reported-issues",
      icon: <MdOutlineReportProblem size={25} />,
      label: isCollapsed ? (
        <Link to="/reported-issues">Report</Link>
      ) : (
        <Link to="/reported-issues">Report</Link>
      ),
    },
    {
      key: "subMenuSetting3",
      icon: <MdOutlineHomeRepairService size={24} className="text-black" />,
      label: "Service",
      children: [
        {
          key: "/category-list",
          icon: <BiSolidCategoryAlt size={23} />,
          label: isCollapsed ? (
            <Link to="/category-list">Category List</Link>
          ) : (
            <Link to="/category-list">Category List</Link>
          ),
        },
       
      ],
    },

    {
      key: "/support-chat",
      icon: <PiMessengerLogoBold size={24} />,
      label: <Link to="/support-chat">Support Chat</Link>,
    },
    {
      key: "/pushnotification",
      icon: <TbBellBolt size={24} />,
      label: <Link to="/pushnotification">PushNotification</Link>,
    },
    {
      key: "subMenuSetting",
      icon: <CgTemplate size={24} />,
      label: "Cms",
      children: [
        {
          key: "/privacy-policy",

          icon: <MdOutlinePrivacyTip size={24} />,
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/terms-and-conditions",
          icon: <IoDocumentTextOutline size={24} />,
          label: (
            <Link
              to="/terms-and-conditions"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/faq",
          icon: <FaQuoteRight size={24} />,
          label: (
            <Link to="/faq" className="text-white hover:text-white">
              FAQ
            </Link>
          ),
        },
        {
          key: "/contact",
          icon: <RiContactsBook3Line size={24} />,
          label: (
            <Link to="/contact" className="text-white hover:text-white">
              Contact Us
            </Link>
          ),
        },
        {
          key: "/slider",

          icon: <TfiLayoutSlider size={24} />,
          label: (
            <Link to="/slider" className="text-white hover:text-white">
              SLider
            </Link>
          ),
        },
        {
          key: "/onboarding-screen",

          icon: <TfiLayoutSliderAlt size={24} />,
          label: (
            <Link
              to="/onboarding-screen"
              className="text-white hover:text-white"
            >
              Onboarding Screen
            </Link>
          ),
        },
      ],
    },

    {
      key: "/admin-list",
      icon: <RiSettings5Line size={24} />,
      label: isCollapsed ? (
        <Link to="/admin-list">setting</Link>
      ) : (
        <Link to="/admin-list">setting</Link>
      ),
    },
    {
      key: "/logout",
      icon: <FiLogOut size={24} />,
      label: isCollapsed ? null : (
        <p onClick={handleLogout} className="text-black hover:text-black">
          Logout
        </p>
      ),
    },

    // {
    //   key: "/subscription",
    //   icon: <HiTicket size={24} />,
    //   label: <Link to="/subscription">Subscription</Link>,
    // },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);
  // useEffect(() => {
  //   setSelectedKey(path);
  // }, [path]);

  return (
    <div
      className={`bg-quilocoP h-full shadow-md transition-all duration-300  max-h-100  ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      <Link
        to="/"
        className="flex items-center justify-center py-4 text-white bg-white sticky z-50 mb-10"
      >
        <div className="w-full flex items-center justify-center bg-quilocoP px-4 py-3 -mt-1.5 gap-3 rounded-lg">
          <TbDashboard size={40} className="text-sky-500" />
          {!isCollapsed && (
            <p className="text-2xl text-sky-500 font-semibold ">Dashboard</p>
          )}
          {/* <img src={"qilocoLogo"} /> */}
        </div>
      </Link>
      <div
        className=" h-[80%]  overflow-y-auto
  [&::-webkit-scrollbar]:w-0
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          inlineCollapsed={isCollapsed}
          className="text-white  bg-white my-auto "
        />
      </div>
    </div>
  );
};

export default Sidebar;
