import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import { Link, useNavigate } from "react-router-dom";
import { FcGallery } from "react-icons/fc";
import { FaArrowLeft, FaEarthAfrica } from "react-icons/fa6";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreatePostPage = () => {
  const [loggedUserInfo] = useLoggedUserInfo();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [showImageDetails, setShowImageDetails] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState([]);
  // const [loading, setLoading] = useState(true);
  // console.log("showImageDetails", showImageDetails);
  // console.log("showImagePreview", showImagePreview);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    // Check if the selected deadline is before today
    const form = e.target;
    const post_deadline = form.deadline.value;
    const comment = form.comment.value;
    // Get today's date in 'YYYY-MM-DD' format
    const today = moment().format("YYYY-MM-DD");
    console.log("today", today);
    if (moment(post_deadline).isBefore(today)) {
      Swal.fire(
        "Invalid deadline!",
        "Deadline cannot be in the past.",
        "error"
      );
      return; // Stop further execution if deadline is invalid
    }
    try {
      const uploadPromises = showImageDetails.map((imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);
        return axios.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      });

      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map(
        (response) => response.data.data.display_url
      );
      console.log(responses.data);
      console.log(imageUrls);

      const formData = {
        creator_id: loggedUserInfo?._id,
        creator_name: loggedUserInfo?.user_name,
        creator_email: loggedUserInfo?.user_email,
        post_created_time: moment().format("LT"),
        post_created_date: moment().format("MMMM Do YYYY"),
        creator_image: loggedUserInfo?.user_image,
        post_deadline: post_deadline,
        comment: comment,
        found_donor_successfully: false,
        post_images: imageUrls,
      };
      console.log("formData", formData);
      axiosPublic
        .post("/allPosts", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire("Good job!", "Post created successfully", "success");
          }
          navigate("/posts");
        })
        .catch((err) => {
          console.error("Error adding user:", err);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately
    }
  };
  // Remove the image at the specified index from the arrays
  const handleRemoveImage = (index) => {
    const updatedShowName = [...showImageDetails];
    const updatedShowImagePreview = [...showImagePreview];
    updatedShowName.splice(index, 1);
    updatedShowImagePreview.splice(index, 1);
    setShowImageDetails(updatedShowName);
    setShowImagePreview(updatedShowImagePreview);
  };
  return (
    <MyContainer>
      <WebsiteTitle name={"Hope || Create Post"} />
      <form
        className="flex flex-col gap-3 w-[95%] md:w-[70%] lg:w-[65%] mx-auto p-border my-1 rounded-md"
        onSubmit={handleCreatePost}
      >
        <div className="text-center text-xl font-semibold bg-[#CFE1B9] py-2 flex items-center gap-2 pl-2">
          <Link className="cursor-pointer" to="/posts">
            <FaArrowLeft />
          </Link>
          <h1 className="">Create Post</h1>
        </div>
        <div className="flex gap-2 items-start py-2 px-1">
          <img
            className="size-[50px] rounded-full object-cover"
            src={loggedUserInfo?.user_image}
            alt=""
          />
          <div>
            <p className="font-semibold">{loggedUserInfo?.user_name}</p>
            <p className="inline-flex gap-1 items-center text-sm bg-[#CFE1B9] rounded-full px-1">
              Everyone <FaEarthAfrica size={12} />
            </p>
          </div>
        </div>
        <div className="px-1">
          <input
            name="deadline"
            required
            className="h-[30px] w-full border-b border-[#CFE1B9] px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#CFE1B9]"
            type="date"
          />
        </div>
        <div className="px-1">
          <textarea
            className="w-full min-h-[80px] md:min-h-[100px] border border-[#CFE1B9] px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#CFE1B9]"
            id="comment"
            cols={5}
            placeholder="comment"
            name="comment"
            required
          />
        </div>

        {/* image div */}
        <div className="px-1">
          <div
            className={`${
              showImageDetails.length > 0
                ? "relative border-t border-[#CFE1B9] mx-auto"
                : ""
            }`}
          >
            {/* show selected image on ui */}
            {showImageDetails?.length > 0 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {showImageDetails.map((image, index) => (
                  <div
                    key={index}
                    className="p-border rounded-xl overflow-hidden relative my-2"
                  >
                    <img
                      className="w-16 md:w-28 lg:w-40 h-16 md:h-28 lg:h-40 object-cover"
                      src={showImagePreview[index]}
                      alt={image?.name}
                    />
                    {/* <p>{image.name}</p> */}
                    <button
                      type="button"
                      title="remove"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 btn-bg text-white rounded w-6 md:w-8 h-6 md:h-8 flex justify-center items-center hover:bg-[#B5C99A]"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* _------------_ */}
            {/* Upload image btn */}
            <div className="p-border py-1 md:py-1 px-1 md:px-3">
              <label
                className="flex justify-center items-center gap-2 font-bold cursor-pointer text-black"
                htmlFor="multipleFiles"
              >
                Add to your post <FcGallery size={25} />
              </label>
            </div>
            {/* _------------_ */}
            {/* image input */}
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const selectedImages = Array.from(e.target.files);
                  console.log(selectedImages);
                  const imagePreviews = selectedImages.map((image) =>
                    URL.createObjectURL(image)
                  );
                  setShowImageDetails(selectedImages);
                  setShowImagePreview(imagePreviews);
                }
              }}
              className="-z-0 absolute -top-[1000px]"
              id="multipleFiles"
              type="file"
              multiple
            />
            {/* _------------_ */}
          </div>
        </div>

        <button
          // disabled={`${showImageDetails.length === 0}`}
          className="btn-bg py-1 rounded-md"
        >
          Post
        </button>
      </form>
    </MyContainer>
  );
};

export default CreatePostPage;
