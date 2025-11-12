import { useNavigate } from "react-router-dom";
import useAllReviewInfo from "../../Components/hooks/useAllReviewInfo";
import useAuth from "../../Components/hooks/useAuth";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useCallback, useState } from "react";
import StarRattingSvg from "../../Shared/StarRattingSvg";
import useAllUsersInfo from "../../Components/hooks/useAllUsersInfo";

const Reviews = () => {
  const { user } = useAuth();
  const [reviewInfo] = useAllReviewInfo();
  const [allUsers] = useAllUsersInfo();
  const navigate = useNavigate();
  const [currentSlider, setCurrentSlider] = useState(0);
  // console.log(reviewInfo);
  const NavigateAddReviewPage = () => {
    if (user) {
      navigate("/dashboard/review");
    } else {
      navigate("/login");
    }
  };

  const prevSlider = () => {
    setCurrentSlider((currentSlider) =>
      // currentSlider === 0 ? reviewInfo?.length - 1 : currentSlider - 2
      // if need to slide 1 images by one click use this
      currentSlider === 0 ? reviewInfo?.length - 1 : currentSlider - 1
    );
  };

  const nextSlider = useCallback(() => {
    setCurrentSlider((currentSlider) =>
      // currentSlider >= reviewInfo?.length - 2 ? 0 : currentSlider + 2
      // if need to slide 1 images by one click use this
      currentSlider === reviewInfo?.length - 1 ? 0 : currentSlider + 1
    );
  }, [reviewInfo?.length]);

  return (
    <div className="bg-red-5 bg-[#E1F5DA] p-8 flex flex-col gap-5 md:gap-0 md:flex-row md:items-center md:justify-between">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        {/* <h2 className="text-xl font-bold">রক্তযোদ্ধাদের মতামত :</h2> */}
        <h2 className="text-xl font-bold border-b border-dashed border-[#cfe1b9] max-w-max">
          Roktojoddha Users’ Opinions :
        </h2>
        <p className="text-gray-600 my-3 text-xs">
          {/* রক্তযোদ্ধা সম্পর্কে আপনার মতামত দিন */}
          Share your opinion about Roktojoddha
        </p>
        <button
          className="bg-primar btn-bg mx-auto md:mx-0 text-white px-4 py-1 rounded-md font-semibold flex items-center gap-2 hover:-skew-y-3 transition"
          onClick={NavigateAddReviewPage}
        >
          {/* মতামত দিন → */}
          Give your opinion →
        </button>
      </div>

      {/* Right Section - Show all reviews */}
      {reviewInfo?.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-10">
          {/* <div className="w-full flex flex-col items-center justify-center py-10 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm p-border"> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9.75h1.5m-6.75 0h1.5m9 0h1.5m-12.75 6h15M3 4.5h18a.75.75 0 01.75.75v14.25a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75V5.25A.75.75 0 013 4.5z"
            />
          </svg>
          <p className="text-lg font-semibold text-gray-700">No Reviews Yet</p>
          <p className="text-sm text-gray-500">
            Be the first to leave a review!
          </p>
        </div>
      )}

      <div
        className={`md:w-1/2 ${reviewInfo?.length === 0 ? "hidden" : "block"}`}
      >
        <div className="bg-white flex min-h-[40vh] max-h-[40vh shadow-lg rounded-lg overflow-hidden">
          {reviewInfo?.map((review) => {
            // find the actual user by matching IDs
            const matchedUser = allUsers?.find(
              (user) => user._id === review.reviewer_id
            );

            return (
              <div
                key={review._id}
                style={{ transform: `translateX(-${currentSlider * 100}%)` }}
                className={`w-ful max-w-ful min-w-[100%] flex flex-col items-cente p-6 space-x-4 p- transition-transform duration-300 transform`}
              >
                <img
                  src={matchedUser?.user_image}
                  alt={matchedUser?.user_name}
                  className="w-24 h-24 object-cover rounded-full border-2 border-red-500"
                />
                <div>
                  <h5 className="font-semibold mt-3">
                    {review.reviewer_name},{" "}
                    <small>
                      <ShowBloodGroup blood={matchedUser?.bloodGroup} />
                    </small>
                  </h5>
                  <StarRattingSvg ratting={review?.rating} />
                  <small>{matchedUser?.user_full_address}</small>
                  <p className=" max-h-[200px] overflow-auto p-1 -ml-1 text-justify">
                    {review?.review_content?.split("\n")?.map((com, ind) =>
                      com?.trim() !== "" ? (
                        <span className="text-[16px] block" key={ind}>
                          {com}
                        </span>
                      ) : (
                        <br key={ind} />
                      )
                    )}
                  </p>
                  {/* <p className="text-gray-600 mt-5">{review.review_content}</p> */}
                </div>
              </div>
            );
          })}
          {/* </div> */}
        </div>

        {/* Slider Controls */}
        <div className="flex items-center gap-5 justify-between mt-5">
          <p className="text-lg font-medium text-center px-4 p-border rounded-md py-1">
            {currentSlider + 1} / {reviewInfo?.length}
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={prevSlider}
              className="rounded-full p-3 text-xl p-border"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlider}
              className="rounded-full p-3 text-xl p-border"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
