import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../../Components/hooks/useAuth";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import moment from "moment";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdDeleteForever, MdOutlineCancel, MdOutlineRateReview } from "react-icons/md";
import { data } from "autoprefixer";
import useAxiosPublic from "../../../../Components/hooks/useAxiosPublic";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import { RxActivityLog } from "react-icons/rx";
import useAllReviewInfo from "../../../../Components/hooks/useAllReviewInfo";

const ReviewPostPage = () => {
  const [userRating, setUserRating] = useState(1);
  const [selectedReviewInfo, setSelectedReviewInfo] = useState({});
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loggedUserInfo] = useLoggedUserInfo();
  // console.log(loggedUserInfo);
  const [openEdit, setOpenEdit] = useState(false);
  // console.log(selectedReviewInfo);
  const [updatedRating, setUpdatedRating] = useState(
    selectedReviewInfo?.retting
  );
  const [reviewInfo, refetchReviews] = useAllReviewInfo();

  // const { data: reviewInfo = [], refetch: refetchReviews } = useQuery({
  //   queryKey: [],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(`/review`);
  //     return res.data;
  //   },
  // });

  const handleMakeReview = async (e) => {
    e.preventDefault();
    // const formData = e.target;
    const { _id, user_name, user_email, user_image } = loggedUserInfo;
    const reviewInfo = {
      review_content: e.target.review.value,
      retting: userRating,
      reviewer_id: _id,
      reviewer_name: user_name || user?.displayName || "",
      reviewer_email: user_email || user?.email || "",
      reviewer_image: user_image || user?.photoURL || "",
      review_time: moment().format("LT"),
      review_date: moment().format("Do MMM,YYYY"),
      review_post_time: new Date(),
      update_status: false,
    };
    console.log(reviewInfo);
    const response = await axiosPublic.post(`/review`, reviewInfo);
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
      setUpdatedRating(info.retting);
      setOpenEdit(true);
    }
  };
  const handleCancelReview = () => {
    // setSelectedReviewInfo();
    setOpenEdit(false);
    setUpdatedRating(selectedReviewInfo?.retting);
    document.getElementById("updated_review").value =
      selectedReviewInfo?.review_content;
  };
  const handleUpdateReview = (e) => {
    const id = selectedReviewInfo?._id;
    // setSelectedReviewInfo();
    e.preventDefault();
    const form = e.target;
    setOpenEdit(false);
    setUpdatedRating(selectedReviewInfo?.retting);
    // e.target.review.value
    const formData = {
      retting: updatedRating,
      review_content: form.updated_review.value,
      active_status: false,
    };
    // console.log("formData", formData);
    axiosPublic
      .patch(`/review/${id}`, formData)
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
        axiosPublic.delete(`/review/${id}`).then((res) => {
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
    axiosPublic.delete("/review").then((res) => console.log(res.data));
  };
  return (
    <div className="max-h-screen overflow-auto">
      {/* <button onClick={handleDelete} className="btn w-full my-5">
        Delete All Review
      </button> */}
      <WebsiteTitle name={"Hope || Add a review"}></WebsiteTitle>
      <h1 className="bg-[#B5C99A sticky top-0 z-10 bg-[#CFE1B9] text-lg md:text-[24px] font-bold pl-2 py-4 inline-flex gap-1 items-center w-full">
        <MdOutlineRateReview /> Write a Review
      </h1>
      <form className="w-[80%] mx-auto space-y-3" onSubmit={handleMakeReview}>
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
        <button className="btn-bg px-10 py-2 rounded-md">Submit</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviewInfo?.map((review) => (
          <div key={review._id} className="my-10 mx-auto">
            <div className="flex justify-between items-end">
              {/* star svg */}
              <div className="flex space-x-[1px] justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    // onMouseMove={() => setUserRating(star)}
                    className="w-[18px]"
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
                        fill={star <= review?.retting ? "#f2b00a" : "#94a3b8"}
                      />
                    </g>
                  </svg>
                ))}
              </div>
              {/* --star Svg------ */}
              <div>
                <p className="text-[10px]">{review?.review_date}</p>
                <p className="text-[10px] text-end">
                  at {review?.review_time}{" "}
                </p>
              </div>
            </div>
            {/* review_content */}
            <div className="py-5">
              {review?.review_content?.split("\n")?.map((com, ind) =>
                com?.trim() !== "" ? (
                  <p className="text-[16px]" key={ind}>
                    {com}
                  </p>
                ) : (
                  <br key={ind} />
                )
              )}
            </div>
            {/* image and info */}
            <div className="flex gap-2 border-b px-1 py-1">
              <Link to={`/availableDonors/${review?.reviewer_id}`}>
                <img
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  src={review?.reviewer_image}
                  alt={"creator_image.png"}
                />
              </Link>
              <div>
                <Link
                  to={`/availableDonors/${review?.reviewer_id}`}
                  className="text-[14px] font-semibold hover:underline"
                >
                  {review?.reviewer_name}
                </Link>
                <p className="text-[10px]">
                  {review?.review_date} at {review?.review_time}
                </p>
              </div>
            </div>
            {/* edit and remove */}
            {review.reviewer_email === user?.email && (
              <div className="flex gap-2 items-center justify-between pt-1">
                <div className="flex items-end">
                  <button
                    onClick={() => handleSelectedReviewInfo(review)}
                    className=""
                  >
                    <FaRegEdit size={20} fill="#97A97C" />
                  </button>
                  {review.update_status && (
                    <p className="text-[10px] text-[#97A97C]">(Updated)</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveSelectedReview(review._id)}
                  className=""
                >
                  <MdDeleteForever size={25} fill="#97A97C" />
                </button>
              </div>
            )}
          </div>
        ))}
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
