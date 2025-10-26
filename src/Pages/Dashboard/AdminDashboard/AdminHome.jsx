import useAllPostsInfo from "../../../Components/hooks/useAllPostsInfo";
import useAllReviewInfo from "../../../Components/hooks/useAllReviewInfo";
import useAllUsersInfo from "../../../Components/hooks/useAllUsersInfo";
import WebsiteTitle from "../../../Shared/WebsiteTitle";
import { FaUser, FaClipboardList, FaStar } from "react-icons/fa";

const AdminHome = () => {
  const [reviewInfo] = useAllReviewInfo();
  const [allPostsData] = useAllPostsInfo();
  const [allUsers] = useAllUsersInfo();

  const stats = [
    {
      title: "Reviews",
      count: reviewInfo?.length || 0,
      icon: <FaStar className="text-white text-4xl" />,
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    },
    {
      title: "Posts",
      count: allPostsData?.length || 0,
      icon: <FaClipboardList className="text-white text-4xl" />,
      gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      title: "Users",
      count: allUsers?.length || 0,
      icon: <FaUser className="text-white text-4xl" />,
      gradient: "bg-gradient-to-r from-green-400 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <WebsiteTitle name={"রক্তযোদ্ধা || Admin Home"} />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* <div className="flex flex-wrap gap-2 md:gap-6 justify-center"> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.gradient} flex flex-col items-center p-3 justify-center lg:w-64 lg:h-40 rounded-xl shadow-md`}
          >
            <div className="">{stat.icon}</div>
            <h2 className="text- text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
              {stat.count}
            </h2>
            <p className="text-white text-lg">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
