import React, { useState } from "react";
import MyContainer from "../Shared/MyContainer";
import { CgLogOut } from "react-icons/cg";
import { FaHome, FaListUl } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Components/hooks/useAuth";
import { IoClose } from "react-icons/io5";
import { BiSolidHomeHeart } from "react-icons/bi";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <MyContainer>
      <div className="drawer lg:drawer-open min-h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative max-h-screen overflow-hidden">
          {/* Page content here */}
          <label
            onClick={() => setToggle(!toggle)}
            htmlFor="my-drawer-2"
            className=" text-black p-2 drawer-button lg:hidden fixed z-30 top-2 right-2"
          >
            <button>
              {toggle ? <IoClose size={25} /> : <FaListUl size={25} />}
            </button>
          </label>
          <div className="">
            <Outlet></Outlet>
          </div>
        </div>
        {/* side bar div */}
        <div className="drawer-side min-h-screen z-50">
          <label
            onClick={() => setToggle(false)}
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* side bar content */}
          <ul className="menu p-4 w-[300px] md:w-[300px] lg:w-[250px] xl:w-[300px] min-h-full bg-primary text-black font-medium">
            <>
              {user && (
                <div className="w-full my-3">
                  <img
                    className="rounded-full h-[100px] w-[100px] object-cover mx-auto"
                    src={user?.photoURL}
                    alt=""
                  />
                  <p className="font-medium text-center p-2">
                    {/* {user && isAdmin ? "Admin" : "Customer"} */}
                  </p>
                  {/* <p className="font-medium text-center p-2">{userRole}</p> */}
                </div>
              )}
              {user && (
                <li>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "nav-lists-border nav-text cursor-pointer pb-[6px] bg-[#bfd3a4]"
                        : "cursor-pointer pb-[6px]"
                    }
                    to="/dashboard/userProfile"
                  >
                    <BiSolidHomeHeart size={25} /> Admin Home
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "nav-lists-border nav-text cursor-pointer pb-[6px] bg-[#bfd3a4]"
                      : "cursor-pointer pb-[6px]"
                  }
                  to="/dashboard/myActivities"
                >
                  <BiSolidHomeHeart size={25} /> My Activities
                </NavLink>
              </li>
            </>
            {/* // )} */}
            <div className="divider divider-info"></div>
            {/* shared lists */}
            <li>
              <NavLink to="/">
                <FaHome size={25} />
                Home
              </NavLink>
            </li>
            {user && (
              <li>
                <button
                  //   onClick={handleUserSignOut}
                  className="flex items-center gap-2 red"
                >
                  <CgLogOut size={25} />
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </MyContainer>
  );
};

export default DashboardLayout;
