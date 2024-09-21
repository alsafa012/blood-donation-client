import React, { useEffect, useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import { Link } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { MdOutlineCancel } from "react-icons/md";
import useAllPostsInfo from "../../Components/hooks/useAllPostsInfo";
import useAllComments from "../../Components/hooks/useAllComments";
const AllPostPage = () => {
  const [allPostsInfo, refetch] = useAllPostsInfo();
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [openComment, setOpenComment] = useState(false);
  // const [showComments, setShowComments] = useState([]);
  const [showComments1, setShowComments1] = useState([]);
  const [selectedPostDetail, setSelectedPostDetail] = useState({});
  const [loggedUserInfo] = useLoggedUserInfo();

  useEffect(() => {
    if (openComment) {
      const filtered = allCommentsInfo?.filter(
        (comment) => selectedPostDetail._id === comment.selected_post_id
      );
      setShowComments1(filtered);
      console.log(filtered);
    }
  }, [openComment, selectedPostDetail._id, allCommentsInfo]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/allComments")
  //     .then((res) => res.json())
  //     .then((data) => setShowComments(data));
  // }, []);
  const handleShowCommentDiv = (data, ind) => {
    setSelectedPostDetail(data);
    console.log(ind);
    setOpenComment(true);
  };
  const handleSendComment = () => {
    //  alert("handleSendComment")
    const commentTextAreaValue = document.getElementById("comment_box");
    const textAreaValue = commentTextAreaValue.value;
    const commentData = {
      selected_post_id: selectedPostDetail._id, //get selected post _id
      commented_person_id: loggedUserInfo?._id,
      commented_person_name: loggedUserInfo?.user_name,
      commented_person_email: loggedUserInfo?.user_email,
      comment_time: moment().format("LT"),
      comment_date: moment().format("MMMM Do YYYY"),
      commented_person_image: loggedUserInfo?.user_image,
      comment: textAreaValue,
    };
    console.log(commentData);
    axios.post("http://localhost:5000/allComments", commentData).then((res) => {
      if (res.data.insertedId) {
        commentTextAreaValue.value = "";
        refetchComments();
        Swal.fire("Good job!", "comment created successfully", "success");
      }
    });
  };

  const handleDeleteAllComments = () => {
    axios
      .delete("http://localhost:5000/allComments")
      .then((res) => console.log(res.data));
  };

  return (
    <MyContainer>
      <h2>Blood Donation Request</h2>
      <button onClick={handleDeleteAllComments} className="btn">
        DeleteAllComments
      </button>
      <p>{allPostsInfo.length}</p>
      <Link to={"/createPost"}>
        <button className="btn w-full my-3">Add A Post</button>
      </Link>
      <div className="flex justify-center w-full mx-auto items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-1 mx-auto md:px-5 lg:px-28">
          {allPostsInfo?.map((user, ind) => (
            <div className="p-border rounded-sm overflow-hidden" key={ind}>
              {/* image and info */}
              <div className="flex gap-4 border-b px-1 py-1">
                <Link to={`/availableDonors/${user?.creator_id}`}>
                  <img
                    className="w-[50px] h-[50px] object-cover rounded-full"
                    src={user?.creator_image}
                    alt={"creator_image.png"}
                  />
                </Link>
                <div>
                  <Link
                    to={`/availableDonors/${user?.creator_id}`}
                    className="text-[14px] font-semibold"
                  >
                    {user?.creator_name}
                  </Link>
                  <p className="text-[10px]">
                    {user?.post_created_date} at {user?.post_created_time}
                  </p>
                  <p className="text-[10px]">
                    removed on {user?.post_deadline}
                  </p>
                </div>
              </div>
              {/* content */}
              <div className="min-h-[100px] px-1 py-2">
                {user?.comment?.split("\n")?.map((com, ind) =>
                  com?.trim() !== "" ? (
                    <p className="text-[14px] mt-1" key={ind}>
                      {com}
                    </p>
                  ) : (
                    <br key={ind} />
                  )
                )}
              </div>
              {/* react & comment */}
              <div className="flex items-center btn-bg gap-2 justify-between text-[14px] p-1">
                <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                  like
                </button>
                <button
                  onClick={() => handleShowCommentDiv(user, ind)}
                  // onClick={() => setOpenComment(!openComment)}
                  className="px-2 hover:bg-[#B5C99A] py-1 rounded-md"
                >
                  Comment
                </button>
                <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* show all comment div */}
        <div
          className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden h-screen w-full border border-yellow-500 bg-black/20 backdrop-blur-sm ${
            openComment ? "opacity-1 visible" : "invisible opacity-0"
          }`}
        >
          {/* <div className="bg-red-200 border border-yellow-200 "> */}
          <div>
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className={`${
                openComment ? "block" : "hidden"
              } absolute w-[90%] md:w-[65%] lg:w-[30%] z-10 bg-primary overflow-y-auto h-[500px] max-h-[500px]`}
            >
              {/* X btn */}
              <div
                onClick={() => setOpenComment(false)}
                className="btn-bg border text-right p-2 sticky top-0 w-full"
              >
                <button className="hover:rotate-180 transition-transform duration-300 rounded-full btn-bg">
                  <MdOutlineCancel size={35} fill="#B5C99A" />
                </button>
              </div>
              {/* -------- */}

              {/* comments div */}
              <div className="flex min-h-[350px] flex-col gap-3 py-2 px-1">
                {showComments1.length === 0 ? (
                  <div className="text-2xl text-center pt-10">
                    <h1>No comments available</h1>
                  </div>
                ) : (
                  <div className="flex min-h-[350px] flex-col gap-3 py-2 px-1">
                    {showComments1?.map((comment) => (
                      <div key={comment._id} className="flex gap-2 rounded-md">
                        <img
                          className="w-[50px] h-[50px] rounded-full cursor-pointer"
                          src={comment?.commented_person_image}
                          alt={comment.name}
                        />
                        <div className="bg-[#c4daa7] w-full px-3 py-2 rounded-2xl">
                          <Link
                            to={`/availableDonors/${comment?.commented_person_id}`}
                            className="text-[14px] font-semibold hover:underline cursor-pointer"
                          >
                            {loggedUserInfo.user_name ===
                            comment?.commented_person_name ? (
                              <span>
                                {comment?.commented_person_name} (you)
                              </span>
                            ) : (
                              <span>{comment?.commented_person_name}</span>
                            )}
                          </Link>
                          <p>
                            <small>
                              at {comment?.comment_date} {comment?.comment_time}
                            </small>
                          </p>
                          {comment?.comment?.split("\n")?.map((com, ind) =>
                            com?.trim() !== "" ? (
                              <p className="text-[14px] mt-1" key={ind}>
                                {com}
                              </p>
                            ) : (
                              <br key={ind} />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* ----------- */}

              {/* text input field */}
              <div className="sticky bottom-0 w-full">
                <textarea
                  className="relative w-full min-h-[80px] max-h-[80px] border px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#D8D2D2] text-lg rounded-[10px]"
                  id="comment_box"
                  cols={5}
                  placeholder={`comment as ${selectedPostDetail?.name}`}
                  name="comment_box"
                  required
                />
                <button
                  onClick={handleSendComment}
                  className="absolute bottom-4 right-4"
                >
                  <IoMdSend size={25} />
                </button>
              </div>
              {/* ------------- */}
            </div>
          </div>
        </div>
        {/* ---------------------- */}
      </div>
    </MyContainer>
  );
};

export default AllPostPage;
