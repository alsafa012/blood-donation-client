import { Link } from "react-router-dom";
import useAllComments from "../../../../Components/hooks/useAllComments";
import { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";
import { MdOutlineCancel } from "react-icons/md";
import LoadingAnimation from "../../../../Shared/LoadingAnimation";
import useAllPostsInfo from "../../../../Components/hooks/useAllPostsInfo";
import useAuth from "../../../../Components/hooks/useAuth";

const MyPosts = () => {
  const { user } = useAuth();
  const [allPostsData, , refetch, isLoading] = useAllPostsInfo();
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [openComment, setOpenComment] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [showComments1, setShowComments1] = useState([]);
  const [selectedPostDetail, setSelectedPostDetail] = useState({});
  const [loggedUserInfo] = useLoggedUserInfo();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSelectedImage, setShowSelectedImage] = useState(false);
  useEffect(() => {
    const filterByEmail = allPostsData?.filter(
      (post) => post?.creator_email === user?.email
    );
    setMyPosts(filterByEmail);
  }, [user?.email]);
  // console.log(filterByEmail);

  useEffect(() => {
    if (openComment) {
      const filtered = allCommentsInfo?.filter(
        (comment) => selectedPostDetail._id === comment.selected_post_id
      );
      setShowComments1(filtered);
      // console.log(filtered);
    }
  }, [openComment, selectedPostDetail._id, allCommentsInfo]);
  if (isLoading) {
    return <LoadingAnimation />;
  }
  const handleShowCommentDiv = (data, ind) => {
    setSelectedPostDetail(data);
    console.log(ind);
    setOpenComment(true);
  };
  const handleShowSelectedImage = (ind, user) => {
    // setDisplayImage(img);
    // console.log(img);
    setSelectedImageIndex(ind);
    setSelectedPostDetail(user);
    setShowSelectedImage(true);
  };
  const handleNextImage = () => {
    if (
      selectedPostDetail.post_images &&
      selectedPostDetail.post_images.length > 0
    ) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === selectedPostDetail.post_images.length - 1
          ? 0
          : prevIndex + 1
      );
    }
  };
  const handlePreviousImage = () => {
    if (
      selectedPostDetail.post_images &&
      selectedPostDetail.post_images.length > 0
    ) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0
          ? selectedPostDetail.post_images.length - 1
          : prevIndex - 1
      );
    }
  };
  return (
    <div className="min-h-[80vh] overflow-y-auto">
      {myPosts.length === 0 && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-2xl font-semibold">No Post Available</h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 my-5 px-10 md:px-2 overflow-auto">
        {myPosts?.map((post, ind) => (
          <div className="p-border rounded-sm max-h-max" key={post._id}>
            {/* image and info */}
            <div className="flex justify-between border-b px-1 py-1">
              <div className="flex gap-4">
                <Link to={`/availableDonors/${post?.creator_id}`}>
                  <img
                    className="w-[50px] h-[50px] object-cover rounded-full"
                    src={post?.creator_image}
                    alt={"creator_image.png"}
                  />
                </Link>
                <div>
                  <Link
                    to={`/availableDonors/${post?.creator_id}`}
                    className="text-[14px] font-semibold"
                  >
                    {post?.creator_name}
                  </Link>
                  <p className="text-[10px]">
                    {post?.post_created_date} at {post?.post_created_time}
                  </p>
                  <p className="text-[10px]">
                    removed on {post?.post_deadline}
                  </p>
                </div>
              </div>
            </div>
            {/* content */}
            <div>
              {/* texts */}
              <div className="min-h-[50px] px-1 py-2">
                {post?.comment?.split("\n")?.map((com, ind) =>
                  com?.trim() !== "" ? (
                    <p className="text-[14px] mt-1" key={ind}>
                      {com}
                    </p>
                  ) : (
                    <br key={ind} />
                  )
                )}
              </div>
              {/* image */}
              {post?.post_images.length > 0 && (
                <div className="border-t border-[#CFE1B9] flex gap-2 flex-wrap items-center justify-center py-1">
                  {post?.post_images?.map((image, ind) => (
                    <div className="size-28" key={ind}>
                      <img
                        className="md:hover:scale-y-105 p-border hover:rounded-md duration-300 size-28 object-cover cursor-pointer"
                        src={image}
                        alt=""
                        onClick={() => handleShowSelectedImage(ind, post)}
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* react & comment div */}
              <div className="flex items-center btn-bg gap-2 justify-between text-[14px] p-1">
                <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
                  like
                </button>
                <button
                  onClick={() => handleShowCommentDiv(post, ind)}
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
          </div>
        ))}
      </div>
      {/* show selected image */}
      <div
        className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden min-h-screen max-h-screen w-full bg-black/20 backdrop-blur-sm ${
          showSelectedImage ? "opacity-1 visible" : "invisible opacity-0"
        }`}
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className={`${showSelectedImage ? "block" : "hidden"} absolute z-10`}
        >
          {showSelectedImage &&
            selectedPostDetail.post_images &&
            selectedPostDetail.post_images.length > 0 && (
              <img
                className="object-fill md:object-fill md:min-h-[80vh] max-h-[90vh] rounded-md"
                // src={displayImage}
                src={selectedPostDetail.post_images[selectedImageIndex]}
                alt="displayImage.png"
              />
            )}
          <button
            onClick={() => setShowSelectedImage(false)}
            className="absolute top-2 right-2 hover:rotate-180 transition-transform duration-300 rounded-full btn-bg"
          >
            <MdOutlineCancel size={35} fill="#B5C99A" />
          </button>
          {showSelectedImage && selectedPostDetail?.post_images.length > 1 && (
            <button
              title="pre"
              onClick={handlePreviousImage}
              className="absolute top-[50%] left-2 hover:scale-110 duration-300 bg-[#B5C99A"
            >
              <IoIosArrowDropleft size={35} fill="#97A97C" color="#B5C99A" />
            </button>
          )}
          {selectedPostDetail.post_images &&
            selectedPostDetail?.post_images.length > 1 && (
              <button
                onClick={handleNextImage}
                title="next"
                className="absolute top-[50%] right-2 hover:scale-110 duration-300"
              >
                <IoIosArrowDropright size={35} fill="#97A97C" />
              </button>
            )}
        </div>
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
            } absolute w-[90%] md:w-[65%] lg:w-[30%] z-10 bg-primary overflow-y-auto min-h-[250px] max-h-[500px]`}
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
            <div className="flex min-h-[250px] flex-col gap-3 py-2 px-1">
              {showComments1.length === 0 ? (
                <div className="text-2xl text-center pt-10">
                  <h1>No comments available</h1>
                </div>
              ) : (
                <div className="flex min-h-[250px] flex-col gap-3 py-2 px-1">
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
                            <span>{comment?.commented_person_name} (you)</span>
                          ) : (
                            <span>{comment?.commented_person_name}</span>
                          )}
                        </Link>
                        <p>
                          <small>
                            at {comment?.comment_date}
                            {comment?.comment_time}
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
          </div>
        </div>
      </div>
      {/* ---------------------- */}
    </div>
  );
};

export default MyPosts;
