import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home/Home";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy/PrivacyPolicy.jsx";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition/TermsAndCondition";
import ServiceProvidersList from "../Pages/Dashboard/ServiceProvider/ServiceProvidersList.jsx";
import Transaction from "../Pages/Dashboard/Transaction/Transaction.jsx";
import Setting from "../Pages/Dashboard/Setting/Setting.jsx";
import FaqCollapse from "../Pages/Dashboard/FAQ/FaqCollapse.jsx";
import Contact from "../Pages/Dashboard/Contact/Contact.jsx";
import Customer from "../Pages/Dashboard/Customer/Customer.jsx";
import PushNotification from "../Pages/Dashboard/PushNotification/PushNotification.jsx";
import BookingList from "../Pages/Dashboard/Booking/BookingList.jsx";
import CategoryList from "../Pages/Dashboard/Service/CategoryList/CategoryList.jsx";
import SpecificService from "../Pages/Dashboard/DyanamicPage/SpecificService.jsx";
import SupportChat from "../Pages/Dashboard/SupportChat/SupportChat.jsx";
import ChatRoom from "../Pages/Dashboard/SupportChat/ChatRoom.jsx";
import DiscountCoupon from "../Pages/Dashboard/DiscountCoupon/DiscountCoupon.jsx";
import Report from "../Pages/Dashboard/Report/Report.jsx";
import Slider from "../Pages/Dashboard/Slider/Slider.jsx";
import OnboardingScreeen from "../Pages/Dashboard/OnboardingScreen/OnboardingScreeen.jsx";
import PrivateRoute from "./ProtectedRoute.jsx";
import { ChatRoomWrapper, SupportChatWrapper } from "../wrapper/Wrapper.jsx";


const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <PrivateRoute>
        {" "}
        <Main />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/service-provider-list",
        element: <ServiceProvidersList />,
      },

      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/discount-coupon",
        element: <DiscountCoupon />,
      },
      {
        path: "/reported-issues",
        element: <Report />,
      },

      {
        path: "/customer-list",
        element: <Customer />,
      },
      {
        path: "/booking-list",
        element: <BookingList />,
      },
      {
        path: "/support-chat",
        element: <SupportChat />,
      },
      {
        path: "/chat/:chatRoomId",
        element: <SupportChatWrapper />,
        children: [{path: "", element: <ChatRoomWrapper />}],
      },
      {
        path: "/pushnotification",
        element: <PushNotification />,
      },

      {
        path: "/faq",
        element: <FaqCollapse />,
      },
      {
        path: "/slider",
        element: <Slider />,
      },
      {
        path: "/onboarding-screen",
        element: <OnboardingScreeen />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/:serviceType-services", // Dynamic route for services
        element: <SpecificService />, // Services component
      },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },

      {
        path: "/admin-list",
        element: <Setting />,
      },
      {
        path: "/category-list",
        element: <CategoryList />,
      },
      // {
      //   path: "/service-list",
      //   element: <ServiceList />,
      // },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "delete-account",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
