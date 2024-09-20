import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
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
      navigate: "/posts",
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
        <div className="col-span-1">
          {/* <img
            className="md:w-[213px] h-[35px] md:h-[49px] object-fill"
            src="data:image/jpeg;base64,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"
            alt=""
          /> */}
          <h1 className="text-2xl font-bold p-text">HOPE</h1>
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
        {/* cart && fav */}
        <div className="col-span-1 flex justify-end items-center gap-2">
          {/* profile icon */}

          <div className="relative w-fit text-black">
            <div onClick={() => setOpenDropdown(!openDropdown)}>
              <img
                width={40}
                height={40}
                className="size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
                src={user?.photoURL}
                alt="avatar drop down navigate ui"
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