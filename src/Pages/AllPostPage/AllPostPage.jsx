import { useEffect, useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import { Link, useNavigate } from "react-router-dom";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoMdSend,
} from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { MdOutlineCancel } from "react-icons/md";
import useAllPostsInfo from "../../Components/hooks/useAllPostsInfo";
import useAllComments from "../../Components/hooks/useAllComments";
import LoadingAnimation from "../../Shared/LoadingAnimation";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import GoogleMapModal from "../../Shared/GoogleMapModal";
import { BiDotsVertical } from "react-icons/bi";
import { TbHandClick } from "react-icons/tb";
import useAuth from "../../Components/hooks/useAuth";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
const AllPostPage = () => {
  const [, allPostsInfo, refetchPostData, isLoading] = useAllPostsInfo();
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [openComment, setOpenComment] = useState(false);
  const [showComments1, setShowComments1] = useState([]);
  const [selectedPostDetail, setSelectedPostDetail] = useState({});
  const [loggedUserInfo] = useLoggedUserInfo();
  const axiosPublic = useAxiosPublic();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSelectedImage, setShowSelectedImage] = useState(false);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(null);
  // console.log("selectedPostDetail", selectedPostDetail);
  // console.log(showSelectedImage);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (openComment) {
      const filtered = allCommentsInfo?.filter(
        (comment) => selectedPostDetail._id === comment.selected_post_id
      );
      setShowComments1(filtered);
      // console.log(filtered);
    }
  }, [openComment, selectedPostDetail._id, allCommentsInfo]);

  const handleShowCommentDiv = (data, ind) => {
    setSelectedPostDetail(data);
    console.log(ind);
    setOpenComment(true);
  };
  const handleSendComment = () => {
    //  alert("handleSendComment")
    const commentTextAreaValue = document.getElementById("comment_box");
    const textAreaValue = commentTextAreaValue.value;
    const commentData = {
      selected_post_id: selectedPostDetail._id, //get selected post _id
      commented_person_id: loggedUserInfo?._id,
      commented_person_name: loggedUserInfo?.user_name,
      commented_person_email: loggedUserInfo?.user_email,
      comment_time: moment().format("LT"),
      comment_date: moment().format("MMMM Do YYYY"),
      commented_person_image: loggedUserInfo?.user_image,
      comment: textAreaValue,
    };
    console.log(commentData);
    axiosPublic.post("/allComments", commentData).then((res) => {
      if (res.data.insertedId) {
        commentTextAreaValue.value = "";
        refetchComments();
        Swal.fire("Good job!", "comment created successfully", "success");
      }
    });
  };

  const handleUpdateStatus = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "If the donor found then click on and this Request will disappear from post page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes. donor received.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .patch(`/allPosts/${id}`, {
            status: true,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: `Post updated.`,
                icon: "success",
              });
              refetchPostData();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };
  const handleDeleteAllPosts = () => {
    axiosPublic.delete("/allPosts").then((res) => console.log(res.data));
  };
  const handleDeleteAllComments = () => {
    axiosPublic.delete("/allComments").then((res) => console.log(res.data));
  };
  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleShowSelectedImage = (ind, user) => {
    // setDisplayImage(img);
    // console.log(img);
    setSelectedImageIndex(ind);
    setSelectedPostDetail(user);
    setShowSelectedImage(true);
  };
  const handleNextImage = () => {
    if (
      selectedPostDetail.post_images &&
      selectedPostDetail.post_images.length > 0
    ) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === selectedPostDetail.post_images.length - 1
          ? 0
          : prevIndex + 1
      );
    }
  };
  const handlePreviousImage = () => {
    if (
      selectedPostDetail.post_images &&
      selectedPostDetail.post_images.length > 0
    ) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0
          ? selectedPostDetail.post_images.length - 1
          : prevIndex - 1
      );
    }
  };

  const NavigateCreatePostPage = () => {
    if (user) {
      navigate("/createPost");
    } else {
      navigate("/login");
    }
  };

  return (
    <MyContainer>
      {/* <button onClick={handleDeleteAllComments} className="btn">
        DeleteAllComments
      </button> */}
      <WebsiteTitle name={"রক্তযোদ্ধা || Posts"} />
      <div className="w-full grid grid-cols-4 lg:gap-3 mx-auto relative max-h-[85vh] overflow-auto">
        {/* left sidebar */}
        <div className="hidden md:block col-span-1 sticky top-2 right-0 p-4 lg:p-5 min-h-[80vh] max-h-[80vh] overflow-auto bg-white shadow-lg rounded-md">
          <h2 className="text-lg font-bold text-red-600 border-b pb-2 mb-3">
            💉 রক্তদান করার আগে মনে রাখুন
          </h2>
          <ul className="space-y-4 text-gray-800">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">১.</span> রোগীর ব্যাপারে
              বিস্তারিত জেনে নিশ্চিত হয়ে রক্ত দিন।
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">২.</span> প্রতিবার
              রক্তদানের পর তারিখ পরিবর্তন করে দিন বা যোগাযোগ করুন।
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">৩.</span> রোগী দেখে
              রক্তদান করুন। অবশ্যই রোগীর নিকট উপস্থিত আত্মীয়ের সাথে কথা বলে
              জানিয়ে দিন যে আপনি স্বেচ্ছায় এবং বিনামূল্যে রক্তদান করছেন, যাতে
              দালাল বা তৃতীয় পক্ষ দুর্নীতি করতে না পারে।
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">৪.</span> আপনার সংগঠনের
              নাম দেখতে চাইলে আমাদের সাথে যোগাযোগ করুন।
            </li>
          </ul>
        </div>

        {/* <div className="grid grid-cols-1 gap-5 px-1 mx-auto lg:px-2 w-full md:w-[50% lg:w-[45%"> */}
        {allPostsInfo?.length === 0 ? (
          <div className="flex justify-center flex-col gap-3 items-center min-h-[50vh]">
            <h1 className="text-2xl font-semibold">No Post Available</h1>
            <Link
              onClick={NavigateCreatePostPage}
              // to={"/createPost"}
              className="inline-flex items-center gap-1 hover:underline underline-offset-4 hover:text-[#578456] max-w-max"
            >
              Add Request <TbHandClick size={20} />
            </Link>
          </div>
        ) : (
          <div className="col-span-4 md:col-span-2 px-2 lg:px-4 space-y-3 md:space-y-5 mb-3 md:mb-5">
            <Link to={"/createPost"}>
              <button className="sticky top-0 bg-primar btn-bg text-white font-bold py-2 rounded-md w-full z-10">
                Add A Post
              </button>
            </Link>
            {/* post btn as hidden */}
            <div className="flex items-center gap-3 hidden">
              <img
                className="rounded-full h-12 w-12"
                src={loggedUserInfo?.user_image}
                alt=""
              />
              <div className="w-full">
                <input
                  className="p-border h-ful rounded-full h-[40px] w-full"
                  type="text"
                />
              </div>
            </div>
            {/* ------- */}
            {allPostsInfo?.map((user, ind) => (
              <div
                className="p-border rounded-sm overflow-hidden"
                key={user._id}
              >
                {/* creator image and info */}
                <div className="flex justify-between border-b mx-2 px-1 py-2">
                  <div className="flex gap-2 md:gap-4">
                    <Link to={`/availableDonors/${user?.creator_id}`}>
                      <img
                        className="w-[50px] h-[50px] object-cover rounded-full hover:opacity-85 duration-300"
                        src={user?.creator_image}
                        alt={"creator_image.png"}
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/availableDonors/${user?.creator_id}`}
                        className="text-[14px] font-semibold hover:underline"
                      >
                        {user?.creator_name}
                      </Link>
                      {/* <p className="text-[10px]">
                        {user?.post_created_date} at {user?.post_created_time}
                      </p> */}
                      <p className="text-xs text-gray-500">
                        Posted on {user?.post_created_date} at{" "}
                        {user?.post_created_time}
                      </p>
                      {/* <p className="text-[10px]">
                        removed on {user?.post_deadline}
                      </p> */}
                    </div>
                  </div>
                  {/* status 3 dot */}
                  <div className="flex items-center">
                    <div className="btn-bg inline-flex items-center px-3 text-re text-white py-1 font-semibold rounded-md text-sm">
                      <FaTint className="text-xl" fill="red" />{" "}
                      <ShowBloodGroup blood={user?.bloodGroup} />{" "}
                      <span className="text-white">Needed</span>
                    </div>

                    {user?.creator_email === loggedUserInfo?.user_email && (
                      <div className="relative flex items-center gap-1 md:gap-5">
                        <button
                          className={`${
                            openUpdateStatus === user?._id
                              ? "text-[#b5c99a]"
                              : ""
                          } h-full`}
                          onClick={() =>
                            setOpenUpdateStatus(
                              openUpdateStatus === user?._id ? null : user?._id
                            )
                          }
                        >
                          <BiDotsVertical size={40} />
                        </button>
                        <div
                          className={`${
                            openUpdateStatus === user._id ? "" : "hidden"
                          } absolute right-10 top-2 h-[80px] z- min-w-max rounded-md bg-primary shadow-md px-3 py-2`}
                        >
                          <button
                            onClick={() => handleUpdateStatus(user._id)}
                            className="btn-bg px-2 py-1 text-sm font-semibold rounded-md hover:bg-[#b5c99a]"
                          >
                            If found donor click here
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* content */}
                <div>
                  {/* content */}
                  <div className="px-2 mb-2">
                    {/* Patient Details & Donation Info */}
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      {/* Left Column: Patient Info */}
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold">Patient Name:</span>{" "}
                          {user?.patient_name}
                        </p>
                        <p>
                          <span className="font-semibold">Age:</span>{" "}
                          {user?.patient_age} years
                        </p>
                        <p>
                          <span className="font-semibold">Gender:</span>{" "}
                          {user?.patient_gender}
                        </p>
                        <p>
                          <span className="font-semibold">Region:</span>{" "}
                          {user?.patient_region}
                        </p>
                        <p>
                          <span className="font-semibold">Relation:</span>{" "}
                          {user?.relation_with_patient}
                        </p>
                      </div>

                      {/* Right Column: Donation Details */}
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold">Blood Needed:</span>{" "}
                          {user?.unit_of_blood} Bag(s)
                        </p>
                        <p>
                          <span className="font-semibold">Deadline:</span>{" "}
                          {user?.post_deadline}
                        </p>
                        {/* hospital_location as hidden */}
                        <p className="hidden">
                          <span className="font-semibold">Hospital:</span>{" "}
                          {user?.hospital_location}
                        </p>
                        {/* district_name as hidden */}
                        <p className="hidden">
                          <span className="font-semibold">Location:</span>{" "}
                          {user?.district_name}, {user?.upazila_name}
                        </p>
                        {user?.google_map_location && (
                          <a
                            href={user?.google_map_location}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-primar btn-bg px-3 py-1 rounded-md text-center inline-block"
                          >
                            View on Google Maps
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Contact Section as hidden */}
                    <div className="bg-gray-100 p-3 rounded-md mt-4 hidden">
                      <p className="font-semibold">Contact:</p>
                      <p className="text-sm">{user?.primary_number}</p>
                      {user?.alternative_number && (
                        <p className="text-sm">{user?.alternative_number}</p>
                      )}
                    </div>
                    {/* Blood Request Info */}

                    {/* Contact & Hospital Info */}
                    <div className="space-y-2">
                      <p className="flex items-center space-x-2">
                        <FaPhone className="text-green-500" />
                        <span>
                          {user?.primary_number}
                          {user?.alternative_number &&
                            `, ${user?.alternative_number}`}
                        </span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{user?.hospital_location}</span>
                      </p>
                    </div>

                    {/* Medical Reason Section */}
                    {user?.medical_reason && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-sm mb-1">
                          Medical Reason:
                        </h4>
                        <div className="text-gray-700 text-sm bg-gray-50 p-2 rounded-md max-h-[150px] overflow-auto">
                          {user?.medical_reason
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
                  {user?.post_images.length > 0 && (
                    <div className="border-t border-[#CFE1B9] flex gap-2 flex-wrap items-center justify-center py-1">
                      {user?.post_images?.map((image, ind) => (
                        <div className="size-28" key={ind}>
                          <img
                            className="md:hover:scale-y-105 p-border hover:rounded-md duration-300 size-28 object-cover cursor-pointer"
                            src={image}
                            alt=""
                            onClick={() => handleShowSelectedImage(ind, user)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* react & comment div */}
                <div className="flex items-center btn-bg text-white gap-2 justify-between text-[14px] p-1">
                  <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                    like
                  </button>
                  <button
                    onClick={() => handleShowCommentDiv(user, ind)}
                    // onClick={() => setOpenComment(!openComment)}
                    className="px-2 hover:bg-[#B5C99A] py-1 rounded-md"
                  >
                    Comment
                  </button>
                  <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* show selected image */}
        <div
          className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden min-h-screen max-h-screen w-full bg-black/20 backdrop-blur-sm ${
            showSelectedImage ? "opacity-1 visible" : "invisible opacity-0"
          }`}
        >
          <div
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            className={`${
              showSelectedImage ? "block" : "hidden"
            } absolute z-10 w-[90%] md:w-auto max-w-max`}
          >
            {showSelectedImage &&
              selectedPostDetail.post_images &&
              selectedPostDetail.post_images.length > 0 && (
                <img
                  className="mx-auto object-fill md:object-fill max-h-[90vh] rounded-md"
                  // src={displayImage}
                  src={selectedPostDetail.post_images[selectedImageIndex]}
                  alt="displayImage.png"
                />
              )}
            <button
              onClick={() => setShowSelectedImage(false)}
              className="absolute top-2 right-2 hover:rotate-180 transition-transform duration-300 rounded-full btn-bg"
            >
              <MdOutlineCancel size={35} fill="#B5C99A" />
            </button>
            {showSelectedImage &&
              selectedPostDetail?.post_images.length > 1 && (
                <button
                  title="pre"
                  onClick={handlePreviousImage}
                  className="absolute top-[50%] left-2 hover:scale-110 duration-300 bg-[#B5C99A"
                >
                  <IoIosArrowDropleft
                    size={35}
                    fill="#97A97C"
                    color="#B5C99A"
                  />
                </button>
              )}
            {selectedPostDetail.post_images &&
              selectedPostDetail?.post_images.length > 1 && (
                <button
                  onClick={handleNextImage}
                  title="next"
                  className="absolute top-[50%] right-2 hover:scale-110 duration-300"
                >
                  <IoIosArrowDropright size={35} fill="#97A97C" />
                </button>
              )}
          </div>
        </div>

        {/* show all comment div */}
        <div
          className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden h-screen w-full border border-yellow-500 bg-black/20 backdrop-blur-sm ${
            openComment ? "opacity-1 visible" : "invisible opacity-0"
          }`}
        >
          {/* <div className="bg-red-200 border border-yellow-200 "> */}
          <div>
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className={`${
                openComment ? "block" : "hidden"
              } absolute w-[90%] md:w-[65%] lg:w-[30%] z-10 bg-primary overflow-y-auto max-h-[500px]`}
            >
              {/* X btn */}
              <div
                onClick={() => setOpenComment(false)}
                className="btn-bg border text-right p-2 sticky top-0 w-full"
              >
                <button className="hover:rotate-180 transition-transform duration-300 rounded-full btn-bg">
                  <MdOutlineCancel size={35} fill="#B5C99A" />
                </button>
              </div>
              {/* -------- */}

              {/* comments div */}
              <div className="flex min-h-[330px] flex-col gap-3 py-2 px-1">
                {showComments1.length === 0 ? (
                  <div className="text-2xl text-center pt-10">
                    <h1>No comments available</h1>
                  </div>
                ) : (
                  <div className="flex min-h-[330px] flex-col gap-3 py-2 px-1">
                    {showComments1?.map((comment) => (
                      <div key={comment._id} className="flex gap-2 rounded-md">
                        <img
                          className="w-[50px] h-[50px] rounded-full cursor-pointer"
                          src={comment?.commented_person_image}
                          alt={comment.name}
                        />
                        <div className="bg-[#c4daa7] w-full px-3 py-2 rounded-2xl">
                          <Link
                            to={`/availableDonors/${comment?.commented_person_id}`}
                            className="text-[14px] font-semibold hover:underline cursor-pointer"
                          >
                            {loggedUserInfo.user_name ===
                            comment?.commented_person_name ? (
                              <span>
                                {comment?.commented_person_name} (you)
                              </span>
                            ) : (
                              <span>{comment?.commented_person_name}</span>
                            )}
                          </Link>
                          <p>
                            <small>
                              at {comment?.comment_date}
                              {comment?.comment_time}
                            </small>
                          </p>
                          {comment?.comment?.split("\n")?.map((com, ind) =>
                            com?.trim() !== "" ? (
                              <p className="text-[14px] mt-1" key={ind}>
                                {com}
                              </p>
                            ) : (
                              <br key={ind} />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* ----------- */}

              {/* text input field */}
              <div className="sticky bottom-0 w-full bg-primary px-1">
                <textarea
                  className="relative w-full min-h-[80px] max-h-[80px] border px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#D8D2D2] text-lg rounded-[10px]"
                  id="comment_box"
                  cols={5}
                  placeholder={`comment as ${loggedUserInfo?.user_name}`}
                  name="comment_box"
                  required
                />
                <button
                  onClick={handleSendComment}
                  className="absolute bottom-4 right-4"
                >
                  <IoMdSend size={25} />
                </button>
              </div>
              {/* ------------- */}
            </div>
          </div>
        </div>
        {/* ---------------------- */}

        {/* right sidebar */}
        <div className="hidden md:block col-span-1 sticky top-2 right-0 p-4 lg:p-5 min-h-[80vh] max-h-[80vh] overflow-auto bg-white shadow-lg rounded-md">
          <h2 className="text-lg font-bold text-red-600 border-b pb-2 mb-3">
            💉 রক্তদান করার আগে মনে রাখুন
          </h2>
          <ul className="space-y-4 text-gray-800">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">১.</span> রোগীর ব্যাপারে
              বিস্তারিত জেনে নিশ্চিত হয়ে রক্ত দিন।
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">২.</span> প্রতিবার
              রক্তদানের পর তারিখ পরিবর্তন করে দিন বা যোগাযোগ করুন।
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">৩.</span> রোগী দেখে
              রক্তদান করুন। অবশ্যই রোগীর নিকট উপস্থিত আত্মীয়ের সাথে কথা বলে
              জানিয়ে দিন যে আপনি স্বেচ্ছায় এবং বিনামূল্যে রক্তদান করছেন, যাতে
              দালাল বা তৃতীয় পক্ষ দুর্নীতি করতে না পারে।
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">৪.</span> আপনার সংগঠনের
              নাম দেখতে চাইলে আমাদের সাথে যোগাযোগ করুন।
            </li>
          </ul>
        </div>
      </div>
      {/* )} */}
    </MyContainer>
  );
};

export default AllPostPage;
