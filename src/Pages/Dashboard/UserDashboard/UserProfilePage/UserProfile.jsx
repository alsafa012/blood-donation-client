import { useState } from "react";
import useAllUsersInfo from "../../../../Components/hooks/useAllUsersInfo";
import useAuth from "../../../../Components/hooks/useAuth";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

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
      .patch(`http://localhost:5000/users/${id}`, { status: newStatus })
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
    <div className="text-black">
      <WebsiteTitle name={"DeshiDeals || My Profile"}></WebsiteTitle>
      {/* <p>user dashboard</p> */}
      <div className=" h-[700px] lg:w-[900px]">
        <h1 className="text-[40px] text-center font-bold underline ">
          User profile
        </h1>
        <div>
          {filterData.map((info) => (
            <div className="" key={info._id}>
              <div>
                <img
                  className="w-[200px] h-[200px] rounded-md object-fill"
                  src={info?.user_image}
                  alt="img"
                />
              </div>
              <div className="flex gap-10 items-center">
                {/* Active btn */}
                <button
                  onClick={() =>
                    handleUpdateStatus(info?._id, info?.user_activeStatus)
                  }
                  className={`flex h-fit w-8 items-center rounded-sm border border-sky-400 ${
                    info?.user_activeStatus === "active"
                      ? "bg-green-400/50 duration-500"
                      : "duration-300"
                  }`}
                >
                  <div
                    className={`size-4 rounded-sm bg-sky-400 duration-300 ${
                      info?.user_activeStatus === "active"
                        ? "translate-x-4"
                        : "translate-x-0"
                    }`}
                  ></div>
                </button>
                <Link to={`/updateProfile/${info._id}`}>
                  <button className="btn">Edit</button>
                </Link>
              </div>
              {/* ------- */}
              <div className="space-y-2 mt-5">
                <p className="text-xl font-semibold text-black">
                  Name: {info?.user_name}
                </p>
                <p className="text-xl font-semibold text-black">
                  Age: {info?.user_age}
                </p>
                <p className="text-xl font-semibold text-black">
                  BloodGroup: {info?.bloodGroup}
                </p>
                <p className="text-xl font-semibold text-black">
                  Phone number:{info?.phone_number}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_email}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_whatsapp}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_messenger}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_nationality}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_address}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_activeStatus}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_maritalStatus}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_religious}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.user_password}
                </p>
                <p className="text-xl font-semibold text-black">
                  {info?.account_createdTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
