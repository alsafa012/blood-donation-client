import { useEffect, useState } from "react";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import useAuth from "../../../../Components/hooks/useAuth";

const MyActivities = () => {
  const [allPostsInfo, refetch] = useAllPostsInfo();
  const [loggedUserInfo] = useLoggedUserInfo();
  console.log(loggedUserInfo);
  const { user } = useAuth();

  const [myPosts, setMyPosts] = useState([]);

  //   useEffect(() => {
  // loggedUserInfo.user_email ===
  const filterByEmail = allPostsInfo?.filter(
    (post) => post?.creator_email === user?.email
  );
  //     setMyPosts(filterByEmail)
  //   }, [allPostsInfo, loggedUserInfo]);

  return (
    <div>
      <h1>MyActivities</h1>
      <p>allPostsInfo: {allPostsInfo.length}</p>
      <p>myPosts: {myPosts.length}</p>
      <p>myPosts: {filterByEmail.length}</p>

      <div className="grid grid-cols-2 gap-2">
        <button className="w-full btn">Posts</button>
        <button className="w-full btn">Comments</button>
      </div>
      {
        
      }
    </div>
  );
};

export default MyActivities;
