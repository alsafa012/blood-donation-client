import { useNavigate } from "react-router-dom";
import useAllReviewInfo from "../../Components/hooks/useAllReviewInfo";
import useAuth from "../../Components/hooks/useAuth";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useCallback, useState } from "react";
import StarRattingSvg from "../../Shared/StarRattingSvg";

const Reviews = () => {
  const { user } = useAuth();
  const [reviewInfo] = useAllReviewInfo();
  const navigate = useNavigate();
  const [currentSlider, setCurrentSlider] = useState(0);
  console.log(reviewInfo);
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
    <div className="bg-red-50 p-8 rounded-xl flex flex-col gap-5 md:gap-0 md:flex-row md:items-center md:justify-between">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-3">
        <h2 className="text-xl font-bold">রক্তযোদ্ধাদের মতামত :</h2>
        <p className="text-gray-600">রক্তযোদ্ধা সম্পর্কে আপনার মতামত দিন</p>
        <button
          className="bg-primary mx-auto md:mx-0 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
          onClick={NavigateAddReviewPage}
        >
          মতামত দিন →
        </button>
      </div>

      {/* Right Section - Show all reviews */}
      <div className="md:w-1/2 hid">
        <div className="bg-white flex min-h-[40vh] max-h-[40vh shadow-lg rounded-lg overflow-hidden">
          {/* <div className="relative flex"> */}
          {reviewInfo?.map((review) => (
            <div
              key={review._id}
              style={{ transform: `translateX(-${currentSlider * 100}%)` }}
              className={`w-ful max-w-ful min-w-[100%] flex flex-col items-cente p-6 space-x-4 p- transition-transform duration-300 transform`}
            >
              <img
                src={review.reviewer_image}
                alt={review.reviewer_name}
                className="w-24 h-24 object-cover rounded-full border-2 border-red-500"
              />
              <div>
                <h5 className="font-semibold">
                  {review.reviewer_name},{" "}
                  <small>
                    <ShowBloodGroup blood={review?.reviewer_bloodGroup} />
                  </small>
                </h5>
                <StarRattingSvg ratting={review?.rating} />
                <small>19/2, Dhaka, Mohammadpur</small>
                <p className=" max-h-[200px] overflow-auto p-1 -ml-1">
                  {review?.review_content?.split("\n")?.map((com, ind) =>
                    com?.trim() !== "" ? (
                      <p className="text-[16px]" key={ind}>
                        {com}
                      </p>
                    ) : (
                      <br key={ind} />
                    )
                  )}
                </p>
                {/* <p className="text-gray-600 mt-5">{review.review_content}</p> */}
              </div>
            </div>
          ))}
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
