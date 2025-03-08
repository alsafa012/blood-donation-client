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
const maritalStatusOptions = [
  { id: "Single", label: "Single" },
  { id: "Married", label: "Married" },
  { id: "Divorced", label: "Divorced" },
  { id: "Widowed", label: "Widowed" },
  { id: "Separated", label: "Separated" },
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
  const [userMaritalStatus, setUserMaritalStatus] = useState("");
  const [userReligious, setUserReligious] = useState("");
  const [userActiveStatus, setUserActiveStatus] = useState("");
  const [userGender, setUserGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  // console.log(userMaritalStatus.toLowerCase());
  // console.log(userReligious);
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
    const user_email = form.user_email.value;
    const whatsapp = form.whatsapp.value || "";
    const messenger = form.messenger.value || "";
    const nationality = "Bangladeshi";
    const address = form.address.value;
    const password = form.password.value;
    const re_password = form.re_password.value;
    let photoUrl = "https://i.ibb.co/mtL872C/image.png"; // Default profile image

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

      // Creating a new user
      const result = await createUser(user_email, password);
      console.log(result?.user);

      // Updating user profile
      await updateUserProfile(name, photoUrl);

      const userInfo = {
        user_name: name,
        user_age: age,
        bloodGroup: bloodGroup,
        phone_number: phone_number,
        user_email: user_email,
        user_whatsapp: whatsapp,
        user_messenger: messenger,
        user_nationality: nationality,
        user_address: address,
        user_activeStatus: userActiveStatus === "Yes" ? "active" : "inactive",
        user_maritalStatus: userMaritalStatus.toLowerCase(),
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
      };
      console.log(userInfo);
      const response = await axiosPublic.post("/users", userInfo, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.insertedId) {
        console.log("User added successfully in the database");
        Swal.fire("Good job!", "User created successfully", "success");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MyContainer>
      <div className="min-h-screen bg-[url('https://st2.depositphotos.com/3643473/5841/i/450/depositphotos_58411043-stock-photo-old-key-with-hope-sign.jpg')] bg-no-repeat bg-cover">
        <WebsiteTitle name={"রক্তযোদ্ধা || Registration"} />
        <div className="backdrop-blur-xl h-full min-h-screen py-5 w-full">
          <div className="p-border rounded-md min-h-screen w-[99%] md:w-[80%] lg:w-[65%] pt-2 mx-auto backdrop-blur-xl px-1 md:px-10">
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
              <div className="flex gap-2 text-center justify-center pt-5 pb-3">
                <h1>Already have an account?</h1>
                <Link to={"/login"} className="text-[#87986A] hover:underline">
                  login here
                </Link>
              </div>
              {/* ----------- */}
              <div className="flex flex-col gap-2">
                {/* Name */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Name:*</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>
                {/* age */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Age:*</label>
                  <input
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>
                {/* Blood Group:* */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">
                    Blood Group:*
                  </label>
                  <select
                    // defaultValue="default"
                    value={bloodGroup}
                    id="bloodGroup"
                    // value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="input-field text-base font-medium"
                    required
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
                </div>
                {/* phone_number */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Phone No:*</label>
                  <input
                    name="phone_number"
                    type="number"
                    placeholder="Enter your Phone No"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>
                {/* Email */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Email:*</label>
                  <input
                    name="user_email"
                    type="email"
                    placeholder="Enter your email"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>
                {/* Whatsapp */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">
                    Whatsapp user name:*
                  </label>
                  <input
                    name="whatsapp"
                    type="text"
                    placeholder="Enter your whatsapp user name"
                    className="input-field text-base font-medium"
                  />
                </div>
                {/* Messenger */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">
                    Messenger user name:*
                  </label>
                  <input
                    name="messenger"
                    type="text"
                    placeholder="Enter your messenger user name"
                    className="input-field text-base font-medium"
                  />
                </div>
                {/* Nationality */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">
                    Nationality:*
                  </label>
                  <input
                    name="nationality"
                    value="Bangladesh"
                    type="text"
                    className="input-field text-base font-medium"
                    readOnly
                  />
                </div>
                {/* Address */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Address:*</label>
                  <input
                    name="address"
                    placeholder="Enter your address"
                    type="text"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>
                {/* Password */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Password:*</label>
                  <input
                    name="password"
                    type="text"
                    placeholder="Enter your password"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>
                {/* Re-Password */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">
                    Re-Password:*
                  </label>
                  <input
                    name="re_password"
                    type="text"
                    placeholder="Re-Enter your password"
                    className="input-field text-base font-medium"
                    required
                  />
                </div>

                {/* user District or Division */}
                <div className="grid grid-cols-2 gap-2">
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
                    className="input-field text-lg md:text-xl font-medium"
                    required
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
                </div>
                {/* user upazila or Area */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">Area:*</label>
                  {/* Upazila select dropdown */}
                  <select
                    // defaultValue="default"
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="input-field text-lg md:text-xl font-medium"
                    disabled={!selectedDistrict} // Disable upazila dropdown until district is selected
                    required
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

                {/* Marital Status */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base font-semibold">
                    Marital Status:*
                  </label>
                  <div className="flex flex-wrap gap text-center text-base md:text-xl font-semibold">
                    {maritalStatusOptions?.map((status, ind) => (
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
                          onChange={() => setUserMaritalStatus(status.id)}
                          checked={userMaritalStatus === status.id}
                          className="input-radio"
                          style={{
                            backgroundColor:
                              userMaritalStatus === status.label
                                ? "#87986A"
                                : "#FFFFFF",
                          }}
                          type="radio"
                          id={status.id}
                          name="maritalStatus"
                          value={status.id}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Religion */}
                <div className="grid grid-cols-2 gap-2">
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
                          className="input-radio"
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
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Gender */}
                <div className="grid grid-cols-2 gap-2">
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
                          className="input-radio"
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
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Able to Donate Now: */}
                <div className="grid grid-cols-2 gap-2">
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
                          className="input-radio"
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
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full text-center pt-8 pb-3 overflow-hidden">
                <button
                  type="submit"
                  className="btn- w-[65%] hover:rounded-xl transition-all hover:scale-105 rounded-xl text-[#97A97C text-white bg-[#87986A] py-2 text-xl font-semibold"
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
