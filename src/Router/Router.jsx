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

const myCreatedRouter = createBrowserRouter([
  // http://localhost:5000
  // https://blood-donation-server-ebon.vercel.app
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
          fetch(`http://localhost:5000/allPosts/${params.id}`),
      },
      {
        path: "/availableDonors",
        element: <AvailableDonorPage />,
      },
      {
        path: "/availableDonors/:id",
        element: <ShowAvailableDonorDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/available-donor/${params.id}`),
      },
      {
        path: "/selected-post/:id",
        element: <ShowSelectedPostDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/single-post-details/${params.id}`),
      },
      {
        path: "/updateProfile/:id",
        element: <UpdateUserProfile />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
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
            <DownloadCard />
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
