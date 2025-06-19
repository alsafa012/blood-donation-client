import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import useAllUsersInfo from "../../../../Components/hooks/useAllUsersInfo";
import { Link } from "react-router-dom";

const MyReports = () => {
  const [loggedUserInfo] = useLoggedUserInfo();
  const [allUsers] = useAllUsersInfo();
  const {
    data: reports = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["myReports", loggedUserInfo?._id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/myReports?reported_by=${loggedUserInfo._id}`
      );
      return response.data;
    },
    enabled: !!loggedUserInfo?._id,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  // Handle loading state
  if (isLoading || isFetching) {
    return <p>Loading reports...</p>;
  }

  // Handle error state
  if (isError) {
    return (
      <div>
        <p className="text-red-500">Failed to load reports: {error.message}</p>
        <button
          onClick={refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] px-2 md:px-2 my-3 overflow-y-auto">
      <div className={`${reports.length === 0 ? "hidden" : "block"}`}>
        <h2 className="text-2xl font-bold mb-4"> My Reports</h2>
        <p className="text-gray-700 mb-6">
          You’ve made <span className="font-semibold">{reports?.length}</span>{" "}
          post
          {reports?.length !== 1 ? "s" : ""} on blood requests.
        </p>
      </div>

      {reports?.length > 0 ? (
        <div className="grid gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reports?.map((report) => {
            const reportedUser = allUsers?.find(
              (user) => user._id === report.reported_to
            );

            return (
              <div
                key={report._id}
                className="bg-white rounded-lg overflow-hidden p-border"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center p-text font-bold">
                      {reportedUser?.user_name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <Link
                        to={`/availableDonors/${report?.reported_to}`}
                        className="text-lg font-semibold p-black hover:underline"
                      >
                        {reportedUser?.user_name || "Unknown"}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {reportedUser?.user_email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">
                    <span className="font-medium">Reason:</span>{" "}
                    {report.report_reason}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Reported on:</span>{" "}
                    {new Date(report.reportDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-primar bg-[#bfd3a4] px-4 py-2 flex justify-end">
                  <Link
                    to={`/availableDonors/${report?.reported_to}`}
                    className="text-black hover:underline font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">
          You haven't reported anyone yet.
        </p>
      )}
    </div>
  );
};
export default MyReports;
