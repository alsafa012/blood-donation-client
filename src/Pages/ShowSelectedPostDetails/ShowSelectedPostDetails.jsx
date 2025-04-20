import { useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
// const selectedPostDetails = {
//   _id: "67d6017d4262f72b1b2bbce1",
//   creator_id: "677951655057c9f53ebee23c",
//   creator_name: "MD. RIDOY2",
//   creator_email: "alsafa@gmail.com1",
//   post_created_time: "4:38 AM",
//   post_created_date: "March 16th 2025",
//   creator_image: "https://i.ibb.co.com/q3cfYp7W/my-profile-picture.png",
//   post_deadline: "2025-03-26",
//   unit_of_blood: "9",
//   post_images: [
//     "https://i.ibb.co.com/KzpGwYgG/Screenshot-2025-03-12-23-35-07-900-com-tencent-ig.jpg",
//     "https://i.ibb.co.com/tM87Cnfy/Screenshot-2025-03-13-16-39-05-814-com-tencent-ig.jpg",
//   ],
//   bloodGroup: "APositive",
//   relation_with_patient: "Ee",
//   patient_name: "Aa",
//   patient_age: "55",
//   patient_gender: "Female",
//   patient_region: "Islam",
//   medical_reason: "Aall",
//   primary_number: "44",
//   alternative_number: "44",
//   hospital_location: "Sss",
//   google_map_location: "https://aniwatchtv.to/watch/konosuba",
//   district_name: "",
//   upazila_name: "",
//   found_donor_successfully: false,
//   postCreatedDate: "2025-03-15T22:38:53.217Z",
//   post_updated_date: "March 17th 2025",
//   post_updated_time: "7:39 PM",
// };
const ShowSelectedPostDetails = () => {
  // const [selectedPostDetails, setSelectedPostDetails] = useState([]);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  // console.log(id);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPostDetails = useLoaderData();
  console.log(selectedPostDetails);
  console.log(location);
  console.log("navigate", navigate);

  // useState(() => {
  //   if (id) {
  //     axiosPublic
  //       .get(`/single-post-details/${id}`)
  //       .then((res) => setSelectedPostDetails(res.data));
  //   }
  // }, []);
  const handleNavigate = () => {
    navigate(location.state || "/");
  };

  return (
    <div
      className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden min-h-screen max-h-screen w-full bg-black/20 backdrop-blur-sm`}
    >
      <div className="max-h-[90vh] overflow-y-auto w-[98%] lg:w-[40%] xl:w-[35%] mx-auto ">
        <div
          className="sticky top-0 bg-gray-50 w-full btn-bg py-1 px-1"
          title="Back"
        >
          <button
            className="flex items-center p-1 rounded-full hover:bg-[#B5C99A]"
            onClick={handleNavigate}
          >
            <FaArrowLeft size={25} />
          </button>
        </div>
        {/* content */}
        <div className="w-[100%] mx-auto p-border rounded-sm max-h-max overflow-y-auto">
          {/* image and info */}
          <div className="flex justify-between border-b px-1 py-1">
            <div className="flex gap-2 md:gap-4">
              <Link to={`/availableDonors/${selectedPostDetails?.creator_id}`}>
                <img
                  className="w-[50px] h-[50px] object-cover rounded-full hover:opacity-85 duration-300"
                  src={selectedPostDetails?.creator_image}
                  alt={"creator_image.png"}
                />
              </Link>
              <div>
                <Link
                  to={`/availableDonors/${selectedPostDetails?.creator_id}`}
                  className="text-[14px] font-semibold hover:underline"
                >
                  {selectedPostDetails?.creator_name}
                </Link>
                <p className="text-xs text-gray-500">
                  Posted on {selectedPostDetails?.post_created_date} at{" "}
                  {selectedPostDetails?.post_created_time}
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
                      {selectedPostDetails?.patient_name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Age:</span>{" "}
                      {selectedPostDetails?.patient_age}{" "}
                      {selectedPostDetails?.patient_age ? "years" : "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Gender:</span>{" "}
                      {selectedPostDetails?.patient_gender}
                    </p>
                    <p>
                      <span className="font-semibold">Region:</span>{" "}
                      {selectedPostDetails?.patient_region}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Relation with patient:
                      </span>{" "}
                      {selectedPostDetails?.relation_with_patient || "N/A"}
                    </p>
                  </div>

                  {/* Right Column: Donation Details */}
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Blood Needed:</span>{" "}
                      {selectedPostDetails?.unit_of_blood} Bag(s)
                    </p>
                    <p>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {selectedPostDetails?.post_deadline}
                    </p>
                    {/* hospital_location as hidden */}
                    <p className="hidden">
                      <span className="font-semibold">Hospital:</span>{" "}
                      {selectedPostDetails?.hospital_location}
                    </p>
                    {/* district_name as hidden */}
                    <p className="hidden">
                      <span className="font-semibold">Location:</span>{" "}
                      {selectedPostDetails?.district_name},{" "}
                      {selectedPostDetails?.upazila_name}
                    </p>
                    {/* google_map_location as hidden */}
                    {selectedPostDetails?.google_map_location && (
                      <a
                        href={selectedPostDetails?.google_map_location}
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
                  <p className="text-sm">
                    {selectedPostDetails?.primary_number}
                  </p>
                  {selectedPostDetails?.alternative_number && (
                    <p className="text-sm">
                      {selectedPostDetails?.alternative_number}
                    </p>
                  )}
                </div>

                {/* Contact & Hospital Info */}
                <div className="space-y-2 mt-2">
                  <p className="flex items-center space-x-2">
                    <FaPhone className="text-green-500" />
                    <span>
                      {selectedPostDetails?.primary_number}
                      {selectedPostDetails?.alternative_number &&
                        `, ${selectedPostDetails?.alternative_number}`}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>{selectedPostDetails?.hospital_location}</span>
                  </p>
                </div>

                {/* google map navigate btn */}
                <div className="text-right mt-2">
                  {selectedPostDetails?.google_map_location && (
                    <a
                      href={selectedPostDetails?.google_map_location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-primar btn-bg px-3 py-1 rounded-md text-center inline-block"
                    >
                      View on Google Maps
                    </a>
                  )}
                </div>

                {/* Medical Reason Section */}
                {selectedPostDetails?.medical_reason && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-1">
                      Medical Reason:
                    </h4>
                    <div className="text-gray-700 text-sm bg-gray-50 p-2 rounded-md max-h-[150px] overflow-auto">
                      {selectedPostDetails?.medical_reason
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
              {selectedPostDetails?.post_images?.length > 0 && (
                <div className="border-t border-[#CFE1B9] flex gap-2 flex-wrap items-center justify-center py-1">
                  {selectedPostDetails?.post_images?.map((image, ind) => (
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
        
      </div>
    </div>
  );
};

export default ShowSelectedPostDetails;
