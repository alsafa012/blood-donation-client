import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../Components/hooks/useAuth";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import moment from "moment";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import {
  MdDeleteForever,
  MdOutlineCancel,
  MdOutlineRateReview,
} from "react-icons/md";
import useAxiosPublic from "../../../../Components/hooks/useAxiosPublic";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import useAllReviewInfo from "../../../../Components/hooks/useAllReviewInfo";

const ReviewPostPage = () => {
  const [userRating, setUserRating] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const [selectedReviewInfo, setSelectedReviewInfo] = useState({});
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loggedUserInfo] = useLoggedUserInfo();
  // console.log(loggedUserInfo);
  const [openEdit, setOpenEdit] = useState(false);
  // console.log(selectedReviewInfo);
  const [updatedRating, setUpdatedRating] = useState(
    selectedReviewInfo?.rating
  );
  const [reviewInfo, refetchReviews] = useAllReviewInfo();
  console.log("reviewInfo", reviewInfo);

  const userReview = reviewInfo.find((r) => r.reviewer_email === user?.email);
  const otherReviews = reviewInfo.filter(
    (r) => r.reviewer_email !== user?.email
  );

  const handleMakeReview = async (e) => {
    e.preventDefault();
    if (userReview) {
      Swal.fire({
        title: "Already Reviewed!",
        text: "You have already submitted a review.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }

    // const formData = e.target;
    const { _id, user_name, user_email, user_image } = loggedUserInfo;
    const reviewInfo = {
      review_content: e.target.review.value,
      rating: userRating,
      reviewer_id: _id,
      reviewer_name: user_name || user?.displayName || "",
      reviewer_email: user_email || user?.email || "",
      reviewer_image: user_image || user?.photoURL || "",
      review_time: moment().format("LT"),
      review_date: moment().format("Do MMM,YYYY"),
      update_status: false,
    };
    console.log(reviewInfo);
    const response = await axiosPublic.post(`/reviews`, reviewInfo);
    if (response.data.insertedId) {
      setUserRating(1);
      e.target.review.value = "";
      Swal.fire("Good job!", "Review Sent successfully", "success");
    }
    refetchReviews();
    console.log(response.data);
  };
  // console.log(moment().format("Do MMM,YYYY"));
  // console.log(moment().format("LT"));

  const handleSelectedReviewInfo = (info) => {
    if (info) {
      setSelectedReviewInfo(info);
      setUpdatedRating(info.rating);
      setOpenEdit(true);
    }
  };

  const handleCancelReview = () => {
    // setSelectedReviewInfo();
    setOpenEdit(false);
    setUpdatedRating(selectedReviewInfo?.rating);
    document.getElementById("updated_review").value =
      selectedReviewInfo?.review_content;
  };

  const handleUpdateReview = (e) => {
    const id = selectedReviewInfo?._id;
    // setSelectedReviewInfo();
    e.preventDefault();
    const form = e.target;
    setOpenEdit(false);
    setUpdatedRating(selectedReviewInfo?.rating);
    // e.target.review.value
    const formData = {
      rating: updatedRating,
      review_content: form.updated_review.value,
      update_status: true,
    };
    console.log("formData Update review", formData);
    axiosPublic
      .patch(`/reviews/${id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `Review updated.`,
            icon: "success",
          });
          refetchReviews();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRemoveSelectedReview = (id) => {
    // console.log(id);
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
        axiosPublic.delete(`/reviews/${id}`).then((res) => {
          refetchReviews();
          if (res.data.deletedCount > 0) {
            // console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleDelete = () => {
    axiosPublic.delete("/reviews").then((res) => console.log(res.data));
  };
  return (
    <div className="max-h-screen overflow-auto">
      <button onClick={handleDelete} className="btn w-full my-5 hidden">
        Delete All Review
      </button>
      <WebsiteTitle name={"রক্তযোদ্ধা || Add a review"}></WebsiteTitle>
      <h1 className="bg-[#B5C99A sticky top-0 z-10 bg-[#CFE1B9] text-lg md:text-[24px] font-bold pl-2 py-4 inline-flex gap-1 items-center w-full">
        <MdOutlineRateReview /> Write a Review
      </h1>
      <form
        className="w-[98%] mx-auto space-y-3 mt-5"
        onSubmit={handleMakeReview}
      >
        {/* <p>{userRating}</p> */}
        <div className="flex space-x-1 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onMouseMove={() => setUserRating(star)}
              className="w-7 cursor-pointer"
              viewBox="0 0 24 24"
              fill="#94a3b8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                  fill={star <= userRating ? "#f2b00a" : "#94a3b8"}
                />{" "}
              </g>
            </svg>
          ))}
        </div>
        <div className="">
          <textarea
            className="w-full min-h-[80px] md:min-h-[100px] max-h-[100px] border border-[#CFE1B9] px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#CFE1B9]"
            id="review"
            cols={5}
            placeholder="make a review"
            name="review"
            required
          />
        </div>
        <button className="btn-bg px-2 md:px-8 py-1 md:py-1 rounded-md">
          Submit
        </button>
      </form>
      {/* Own review */}
      <div className="w-[98%] mx-auto py-3">
        {userReview ? (
          <>
            <h3 className="text-lg font-semibold my-2 text-[#4b6043">
              Your Review
            </h3>
            <div className="border-t border-[#cfe1b9] pt-2 md:pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex gap-2 items-center">
                    <Link to={`/availableDonors/${userReview.reviewer_id}`}>
                      <img
                        src={userReview?.reviewer_image}
                        alt="Reviewer"
                        className="w-[50px] h-[50px] object-cover rounded-full border"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/availableDonors/${userReview.reviewer_id}`}
                        className="font-medium text-sm hover:underline"
                      >
                        {userReview?.reviewer_name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {userReview?.review_date} at {userReview?.review_time}
                      </p>
                    </div>
                  </div>

                  {/* star svg */}
                  <div className="flex space-x-[1px] justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-[15px]"
                        viewBox="0 0 24 24"
                        fill={star <= userReview.rating ? "#f2b00a" : "#cbd5e1"}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                      </svg>
                    ))}
                  </div>
                  {/* end of star svg */}
                </div>
                {/* Action btn */}
                <div className="flex gap-2 md:gap-3 items-start pr-1 md:pr-2">
                  <div className="flex flex-col gap-[1px] items-center">
                    <button
                      onClick={() => handleSelectedReviewInfo(userReview)}
                      className="hover:scale-110 transition"
                    >
                      <FaRegEdit size={20} fill="#97A97C" />
                    </button>
                    {userReview?.update_status && (
                      <p className="text-[10px] text-[#97A97C]">(Updated)</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveSelectedReview(userReview._id)}
                    className="hover:scale-110 transition"
                  >
                    <MdDeleteForever size={25} fill="#97A97C" />
                    {/* <MdDeleteForever size={22} fill="#d9534f" /> */}
                  </button>
                </div>
              </div>
              {/* review content */}
              <div className="mt-3 text-gray-700 leading-relaxed relative px-2 border-b border-[#cfe1b9] ">
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expanded ? "max-h-full" : "max-h-20"
                  }`}
                >
                  {userReview?.review_content
                    ?.split("\n")
                    ?.filter((line) => line.trim() !== "")
                    ?.map((line, i) => (
                      <p key={i} className="text-sm mb-1">
                        {line}
                      </p>
                    ))}
                </div>

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-[13px] text-green-700 hover:underline mt-1"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              </div>
              {/* review content */}
              <div className="hidden mt-3 text-gray-700 leading-relaxed">
                {userReview?.review_content
                  ?.split("\n")
                  ?.filter((line) => line.trim() !== "") // remove truly empty or whitespace-only lines
                  ?.map((line, i) => (
                    <p key={i} className="text-sm">
                      {line.trim()}
                    </p>
                  ))}
              </div>

              <div className="py-5 hidden overflow-hidden overflow-y-auto mx-1 text-wrap max-h-[200px]">
                {userReview?.review_content?.split("\n")?.map((com, ind) =>
                  com?.trim() !== "" ? (
                    <p className="text-[16px]" key={ind}>
                      {com}
                    </p>
                  ) : (
                    <br key={ind} />
                  )
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="py-5">
            <p className="text-gray-600 mb-3">
              You haven’t shared your experience yet.
            </p>
          </div>
        )}
      </div>

      {/* other reviews */}
      <div className="w-[98%] mx-auto mb-5">
        <h3 className="text-lg font-semibold mb-2 md:mb-4">What Others Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {otherReviews?.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-md p-5 transition hover:shadow-sm p-border"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Link to={`/availableDonors/${review.reviewer_id}`}>
                    <img
                      src={review.reviewer_image}
                      alt="reviewer"
                      className="w-[45px] h-[45px] rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link to={`/availableDonors/${review.reviewer_id}`}>
                      <p className="font-semibold text-sm hover:underline">
                        {review.reviewer_name}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-500">
                      {review.review_date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex mt-3 space-x-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-[18px]"
                    viewBox="0 0 24 24"
                    fill={star <= review.rating ? "#f2b00a" : "#cbd5e1"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
                  </svg>
                ))}
              </div>

              <div className="mt-3 text-gray-700 text-sm line-clamp-5">
                {review.review_content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* edit review modal */}

      <div
        className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden h-screen w-full bg-black/20 backdrop-blur-sm ${
          openEdit ? "opacity-1 visible" : "invisible opacity-0"
        }`}
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className={`${
            openEdit ? "block" : "hidden"
          } absolute w-[90%] md:w-[65%] lg:w-[30%] z-10 bg-primary overflow-y-auto h-[400px max-h-[500px]`}
        >
          {/* X btn */}
          <div
            onClick={handleCancelReview}
            className="btn-bg border text-right p-2 sticky top-0 w-full"
          >
            <button className="hover:rotate-180 transition-transform duration-300 rounded-full btn-bg">
              <MdOutlineCancel size={35} fill="#B5C99A" />
            </button>
          </div>
          {/* -------- */}
          {/* text input field */}
          <form
            onSubmit={handleUpdateReview}
            className="sticky bottom-0 w-full px-2"
          >
            {/* star svg */}
            <div className="flex space-x-[1px] justify-center py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onMouseMove={() => setUpdatedRating(star)}
                  className="w-[18px] cursor-pointer"
                  viewBox="0 0 24 24"
                  fill="#94a3b8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                      fill={star <= updatedRating ? "#f2b00a" : "#94a3b8"}
                    />
                  </g>
                </svg>
              ))}
            </div>
            {/* --star Svg------ */}
            <textarea
              className="w-full mt-3 min-h-[120px] max-h-[120px] border px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#D8D2D2] text-lg rounded-[10px]"
              id="updated_review"
              cols={5}
              // placeholder={`comment as ${selectedPostDetail?.name}`}
              name="updated_review"
              defaultValue={selectedReviewInfo?.review_content}
              // required
            />
            <button className="btn-bg py-1 rounded-md w-full mb-3">
              Update
            </button>
          </form>
          {/* ------------- */}
        </div>
      </div>
    </div>
  );
};

export default ReviewPostPage;
