import React from "react";
import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";

const CreatePostPage = () => {
  const [loggedUserInfo] = useLoggedUserInfo();
  const handleCreatePost = (e) => {
    e.preventDefault();
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
    };
    console.log("formData", formData);
    axios
      .post("https://blood-donation-server-ebon.vercel.app/allPosts", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire("Good job!", "Post created successfully", "success");
        }
      })
      .catch((err) => {
        console.error("Error adding user:", err);
      });
  };
  return (
    <div>
      <h1>createPost</h1>
      <form className="flex flex-col gap-3 w-[15%]" onSubmit={handleCreatePost}>
        <input name="deadline" className="h-[30px] border" type="date" />
        <textarea
          className="w-full min-h-[80px] border px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#D8D2D2]"
          id="comment"
          cols={5}
          placeholder="comment"
          name="comment"
          required
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
