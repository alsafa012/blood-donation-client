import { useEffect, useState } from "react";
import MyPosts from "./MyPosts";
import MyComments from "./MyComments";
import MyReports from "./MyReports";
import { FaFlag, FaRegCommentDots, FaRegNewspaper } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const MyActivities = () => {
  const [activities, setActivities] = useState(() => {
    return localStorage.getItem("activities") || "posts";
  });
  const location = useLocation();
  useEffect(() => {
    // Update localStorage whenever activities state changes
    localStorage.setItem("activities", activities);
  }, [activities]);
  const tabs = [
    { id: "posts", label: "Posts", icon: <FaRegNewspaper /> },
    { id: "comments", label: "Comments", icon: <FaRegCommentDots /> },
    { id: "reports", label: "Reports", icon: <FaFlag /> },
  ];

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-[#E1F5DA]">
      <div className="h-[60px] md:h-[60px] sticky top-0 z-10 dark:bg-gray-800 shadow-sm bg-[#CFE1B9]">
        <div className="flex justify-center h-full overflow-x-auto border-b border-[#cfe1b9] dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivities(tab.id)}
              className={`inline-flex items-center gap-2 px-5 text-sm sm:text-base whitespace-nowrap transition-all duration-200 ${
                activities === tab.id
                  ? "border-b-2 border-[#87986a] p-text  font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#87986a]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activities === "posts" && <MyPosts location={location} />}
      {activities === "comments" && <MyComments />}
      {activities === "reports" && <MyReports />}
    </div>
  );
};

export default MyActivities;
