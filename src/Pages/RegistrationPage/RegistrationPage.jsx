import { useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import { CiEdit } from "react-icons/ci";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import axios from "axios";
import moment from "moment";
import useAuth from "../../Components/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
const userReligiousStatus = [
  { id: "Islam", label: "Islam" },
  { id: "Hindu", label: "Hindu" },
  { id: "Others", label: "Others" },
];
const activeStatus = [
  { id: "Yes", label: "Yes" },
  { id: "No", label: "No" },
];
const usersGender = [
  { id: "Male", label: "Male" },
  { id: "Female", label: "Female" },
];
// patient_gender
const district = [
  { id: "1", division_id: "1", name: "Dhaka", bn_name: "কুমিল্লা" },
  { id: "2", division_id: "1", name: "Feni", bn_name: "ফেনী" },
];
const upazila = [
  {
    id: "1",
    district_id: "1",
    name: "Mohammadpur",
    bn_name: "দেবিদ্বার",
    url: "debidwar.comilla.gov.bd",
  },
  {
    id: "2",
    district_id: "1",
    name: "Dhanmondi",
    bn_name: "বরুড়া",
    url: "barura.comilla.gov.bd",
  },
  {
    id: "3",
    district_id: "1",
    name: "Shankar",
    bn_name: "ব্রাহ্মণপাড়া",
    url: "brahmanpara.comilla.gov.bd",
  },
  {
    id: "4",
    district_id: "1",
    name: "Banani",
    bn_name: "চান্দিনা",
    url: "chandina.comilla.gov.bd",
  },
  {
    id: "18",
    district_id: "2",
    name: "Chhagalnaiya",
    bn_name: "ছাগলনাইয়া",
    url: "chhagalnaiya.feni.gov.bd",
  },
  {
    id: "19",
    district_id: "2",
    name: "Feni Sadar",
    bn_name: "ফেনী সদর",
    url: "sadar.feni.gov.bd",
  },
];
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const RegistrationPage = () => {
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const [userReligious, setUserReligious] = useState("");
  const [userActiveStatus, setUserActiveStatus] = useState("");
  const [userGender, setUserGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  // console.log(userMaritalStatus.toLowerCase());
  // console.log(userReligious);
  const [fieldErrors, setFieldErrors] = useState({});
  console.log("fieldErrors", fieldErrors);
  // console.log(bloodGroup);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  // const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { user, createUser, updateUserProfile } = useAuth();

  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const filteredUpazilas = upazila?.filter(
    (upz) => upz.district_id === selectedDistrict
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // logged user validation
    if (user) {
      setIsLoading(false);
      return Swal.fire({
        title: "Error!",
        text: "User already logged in",
        icon: "error",
      });
    }

    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const phone_number = form.phone_number.value;
    const alternative_phone_number = form.alternative_phone_number.value;
    const user_email = form.user_email.value;
    const whatsapp = form.whatsapp.value || "";
    const messenger = form.messenger.value || "";
    const nationality = "Bangladeshi";
    const address = form.address.value;
    const password = form.password.value;
    const re_password = form.re_password.value;
    let photoUrl = "https://i.ibb.co/mtL872C/image.png"; // Default profile image

    const errors = {};

    if (!name.trim()) errors.name = "Name is required";
    if (!age.trim()) errors.age = "Age is required";
    // if (!phone_number.trim()) errors.phone_number = "Phone number is required";
    if (!phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^01[3-9][0-9]{8}$/.test(phone_number)) {
      errors.phone_number = "Enter a valid number";
    }
    if (whatsapp && !/^01[3-9][0-9]{8}$/.test(whatsapp)) {
      errors.whatsapp = "Enter a valid number";
    }
    if (
      alternative_phone_number &&
      !/^01[3-9][0-9]{8}$/.test(alternative_phone_number)
    ) {
      errors.alternative_phone_number = "Enter a valid number";
    }

    if (!user_email.trim()) errors.user_email = "Email is required";
    if (!address.trim()) errors.address = "Address is required";
    if (!password.trim()) errors.password = "Password is required";
    if (!re_password.trim()) errors.re_password = "Re-enter password";
    if (!bloodGroup) errors.bloodGroup = "Blood group is required";
    if (!selectedDistrict) errors.district = "District is required";
    if (!selectedUpazila) errors.upazila = "Area is required";
    if (!userReligious) errors.religious = "Select your religion";
    if (!userGender) errors.userGender = "Select your gender";
    if (!userActiveStatus) errors.activeStatus = "Select donation ability";

    console.log(Object.keys(errors));
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    } else {
      setFieldErrors({}); // clear old errors if all valid
    }

    console.log("form errors", errors);

    // Check if passwords match
    if (password !== re_password) {
      setIsLoading(false);
      return Swal.fire({
        title: "Error!",
        text: "Passwords do not match. Please enter matching passwords.",
        icon: "error",
      });
    }

    // Password validation
    if (password.length < 6) {
      setErrorMessage("Please enter at least 6 character password");
      setIsLoading(false);
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      setIsLoading(false);
      return;
    } else if (!/(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-])/.test(password)) {
      setErrorMessage("Password must contain at least one special character.");
      setIsLoading(false);
      return;
    }

    try {
      if (showName?.name) {
        // User has uploaded an image
        const imageFile = new FormData();
        imageFile.append("image", showName);

        const res = await axios.post(image_hosting_api, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          photoUrl = res.data.data.display_url;
        }
      }

      const userInfo = {
        user_name: name,
        user_age: age,
        bloodGroup: bloodGroup,
        phone_number: phone_number,
        alternative_phone_number: alternative_phone_number,
        user_email: user_email,
        user_whatsapp: whatsapp,
        user_messenger: messenger,
        user_nationality: nationality,
        user_address: address,
        user_activeStatus: userActiveStatus === "Yes" ? "active" : "inactive",
        user_religious: userReligious.toLowerCase(),
        user_password: password,
        user_district: selectedDistrictName,
        user_area: selectedUpazila,
        user_gender: userGender,
        user_image: photoUrl,
        user_role: "donor",
        // img_status: !!photoUrl,
        // img_status: photoUrl ? true : false,
        img_status: photoUrl !== "https://i.ibb.co/mtL872C/image.png",
        account_createdTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
        account_status: false,
        showImage: true,
        user_full_address: `${address}, ${selectedUpazila}, ${selectedDistrictName}`,
      };
      console.log(userInfo);
      const response = await axiosPublic.post("/users", userInfo, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data.message);

      if (!response.data.status) {
        Swal.fire({
          title: "Registration Failed!",
          text: response.data.message,
          icon: "error",
        });
        return;
      }

      if (response.data.status) {
        // Creating a new user
        await createUser(user_email, password);
        // console.log(result?.user);
        // Updating user profile
        await updateUserProfile(name, photoUrl);
        console.log("User added successfully in the database");
        Swal.fire({
          title: "Welcome to Roktojoddha!",
          // text: `${response.data.message}`,
          text: "Account created successfully",
          icon: "success",
        });
        // Swal.fire("Good job!", "User created successfully", "success");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Swal.fire({
      //   title: "Error!",
      //   text: "Something went wrong. Please try again.",
      //   footer: error,
      //   icon: "error",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MyContainer>
      {/* <div className="min-h-screen bg-[url('https://st2.depositphotos.com/3643473/5841/i/450/depositphotos_58411043-stock-photo-old-key-with-hope-sign.jpg')] bg-no-repeat bg-cover"> */}
      <div className="min-h-screen">
        <WebsiteTitle name={"রক্তযোদ্ধা || Registration"} />
        <div className="backdrop-blur-xl h-full min-h-screen py-5 w-full">
          <div
            //   style={{
            //     boxShadow: `
            //   8px 8px 15px rgba(0, 0, 0, 0.1),
            //   -8px -8px 15px rgba(255, 255, 255, 0.7),
            //   inset 8px 8px 15px rgba(0, 0, 0, 0.1),
            //   inset -8px -8px 15px rgba(255, 255, 255, 0.7)
            // `,
            //   }}
            className="p-border  rounded-md min-h-screen w-[99%] md:w-[80%] lg:w-[65%] xl:w-[55%] pt-2 mx-auto px-1 md:px-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2d3a4b] mb-6">
              রক্তযোদ্ধা || Registration
            </h2>
            <form onSubmit={handleRegister}>
              {/* Image */}
              <div className="">
                <div className="relative border rounded-full h-28 w-28 md:h-28 md:w-28 mx-auto overflow-hidde">
                  {showName?.name ? (
                    <img
                      className="h-28 w-28 md:h-28 md:w-28 rounded-full mx-auto"
                      src={showImagePreview}
                      alt={showName?.name}
                    />
                  ) : (
                    <img
                      className="h-28 w-28 md:h-28 md:w-28 border rounded-full mx-auto"
                      src="https://i.ibb.co/mtL872C/image.png"
                      alt=""
                    />
                  )}
                  <div className="absolute -bottom-2 right-0 border p-[2px] rounded-full back-bg text-xl md:text-3xl">
                    <label htmlFor="file" className="cursor-pointer z-50">
                      <CiEdit />
                    </label>
                  </div>
                  <input
                    // name="photo"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const imageFile = e.target.files[0];
                        // console.log(imageFile);
                        setShowName(imageFile);
                        setShowImagePreview(URL.createObjectURL(imageFile));
                      }
                    }}
                    // -z-0 absolute -top-[500px]
                    className="hidden"
                    id="file"
                    type="file"
                  />
                </div>
              </div>
              {/* ****************** */}
              <div className="flex text-sm gap-2 text-center justify-center pt-5 pb-3">
                <h1>Already have an account?</h1>
                <Link to={"/login"} className="text-[#87986A] hover:underline">
                  login here
                </Link>
              </div>
              {/* ----------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                  />
                  <label htmlFor="name" className="post-input-label">
                    Name:*
                  </label>
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* age */}
                <div className="relative w-full">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="age" className="post-input-label">
                    Enter Age:*
                  </label>
                  {fieldErrors.age && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.age}
                    </p>
                  )}
                </div>

                {/* Blood Group:* */}
                <div className="gri grid-cols-2 gap-2 w-full">
                  <label className="text-base font-semibold hidden">
                    Blood Group:*
                  </label>
                  <select
                    // defaultValue="default"
                    value={bloodGroup}
                    id="bloodGroup"
                    // value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="post-input-field text-base font-medium w-full"
                    // required
                  >
                    <option disabled value="">
                      Select bloodGroup
                    </option>
                    <option value="ABPositive">AB+</option>
                    <option value="APositive">A+</option>
                    <option value="BPositive">B+</option>
                    <option value="OPositive">O+</option>
                    <option value="ABNegative">AB-</option>
                    <option value="ANegative">A-</option>
                    <option value="BNegative">B-</option>
                    <option value="ONegative">O-</option>
                  </select>
                  {fieldErrors.bloodGroup && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.bloodGroup}
                    </p>
                  )}
                </div>
                {/* phone_number */}

                <div className="relative w-full">
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="number"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="primary_number" className="post-input-label">
                    Phone No:*
                  </label>
                  {fieldErrors.phone_number && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.phone_number}
                    </p>
                  )}
                </div>
                {/* alternative_phone_number */}

                <div className="relative w-full">
                  <input
                    id="alternative_phone_number"
                    name="alternative_phone_number"
                    type="number"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                  />
                  <label
                    htmlFor="alternative_phone_number"
                    className="post-input-label"
                  >
                    Alternative Phone No:* (optional)
                  </label>
                  {fieldErrors.alternative_phone_number && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.alternative_phone_number}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative w-full">
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="user_email" className="post-input-label">
                    Email:*
                  </label>
                  {fieldErrors.user_email && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.user_email}
                    </p>
                  )}
                </div>

                {/* Whatsapp */}
                <div className="relative w-full">
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="text"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="whatsapp" className="post-input-label">
                    Whatsapp No:*
                  </label>
                  {fieldErrors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.whatsapp}
                    </p>
                  )}
                </div>
                {/* Messenger */}
                <div className="relative w-full">
                  <input
                    id="messenger"
                    name="messenger"
                    type="text"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                  />
                  <label htmlFor="messenger" className="post-input-label">
                    messenger user name:*
                  </label>
                  {/* {fieldErrors.name && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.name}
                    </p>
                  )} */}
                </div>

                {/* Address */}

                <div className="relative w-full">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="address" className="post-input-label">
                    Address:*
                  </label>
                  {fieldErrors.address && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.address}
                    </p>
                  )}
                </div>

                {/* Nationality */}
                <div className="relative w-full">
                  <input
                    id="nationality"
                    name="nationality"
                    type="text"
                    placeholder=" "
                    value="Bangladeshi"
                    className="post-input-field w-full input-peer"
                    readOnly
                  />
                  <label htmlFor="nationality" className="post-input-label">
                    Nationality:*
                  </label>
                </div>

                {/* <div></div> */}
                {/* password */}

                <div className="relative w-full">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="password" className="post-input-label">
                    Password:*
                  </label>
                  {fieldErrors.password && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {/* Re-Password */}
                <div className="relative w-full">
                  <input
                    id="re_password"
                    name="re_password"
                    type="text"
                    placeholder=" "
                    className="post-input-field w-full input-peer"
                    // required
                  />
                  <label htmlFor="re_password" className="post-input-label">
                    Re-Password:*
                  </label>
                  {fieldErrors.re_password && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.re_password}
                    </p>
                  )}
                </div>

                {/* user District or Division */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">Division:*</label>
                  {/* District select dropdown */}
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      const selectedDistrictId = e.target.value; // Get the district ID from the option value
                      setSelectedDistrict(selectedDistrictId); // Set the district ID for filtering upazilas

                      const selectedDistrictObj = district?.find(
                        (d) => d.id === selectedDistrictId
                      );
                      setSelectedDistrictName(selectedDistrictObj?.name || ""); // Store the district name in a separate state

                      setSelectedUpazila(""); // Reset selected upazila when district changes
                    }}
                    className="post-input-field text-lg md:text-xl font-medium"
                    // required
                  >
                    <option disabled value="">
                      Select District
                    </option>
                    {/* <option value="All">All</option> */}
                    {district?.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.district && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.district}
                    </p>
                  )}
                </div>
                {/* user upazila or Area */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">Area:*</label>
                  {/* Upazila select dropdown */}
                  <select
                    // defaultValue="default"
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="post-input-field text-lg md:text-xl font-medium"
                    disabled={!selectedDistrict} // Disable upazila dropdown until district is selected
                    // required
                  >
                    <option disabled value="">
                      Select Upazila
                    </option>
                    {/* <option value="All">All</option> */}
                    {filteredUpazilas.map((data) => (
                      <option key={data.id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Religion */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">Religion:*</label>
                  <div className="flex flex-wrap gap- text-center text-base md:text-xl font-semibold">
                    {userReligiousStatus?.map((status, ind) => (
                      <div
                        key={ind}
                        className="text-xl flex flex-row-reverse items-center gap-[6px]"
                      >
                        <label
                          htmlFor={status.id}
                          className="font-semibold text-base md:text-lg text-black pr-5"
                        >
                          {status.label}
                        </label>
                        <input
                          onChange={() => setUserReligious(status.id)}
                          checked={userReligious === status.id}
                          className="input-radio p-border"
                          style={{
                            backgroundColor:
                              userReligious === status.label
                                ? "#87986A"
                                : "#FFFFFF",
                          }}
                          type="radio"
                          id={status.id}
                          name="religious"
                          value={status.id}
                          // required
                        />
                      </div>
                    ))}
                  </div>

                  {fieldErrors.religious && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.religious}
                    </p>
                  )}
                </div>
                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">Gender:*</label>
                  <div className="flex flex-wrap gap- text-center text-base md:text-xl font-semibold">
                    {usersGender?.map((status, ind) => (
                      <div
                        key={ind}
                        className="text-xl flex flex-row-reverse items-center gap-[6px]"
                      >
                        <label
                          htmlFor={status.id}
                          className="font-semibold text-base md:text-lg text-black pr-5"
                        >
                          {status.label}
                        </label>
                        <input
                          onChange={() => setUserGender(status.id)}
                          checked={userGender === status.id}
                          className="input-radio p-border"
                          style={{
                            backgroundColor:
                              userGender === status.label
                                ? "#87986A"
                                : "#FFFFFF",
                          }}
                          type="radio"
                          id={status.id}
                          name="active_status"
                          value={status.id}
                          // required
                        />
                      </div>
                    ))}
                  </div>
                  {fieldErrors.userGender && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.userGender}
                    </p>
                  )}
                  {/* {fieldErrors.userReligious && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.userReligious}
                    </p>
                  )} */}
                </div>
                {/* Able to Donate Now: */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">
                    Able to Donate Now:*
                  </label>
                  <div className="flex flex-wrap gap- text-center text-base md:text-xl font-semibold">
                    {activeStatus?.map((status, ind) => (
                      <div
                        key={ind}
                        className="text-xl flex flex-row-reverse items-center gap-[6px]"
                      >
                        <label
                          htmlFor={status.id}
                          className="font-semibold text-base md:text-lg text-black pr-5"
                        >
                          {status.label}
                        </label>
                        <input
                          onChange={() => setUserActiveStatus(status.id)}
                          checked={userActiveStatus === status.id}
                          className="input-radio p-border"
                          style={{
                            backgroundColor:
                              userActiveStatus === status.label
                                ? "#87986A"
                                : "#FFFFFF",
                          }}
                          type="radio"
                          id={status.id}
                          name="active_status"
                          value={status.id}
                          // required
                        />
                      </div>
                    ))}
                  </div>
                  {fieldErrors.activeStatus && (
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {fieldErrors.activeStatus}
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-auto rounded-md w-full text-center mt-8 mb-3 overflow-hidden">
                <button
                  type="submit"
                  className="btn- w-full hover:rounded-md transition-all hover:scale-105 text-[#97A97C text-white bg-[#87986A] py-1 text-xl font-semibold"
                >
                  {isLoading ? "loading..." : "Submit"}
                </button>
              </div>
              {/* <button className="btn-b w-full text-[#87986A] bg-[#97A97C] py-3 text-xl font-semibold mt-4">Submit</button> */}
            </form>
            <p>{errorMessage}</p>
            {/* <p>
                  {userActiveStatus} {userMaritalStatus} {userReligious}
                  {bloodGroup}
                </p> */}
          </div>
        </div>
      </div>
    </MyContainer>
  );
};

export default RegistrationPage;
