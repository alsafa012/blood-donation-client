// import { useNavigate } from "react-router-dom";
// import useAllReviewInfo from "../../Components/hooks/useAllReviewInfo";
// import useAuth from "../../Components/hooks/useAuth";

// const Reviews = () => {
//   const { user } = useAuth();
//   const [reviewInfo] = useAllReviewInfo();
//   const navigate = useNavigate();

//   const NavigateAddReviewPage = () => {
//     if (user) {
//       navigate("/createPost");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="bg-red-50 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between">
//       {/* Left Section */}
//       <div className="md:w-1/2 text-center md:text-left space-y-3">
//         <h2 className="text-xl font-bold">রক্তবন্ধুদের মতামত :</h2>
//         <p className="text-gray-600">রক্তবন্ধু সম্পর্কে আপনার মতামত দিন</p>
//         <button
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
//           onClick={NavigateAddReviewPage}
//         >
//           মতামত দিন →
//         </button>
//       </div>

//       {/* Right Section - Reviews */}
//       <div className="md:w-1/2 bg-white shadow-lg p-6 rounded-lg flex items-center">
//         {reviewInfo.length > 0 ? (
//           <div className="flex items-center space-x-4">
//             <img
//               src={reviewInfo[0]?.reviewer_image}
//               alt={reviewInfo[0]?.reviewer_name}
//               className="w-16 h-16 rounded-full border-2 border-red-400"
//             />
//             <div>
//               <h5 className="font-bold">
//                 {reviewInfo[0]?.reviewer_name}, {reviewInfo[0]?.rating}★
//               </h5>
//               <p className="text-gray-600">{reviewInfo[0]?.review_content}</p>
//               {/* <p>{reviewInfo.length}</p> */}
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500">No reviews available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reviews;
import { useNavigate } from "react-router-dom";
import useAllReviewInfo from "../../Components/hooks/useAllReviewInfo";
import useAuth from "../../Components/hooks/useAuth";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";

const Reviews = () => {
  const { user } = useAuth();
  const [reviewInfo] = useAllReviewInfo();
  const navigate = useNavigate();
  console.log(reviewInfo);
  const NavigateAddReviewPage = () => {
    if (user) {
      navigate("/createPost");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-red-50 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-3">
        <h2 className="text-xl font-bold">রক্তবন্ধুদের মতামত :</h2>
        <p className="text-gray-600">রক্তবন্ধু সম্পর্কে আপনার মতামত দিন</p>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
          onClick={NavigateAddReviewPage}
        >
          মতামত দিন →
        </button>
      </div>

      {/* Right Section - Show all reviews */}
      <div className="md:w-1/2 bg-white shadow-lg p-6 rounded-lg space-y-4">
        {reviewInfo?.map((review) => (
          <div
            key={review._id}
            className="flex items-center space-x-4 border-b pb-4"
          >
            <img
              src={review.reviewer_image}
              alt={review.reviewer_name}
              className="w-16 h-16 rounded-full border-2 border-red-500"
            />
            <div>
              <h5 className="font-semibold">
                {review.reviewer_name},{" "}
                <small>
                <ShowBloodGroup blood={review?.reviewer_bloodGroup} /></small>
              </h5>
              <p className="text-gray-600">{review.review_content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
