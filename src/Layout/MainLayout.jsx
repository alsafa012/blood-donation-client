import { Outlet } from "react-router-dom";
import NavbarSection from "../Components/Header/NavbarSection";
const MainLayout = () => {
  return (
    <div>
      <NavbarSection />
      <Outlet />
    </div>
  );
};

export default MainLayout;
