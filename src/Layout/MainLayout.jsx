import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarSection from '../Components/NavbarSection';

const MainLayout = () => {
    return (
        <div>
            <NavbarSection/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;