import { Outlet } from "react-router-dom";
import NavbarSection from "../Components/Header/NavbarSection";
import useLoggedUserInfo from "../Components/hooks/useLoggedUserInfo";
import useAuth from "../Components/hooks/useAuth";
import { useEffect } from "react";
const MainLayout = () => {
  const [loggedUserInfo] = useLoggedUserInfo();
  const { user, userSignOut } = useAuth();
  useEffect(() => {
    if (user) {
      if (user?.email === loggedUserInfo?.email) {
        if (loggedUserInfo?.account_status === false) {
          userSignOut();
        }
      }
    }
  }, [
    loggedUserInfo?.account_status,
    loggedUserInfo?.email,
    user,
    userSignOut,
  ]);
  return (
    <div>
      <NavbarSection />
      <Outlet />
    </div>
  );
};

export default MainLayout;
