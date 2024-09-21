import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreatePostPage = () => {
  const [loggedUserInfo] = useLoggedUserInfo();
  const [showImageDetails, setShowImageDetails] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState([]);
  console.log("showImageDetails", showImageDetails);
  console.log("showImagePreview", showImagePreview);

  const handleRemoveImage = (index) => {
    // Remove the image at the specified index from the arrays
    const updatedShowName = [...showImageDetails];
    const updatedShowImagePreview = [...showImagePreview];
    updatedShowName.splice(index, 1);
    updatedShowImagePreview.splice(index, 1);
    setShowImageDetails(updatedShowName);
    setShowImagePreview(updatedShowImagePreview);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
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
      const form = e.target;
      const post_deadline = form.deadline.value;
      const comment = form.comment.value;
      // Get today's date in 'YYYY-MM-DD' format
      const today = moment().format("YYYY-MM-DD");
      console.log("today", today);

      // Check if the selected deadline is before today
      if (moment(post_deadline).isBefore(today)) {
        Swal.fire(
          "Invalid deadline!",
          "Deadline cannot be in the past.",
          "error"
        );
        return; // Stop further execution if deadline is invalid
      }
      const formData = {
        creator_id: loggedUserInfo?._id,
        creator_name: loggedUserInfo?.user_name,
        creator_email: loggedUserInfo?.user_email,
        post_created_time: moment().format("LT"),
        post_created_date: moment().format("MMMM Do YYYY"),
        creator_image: loggedUserInfo?.user_image,
        post_deadline: post_deadline,
        comment: comment,
        post_images: imageUrls,
      };
      console.log("formData", formData);
      axios
        .post("http://localhost:5000/allPosts", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire("Good job!", "Post created successfully", "success");
          }
        })
        .catch((err) => {
          console.error("Error adding user:", err);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately
    }
  };
  return (
    <div>
      <h1>createPost</h1>
      <form className="flex flex-col gap-3 w-[85%]" onSubmit={handleCreatePost}>
        <input name="deadline" className="h-[30px] border" type="date" />
        <textarea
          className="w-full min-h-[80px] border px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#D8D2D2]"
          id="comment"
          cols={5}
          placeholder="comment"
          name="comment"
          required
        />
        <div>
          <h1 className="text-center text-3xl font-medium">
            Multiple Image Host
          </h1>
          <div>
            <div className="relative border border-green-700 mx-auto">
              {/* show selected image on ui */}
              {showImageDetails?.length > 0 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {showImageDetails.map((image, index) => (
                    <div
                      key={index}
                      className="border border-red-600 rounded-xl overflow-hidden relative my-2"
                    >
                      <img
                        className="h-16 w-16 md:h-28 md:w-28 object-cover"
                        src={showImagePreview[index]}
                        alt={image?.name}
                      />
                      {/* <p>{image.name}</p> */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* _------------_ */}
              {/* Upload image btn */}
              <div>
                <label
                  className="flex btn justify-center items-center gap-2font-bold active:ring-4 upload-image-btn cursor-pointer text-black"
                  htmlFor="multipleFiles"
                >
                  Upload Image
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
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
