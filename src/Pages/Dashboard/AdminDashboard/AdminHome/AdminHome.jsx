import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import { Link } from "react-router-dom";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import useAllUsersInfo from "../../../../Components/hooks/useAllUsersInfo";
import useAllReviewInfo from "../../../../Components/hooks/useAllReviewInfo";

const AdminHome = () => {
  const [reviewInfo, refetchReviews] = useAllReviewInfo();
  const [allPostsData, refetch] = useAllPostsInfo();
  const [allUsers, refetchUser] = useAllUsersInfo();

  return (
    <div className="max-h-screen overflow-y-auto">
      <WebsiteTitle name={"Hope || Admin Home"}></WebsiteTitle>
      <div>
        <h3>Total Reviews: {reviewInfo.length}</h3>
        <h3>Total Posts: {allPostsData.length}</h3>
        <h3>Total User: {allUsers.length}</h3>
      </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
