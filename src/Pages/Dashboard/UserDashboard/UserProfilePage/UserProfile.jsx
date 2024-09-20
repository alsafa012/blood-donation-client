import { useState } from "react";
import useAllUsersInfo from "../../../../Components/hooks/useAllUsersInfo";
import useAuth from "../../../../Components/hooks/useAuth";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import ShowBloodGroup from "../../../../Shared/ShowBloodGroup";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const UserProfile = () => {
  const [allUsers, refetch] = useAllUsersInfo();
  console.log(allUsers);
  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);
  const filterData = allUsers?.filter(
    (item) => item.user_email === user?.email
  );
  console.log(filterData);
  const handleUpdateStatus = (id, status) => {
    console.log(id);
    const newStatus = status === "active" ? "inactive" : "active";
    // const updateRole = { status: newStatus };

    axios
      .patch(`https://blood-donation-server-ebon.vercel.app/users/${id}`, {
        status: newStatus,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `User's status changed to ${newStatus}`,
            icon: "success",
          });
          refetch();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="text-black max-h-screen overflow-auto">
      <WebsiteTitle name={"Hope || My Profile"}></WebsiteTitle>
      {/* <p>user dashboard</p> */}
      <div className="">
        <h1 className="bg-[#B5C99A bg-[#CFE1B9] text-lg md:text-[24px] text-cente font-bold pl-2 py-4 inline-flex gap-1 items-center w-full">
          <CgProfile /> User profile
        </h1>
        <div className="w-[85%] mt-5 mx-auto">
          {filterData.map((info) => (
            <div className="" key={info._id}>
              {/* img div */}
              <div className="w-[200px]">
                <img
                  className="w-[200px] h-[300px] rounded-md object-fill"
                  src={info?.user_image}
                  alt="img"
                />
                {/* status and edit btn */}
                <div className="flex gap-10 items-center justify-between py-2">
                  {/* Active btn */}
                  <button
                    onClick={() =>
                      handleUpdateStatus(info?._id, info?.user_activeStatus)
                    }
                    className={`flex h-fit w-8 items-center rounded-sm border border-[#CFE1B9] ${
                      info?.user_activeStatus === "active"
                        ? "bg-[#CFE1B9] duration-500"
                        : "duration-300"
                    }`}
                  >
                    <div
                      className={`size-4 rounded-sm btn-bg duration-300 ${
                        info?.user_activeStatus === "active"
                          ? "translate-x-4"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </button>
                  <Link to={`/updateProfile/${info._id}`}>
                    <button className="">
                      <FaRegEdit size={25} fill="#97A97C" />
                    </button>
                  </Link>
                </div>
              </div>
              {/* ------- */}
              <div className="flex flex-col gap-2 md:gap-3 px-2 border-y py-2 mb-5">
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Name</p> <p>: {info?.user_name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Age</p>
                  <p>: {info?.user_age}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Blood Group</p>
                  <div className="flex gap-1">
                    <p>:</p> <ShowBloodGroup blood={info?.bloodGroup} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Phone No</p>
                  <p>: {info?.phone_number}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Contact Via Email</p>
                  <p>: {info?.user_email}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Contact Via Whatsapp</p>
                  {info?.user_whatsapp ? (
                    <div>
                      <span>:</span>
                      <button
                        className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-start ml-1 hover:underline hover:text-[#97A97C]"
                        // onClick={handleWhatsAppContact}
                      >
                        click here
                        {/* {info?.user_whatsapp} */}
                      </button>
                    </div>
                  ) : (
                    <p>: Not available</p>
                  )}
                  {/* <p>: {info?.user_whatsapp}</p> */}
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Contact Via Messenger</p>
                  {info?.user_messenger ? (
                    <div>
                      <span>:</span>
                      <button
                        className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-start ml-1 hover:underline hover:text-[#97A97C]"
                        // onClick={handleMessengerContact}
                      >
                        click here
                        {/* {info?.user_messenger} */}
                      </button>
                    </div>
                  ) : (
                    <p>: Not available</p>
                  )}
                  {/* <p>: {info?.user_messenger}</p> */}
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p> MaritalStatus</p> <p>: {info?.user_maritalStatus}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Religion</p> <p>: {info?.user_religious}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p> Address</p>{" "}
                  <p>
                    : {info?.user_area}, {info?.user_district}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Nationality</p> <p>: {info?.user_nationality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
