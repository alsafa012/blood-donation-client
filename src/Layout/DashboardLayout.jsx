import { useEffect, useState } from "react";
import MyContainer from "../Shared/MyContainer";
import { CgLogOut } from "react-icons/cg";
import { FaHome, FaListUl } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Components/hooks/useAuth";
import { IoClose } from "react-icons/io5";
import { BiSolidHomeHeart } from "react-icons/bi";
import { MdOutlineManageAccounts, MdOutlineRateReview } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import useLoggedUserInfo from "../Components/hooks/useLoggedUserInfo";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { user, userSignOut } = useAuth();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const [loggedUserInfo] = useLoggedUserInfo();
  // console.log(loggedUserInfo);
  useEffect(() => {
    if (user) {
      if (user?.email === loggedUserInfo?.user_email) {
        if (loggedUserInfo?.account_status === true) {
          userSignOut();
        }
      }
    }
  }, [
    loggedUserInfo?.account_status,
    loggedUserInfo?.user_email,
    user,
    userSignOut,
  ]);

  // Sign out function
  const handleSignout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        userSignOut()
          .then(() => {
            Swal.fire("Good job!", "User Sign out successfully", "success");
            navigate("/");
          })
          .catch();
      }
    });
  };

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
          <ul className="menu p-4 w-[300px] md:w-[280px] lg:w-[250px] xl:w-[280px] min-h-full bg-primary text-black font-medium">
            <>
              {user && (
                <div className="w-full my-3">
                  <img
                    className="rounded-full h-[100px] w-[100px] object-cover mx-auto"
                    src={user?.photoURL}
                    alt="user_img.png"
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
                    <BiSolidHomeHeart size={25} /> My Home
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
                  <RxActivityLog size={25} /> My Activities
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "nav-lists-border nav-text cursor-pointer pb-[6px] bg-[#bfd3a4]"
                      : "cursor-pointer pb-[6px]"
                  }
                  to="/dashboard/review"
                >
                  <MdOutlineRateReview size={25} /> Write a Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "nav-lists-border nav-text cursor-pointer pb-[6px] bg-[#bfd3a4]"
                      : "cursor-pointer pb-[6px]"
                  }
                  to="/dashboard/cardDownload"
                >
                  <MdOutlineRateReview size={25} /> Download Card
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "nav-lists-border nav-text cursor-pointer pb-[6px] bg-[#bfd3a4]"
                      : "cursor-pointer pb-[6px]"
                  }
                  to="/dashboard/admin/admin-home"
                >
                  <BiSolidHomeHeart size={25} /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "nav-lists-border nav-text cursor-pointer pb-[6px] bg-[#bfd3a4]"
                      : "cursor-pointer pb-[6px]"
                  }
                  to="/dashboard/admin/manageUsers"
                >
                  <MdOutlineManageAccounts size={25} /> Manage Users
                </NavLink>
              </li>
            </>
            {/* // )} */}
            <div className="border border-[#87986a] my-5"></div>
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
                  onClick={handleSignout}
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
