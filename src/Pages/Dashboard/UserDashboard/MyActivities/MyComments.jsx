import { Link, useLocation } from "react-router-dom";
import useAllComments from "../../../../Components/hooks/useAllComments";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import { useEffect, useState } from "react";
import axios from "axios";

const MyComments = () => {
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [isExpanded, setIsExpanded] = useState(true);
  const [allPostsData, allPostsInfo, refetchPostData, isLoading] = useAllPostsInfo(); // Fetch posts data
  const [loggedUserInfo] = useLoggedUserInfo();
  const location = useLocation();
  const [myComments, setMyComments] = useState([]);

  // State to track expansion of individual comments
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    const filteredComments = allCommentsInfo?.filter(
      (comment) => comment?.commented_person_id === loggedUserInfo._id
    );
    setMyComments(filteredComments);
  }, [allCommentsInfo, loggedUserInfo._id]);
  console.log("myComments", myComments);

  const toggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleDetails = async (id) => {
    axios
      .get(`http://localhost:5000/details/${id}`)
      .then((res) => console.log(res.data));
    // const response = await fetch(
    //   `http://localhost:5000/available-donor?blood=${id}`
    // );
    // const data = await response.json();
    // console.log(data);
  };

  return (
    <div>
      <p> All Comments: {allCommentsInfo.length}</p>
      <p> My Comments: {myComments.length}</p>

      {myComments?.map((comment) => {
        // Find the corresponding post using selected_post_id
        const post = allPostsData?.find(
          (post) => post._id === comment.selected_post_id
        );

        const isExpanded = expandedComments[comment._id] || false;

        return (
          <div key={comment._id}>
            <Link
              state={location.pathname}
              to={`/selected-post/${comment?.selected_post_id}`}
            >
              {/* <Link to={`/details/${comment.selected_post_id}`}> */}
              {/* <Link> */}
              <div
                // onClick={() => handleDetails(comment.selected_post_id)}
                className="flex gap-2 items-start cursor-pointer hover:bg-[#CFE1B9] py-3 px-1 md:px-5"
              >
                <div>
                  <img
                    className="min-w-10 size-10 rounded-full bg-green-300"
                    src={comment.commented_person_image}
                    alt={comment.commented_person_name}
                  />
                </div>
                <div>
                  <h1>
                    {comment.commented_person_name} commented on{" "}
                    {post ? post.creator_name : "a post"}
                    {"'"}s post
                  </h1>
                  {isExpanded ? (
                    <p>
                      {comment?.comment}
                      <span
                        className="cursor-pointer"
                        onClick={() => toggleExpand(comment._id)}
                      >
                        (See less)
                      </span>
                    </p>
                  ) : (
                    <p>
                      {comment?.comment?.slice(0, 50)}
                      {comment?.comment?.length > 50 && (
                        <span
                          className="cursor-pointer"
                          onClick={() => toggleExpand(comment._id)}
                        >
                          ...(See more)
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MyComments;
