// import { Link } from "react-router-dom";
// import useAllComments from "../../../../Components/hooks/useAllComments";
// import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";

// const MyComments = () => {
//   const [allCommentsInfo, refetchComments] = useAllComments();
//   const [loggedUserInfo] = useLoggedUserInfo();

//   // const [allCommentsInfo, refetchComments] = useAllComments();

//   const myComments = allCommentsInfo.filter(
//     (comment) => comment.commented_person_id === loggedUserInfo._id
//   );
//   console.log(myComments);

//   return (
//     <div>
//       <p> AllComments {allCommentsInfo.length}</p>
//       <p> MyComments {myComments.length}</p>

//       {myComments.map((comment) => (
//         <div key={comment._id}>
//           <div className="flex gap-2 items-start">
//             <div>
//               <img
//                 className="size-10 rounded-full bg-green-300"
//                 src=""
//                 alt=""
//               />
//             </div>
//             <div>
//               {comment?.commented_person_name} commented on {"person name who create this post"} post
//               <Link to={`/selected-post/${comment?.selected_post_id}`}>
//                 click here
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyComments;
import { Link } from "react-router-dom";
import useAllComments from "../../../../Components/hooks/useAllComments";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import { useState } from "react";

const MyComments = () => {
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [isExpanded, setIsExpanded] = useState(true);
  const [allPostsData] = useAllPostsInfo(); // Fetch posts data
  console.log(allPostsData);
  const [loggedUserInfo] = useLoggedUserInfo();

  // State to track expansion of individual comments
  const [expandedComments, setExpandedComments] = useState({});

  const myComments = allCommentsInfo.filter(
    (comment) => comment.commented_person_id === loggedUserInfo._id
  );

  const toggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
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
            <Link to={`/selected-post/${comment.selected_post_id}`}>
              <div className="flex gap-2 items-start cursor-pointer hover:bg-[#CFE1B9] py-3 px-1 md:px-5">
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
