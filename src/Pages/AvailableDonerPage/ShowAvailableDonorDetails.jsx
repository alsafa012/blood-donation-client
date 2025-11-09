import { Link, useLoaderData, useLocation } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import { useState } from "react";
import ShowImage from "./ShowImage";
import { MdOutlineReport } from "react-icons/md";
import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import DonorReport from "./DonorReport";
import Swal from "sweetalert2";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

const ShowAvailableDonorDetails = () => {
  const donorDetails = useLoaderData();
  const [loggedUserInfo] = useLoggedUserInfo();
  // console.log(loggedUserInfo);

  // console.log("donorDetails", donorDetails);
  const [showImage, setShowImage] = useState(false);
  // const [showReportForm, setShowReportForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const location = useLocation();
  // console.log("location", location);
  // const navigate = useNavigate();

  const handleReportClick = async () => {
    if (!loggedUserInfo?._id) {
      return Swal.fire({
        title: "Error",
        text: "You must be logged in to report a donor.",
        icon: "error",
      });
    }

    try {
      const res = await axios.get(
        `https://blood-donation-server-ebon.vercel.app/hasReported?reported_by=${loggedUserInfo._id}&reported_to=${donorDetails._id}`
      );

      if (res.data.reported) {
        Swal.fire({
          title: "Warning!",
          text: "You have already reported this donor.",
          icon: "warning",
        });
      } else {
        setShowReportForm(true); // Show the report form
      }
    } catch (error) {
      console.error("Error checking report status:", error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };

  const handleMessengerContact = () => {
    if (donorDetails?.user_messenger) {
      const messengerUrl = `https://m.me/${donorDetails.user_messenger}`;
      window.open(messengerUrl, "_blank");
    } else {
      alert("Messenger contact not available.");
    }
  };
  const handleWhatsAppContact = () => {
    if (donorDetails?.user_whatsapp) {
      // Convert the phone number to international format
      const whatsappNumber = `+880${donorDetails.user_whatsapp}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}`;
      window.open(whatsappUrl, "_blank");
    } else {
      alert("WhatsApp contact not available.");
    }
  };

  return (
    <MyContainer>
      <WebsiteTitle name={`${donorDetails?.user_name}'s Details`} />
      <div className="bg-[#E1F5DA] h-full max-h-screen overflow-hidden">
        <div className="w-[98%] md:w-[80%] lg:w-[70%] mx-auto py-2 md:py-3 bg-[#E1F5DA]">
          <Link
            to={location.state || "/"}
            className="flex items-center p-border max-w-max hover:-skew-y-3 transition gap-2 px-3 py-1 bg rounded-md text-sm font-medium mb-2"
          >
            <FaArrowLeft /> Go Back
          </Link>
          <div className="p-5 rounded-lg shadow-sm bg-whit bg-[#E1F5DA] flex flex-col md:flex-row gap-2 md:gap-5 p-border">
            {/* img && social links */}
            <div className="w-full md:w-1/4 flex-shrink-0">
              <div className="">
                <img
                  onClick={() => setShowImage(true)}
                  className="h-[300px] w-full md:h-[300px] lg:h-[300px] object-cover rounded-md cursor-pointer"
                  src={
                    donorDetails?.showImage
                      ? donorDetails?.user_image
                      : donorDetails?.user_gender === "Male"
                      ? "https://i.ibb.co/mtL872C/image.png"
                      : "https://i.ibb.co.com/270Pssg6/women-hijab.jpg"
                  }
                  alt="user_image.png"
                />
              </div>
              {/* Social icons */}
              <div className="flex gap-2 items-center pt-2">
                {donorDetails?.user_messenger && (
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
                {donorDetails?.user_whatsapp && (
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
                {/* report icon */}
                {donorDetails?.user_email !== loggedUserInfo.user_email && (
                  <button
                    className="md:hover:rotate-45 duration-300 rounded-full"
                    onClick={handleReportClick}
                  >
                    <MdOutlineReport size={28} />
                  </button>
                )}
              </div>
            </div>
            {/* personal info */}
            <div className="flex-1 mt-1 md:mt-0">
              {/* Info Display */}
              <h3 className="text-2xl font-semibold capitalize mb-2">
                {donorDetails?.user_name}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-base">
                <div>
                  <span className="font-semibold">Age:</span>{" "}
                  {donorDetails?.user_age}
                </div>
                <div>
                  <span className="font-semibold">Blood Group:</span>{" "}
                  <ShowBloodGroup blood={donorDetails?.bloodGroup} />
                </div>
                <div>
                  <span className="font-semibold">Phone No:</span>{" "}
                  {donorDetails?.phone_number}
                </div>
                <div>
                  <span className="font-semibold">Alternative Phone:</span>{" "}
                  {donorDetails?.alternative_phone_number || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>
                  <a
                    className="text-blue-500 ml-1"
                    href={`mailto:${donorDetails?.user_email}`}
                  >
                    {donorDetails?.user_email}
                  </a>
                </div>
                <div>
                  <span className="font-semibold">Gender:</span>{" "}
                  {donorDetails?.user_gender}
                </div>
                <div>
                  <span className="font-semibold">Religion:</span>{" "}
                  {donorDetails?.user_religious}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {donorDetails?.user_full_address
                    ? donorDetails.user_full_address
                    : `${donorDetails?.user_address || ""}, ${
                        donorDetails?.user_area || ""
                      }, ${donorDetails?.user_district || ""}`}
                  {/* {donorDetails?.user_full_address}, {donorDetails?.user_area},{" "}
              {donorDetails?.user_district} */}
                </div>
                <div>
                  <span className="font-semibold">Nationality:</span>{" "}
                  {donorDetails?.user_nationality}
                </div>
              </div>
            </div>

            {/* show selected image */}
            <ShowImage
              displayImage={
                donorDetails?.showImage
                  ? donorDetails?.user_image
                  : donorDetails?.user_gender === "Male"
                  ? "https://i.ibb.co/mtL872C/image.png"
                  : "https://i.ibb.co/270Pssg6/women-hijab.jpg"
              }
              showImage={showImage}
              setShowImage={setShowImage}
            />
            {/* --------- */}
          </div>
        </div>
      </div>

      {/* Pass the state to DonorReport */}
      <DonorReport
        donorId={donorDetails?._id}
        showReportForm={showReportForm}
        setShowReportForm={setShowReportForm}
      />
    </MyContainer>
  );
};

export default ShowAvailableDonorDetails;
