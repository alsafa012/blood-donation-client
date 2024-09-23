import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import AllPostPage from "../Pages/AllPostPage/AllPostPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import DashboardLayout from "../Layout/DashboardLayout";
import HomePage from "../Pages/HomePage/HomePage";
import AvailableDonorPage from "../Pages/AvailableDonerPage/AvailableDonorPage";
import PrivateRoute from "./PrivateRoute";
import ShowAvailableDonorDetails from "../Pages/AvailableDonerPage/ShowAvailableDonorDetails";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfilePage/UserProfile";
import UpdateUserProfile from "../Pages/Dashboard/UserDashboard/UserProfilePage/UpdateUserProfile";
import CreatePostPage from "../Pages/AllPostPage/CreatePostPage";
import MyActivities from "../Pages/Dashboard/UserDashboard/MyActivities/MyActivities";
import ReviewPostPage from "../Pages/Dashboard/UserDashboard/ReviewPostPage/ReviewPostPage";
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
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/posts",
        element: <AllPostPage />,
      },
      {
        path: "/createPost",
        element: <CreatePostPage />,
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
        path: "/updateProfile/:id",
        element: <UpdateUserProfile />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
