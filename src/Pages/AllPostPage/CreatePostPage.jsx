import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import { Link, useNavigate } from "react-router-dom";
import { FcGallery } from "react-icons/fc";
import { FaArrowLeft, FaEarthAfrica } from "react-icons/fa6";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import BloodGroupDropdown from "../../Shared/Dropdowns/BloodGroupDropdown";
import GenderDropDown from "../../Shared/Dropdowns/GenderDropDown";
import RegionDropdown from "../../Shared/Dropdowns/RegionDropdown";
import DistrictDropdown from "../../Shared/Dropdowns/DistrictDropdown";
import UpazilaDropdown from "../../Shared/Dropdowns/UpazilaDropdown";
import { LocationContext } from "../../Provider/LocationContext";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreatePostPage = () => {
  const [loggedUserInfo] = useLoggedUserInfo();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [showImageDetails, setShowImageDetails] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const {
    selectedDistrict,
    selectedDistrictName,
    setSelectedDistrict,
    selectedUpazila,
    setSelectedUpazila,
    searchDistrict,
    setSearchDistrict,
    searchUpazila,
    setSearchUpazila,
    openDistrict,
    setOpenDistrict,
    openUpazila,
    setOpenUpazila,
    district,
    upazila,
    handleDistrictChange,
  } = useContext(LocationContext);
  // } = useLocationContext();
  console.log("selectedDistrictName", selectedDistrictName);

  const handleGenderChange = (e) => setGender(e.target.value);
  const handleBloodGroupChange = (e) => setBloodGroup(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    // Check if the selected deadline is before today
    const form = e.target;
    const post_deadline = form.deadline.value;
    const unit_of_blood = form.unit_of_blood.value;
    const relation_with_patient = form.relation_with_patient.value;
    const patient_name = form.patient_name.value;
    const patient_age = form.patient_age.value;
    const comment = form.comment.value;
    const primary_number = form.primary_number.value;
    const alternative_number = form.alternative_number.value;
    const hospital_location = form.hospital_location.value;
    const google_map_location = form.google_map_location.value;
    // Get today's date in 'YYYY-MM-DD' format
    const today = moment().format("YYYY-MM-DD");
    // console.log("today", today);
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
      // console.log(responses.data);
      // console.log(imageUrls);

      const formData = {
        creator_id: loggedUserInfo?._id,
        creator_name: loggedUserInfo?.user_name,
        creator_email: loggedUserInfo?.user_email,
        post_created_time: moment().format("LT"),
        post_created_date: moment().format("MMMM Do YYYY"),
        creator_image: loggedUserInfo?.user_image,
        post_deadline: post_deadline,
        unit_of_blood: unit_of_blood,
        post_images: imageUrls,
        bloodGroup: bloodGroup,
        relation_with_patient,
        patient_name: patient_name,
        patient_age: patient_age,
        patient_gender: gender,
        patient_region: region,
        medical_reason: comment,
        primary_number,
        alternative_number,
        hospital_location,
        google_map_location,
        district_name: selectedDistrictName,
        upazila_name: selectedUpazila,
        found_donor_successfully: false,
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

  const handleShowAddress = () => {
    console.log("openDistrict", openDistrict);
    console.log("openUpazila", openUpazila);
    setOpenDistrict((prevState) => !prevState);
    // setOpenUpazila((prevState) => !prevState);
  };
  return (
    <MyContainer>
      <WebsiteTitle name={"Hope || Create Post"} />
      {/*  */}

      <form
        className="flex flex-col gap-3 w-[95%] md:w-[80%] lg:w-[65%] mx-auto p-border my-1 rounded-md mb-10"
        onSubmit={handleCreatePost}
      >
        {/* page Title */}
        <div className="text-center text-xl font-semibold bg-[#CFE1B9] py-2 flex items-center gap-2 pl-2">
          <Link className="cursor-pointer" to="/posts">
            <FaArrowLeft />
          </Link>
          <h1 className="">Create Post</h1>
        </div>
        {/* ------ */}
        {/* creator details */}
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
        {/* ----- */}
        {/* Form content */}
        <div className="grid md:grid-cols-3 gap-2 lg:gap-5 px-2 my-5">
          {/* blood group */}
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="post-input-label">
              Select Blood Group
            </label>
            <BloodGroupDropdown
              blood={bloodGroup}
              onChange={handleBloodGroupChange}
              css={"post-input-field"}
            />
          </div>
          {/* donation date and time / deadline */}
          <div className="relative">
            <input
              id="deadline"
              name="deadline"
              type="text" // Initially, type is text
              className="post-input-field w-full input-peer"
              required
              onFocus={(e) => {
                // Set the type to date when the field is focused
                if (e.target.type === "text") {
                  e.target.type = "date";
                }
              }}
              onBlur={(e) => {
                // Revert back to text if no value is entered
                if (!e.target.value) {
                  e.target.type = "text";
                }
              }}
            />
            <label htmlFor="deadline" className="post-input-label">
              Date and Time
            </label>
          </div>
          {/* total unit of bags */}
          <div className="relative">
            <input
              id="unit_of_blood"
              name="unit_of_blood"
              type="number"
              placeholder=""
              className="post-input-field w-full input-peer"
              required
            />
            <label htmlFor="unit_of_blood" className="post-input-label">
              Total Unit/Bag
            </label>
          </div>
        </div>
        {/* creator Information */}
        <div className="px-1 p-border relative pt-8 lg:pt-10 pb-3 md:pb-5 rounded-md mx-2">
          <p className="absolute -top-3 left-2 border border-[#cfe1b9] border-dashed rounded-md bg-white px-1 text-lg md:text-xl font-semibold">
            Your Information
          </p>
          <div className="grid md:grid-cols-2 gap-2 lg:gap-5">
            {/* post creator name */}
            <div className="relative w-full">
              <input
                type="text"
                id="creator-name"
                name="creator_name"
                defaultValue={loggedUserInfo?.user_name}
                placeholder=" "
                className="post-input-field w-full input-peer"
                required
              />
              <label htmlFor="creator-name" className="post-input-label">
                Your Name
              </label>
            </div>
            {/* Relation with patient */}
            <div className="relative w-full">
              <input
                id="relation-with-patient"
                name="relation_with_patient"
                placeholder=""
                className="post-input-field w-full input-peer"
              />
              <label
                htmlFor="relation-with-patient"
                className="post-input-label"
              >
                Relation with patient (optional)
              </label>
            </div>
          </div>
        </div>
        {/* end of creator Information */}
        {/* Patient Information */}
        <div className="px-1 p-border relative pt-8 lg:pt-10 pb-3 md:pb-5 rounded-md mx-2 my-5 md:my-8">
          <p className="absolute -top-3 left-2 border border-[#cfe1b9] border-dashed rounded-md bg-white px-1 text-lg md:text-xl font-semibold">
            Patient Information
          </p>
          <div className="grid md:grid-cols-4 gap-2 lg:gap-5">
            {/* Patient name */}
            <div className="col-span-2 md:col-span-1 relative w-full">
              <input
                id="patient_name"
                type="text"
                name="patient_name"
                placeholder=""
                className="post-input-field w-full input-peer"
              />
              <label htmlFor="patient_name" className="post-input-label">
                Patient name
              </label>
            </div>
            {/* Patient age */}
            <div className="col-span-2 md:col-span-1 relative w-full">
              <input
                name="patient_age"
                id="patient_age"
                type="number"
                placeholder=""
                className="post-input-field w-full input-peer"
              />
              <label htmlFor="patient_age" className="post-input-label">
                Patient age
              </label>
            </div>
            {/* Patient gender */}
            <div className="relative w-full">
              <label htmlFor="" className="post-input-label">
                {/* Patient gender */}
              </label>
              <GenderDropDown
                value={gender}
                onChange={handleGenderChange}
                css={"post-input-field"}
              />
            </div>
            {/* Patient Region */}
            <div className="relative w-full">
              <label htmlFor="" className="post-input-label">
                {/* Patient gender */}
              </label>
              <RegionDropdown
                value={region}
                onChange={handleRegionChange}
                css={"post-input-field"}
              />
            </div>
            {/* medical Reason or  comment */}
            <div className="col-span-2 md:col-span-4">
              <textarea
                className="w-full min-h-[80px] md:min-h-[100px] border border-[#CFE1B9] px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#CFE1B9]"
                id="comment"
                cols={5}
                placeholder="Medical Reason (Optional)"
                name="comment"
                required
              />
            </div>
          </div>
        </div>
        {/* end of Patient Information */}
        {/* Contact Information */}
        <div className="px-1 p-border relative pt-8 lg:pt-10 pb-3 md:pb-5 rounded-md mx-2">
          <p className="absolute -top-3 left-2 border border-[#cfe1b9] border-dashed rounded-md bg-white px-1 text-lg md:text-xl font-semibold">
            Contact Information
          </p>
          <div className="grid md:grid-cols-2 gap-2 lg:gap-5">
            {/* Primary Contact Number */}
            <div className="relative w-full">
              <input
                type="number"
                id="primary_number"
                name="primary_number"
                placeholder=" "
                className="post-input-field w-full input-peer"
                required
              />
              <label htmlFor="primary_number" className="post-input-label">
                Primary Phone Number
              </label>
            </div>

            {/* Alternative Contact Number */}
            <div className="relative w-full">
              <input
                type="number"
                id="alternative_number"
                name="alternative_number"
                className="post-input-field w-full input-peer"
                placeholder=" "
                required
              />
              <label htmlFor="alternative_number" className="post-input-label">
                Alternative Phone Number (optional)
              </label>
            </div>

            {/* Hospital Location */}
            <div className="relative w-full">
              <input
                type="text"
                id="hospital_location"
                name="hospital_location"
                placeholder=" "
                className="post-input-field w-full input-peer"
                required
              />
              <label htmlFor="hospital_location" className="post-input-label">
                Hospital Location
              </label>
            </div>

            {/* Google map Location */}
            <div className="relative w-full">
              <input
                type="url"
                id="google_map_location"
                name="google_map_location"
                placeholder=" "
                className="post-input-field w-full input-peer"
                required
              />
              <label htmlFor="google_map_location" className="post-input-label">
                Google Map Location
              </label>
            </div>
            {/* district */}
            <div className="">
              <DistrictDropdown
                selectedDistrict={selectedDistrict}
                searchDistrict={searchDistrict}
                setSearchDistrict={setSearchDistrict}
                district={district}
                openDistrict={openDistrict}
                setOpenDistrict={setOpenDistrict}
                selectedDistrictName={selectedDistrictName}
                setSelectedDistrict={handleDistrictChange}
              />
            </div>
            {/* upazila */}
            <div className="">
              <UpazilaDropdown
                selectedDistrict={selectedDistrict}
                selectedUpazila={selectedUpazila}
                setSelectedUpazila={setSelectedUpazila}
                searchUpazila={searchUpazila}
                setSearchUpazila={setSearchUpazila}
                upazila={upazila}
                openUpazila={openUpazila}
                setOpenUpazila={setOpenUpazila}
              />
            </div>
          </div>
        </div>

        {/* end of Contact Information */}

        {/* image div */}
        <div className="px-2">
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
                      className="w-28 lg:w-40 h-28 lg:h-40 object-cover"
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
        {/* end of form content */}
        <button type="submit" className="btn-bg py-1 rounded-md">
          Post Request
        </button>
      </form>
      {/* <button onClick={() => setOpenDistrict((prevState) => !prevState)}>
        Change district state button
      </button>
      <button onClick={() => setOpenUpazila((prevState) => !prevState)}>
        Change district state button
      </button> */}
      <button onClick={handleShowAddress}>Change district state button</button>
    </MyContainer>
  );
};

export default CreatePostPage;
