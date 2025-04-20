// import { Link, useLocation } from "react-router-dom";
// import useAllComments from "../../../../Components/hooks/useAllComments";
// import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
// import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const MyComments = () => {
//   const [allCommentsInfo, refetchComments] = useAllComments();
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [allPostsData, allPostsInfo, refetchPostData, isLoading] = useAllPostsInfo(); // Fetch posts data
//   const [loggedUserInfo] = useLoggedUserInfo();
//   const location = useLocation();
//   const [myComments, setMyComments] = useState([]);

//   // State to track expansion of individual comments
//   const [expandedComments, setExpandedComments] = useState({});

//   useEffect(() => {
//     const filteredComments = allCommentsInfo?.filter(
//       (comment) => comment?.commented_person_id === loggedUserInfo._id
//     );
//     setMyComments(filteredComments);
//   }, [allCommentsInfo, loggedUserInfo._id]);
//   console.log("myComments", myComments);

//   const toggleExpand = (commentId) => {
//     setExpandedComments((prev) => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }));
//   };

//   const handleDetails = async (id) => {
//     axios
//       .get(`https://blood-donation-server-ebon.vercel.app/details/${id}`)
//       .then((res) => console.log(res.data));
//     // const response = await fetch(
//     //   `https://blood-donation-server-ebon.vercel.app/available-donor?blood=${id}`
//     // );
//     // const data = await response.json();
//     // console.log(data);
//   };

//   return (
//     <div>
//       <p> All Comments: {allCommentsInfo.length}</p>
//       <p> My Comments: {myComments.length}</p>

//       {myComments?.map((comment) => {
//         // Find the corresponding post using selected_post_id
//         const post = allPostsData?.find(
//           (post) => post._id === comment.selected_post_id
//         );

//         const isExpanded = expandedComments[comment._id] || false;

//         return (
//           <div key={comment._id}>
//             <Link
//               state={location.pathname}
//               to={`/selected-post/${comment?.selected_post_id}`}
//             >
//               {/* <Link to={`/details/${comment.selected_post_id}`}> */}
//               {/* <Link> */}
//               <div
//                 // onClick={() => handleDetails(comment.selected_post_id)}
//                 className="flex gap-2 items-start cursor-pointer hover:bg-[#CFE1B9] py-3 px-1 md:px-5"
//               >
//                 <div>
//                   <img
//                     className="min-w-10 size-10 rounded-full bg-green-300"
//                     src={comment.commented_person_image}
//                     alt={comment.commented_person_name}
//                   />
//                 </div>
//                 <div>
//                   <h1>
//                     {comment.commented_person_name} commented on{" "}
//                     {post ? post.creator_name : "a post"}
//                     {"'"}s post
//                   </h1>
//                   {isExpanded ? (
//                     <p>
//                       {comment?.comment}
//                       <span
//                         className="cursor-pointer"
//                         onClick={() => toggleExpand(comment._id)}
//                       >
//                         (See less)
//                       </span>
//                     </p>
//                   ) : (
//                     <p>
//                       {comment?.comment?.slice(0, 50)}
//                       {comment?.comment?.length > 50 && (
//                         <span
//                           className="cursor-pointer"
//                           onClick={() => toggleExpand(comment._id)}
//                         >
//                           ...(See more)
//                         </span>
//                       )}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MyComments;
import { Link, useLocation } from "react-router-dom";
import useAllComments from "../../../../Components/hooks/useAllComments";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import MyContainer from "../../../../Shared/MyContainer";

const MyComments = () => {
  const [allCommentsInfo] = useAllComments();
  const [allPostsData] = useAllPostsInfo();
  const [loggedUserInfo] = useLoggedUserInfo();
  const location = useLocation();
  const [myComments, setMyComments] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});

  useEffect(() => {
    const filtered = allCommentsInfo?.filter(
      (comment) => comment?.commented_person_id === loggedUserInfo._id
    );
    setMyComments(filtered);
  }, [allCommentsInfo, loggedUserInfo._id]);

  const toggleExpand = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  const handleDeleteComments = () => {
    axios.delete("https://blood-donation-server-ebon.vercel.app/allComments");
  };

  return (
    // <div className="my-5 px-2 md:px-2 bg-gray-50 min-h-screen">
    <div className="min-h-[80vh] overflow-y-auto px-2 md:px-2 my-3">
      <button className="btn hidden" onClick={handleDeleteComments}>
        handleDeleteComments
      </button>
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Comments</h2>
        <p className="text-gray-700 mb-6">
          You’ve made <span className="font-semibold">{myComments.length}</span>{" "}
          comment
          {myComments.length !== 1 ? "s" : ""} on different blood requests.
        </p>

        <div className="space-y-1 mb-3">
          {myComments?.map((comment) => {
            const post = allPostsData?.find(
              (post) => post._id === comment.selected_post_id
            );
            const isExpanded = expandedComments[comment._id] || false;

            return (
              <div
                key={comment._id}
                className="block bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300"
              >
                <div className="flex items-start gap-4">
                  {comment.commented_person_image ? (
                    <img
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                      src={comment.commented_person_image}
                      alt={comment.commented_person_name}
                    />
                  ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold mb-1">
                      {comment.commented_person_name} commented on{" "}
                      <Link
                        to={`/selected-post/${comment?.selected_post_id}`}
                        state={location.pathname}
                        className="p-text hover:underline"
                      >
                        {post ? post.creator_name : "someone"}
                      </Link>
                      ’s post:
                    </p>
                    <p className="text-gray-700">
                      {isExpanded ? (
                        <>
                          {comment.comment}{" "}
                          <span
                            className="text-blue-500 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleExpand(comment._id);
                            }}
                          >
                            (See less)
                          </span>
                        </>
                      ) : (
                        <>
                          {comment.comment.slice(0, 80)}
                          {comment.comment.length > 80 && (
                            <span
                              className="text-blue-500 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleExpand(comment._id);
                              }}
                            >
                              ... (See more)
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyComments;
