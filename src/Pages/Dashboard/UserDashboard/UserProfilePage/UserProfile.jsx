import useAllUsersInfo from "../../../../Components/hooks/useAllUsersInfo";
import useAuth from "../../../../Components/hooks/useAuth";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import ShowBloodGroup from "../../../../Shared/ShowBloodGroup";
import { FaRegEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import useAxiosPublic from "../../../../Components/hooks/useAxiosPublic";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";

const UserProfile = () => {
  const [allUsers, refetchUser] = useAllUsersInfo();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [loggedUserInfo] = useLoggedUserInfo();
  const location = useLocation();
  // const [toggle, setToggle] = useState(false);
  const filterData = allUsers?.filter(
    (item) => item.user_email === user?.email
  );
  // console.log(filterData);
  const handleUpdateStatus = (id, activeStatus, accountStatus, showImage) => {
    // console.log(id);
    const updatedStatus = {
      user_activeStatus: activeStatus === "active" ? "inactive" : "active",
      account_status: accountStatus,
      showImage: showImage,
    };
    axiosPublic
      .patch(`/users/${id}`, updatedStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `User's status changed to ${updatedStatus.user_activeStatus}`,
            icon: "success",
          });
          refetchUser();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMessengerContact = () => {
    if (filterData) {
      filterData?.map((info) => {
        if (info.user_messenger) {
          const messengerUrl = `https://m.me/${info.user_messenger}`;
          window.open(messengerUrl, "_blank");
        } else {
          alert("Messenger contact not available.");
        }
      });
    } else {
      alert("Messenger contact not available.");
    }
  };
  const handleWhatsAppContact = () => {
    if (filterData) {
      filterData?.map((info) => {
        if (info.user_whatsapp) {
          const whatsappNumber = `+880${info.user_whatsapp}`;
          const whatsappUrl = `https://wa.me/${whatsappNumber}`;
          window.open(whatsappUrl, "_blank");
        } else {
          alert("WhatsApp contact not available.");
        }
      });
    } else {
      alert("WhatsApp contact not available.");
    }
  };

  const handleHideImage = (id, showImage, info) => {
    // alert("image hide", showImage);
    const updatedImageInfo = {
      ...info,
      showImage: !showImage,
    };
    console.log(updatedImageInfo);

    // const updatedStatus = {
    //   // user_activeStatus: activeStatus === "active" ? "inactive" : "active",
    //   // account_status: accountStatus,
    // };
    axiosPublic
      .patch(`/users/${id}`, updatedImageInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `User's status changed to`,
            icon: "success",
          });
          refetchUser();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="text-black max-h-screen overflow-auto">
      <WebsiteTitle name={"রক্তযোদ্ধা || My Profile"}></WebsiteTitle>
      {/* <p>user dashboard</p> */}
      <div className="">
        <h1 className="bg-[#B5C99A sticky top-0 z-10 bg-[#CFE1B9] text-lg md:text-[24px] font-bold pl-2 py-4 inline-flex gap-1 items-center w-full">
          <CgProfile /> My profile
        </h1>
        <div className="w-[85%] mt-2 mx-auto">
          {filterData?.map((info) => (
            <div className="" key={info._id}>
              {/* img div */}
              <div className="w-max min-w-[200px]">
                <img
                  className="h-[300px] rounded-md object-cover"
                  src={
                    info?.showImage
                      ? info?.user_image
                      : info?.user_gender === "Male"
                      ? "https://i.ibb.co/mtL872C/image.png"
                      : "https://i.ibb.co.com/270Pssg6/women-hijab.jpg"
                  }
                  alt="img"
                />
                {/* status and edit btn */}
                <div className="flex gap-10 items-center justify-between py-2">
                  {/* Social icons */}
                  <div className="flex gap-2 items-center">
                    {info?.user_messenger && (
                      <div
                        className="size-8 cursor-pointer md:hover:rotate-45 duration-300 rounded-full"
                        onClick={handleMessengerContact}
                      >
                        <img
                          className="size-8 rounded-full"
                          src="https://i.ibb.co.com/3zzvw7k/logo-512.webp"
                          alt=""
                        />
                      </div>
                    )}
                    {info?.user_whatsapp && (
                      <div
                        className="size-7 cursor-pointer md:hover:rotate-45 duration-300 rounded-full"
                        onClick={handleWhatsAppContact}
                      >
                        <img
                          className="size-7 rounded-full"
                          src="https://i.ibb.co.com/BBxHZdG/whatsapp-512.webp"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  {/* ------------- */}
                  {/* Active btn */}
                  <div className="flex gap-2 items-center">
                    <Link
                      state={location?.pathname}
                      to={`/updateProfile/${info._id}`}
                    >
                      <button className="">
                        <FaRegEdit size={20} fill="#97A97C" />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          info?._id,
                          info?.user_activeStatus,
                          info?.account_status,
                          info?.showImage
                        )
                      }
                      className={`flex h-fit w-8 items-center rounded-sm ${
                        info?.user_activeStatus === "active"
                          ? "bg-[#CFE1B9] duration-500"
                          : "border border-[#CFE1B9] duration-300"
                      }`}
                    >
                      <div
                        className={`size-4 btn-bg duration-300 ${
                          info?.user_activeStatus === "active"
                            ? "translate-x-4 rounded-sm"
                            : "translate-x-0 rounded-sm"
                        }`}
                      ></div>
                    </button>

                    {/* <button
                      onClick={() =>
                        handleUpdateStatus(info?._id, info?.user_activeStatus)
                      }
                      className={`flex h-fit w-8 items-center rounded-sm border border-sky-400 ${
                        info?.user_activeStatus === "active"
                          ? "bg-[#CFE1B9] duration-500"
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
                    </button> */}
                  </div>
                </div>
                {/* Image hide button */}
                <div className="flex gap-1 items-center mb-2">
                  {info.showImage ? (
                    <p>Hide your image to others</p>
                  ) : (
                    <p>Show your image to others</p>
                  )}
                  <button
                    onClick={() =>
                      handleHideImage(
                        info?._id,

                        info?.showImage,
                        info
                      )
                    }
                    className="px-2 py-[1px] bg-primary rounded-md text-white border-none"
                  >
                    {info.showImage ? "HIde" : "Show"}
                  </button>
                </div>
              </div>
              {/* ------- */}
              <div className="flex flex-col gap-2 md:gap-3 px-2 border-y py-2 mb-5">
                {user?.email === loggedUserInfo?.user_email && (
                  <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                    <p>UID</p> <p className="capitalize">: {info?._id}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Name</p> <p className="capitalize">: {info?.user_name}</p>
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
                  <p> MaritalStatus</p>
                  <p className="capitalize">: {info?.user_maritalStatus}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p> Gender</p>
                  <p className="capitalize">: {info?.user_gender}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p>Religion</p>
                  <p className="capitalize">: {info?.user_religious}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
                  <p> Address</p>
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
