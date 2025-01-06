import { useState } from "react";
import useAllUsersInfo from "../../../Components/hooks/useAllUsersInfo";
import useDonorReportInfo from "../../../Components/hooks/useDonorReportInfo";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import MyContainer from "../../../Shared/MyContainer";
import { MdOutlineManageAccounts } from "react-icons/md";

const ManageUsers = () => {
  const [allUsers, refetchUser] = useAllUsersInfo();
  const [allReports] = useDonorReportInfo();
  const [selectedUserReports, setSelectedUserReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
            text: `User's status has been changed to ${
              accountStatusUpdate?.account_status ? "Active" : "Inactive"
            }.`,

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
    <MyContainer>
      <h1 className="bg-[#B5C99A sticky top-0 z-10 bg-[#CFE1B9] text-lg md:text-[24px] font-bold pl-2 py-4 inline-flex gap-1 items-center w-full min-h-[10vh] max-h-[10vh]">
        <MdOutlineManageAccounts /> User Information
      </h1>
      <div className="">
        <div className="min-h-[90vh] max-h-[90vh] overflow-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="text-left bg-gray-100 text-gray-700 whitespace-nowrap">
                <th className="px-6 py-4 text-sm font-medium">User Image</th>
                <th className="px-6 py-4 text-sm font-medium">User Name</th>
                <th className="px-6 py-4 text-sm font-medium">Email</th>
                <th className="px-6 py-4 text-sm font-medium">Reports</th>
                <th className="px-6 py-4 text-sm font-medium">Active Status</th>
                <th className="px-6 py-4 text-sm font-medium">
                  Account Status
                </th>
                <th className="px-6 py-4 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {userReportsMap?.map((user) => {
                const reportCount = user.reports.length;

                return (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition-colors duration-300"
                  >
                    {/* image */}
                    <td className="px-6 py-4">
                      <img
                        src={user.user_image || "/path-to-default-image.png"}
                        alt={user.user_name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </td>
                    {/* name */}
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {user.user_name}
                    </td>
                    {/* email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.user_email}
                    </td>
                    {/* Report details */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex flex-col items-center gap-1 justify-center">
                        <p>
                          {reportCount}{" "}
                          {reportCount === 1 ? "person" : "people"}
                        </p>
                        {reportCount > 0 && (
                          <button
                            onClick={() => handleViewReports(user?.reports)}
                            className="text-blue-600 hover:underline max-w-ma whitespace-nowrap"
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </td>
                    {/* User blood donation active status */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          user?.user_activeStatus === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user?.user_activeStatus}
                      </span>
                    </td>
                    {/* Account status */}

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      <div>
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full capitalize ${
                            user?.account_status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user?.account_status ? "Deactivate" : "Activate"}
                        </span>
                      </div>
                    </td>


                    {/* Actions */}
                    <td className="px-6 py-4 space-x-3">
                      <div className="flex flex-col items-center gap-1 justify-center">
                        <Link
                          to={`/availableDonors/${user._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() =>
                            handleUpdateUserStatus(
                              user?._id,
                              user?.account_status,
                              user?.user_activeStatus
                            )
                          }
                          className="text-blue-600 hover:underline whitespace-nowrap"
                        >
                          change account status
                          {/* {user?.account_status ? "Deactivate" : "Activate"} */}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal for Report Details */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
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
                          <span className="font-semibold">report_status:</span>{" "}
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
    </MyContainer>
  );
};
export default ManageUsers;
