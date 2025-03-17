import { useEffect, useState } from "react";
import useAllUsersInfo from "../../../Components/hooks/useAllUsersInfo";
import useDonorReportInfo from "../../../Components/hooks/useDonorReportInfo";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import MyContainer from "../../../Shared/MyContainer";
import { MdCancel, MdOutlineManageAccounts } from "react-icons/md";
import BloodGroupDropdown from "../../../Shared/Dropdowns/BloodGroupDropdown";
import GenderDropDown from "../../../Shared/Dropdowns/GenderDropDown";
import { FaFilter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import ShowBloodGroup from "../../../Shared/ShowBloodGroup";

const ManageUsers = () => {
  const [allUsers, refetchUser] = useAllUsersInfo();
  const [allReports, refetchReportInfo] = useDonorReportInfo();
  const [selectedUserReports, setSelectedUserReports] = useState([]);
  const [userReportsMap, setUserReportsMap] = useState([]);
  // console.log("userReportsMap", userReportsMap);
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  console.log("availableStatus", availableStatus);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://blood-donation-server-ebon.vercel.app/users?search=${searchData}&blood=${bloodGroup}&gender=${selectedGender}&accountStatus=${accountStatus}&availableStatus=${availableStatus}`
        );

        // Group reports by user ID
        const userReportsMaps = response.data?.map((user) => {
          const userReports = allReports?.filter(
            (report) => report.reported_to === user._id
          );
          return { ...user, reports: userReports };
        });
        // console.log("userReportsMaps", userReportsMaps);
        setUserReportsMap(userReportsMaps);

        // setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [
    allReports,
    searchData,
    bloodGroup,
    selectedGender,
    accountStatus,
    availableStatus,
  ]);

  // Handle view report details
  const handleViewReports = (reports) => {
    console.log("reports", reports);
    setSelectedUserReports(reports);
    setModalVisible(true);
  };

  const handleUpdateUserAccountStatus = (
    id,
    accountStatus,
    activeStatus,
    showImage
  ) => {
    console.log(id);
    const accountStatusUpdate = {
      user_activeStatus: activeStatus,
      account_status: !accountStatus,
      showImage: showImage,
    };

    axios
      .patch(
        `https://blood-donation-server-ebon.vercel.app/users/${id}`,
        accountStatusUpdate
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // Optimistic UI update: Update user status immediately in the local state
          setUserReportsMap((prevState) =>
            prevState.map((user) =>
              user._id === id
                ? {
                    ...user,
                    account_status: !accountStatus, // Toggle the account status
                    // user_activeStatus
                    // activeStatus === "active" ? "inactive" : "active",
                  }
                : user
            )
          );
          Swal.fire({
            title: "Success!",
            text: `User's status has been changed to ${
              accountStatusUpdate?.account_status ? "Deactivate" : "Active"
            }.`,

            icon: "success",
          });
          refetchUser();
          // refetchReportInfo();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "User ID has been copied to clipboard.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to copy the User ID.",
        });
      });
  };
  return (
    <MyContainer>
      <div className="bg-[#B5C99A sticky top-0 z-10 bg-[#CFE1B9] text-lg md:text-[24px] font-bold pl-2 py-4 flex gap-10 items-center w-full lg:min-h-[10vh] lg:max-h-[10vh]">
        <div className="relative w-full">
          <h1 className="inline-flex gap-1 items-center">
            <MdOutlineManageAccounts /> User Information
          </h1>
          <div
            onClick={() => setShowFilterOptions(!showFilterOptions)}
            className="flex flex-co text-base md:text-[24px] items-center gap-1 absolute right-12 lg:right-3 top-0 cursor-pointer"
          >
            <button>
              <FaFilter size={20} />
            </button>
            Filter
          </div>
        </div>
      </div>
      <div className="">
        <div className="min-h-[95vh] max-h-[95vh] lg:min-h-[90vh] lg:max-h-[90vh] overflow-auto bg-white shadow-lg rounded-lg border border-gray-200">
          {userReportsMap.length === 0 ? (
            <div className="text-xl md:text-2xl lg:text-4xl xl:text-5xl min-h-[50vh] flex justify-center items-center">
              <h2 className="">No data found</h2>
            </div>
          ) : (
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="text-left bg-gray-100 text-gray-700 whitespace-nowrap">
                  <th className="px-6 py-4 text-sm font-medium">User Image</th>
                  {/* <th className="px-6 py-4 text-sm font-medium">User Name</th> */}
                  <th className="px-6 py-4 text-sm font-medium">Email</th>
                  <th className="px-6 py-4 text-sm font-medium">Reports</th>
                  <th className="px-6 py-4 text-sm font-medium">
                    Active Status
                  </th>
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
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-2 items-start">
                            <img
                              src={
                                user.user_image || "/path-to-default-image.png"
                              }
                              alt={user.user_name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="text-sm">
                              <p className="text-nowrap text-base">
                                {" "}
                                {user.user_name}
                              </p>
                              <ShowBloodGroup blood={user?.bloodGroup} />
                            </div>
                          </div>
                          <p
                            className="text-center text-sm cursor-pointer text-blue-500 hover:underline"
                            onClick={() => copyToClipboard(user._id)}
                          >
                            {user._id}
                          </p>
                          {/* <p className="text-center text-sm"> {user._id}</p> */}
                        </div>
                      </td>
                      {/* name */}
                      {/* <td className="px-4 py-2 text-sm text-gray-800">
                        {user.user_name}
                      </td> */}
                      {/* email */}
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {user.user_email}
                      </td>
                      {/* Report details */}
                      <td className="px-4 py-2 text-sm text-gray-700">
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
                      <td className="px-4 py-2 text-sm font-medium text-gray-800">
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

                      <td className="px-4 py-2 text-sm font-medium text-gray-800">
                        <div>
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full capitalize ${
                              user?.account_status
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user?.account_status ? "Deactivate" : "Activate"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2 space-x-3">
                        <div className="flex flex-col items-center gap-1 justify-center">
                          <Link
                            to={`/availableDonors/${user._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            View Profile
                          </Link>
                          <button
                            onClick={() =>
                              handleUpdateUserAccountStatus(
                                user?._id,
                                user?.account_status,
                                user?.user_activeStatus,
                                user?.showImage
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
          )}
        </div>

        {/* Modal for Report Details */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 max-w-full p-4 overflow-y-auto h-[350px] md:h-[500px] relative flex flex-col">
              <h2 className="sticky top-0 left-0 bg-white z-10 text-xl font-semibold text-gray-800 py-1 md:py-2">
                Report Details
              </h2>
              {selectedUserReports?.length > 0 ? (
                <ul className="space-y-4 min-h-[220px] md:min-h-[320px] flex-1 overflow-auto px-1 py-2">
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
                className="sticky bottom-0 mt-2 w-full btn-bg text-white py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Modal for Filter Sections */}
      {showFilterOptions && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-w-full p-4 overflow-hidden h-[70vh] md:h-[500px] relative flex flex-col">
            <h2 className="sticky top-0 left-0 bg-white z-10 text-xl font-semibold text-gray-800 py-1 md:py-2">
              Filter By
            </h2>

            <div className="flex-1 overflow-auto px4 py-2">
              <div className="flex flex-col gap-3">
                {/* Search input */}
                <div className="relative w-full">
                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Search by ID, Name, Email, Phone"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    className="p-3 pl-10 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cfe1b9] transition duration-200 ease-in-out placeholder-gray-500 focus:outline-none"
                  />

                  {/* Search icon */}
                  <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                  {/* Cancel icon */}
                  {searchData && (
                    <MdCancel
                      onClick={() => setSearchData("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                  )}
                </div>

                {/* Blood Group */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <label className="text-nowrap flex justify-between">
                    <span>Blood Group</span>
                    <span>:</span>
                  </label>
                  <div className="w-full col-span-2">
                    <BloodGroupDropdown
                      status={true}
                      blood={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      css={"post-input-field"}
                    />
                  </div>
                </div>

                {/* GenderDropDown */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <label className="text-nowrap flex justify-between">
                    <span>Gender</span>
                    <span>:</span>
                  </label>
                  <div className="w-full col-span-2">
                    <GenderDropDown
                      gender={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      css={"post-input-field"}
                    />
                  </div>
                </div>

                {/* Available Status */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <label className="text-nowrap flex justify-between">
                    <span>Available Status</span>
                    <span>:</span>
                  </label>
                  <div className="w-full col-span-2">
                    <select
                      value={availableStatus}
                      id="account_status"
                      onChange={(e) => setAvailableStatus(e.target.value)}
                      className="post-input-field text-base font-medium w-full"
                    >
                      <option disabled value="">
                        Select Available Status
                      </option>
                      <option value="All">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Account Active Status */}
                <div className="grid grid-cols-3 gap-2 items-center">
                  <label className="text-nowrap flex justify-between">
                    <span>Account Status</span>
                    <span>:</span>
                  </label>
                  <div className="w-full col-span-2">
                    <select
                      value={accountStatus}
                      id="available_status"
                      onChange={(e) => setAccountStatus(e.target.value)}
                      className="post-input-field text-base font-medium w-full"
                    >
                      <option disabled value="">
                        Select Status
                      </option>
                      <option value="All">All</option>
                      <option value="activate">Activate</option>
                      <option value="deactivate">Deactivate</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowFilterOptions(false)}
              className="sticky bottom-0 mt-4 w-full btn-bg text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </MyContainer>
  );
};
export default ManageUsers;
