import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
const myCreatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "/",
        element: <RegistrationPage />,
      },
    ],
  },
]);

export default myCreatedRouter;
