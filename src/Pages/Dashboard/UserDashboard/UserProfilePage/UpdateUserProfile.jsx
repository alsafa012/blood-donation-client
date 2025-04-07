import { useEffect, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import useAuth from "../../../../Components/hooks/useAuth";
import MyContainer from "../../../../Shared/MyContainer";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosPublic from "../../../../Components/hooks/useAxiosPublic";
const userReligiousStatus = [
  { id: "islam", label: "islam" },
  { id: "hindu", label: "hindu" },
  { id: "others", label: "others" },
];
const maritalStatusOptions = [
  { id: "single", label: "single" },
  { id: "married", label: "married" },
  { id: "divorced", label: "divorced" },
  { id: "widowed", label: "widowed" },
  { id: "separated", label: "separated" },
  // { id: "others", label: "others" },
];
const activeStatus = [
  { id: "Yes", label: "Yes" },
  { id: "No", label: "No" },
];
const usersGender = [
  { id: "Male", label: "Male" },
  { id: "Female", label: "Female" },
];
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
// console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateUserProfile = () => {
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const from = location.state || "/";
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const userInfo = useLoaderData();
  console.log(userInfo);
  const { user, updateUserProfile } = useAuth();
  const [errorMessage, setErrorMessage] = useState(false);

  const [userReligious, setUserReligious] = useState(
    userInfo?.user_religious || ""
  );
  const [userActiveStatus, setUserActiveStatus] = useState(
    userInfo?.user_activeStatus === "active" ? "Yes" : "No"
  );
  // console.log("userActiveStatus", userActiveStatus);
  const [bloodGroup, setBloodGroup] = useState(userInfo?.bloodGroup || "");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [userGender, setUserGender] = useState(userInfo?.user_gender || "");
  useEffect(() => {
    // Set the initial values based on userInfo
    if (userInfo) {
      const districtObj = district.find(
        (d) => d.name === userInfo.user_district
      );
      if (districtObj) {
        setSelectedDistrict(districtObj.id);
        setSelectedDistrictName(districtObj.name);
      }
      setSelectedUpazila(userInfo?.user_area);
    }
  }, [userInfo]);

  const filteredUpazilas = upazila.filter(
    (upz) => upz.district_id === selectedDistrict
  );
  // console.log("selectedDistrict", selectedDistrict);
  // console.log("selectedDistrictName", selectedDistrictName);
  // console.log("selectedUpazila", selectedUpazila);

  useEffect(() => {
    // Set initial image details when the component mounts
    setShowName(userInfo?.user_image);
    setShowImagePreview(userInfo?.user_image);
  }, [userInfo?.user_image]);
  // console.log("filteredUpazilas", filteredUpazilas);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      // logged user validation
      if (!user) {
        return Swal.fire({
          title: "Error!",
          text: "user already logged in",
          icon: "error",
        });
      }
      setIsLoading(true);
      const form = e.target;
      const name = form.name.value;
      const age = form.age.value;
      const phone_number = form.phone_number.value;
      const alternative_phone_number =
        form.alternative_phone_number.value || "";
      const user_email = form.user_email.value;
      const whatsapp = form.whatsapp.value;
      const messenger = form.messenger.value;
      const nationality = "Bangladeshi";
      const imageFile = { image: showName };
      const address = form.address.value;
      // const password = form.password.value;
      // const imageFile = { image: showName };
      // Check if an image is selected
      // console.log(userInfo);
      const response = await axios.post(image_hosting_api, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (
        !response.data ||
        !response.data.data ||
        !response.data.data.display_url
      ) {
        throw new Error("Failed to upload image or image URL is missing");
      }
      console.log(
        "Image uploaded successfully:",
        response?.data?.data.display_url
      );
      const userUpdatedInfo = {
        user_name: name,
        user_age: age,
        bloodGroup: bloodGroup,
        phone_number: phone_number,
        alternative_phone_number: alternative_phone_number,
        user_full_address: `${address}, ${selectedUpazila}, ${selectedDistrictName}`,
        user_email: user_email,
        user_whatsapp: whatsapp,
        user_messenger: messenger,
        user_nationality: nationality,
        user_activeStatus: userActiveStatus === "Yes" ? "active" : "inactive",
        user_religious: userReligious.toLowerCase(),
        user_district: selectedDistrictName,
        user_area: selectedUpazila,
        user_gender: userGender,
        user_address: address,
        // imageFile: imageFile,
        user_image: response?.data?.data.display_url || userInfo?.user_image,
        user_role: "donor",
        account_updated_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };
      console.log("userUpdatedInfo", userUpdatedInfo);
      const updateRes = await axiosPublic.put(`/users/${id}`, userUpdatedInfo);
      // console.log(updateRes.data);
      //   console.log("from database",contextRes.data);
      if (updateRes.data.modifiedCount > 0 || updateRes.data.acknowledged) {
        // setLoading(false);
        updateUserProfile(name, response?.data?.data.display_url);
        Swal.fire({
          title: "Good job!",
          text: "Profile successfully updated..",
          icon: "success",
        });
        setIsLoading(false);
        navigate(from, { replace: true });
      } else {
        throw new Error("Failed to update user profile");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
      setIsLoading(false);
    }
  };
  return (
    <MyContainer>
      <WebsiteTitle name={"রক্তযোদ্ধা || Profile Update Page"} />
      <div className="min-h-screen bg-[url('https://st2.depositphotos.com/3643473/5841/i/450/depositphotos_58411043-stock-photo-old-key-with-hope-sign.jpg')] bg-no-repeat bg-cover">
        <div className="backdrop-blur-xl h-full min-h-screen py-5 w-full">
          <div className="p-border rounded-md min-h-screen w-[99%] md:w-[80%] lg:w-[65%] pt-2 mx-auto backdrop-blur-xl px-1 md:px-10">
            <form onSubmit={handleUpdateStatus}>
              {/* Image */}
              <div className="">
                <div className="relative border rounded-full h-28 w-28 md:h-28 md:w-28 mx-auto overflow-hidde">
                  {showName?.name ? (
                    <img
                      className="h-28 w-28 md:h-28 md:w-28 object-cover rounded-full mx-auto"
                      src={showImagePreview}
                      alt={showName?.name}
                    />
                  ) : (
                    <img
                      className="h-28 w-28 md:h-28 md:w-28 object-cover border rounded-full mx-auto"
                      src={showName}
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
              {/* info div */}
              <div className="flex flex-col gap-5 mt-5">
                {/* Name */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Name:*
                  </label>
                  <input
                    defaultValue={userInfo?.user_name}
                    name="name"
                    type="text"
                    disabled={isLoading}
                    placeholder="Enter your name"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* age */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Age:*
                  </label>
                  <input
                    defaultValue={userInfo?.user_age}
                    name="age"
                    type="number"
                    disabled={isLoading}
                    placeholder="Enter your age"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* Blood Group:* */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Blood Group:*
                  </label>
                  <select
                    // defaultValue="default"
                    id="bloodGroup"
                    value={bloodGroup}
                    disabled={isLoading}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="input-field text-sm md:text-xl font-medium"
                  >
                    <option disabled value="default">
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
                  <label className="text-base md:text-xl font-semibold">
                    Phone No:*
                  </label>
                  <input
                    defaultValue={userInfo?.phone_number}
                    name="phone_number"
                    disabled={isLoading}
                    type="number"
                    placeholder="Enter your Phone No"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* alternative_phone_number */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Alternative Phone No:*
                  </label>
                  <input
                    defaultValue={userInfo?.alternative_phone_number}
                    name="alternative_phone_number"
                    disabled={isLoading}
                    type="number"
                    placeholder="Enter your Phone No"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* Email */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Email:*
                  </label>
                  <input
                    value={userInfo?.user_email}
                    name="user_email"
                    type="email"
                    disabled={isLoading}
                    placeholder="Enter your email"
                    className="input-field text-sm md:text-xl font-medium"
                    readOnly
                  />
                </div>
                {/* Whatsapp */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Whatsapp Number:*
                  </label>
                  <input
                    defaultValue={userInfo?.user_whatsapp}
                    name="whatsapp"
                    disabled={isLoading}
                    type="text"
                    placeholder="Enter your whatsapp number"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* Messenger */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Messenger user name:*
                  </label>
                  <input
                    defaultValue={userInfo?.user_messenger}
                    name="messenger"
                    disabled={isLoading}
                    type="text"
                    placeholder="Enter your messenger user name"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* address */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Address:*
                  </label>
                  <input
                    // defaultValue={userInfo?.user_nationality}
                    name="address"
                    disabled={isLoading}
                    defaultValue={userInfo?.user_address}
                    type="text"
                    className="input-field text-sm md:text-xl font-medium"
                  />
                </div>
                {/* nationality */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Nationality:*
                  </label>
                  <input
                    // defaultValue={userInfo?.user_nationality}
                    name="nationality"
                    disabled={isLoading}
                    value="Bangladesh"
                    type="text"
                    className="input-field text-sm md:text-xl font-medium"
                    readOnly
                  />
                </div>

                {/* user District or Division */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Division:*
                  </label>
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
                  >
                    <option disabled value="">
                      Select District
                    </option>
                    {district?.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* user upazila or Area */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Area:*
                  </label>
                  {/* Upazila select dropdown */}
                  <select
                    // defaultValue="default"
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="input-field text-lg md:text-xl font-medium"
                    disabled={!selectedDistrict} // Disable upazila dropdown until district is selected
                  >
                    <option disabled value="">
                      Select Upazila
                    </option>
                    {filteredUpazilas.map((data) => (
                      <option key={data.id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Religion */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Religion:*
                  </label>
                  <div className="flex flex-wrap gap- text-center text-base md:text-xl font-semibold capitalize">
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
                          disabled={isLoading}
                          className="input-radio first-letter:text-green-600"
                          style={{
                            backgroundColor:
                              userReligious === status.label
                                ? "#87986A"
                                : "#FFFFFF",
                          }}
                          type="radio"
                          id={status.id}
                          //   name and value given for if need to get selected values from form
                          name="religious"
                          value={status.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Gender */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Gender:*
                  </label>
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
                          disabled={isLoading}
                          value={status.id}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Able to Donate Now: */}
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-base md:text-xl font-semibold">
                    Able to Donate Now:*
                  </label>
                  <div className="flex flex-wrap gap text-center text-base md:text-xl font-semibold">
                    {activeStatus.map((status, ind) => (
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
                          onChange={() => setUserActiveStatus(status.label)}
                          checked={userActiveStatus === status.label}
                          className="input-radio"
                          type="radio"
                          disabled={isLoading}
                          id={status.id}
                          name="active_status"
                          value={status.label}
                          style={{
                            backgroundColor:
                              userActiveStatus === status.label
                                ? "#87986A"
                                : "#FFFFFF",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mx-auto w-full text-center pt-8 pb-3 overflow-hidden">
                <button
                  className="w-full w-[65% hover:rounded-xl transition-all hover:scale-105 rounded-xl text-[#97A97C text-white bg-[#87986A] py-2 text-sm                
                md:text-lg font-semibold"
                >
                  {isLoading ? "Updating please wait..." : "Update"}
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
export default UpdateUserProfile;
