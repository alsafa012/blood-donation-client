import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const AvailableDonorPage = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams", searchParams);
  const [bloodGroup, setBloodGroup] = useState("");
  const [userReligious, setUserReligious] = useState("");
  const [division, setDivision] = useState("");
  const [availableDonor, setAvailableDonor] = useState([]);
  console.log("availableDonor", availableDonor);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {};

        // Add only non-empty filters to the params
        if (bloodGroup) params.blood = bloodGroup;
        if (userReligious) params.religious = userReligious;
        if (division) params.division = division;

        // Update the search params in the URL, only including non-empty values
        setSearchParams(params);

        // Navigate to the URL with updated query params
        navigate({
          pathname: "/availableDonors",
          search: new URLSearchParams(params).toString(), // Convert params to query string
        });
        const response = await fetch(
          `http://localhost:5000/available-donor?blood=${bloodGroup}&religious=${userReligious}&division=${division}`
        );
        const data = await response.json();
        setAvailableDonor(data); // Update state with fetched users based on filters
        // console.log("Data received:", data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [bloodGroup, division, userReligious, navigate, setSearchParams]);

  // const handleSearch = () => {
  //   const params = {};
  //   console.log("params",params);
  //   if (bloodGroup) params.blood = bloodGroup;
  //   if (userReligious) params.religious = userReligious;
  //   if (division) params.division = division;

  //   // Update the search params in the URL
  //   setSearchParams(params);

  //   // Navigate to the URL with updated query params
  //   navigate({
  //     pathname: "/availableDonors",
  //     search: `?blood=${bloodGroup}&religious=${userReligious}&division=${division}`,
  //   });
  // };

  const handleSearch = () => {
    const params = {};

    // Add only non-empty filters to the params
    if (bloodGroup) params.blood = bloodGroup;
    if (userReligious) params.religious = userReligious;
    if (division) params.division = division;

    // Update the search params in the URL, only including non-empty values
    setSearchParams(params);

    // Navigate to the URL with updated query params
    navigate({
      pathname: "/availableDonors",
      search: new URLSearchParams(params).toString(), // Convert params to query string
    });
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:5000/users")
      .then((res) => console.log(res.data));
  };

  return (
    <MyContainer>
      {/* filter section */}
      <h1>
        {bloodGroup} {userReligious}
      </h1>
      <div className=" flex justify-center gap-5 my-5">
        {/* blood group */}
        <select
          defaultValue="default"
          id="bloodGroup"
          // value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="input-field text-lg md:text-xl font-medium"
        >
          <option disabled value="default">
            Select bloodGroup
          </option>
          <option value="All">All</option>
          <option value="ABPositive">AB+</option>
          <option value="APositive">A+</option>
          <option value="BPositive">B+</option>
          <option value="OPositive">O+</option>
          <option value="ABNegative">AB-</option>
          <option value="ANegative">A-</option>
          <option value="BNegative">B-</option>
          <option value="ONegative">O-</option>
        </select>
        {/* filter by Region */}
        <select
          defaultValue="default"
          id="region"
          // value={bloodGroup}
          onChange={(e) => setUserReligious(e.target.value)}
          className="input-field text-lg md:text-xl font-medium"
        >
          <option disabled value="default">
            Select Region
          </option>
          <option value="All">All</option>
          <option value="islam">Islam</option>
          <option value="hindu">Hindu</option>
          <option value="others">others</option>
        </select>
        {/* filter by division */}
        <select
          defaultValue="default"
          id="division"
          // value={bloodGroup}
          onChange={(e) => setDivision(e.target.value)}
          className="input-field text-lg md:text-xl font-medium"
        >
          <option disabled value="default">
            Select division
          </option>
          <option value="All">All</option>
          <option value="dhaka">dhaka</option>
          <option value="barishal">Barishal</option>
          <option value="khulna">khulna</option>
        </select>
        <button
          onClick={handleSearch}
          className="btn-bg rounded-md px-[1rem] py-[0.5rem]"
        >
          Search
        </button>
        <button onClick={handleDelete} className="btn btn-primary">
          Delete
        </button>
      </div>

      {availableDonor.length > 100 ? (
        <div>Select</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 my-5 px-1">
          {/* show searchable data */}

          {/* {[1,2,3,4,5,6,7,8,9,10]?.map((info) => ( */}
          {availableDonor?.map((info) => (
            <div
              className="p-border overflow-hidden rounded-md group"
              key={info._id}
            >
              <div className="overflow-hidden h-[200px] w-full">
                <img
                  className="h-[200px] w-full group-hover:scale-105 transition-transform duration-300"
                  src={info?.user_image}
                  alt="user_image"
                />
              </div>

              <div className="p-2">
                <p className="text-lg md:text-lg font-medium">
                  {info?.user_name}
                </p>
                {/* <p className="text-lg md:text-lg font-medium">{info?.user_age}</p> */}
                <p className="text-lg md:text-lg font-medium">
                  {info?.bloodGroup}
                </p>
              </div>
              <Link to={`/availableDonors/${info._id}`}>
                <button className="btn-bg py-2 w-full">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </MyContainer>
  );
};

export default AvailableDonorPage;

// import React, { useEffect, useState } from "react";

// // const district = [
// //   { id: "1", division_id: "1", name: "Comilla", bn_name: "কুমিল্লা" },
// //   { id: "2", division_id: "1", name: "Feni", bn_name: "ফেনী" },
// //   {
// //     id: "3",
// //     division_id: "1",
// //     name: "Brahmanbaria",
// //     bn_name: "ব্রাহ্মণবাড়িয়া",
// //   },
// //   { id: "4", division_id: "1", name: "Rangamati", bn_name: "রাঙ্গামাটি" },
// //   { id: "5", division_id: "1", name: "Noakhali", bn_name: "নোয়াখালী" },
// //   { id: "6", division_id: "1", name: "Chandpur", bn_name: "চাঁদপুর" },
// // ];

// // const upazila = [
// //   {
// //     id: "1",
// //     district_id: "1",
// //     name: "Debidwar",
// //     bn_name: "দেবিদ্বার",
// //     url: "debidwar.comilla.gov.bd",
// //   },
// //   {
// //     id: "2",
// //     district_id: "1",
// //     name: "Barura",
// //     bn_name: "বরুড়া",
// //     url: "barura.comilla.gov.bd",
// //   },
// //   {
// //     id: "3",
// //     district_id: "1",
// //     name: "Brahmanpara",
// //     bn_name: "ব্রাহ্মণপাড়া",
// //     url: "brahmanpara.comilla.gov.bd",
// //   },
// //   {
// //     id: "4",
// //     district_id: "1",
// //     name: "Chandina",
// //     bn_name: "চান্দিনা",
// //     url: "chandina.comilla.gov.bd",
// //   },
// //   {
// //     id: "18",
// //     district_id: "2",
// //     name: "Chhagalnaiya",
// //     bn_name: "ছাগলনাইয়া",
// //     url: "chhagalnaiya.feni.gov.bd",
// //   },
// //   {
// //     id: "19",
// //     district_id: "2",
// //     name: "Feni Sadar",
// //     bn_name: "ফেনী সদর",
// //     url: "sadar.feni.gov.bd",
// //   },
// //   {
// //     id: "27",
// //     district_id: "3",
// //     name: "Sarail",
// //     bn_name: "সরাইল",
// //     url: "sarail.brahmanbaria.gov.bd",
// //   },
// //   {
// //     id: "28",
// //     district_id: "3",
// //     name: "Ashuganj",
// //     bn_name: "আশুগঞ্জ",
// //     url: "ashuganj.brahmanbaria.gov.bd",
// //   },
// //   {
// //     id: "41",
// //     district_id: "4",
// //     name: "Juraichari",
// //     bn_name: "জুরাছড়ি",
// //     url: "juraichari.rangamati.gov.bd",
// //   },
// //   {
// //     id: "42",
// //     district_id: "4",
// //     name: "Naniarchar",
// //     bn_name: "নানিয়ারচর",
// //     url: "naniarchar.rangamati.gov.bd",
// //   },
// //   {
// //     id: "43",
// //     district_id: "5",
// //     name: "Noakhali Sadar",
// //     bn_name: "নোয়াখালী সদর",
// //     url: "sadar.noakhali.gov.bd",
// //   },
// // ];

// const AvailableDonorPage = () => {
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedUpazila, setSelectedUpazila] = useState("");
//   const [district, setDistrict] = useState([]);
//   const [upazila, setUpazila] = useState([]);
//   useEffect(() => {
//     fetch("./district.json")
//       .then((res) => res.json())
//       .then((data) => setDistrict(data));
//   }, []);
//   useEffect(() => {
//     fetch("./upazila.json")
//       .then((res) => res.json())
//       .then((data) => setUpazila(data));
//   }, []);
//   // Filter Upazilas based on the selected district
//   const filteredUpazilas = upazila?.filter(
//     (upz) => upz.district_id === selectedDistrict
//   );

//   return (
//     <div>
//       <p>Selected District ID: {selectedDistrict}</p>
//       <p>Selected Upazila: {selectedUpazila}</p>

//       {/* District select dropdown */}
//       <select
//         defaultValue="default"
//         onChange={(e) => {
//           setSelectedDistrict(e.target.value); // Set selected district's id
//           setSelectedUpazila(""); // Reset selected upazila when district changes
//         }}
//         className="input-field text-lg md:text-xl font-medium"
//       >
//         <option disabled value="default">
//           Select District
//         </option>
//         <option value="All">All</option>
//         {district.map((data) => (
//           <option key={data.id} value={data.id}>
//             {data.name}
//           </option>
//         ))}
//       </select>

//       {/* Upazila select dropdown */}
//       <select
//         defaultValue="default"
//         onChange={(e) => setSelectedUpazila(e.target.value)}
//         className="input-field text-lg md:text-xl font-medium"
//         disabled={!selectedDistrict} // Disable upazila dropdown until district is selected
//       >
//         <option disabled value="default">
//           Select Upazila
//         </option>
//         <option value="All">All</option>
//         {filteredUpazilas.map((data) => (
//           <option key={data.id} value={data.name}>
//             {data.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default AvailableDonorPage;
