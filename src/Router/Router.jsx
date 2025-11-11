import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import AllPostPage from "../Pages/AllPostPage/AllPostPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import DashboardLayout from "../Layout/DashboardLayout";
import HomePage from "../Pages/HomePage/HomePage";
// import AvailableDonorPage from "../Pages/AvailableDonerPage/AvailableDonorPage";
import PrivateRoute from "./PrivateRoute";
import ShowAvailableDonorDetails from "../Pages/AvailableDonerPage/ShowAvailableDonorDetails";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfilePage/UserProfile";
import UpdateUserProfile from "../Pages/Dashboard/UserDashboard/UserProfilePage/UpdateUserProfile";
import CreatePostPage from "../Pages/AllPostPage/CreatePostPage";
import MyActivities from "../Pages/Dashboard/UserDashboard/MyActivities/MyActivities";
import ReviewPostPage from "../Pages/Dashboard/UserDashboard/ReviewPostPage/ReviewPostPage";
import ShowSelectedPostDetails from "../Pages/ShowSelectedPostDetails/ShowSelectedPostDetails";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers";
import DownloadCard from "../Pages/Dashboard/UserDashboard/DownloadCard/DownloadCard";
import UpdatePostPage from "../Pages/AllPostPage/UpdatePostPage";
import AvailableDonorPage from "../Pages/AvailableDonerPage/AvailableDonorPage";
import BlogPage from "../Pages/BlogsPage/BlogPage";
import BloodBankInfo from "../Pages/BloodBankInfo/BloodBankInfo";
import ViewAllPostsByUser from "../Pages/Dashboard/AdminDashboard/ViewAllPostsByUser";
import RoktojoddhaInformation from "../Components/RoktojoddhaInformation/RoktojoddhaInformation";

const myCreatedRouter = createBrowserRouter([
  // https://blood-donation-server-ebon.vercel.app
  // http://localhost:5000
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        element: (
          // <PrivateRoute>
          <HomePage />
          // </PrivateRoute>
        ),
      },
      {
        path: "/posts",
        element: <AllPostPage />,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/bloodBanks",
        element: <BloodBankInfo />,
      },
      {
        path: "/roktojoddhaInfoPage",
        element: <RoktojoddhaInformation />,
      },
      {
        path: "/createPost",
        element: (
          <PrivateRoute>
            <CreatePostPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/updatePost/:id",
        element: (
          <PrivateRoute>
            <UpdatePostPage />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blood-donation-server-ebon.vercel.app/allPosts/${params.id}`
          ),
      },
      {
        path: "/availableDonors",
        element: <AvailableDonorPage />,
      },
      {
        path: "/availableDonors/:id",
        element: <ShowAvailableDonorDetails />,
        loader: ({ params }) =>
          fetch(
            `https://blood-donation-server-ebon.vercel.app/available-donor/${params.id}`
          ),
      },
      {
        path: "/selected-post/:id",
        element: <ShowSelectedPostDetails />,
        loader: ({ params }) =>
          fetch(
            `https://blood-donation-server-ebon.vercel.app/single-post-details/${params.id}`
          ),
      },
      {
        path: "/updateProfile/:id",
        element: <UpdateUserProfile />,
        loader: ({ params }) =>
          fetch(
            `https://blood-donation-server-ebon.vercel.app/users/${params.id}`
          ),
      },
    ],
  },

  // dashboard route
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <div>error</div>,
    children: [
      {
        path: "/dashboard/userProfile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/myActivities",
        element: <MyActivities />,
      },
      {
        path: "/dashboard/review",
        element: <ReviewPostPage />,
      },
      {
        path: "/dashboard/cardDownload",
        element: (
          <PrivateRoute>
            <DownloadCard />,
          </PrivateRoute>
        ),
      },

      // admin dashboard

      {
        path: "/dashboard/admin/admin-home",
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/viewAllPostsByUser/:userId",
        element: (
          <PrivateRoute>
            <ViewAllPostsByUser />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
export default myCreatedRouter;
