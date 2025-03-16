import { Link, useLocation } from "react-router-dom";
import useAllComments from "../../../../Components/hooks/useAllComments";
import { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import { MdOutlineCancel } from "react-icons/md";
import LoadingAnimation from "../../../../Shared/LoadingAnimation";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import useAuth from "../../../../Components/hooks/useAuth";
import ShowBloodGroup from "../../../../Shared/ShowBloodGroup";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { BiDotsVertical } from "react-icons/bi";
import { FaPhone } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Components/hooks/useAxiosPublic";

const MyPosts = () => {
  const { user } = useAuth();
  const [allPostsData, , refetchPostData, isLoading] = useAllPostsInfo();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [openComment, setOpenComment] = useState(false);
  // const [myPosts, setMyPosts] = useState([]);
  const [showComments1, setShowComments1] = useState([]);
  const [selectedPostDetail, setSelectedPostDetail] = useState({});
  const [loggedUserInfo] = useLoggedUserInfo();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSelectedImage, setShowSelectedImage] = useState(false);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(null);
  const myPosts = allPostsData?.filter(
    (post) => post?.creator_email === user?.email
  );

  useEffect(() => {
    if (openComment) {
      const filtered = allCommentsInfo?.filter(
        (comment) => selectedPostDetail._id === comment.selected_post_id
      );
      setShowComments1(filtered);
      // console.log(filtered);
    }
  }, [openComment, selectedPostDetail._id, allCommentsInfo]);
  if (isLoading) {
    return <LoadingAnimation />;
  }
  const handleShowCommentDiv = (data, ind) => {
    setSelectedPostDetail(data);
    console.log(ind);
    setOpenComment(true);
  };
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
  const handleUpdateStatus = (id) => {
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
  const handleDeletePost = (id, userId) => {
    console.log("postId:", id);
    console.log("userId:", loggedUserInfo?._id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/allPosts/${id}`, {
            // data: { userId: loggedUserInfo?._id },
            data: { userId: userId },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.message) {
              refetchPostData();
              Swal.fire({
                title: "Deleted!",
                text: res.data.message, // Display the response message
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
            Swal.fire({
              title: "Error!",
              text: error.response?.data?.error || "Failed to delete post",
              icon: "error",
            });
          });
      }
    });
  };

  // const handleDeletePost = (id, userId) => {
  //   console.log(id);
  //   console.log("userId", userId);
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosPublic
  //         .delete(`/allPosts/${id}`, {
  //           data: { userId: userId },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //           if (res.data.deletedCount > 0) {
  //             // console.log(res.data);
  //             Swal.fire({
  //               title: "Deleted!",
  //               text: "Your Post has been deleted.",
  //               icon: "success",
  //             });
  //           }
  //           // refetchPostData();
  //         });
  //     }
  //   });
  // };
  return (
    <div className="min-h-[80vh] overflow-y-auto">
      {/* <p className="text-5xl">{myPosts.length}</p> */}
      {myPosts.length === 0 && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-2xl font-semibold">No Post Available</h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5 my-5 px-10 md:px-2 overflow-auto">
        {myPosts?.map((post, ind) => (
          <div className="p-border rounded-sm max-h-max" key={post._id}>
            {/* image and info */}
            <div className="flex justify-between border-b mx-2 px-1 py-2">
              <div className="flex gap-2 md:gap-4">
                <Link to={`/availableDonors/${post?.creator_id}`}>
                  <img
                    className="w-[50px] h-[50px] object-cover rounded-full hover:opacity-85 duration-300"
                    src={post?.creator_image}
                    alt={"creator_image.png"}
                  />
                </Link>
                <div>
                  <Link
                    to={`/availableDonors/${post?.creator_id}`}
                    className="text-[14px] font-semibold hover:underline"
                  >
                    {post?.creator_name}
                  </Link>
                  <p className="text-xs text-gray-500">
                    Posted on {post?.post_created_date} at{" "}
                    {post?.post_created_time}
                  </p>
                  {/* <small>{post?._id}</small> */}
                </div>
              </div>
              {/* status 3 dot */}
              <div className="flex items-center">
                <div className="btn-bg inline-flex items-center px-1 md:px-3 text-re text-white py-1 font-semibold rounded-md text-sm">
                  <FaTint className="text-lg" fill="red" />{" "}
                  <ShowBloodGroup blood={post?.bloodGroup} />{" "}
                  <span className="text-white">Needed</span>
                </div>
                {/* 3 dot + post + edit functionalities */}
                {post?.creator_email === loggedUserInfo?.user_email && (
                  <div className="relative flex items-center gap-1 md:gap-5">
                    {/* 3 dot icon */}
                    <button
                      className={`${
                        openUpdateStatus === post?._id ? "text-[#b5c99a]" : ""
                      } h-full`}
                      onClick={() =>
                        setOpenUpdateStatus(
                          openUpdateStatus === post?._id ? null : post?._id
                        )
                      }
                    >
                      <BiDotsVertical size={40} />
                    </button>
                    {/* status change + edit + delete functions */}
                    <div
                      className={`${
                        openUpdateStatus === post?._id ? "" : "hidden"
                      } absolute flex flex-col gap-1 right-10 top-2 min-h-max max-h-max z- min-w-max rounded-md bg-primary shadow-md px-3 py-2`}
                    >
                      <button
                        onClick={() => handleUpdateStatus(post?._id)}
                        className="btn-bg px-2 py-1 text-sm font-semibold rounded-md hover:bg-[#bfd3a4]"
                        disabled={post?.found_donor_successfully}
                      >
                        If found donor click here
                      </button>
                      {/* edit */}
                      <Link
                        // onClick={() => handleEditPost(post?._id)}
                        to={`/updatePost/${post?._id}`}
                        state={location.pathname}
                        className="btn-bg px-2 py-1 text-sm font-semibold rounded-md hover:bg-[#bfd3a4]"
                      >
                        Edit
                      </Link>
                      {/* delete */}
                      <button
                        onClick={() =>
                          handleDeletePost(post?._id, post?.creator_id)
                        }
                        className="btn-bg px-2 py-1 text-sm font-semibold rounded-md hover:bg-[#bfd3a4]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
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
                        {post?.patient_name}
                      </p>
                      <p>
                        <span className="font-semibold">Age:</span>{" "}
                        {post?.patient_age} years
                      </p>
                      <p>
                        <span className="font-semibold">Gender:</span>{" "}
                        {post?.patient_gender}
                      </p>
                      <p>
                        <span className="font-semibold">Region:</span>{" "}
                        {post?.patient_region}
                      </p>
                      <p>
                        <span className="font-semibold">Relation:</span>{" "}
                        {post?.relation_with_patient}
                      </p>
                    </div>

                    {/* Right Column: Donation Details */}
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">Blood Needed:</span>{" "}
                        {post?.unit_of_blood} Bag(s)
                      </p>
                      <p>
                        <span className="font-semibold">Deadline:</span>{" "}
                        {post?.post_deadline}
                      </p>
                      <p>
                        <span className="font-semibold">Hospital:</span>{" "}
                        {post?.hospital_location}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {post?.district_name}, {post?.upazila_name}
                      </p>
                      {post?.google_map_location && (
                        <a
                          href={post?.google_map_location}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-primar btn-bg px-3 py-1 rounded-md text-center inline-block"
                        >
                          View on Google Maps
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-gray-100 p-3 rounded-md mt-4 hid">
                    <p className="font-semibold">Contact:</p>
                    <p className="text-sm">{post?.primary_number}</p>
                    {post?.alternative_number && (
                      <p className="text-sm">{post?.alternative_number}</p>
                    )}
                  </div>
                  {/* Blood Request Info */}

                  {/* Contact & Hospital Info */}
                  <div className="space-y-2">
                    <p className="flex items-center space-x-2">
                      <FaPhone className="text-green-500" />
                      <span>
                        {post?.primary_number}
                        {post?.alternative_number &&
                          `, ${post?.alternative_number}`}
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span>{post?.hospital_location}</span>
                    </p>
                  </div>

                  {/* Medical Reason Section */}
                  {post?.medical_reason && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-1">
                        Medical Reason:
                      </h4>
                      <div className="text-gray-700 text-sm bg-gray-50 p-2 rounded-md max-h-[150px] overflow-auto">
                        {post?.medical_reason
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
                {post?.post_images.length > 0 && (
                  <div className="border-t border-[#CFE1B9] flex gap-2 flex-wrap items-center justify-center py-1">
                    {post?.post_images?.map((image, ind) => (
                      <div className="size-28" key={ind}>
                        <img
                          className="md:hover:scale-y-105 p-border hover:rounded-md duration-300 size-28 object-cover cursor-pointer"
                          src={image}
                          alt=""
                          onClick={() => handleShowSelectedImage(ind, post)}
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
                <button
                  onClick={() => handleShowCommentDiv(post, ind)}
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
          </div>
        ))}
      </div>
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
          className={`${showSelectedImage ? "block" : "hidden"} absolute z-10`}
        >
          {showSelectedImage &&
            selectedPostDetail.post_images &&
            selectedPostDetail.post_images.length > 0 && (
              <img
                className="object-fill md:object-fill md:min-h-[80vh] max-h-[90vh] rounded-md"
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
          {showSelectedImage && selectedPostDetail?.post_images.length > 1 && (
            <button
              title="pre"
              onClick={handlePreviousImage}
              className="absolute top-[50%] left-2 hover:scale-110 duration-300 bg-[#B5C99A"
            >
              <IoIosArrowDropleft size={35} fill="#97A97C" color="#B5C99A" />
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
            } absolute w-[90%] md:w-[65%] lg:w-[30%] z-10 bg-primary overflow-y-auto min-h-[250px] max-h-[500px]`}
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
            <div className="flex min-h-[250px] flex-col gap-3 py-2 px-1">
              {showComments1.length === 0 ? (
                <div className="text-2xl text-center pt-10">
                  <h1>No comments available</h1>
                </div>
              ) : (
                <div className="flex min-h-[250px] flex-col gap-3 py-2 px-1">
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
                            <span>{comment?.commented_person_name} (you)</span>
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
          </div>
        </div>
      </div>
      {/* ---------------------- */}
    </div>
  );
};

export default MyPosts;
