import { Outlet } from "react-router-dom";
import NavbarSection from "../Components/NavbarSection";
import useAuth from "../Components/hooks/useAuth";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";

const MainLayout = () => {
  const { user } = useAuth();

//   if(!user){
// navigate("/registration")
//   }
  return (
    <div>
      {/* {user ? (
        <div>
          <NavbarSection />
          <Outlet />
        </div>
      ) : (
        <RegistrationPage />
      )} */}
        <NavbarSection />
        <Outlet />
    </div>
  );
};

export default MainLayout;
