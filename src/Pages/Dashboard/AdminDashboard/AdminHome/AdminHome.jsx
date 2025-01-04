import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import { Link } from "react-router-dom";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import useAllUsersInfo from "../../../../Components/hooks/useAllUsersInfo";
import useAllReviewInfo from "../../../../Components/hooks/useAllReviewInfo";
import useDonorReportInfo from "../../../../Components/hooks/useDonorReportInfo";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminHome = () => {
  const [reviewInfo, refetchReviews] = useAllReviewInfo();
  const [allPostsData, refetch] = useAllPostsInfo();
  const [allUsers, refetchUser] = useAllUsersInfo();
  const [allReports] = useDonorReportInfo();
  const [selectedUserReports, setSelectedUserReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("selectedUserReports", selectedUserReports);

  // Group reports by user ID
  const userReportsMap = allUsers?.map((user) => {
    const userReports = allReports?.filter(
      (report) => report.reported_to === user._id
    );
    return { ...user, reports: userReports };
  });
  console.log("userReportsMap", userReportsMap);

  // Handle view report details
  const handleViewReports = (reports) => {
    console.log("reports", reports);
    setSelectedUserReports(reports);
    setModalVisible(true);
  };
  const handleDeleteReports = () => {
    axios.delete("http://localhost:5000/reportDonor");
  };
  const handleUpdateUserStatus = (id, accountStatus, activeStatus) => {
    console.log(id);
    const accountStatusUpdate = {
      user_activeStatus: activeStatus,
      account_status: !accountStatus,
    };
    axios
      .patch(`http://localhost:5000/users/${id}`, accountStatusUpdate)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: `User's status changed to ${accountStatusUpdate?.account_status}`,
            icon: "success",
          });
          refetchUser();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="max-h-screen overflow-y-auto">
      <WebsiteTitle name={"Hope || Admin Home"}></WebsiteTitle>
      <div>
        <h3>Total Reviews: {reviewInfo?.length}</h3>
        <h3>Total Posts: {allPostsData?.length}</h3>
        <h3>Total User: {allUsers?.length}</h3>
        <button className="btn" onClick={handleDeleteReports}>
          Delete Reports
        </button>
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
                        fill={star <= review?.ratting ? "#f2b00a" : "#94a3b8"}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userReportsMap?.map((user) => {
          const reportCount = user.reports.length; // Get count of reports for this user

          return (
            <div key={user._id} className="bg-white rounded-lg shadow-md p-5">
              <div className="flex flex-col items-center">
                <img
                  src={user.user_image || "/path-to-default-image.png"}
                  alt={user.user_name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {user.user_name}
                </h3>
                <p className="text-gray-500 text-center">{user.user_email}</p>
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-md font-semibold">
                  Reported by {reportCount}{" "}
                  {reportCount === 1 ? "person" : "people"}
                </h4>
                {reportCount > 0 && (
                  <button
                    onClick={() => handleViewReports(user?.reports)}
                    className="text-blue-500 hover:underline mt-2"
                  >
                    View report details
                  </button>
                )}
              </div>

              <div className="mt-4 text-center">
                <Link
                  to={`/availableDonors/${user._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </Link>
              </div>
              <div className="mt-4 text-center">
                <p className="text-blue-500 hover:underline">
                  {user?.account_status ? "Deactivate" : "Activate"}
                </p>
                <p
                  onClick={() =>
                    handleUpdateUserStatus(
                      user?._id,
                      user?.account_status,
                      user?.user_activeStatus
                    )
                  }
                  className="text-blue-500 hover:underline"
                >
                  Update User Status
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Report Details */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 overflow-y-auto h-[350px] md:h-[500px] border border-red-600 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Report Details
            </h2>
            {selectedUserReports?.length > 0 ? (
              <ul className="space-y-4 min-h-[220px] md:min-h-[320px]">
                {selectedUserReports?.map((report, index) => (
                  <>
                    <li key={index} className="bg-gray-100 p-4 rounded-md">
                      <Link
                        to={`/availableDonors/${report?.reported_by}`}
                        className="text-md"
                      >
                        <span className="font-semibold">Reported by:</span>{" "}
                        <span className="hover:underline">
                          {report?.name || "Unknown"}
                        </span>
                      </Link>
                      <p className="text-md">
                        <span className="font-semibold">Phone:</span>{" "}
                        {report?.phone || "Unknown"}
                      </p>
                      <p className="text-md">
                        <span className="font-semibold">Phone:</span>{" "}
                        {report.report_status === "true" ? "true" : "false"}
                      </p>
                      <p className="text-md">
                        <span className="font-semibold">Reason:</span>{" "}
                        {report?.report_reason}
                      </p>
                      <p className="text-md">
                        <span className="font-semibold">Reported Date:</span>{" "}
                        {new Date(report?.reportDate).toLocaleString()}
                      </p>
                    </li>
                  </>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No report details available.</p>
            )}
            <button
              onClick={() => setModalVisible(false)}
              className="sticky bottom-0 mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
