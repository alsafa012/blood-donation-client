import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { IoIosNotifications } from "react-icons/io";
const navData = [
  {
    id: 1,
    name: "Home",
    navigate: "/",
  },
  {
    id: 2,
    name: "Posts",
    navigate: "/posts",
  },
  {
    id: 3,
    name: "Available Doner",
    navigate: "/availableDonors",
  },
];
const NavbarSection = () => {
  const [toggle, setToggle] = useState(false);
  const { user, userSignOut } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  // const items = ["Profile", "Dashboard", "Log Out"];
  const items = [
    {
      id: 1,
      name: "Profile",
      navigate: "/dashboard/userProfile",
    },
    {
      id: 2,
      name: "Dashboard",
      navigate: "/dashboard/userProfile",
    },
    {
      id: 3,
      name: "Log Out",
      navigate: "",
    },
  ];
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
            navigate("/registration");
          })
          .catch();
      }
    });
  };
  return (
    <nav className="max-w-screen-2xl mx-auto bg-primary sticky top-0 border-b border-[rgb(210,216,211)] z-50">
      <div className="md:h-[93px] grid grid-cols-2 md:grid-cols-4 items-center px-3 py-5">
        {/* logo div */}
        <div className="col-span-1 flex gap-1 items-center relative">
          <img
            className="md:w-[213px h-[120px] md:h-[120px] object-fill bg-none absolute -left-12 md:-left-12"
            src="https://i.ibb.co.com/S7vw7fm/logo-with-heart-hand.png"
            alt=""
          />
          <h1 className="text-2xl font-bold p-text pl-9 md:pl-9">HOPE</h1>
        </div>
        {/* lists */}
        <div className="hidden md:block text-center mx-auto w-ful col-span-2">
          <ul className="flex gap-5 items-center">
            {navData.map((info) => (
              <NavLink
                key={info.id}
                to={info.navigate}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "nav-lists-border nav-text cursor-pointer pb-[6px]"
                    : "cursor-pointer pb-[6px]"
                }
              >
                {info?.name}
              </NavLink>
            ))}
          </ul>
        </div>
        {/*profile icon fiv */}
        <div className="col-span-1 flex justify-end items-center gap-2">
          {/* profile icon */}
          <div className="relative w-fit text-black flex items-center gap-3">
            <button className="border relative hover:bg-[#dff3c6] p-1 cursor-pointer rounded-full">
              <IoIosNotifications size={25}/>
              <span className="absolute -top-3 -right-1">10</span>
            </button>
            <div onClick={() => setOpenDropdown(!openDropdown)}>
              <img
                // width={40}
                // height={40}
                className="size-8 md:size-8 rounded-full cursor-pointer bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
                src={user?.photoURL}
                alt="avatar"
              />
            </div>

            <ul
              className={` ${
                openDropdown ? "" : "hidden"
              } absolute top-[68px] right-5 z- w-fit rounded-sm bg-primary shadow-md`}
            >
              {items?.map((item, idx) => (
                <Link key={idx} to={item?.navigate}>
                  <li
                    onClick={() =>
                      `${item?.name === "Log Out" && handleSignout()}`
                    }
                    className={`rounded-sm px-6 py-2 cursor-pointer ${
                      item?.name === "Log Out"
                        ? "text-red-500 hover:bg-red-600 hover:text-white"
                        : "hover:bg-[#CFE1B9]"
                    }`}
                  >
                    {item?.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* ------------------ */}
          {/* 3dot icon for mobile device */}
          <button className="md:hidden block">
            {/* <IoReorderThreeOutline /> */}
            <label
              htmlFor="check"
              className="flex flex-col gap-[5px] rounded-lg cursor-pointer"
            >
              <input
                onClick={() => setToggle(!toggle)}
                type="checkbox"
                id="check"
                className="peer/check hidden"
              />
              <span className="w-8 h-1 rounded-lg inline-block bg-[#87986A] peer-checked/check:rotate-45 peer-checked/check:translate-y-2 duration-300"></span>
              <span className="w-8 h-1 rounded-lg inline-block bg-[#87986A] peer-checked/check:scale-0 duration-300"></span>
              <span className="w-8 h-1 rounded-lg inline-block bg-[#87986A] peer-checked/check:-rotate-45 peer-checked/check:-translate-y-2 duration-300"></span>
            </label>
          </button>
        </div>
      </div>
      {/* list items for mobile device */}
      <div className={`md:hidden`}>
        <ul
          className={`flex overflow-hidden flex-col gap-7 justify-center transition-all duration-300 items-center bg-primary bg-[#CFE1B9 border absolute w-full ${
            toggle ? "h-[220px]" : "h-0"
          }`}
        >
          {navData.map((info) => (
            <NavLink
              key={info.id}
              to={info.navigate}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "nav-lists-border nav-text cursor-pointer pb-[6px]"
                  : "cursor-pointer pb-[6px]"
              }
            >
              {info?.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarSection;
