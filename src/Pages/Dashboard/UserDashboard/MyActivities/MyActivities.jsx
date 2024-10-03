import { useEffect, useState } from "react";
import MyPosts from "./MyPosts";
import MyComments from "./MyComments";


const MyActivities = () => {

  const [activities, setActivities] = useState(() => {
    return localStorage.getItem("activities") || "posts";
  });
  useEffect(() => {
    // Update localStorage whenever activities state changes
    localStorage.setItem("activities", activities);
  }, [activities]);

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto">
      <div className="flex overflow-x-auto justify-center gap-5 overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
        <button
          onClick={() => setActivities("posts")}
          className={`${
            activities === "posts" ? "border-b-2 border-blue-500" : ""
          } inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-blue-600 bg-transparent sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none`}
        >
          Posts
        </button>

        <button
          onClick={() => setActivities("comments")}
          className={`${
            activities === "comments" ? "border-b-2 border-blue-500" : ""
          } inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-blue-600 bg-transparent sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none`}
        >
          Comments
        </button>
      </div>
      {activities === "posts" && <MyPosts activities={activities} />}
      {activities === "comments" && <MyComments />}
    </div>
  );
};

export default MyActivities;
