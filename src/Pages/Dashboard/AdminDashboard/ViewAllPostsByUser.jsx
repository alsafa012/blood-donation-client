import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowLeft, FaPhone } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const ViewAllPostsByUser = () => {
  const { userId } = useParams();
  console.log(userId);
  const [allPosts, setAllPOsts] = useState([]);
  console.log("allPosts", allPosts);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  useEffect(() => {
    fetch(`https://blood-donation-server-ebon.vercel.app/allpostinfobyuserid/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setAllPOsts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [userId]);
  return (
    <div className="max-h-screen overflow-auto">
      <h1 className="bg-[#B5C99A sticky top-0 z-10 bg-[#CFE1B9] text-lg md:text-[24px] font-bold pl-2 py-4 inline-flex gap-1 items-center w-full">
        <MdOutlineRateReview /> Request Review Page
      </h1>
      <Link
        to={location.state || "/"}
        className="mx-2 my-1 flex items-center p-border max-w-max hover:-skew-y-3 transition gap-2 px-3 py-1 bg rounded-md text-sm font-medium"
      >
        <FaArrowLeft /> Go Back
      </Link>
      <div className="grid grid-cols-2 gap-5 px-2 my-3">
        {/* content */}
        {allPosts?.length === 0 && (
          <p className="text-gray-700 mb-6">
            You’ve made{" "}
            <span className="font-semibold">{allPosts?.length}</span> request
            {allPosts?.length !== 1 ? "s" : ""} on Roktojoddha.
          </p>
        )}
        {allPosts?.map((info, ind) => (
          <div
            key={ind}
            className="w-[100%] mx-auto p-border rounded-sm max-h-max overflow-y-auto"
          >
            {/* image and info */}
            <div className="flex justify-between border-b px-1 py-1">
              <div className="flex gap-2 md:gap-4">
                <Link to={`/availableDonors/${info?.creator_id}`}>
                  <img
                    className="w-[50px] h-[50px] object-cover rounded-full hover:opacity-85 duration-300"
                    src={info?.creator_image}
                    alt={"creator_image.png"}
                  />
                </Link>
                <div>
                  <Link
                    to={`/availableDonors/${info?.creator_id}`}
                    className="text-[14px] font-semibold hover:underline"
                  >
                    {info?.creator_name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    Posted on {info?.post_created_date} at{" "}
                    {info?.post_created_time}
                  </p>
                  {/* <small>{post?._id}</small> */}
                </div>
              </div>
            </div>
            {/* content */}
            <div>
              <div>
                {/* content */}
                <div className="px-2 mb-2">
                  {/* Patient Details & Donation Info */}
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    {/* Left Column: Patient Info */}
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">Patient Name:</span>{" "}
                        {info?.patient_name || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Age:</span>{" "}
                        {info?.patient_age}{" "}
                        {info?.patient_age ? "years" : "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Gender:</span>{" "}
                        {info?.patient_gender}
                      </p>
                      <p>
                        <span className="font-semibold">Region:</span>{" "}
                        {info?.patient_region}
                      </p>
                      <p>
                        <span className="font-semibold">
                          Relation with patient:
                        </span>{" "}
                        {info?.relation_with_patient || "N/A"}
                      </p>
                    </div>

                    {/* Right Column: Donation Details */}
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">Blood Needed:</span>{" "}
                        {info?.unit_of_blood} Bag(s)
                      </p>
                      <p>
                        <span className="font-semibold">Deadline:</span>{" "}
                        {info?.post_deadline}
                      </p>
                      {/* hospital_location as hidden */}
                      <p className="hidden">
                        <span className="font-semibold">Hospital:</span>{" "}
                        {info?.hospital_location}
                      </p>
                      {/* district_name as hidden */}
                      <p className="hidden">
                        <span className="font-semibold">Location:</span>{" "}
                        {info?.district_name}, {info?.upazila_name}
                      </p>
                      {/* google_map_location as hidden */}
                      {info?.google_map_location && (
                        <a
                          href={info?.google_map_location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-primar btn-bg px-3 py-1 rounded-md text-center inline-block hidden"
                        >
                          View on Google Maps
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Contact Section as hidden */}
                  <div className="bg-gray-100 p-3 rounded-md mt-4 hidden">
                    <p className="font-semibold">Contact:</p>
                    <p className="text-sm">{info?.primary_number}</p>
                    {info?.alternative_number && (
                      <p className="text-sm">{info?.alternative_number}</p>
                    )}
                  </div>

                  {/* Contact & Hospital Info */}
                  <div className="space-y-2 mt-2">
                    <p className="flex items-center space-x-2">
                      <FaPhone className="text-green-500" />
                      <span>
                        {info?.primary_number}
                        {info?.alternative_number &&
                          `, ${info?.alternative_number}`}
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span>{info?.hospital_location}</span>
                    </p>
                  </div>

                  {/* google map navigate btn */}
                  <div className="text-right mt-2">
                    {info?.google_map_location && (
                      <a
                        href={info?.google_map_location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-primar btn-bg px-3 py-1 rounded-md text-center inline-block"
                      >
                        View on Google Maps
                      </a>
                    )}
                  </div>

                  {/* Medical Reason Section */}
                  {info?.medical_reason && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-1">
                        Medical Reason:
                      </h4>
                      <div className="text-gray-700 text-sm bg-gray-50 p-2 rounded-md max-h-[150px] overflow-auto">
                        {info?.medical_reason
                          .split("\n")
                          .map((line, index) =>
                            line.trim() !== "" ? (
                              <p key={index}>{line}</p>
                            ) : (
                              <br key={index} />
                            )
                          )}
                      </div>
                    </div>
                  )}
                </div>
                {/* image */}
                {info?.post_images?.length > 0 && (
                  <div className="border-t border-[#CFE1B9] flex gap-2 flex-wrap items-center justify-center py-1">
                    {info?.post_images?.map((image, ind) => (
                      <div className="size-28" key={ind}>
                        <img
                          className="md:hover:scale-y-105 p-border hover:rounded-md duration-300 size-28 object-cover cursor-pointer"
                          src={image}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* react & comment div */}
              <div className="flex items-center btn-bg gap-2 justify-between text-[14px] p-1">
                <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                  like
                </button>
                <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                  Comment
                </button>
                <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllPostsByUser;
