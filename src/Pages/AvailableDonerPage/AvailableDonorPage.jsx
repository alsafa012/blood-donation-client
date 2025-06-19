import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { useEffect, useRef, useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import LoadingAnimation from "../../Shared/LoadingAnimation";
import ShowDonorAsList from "./ShowDonorAsList";
import BloodGroupDropdown from "../../Shared/Dropdowns/BloodGroupDropdown";
import GenderDropDown from "../../Shared/Dropdowns/GenderDropDown";
import RegionDropdown from "../../Shared/Dropdowns/RegionDropdown";
import ShowDonorAsCard from "./ShowDonorAsCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
const fakeData = Array.from({ length: 55 }, (_, i) => ({
  _id: `id${i + 1}`,
  user_name: `User ${i + 1}`,
  bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
  phone_number: `01${Math.floor(100000000 + Math.random() * 900000000)}`,
  user_religious: ["Islam", "Hinduism", "Christianity", "Buddhism"][i % 4],
  user_gender: i % 2 === 0 ? "Male" : "Female",
}));
const AvailableDonorPage = () => {
  const donorListRef = useRef();
  // console.log(donorListRef);
  // console.log(donorListRef.current);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // const [changeUIDesign, setChangeUIDesign] = useState("card");
  // Check localStorage for saved design preference, default to 'card'
  const storedDesign = localStorage.getItem("UI_design") || "card";
  const [changeUIDesign, setChangeUIDesign] = useState(storedDesign);
  const [hide, setHide] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  console.log("searchParams", searchParams);
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [userReligious, setUserReligious] = useState("");
  const [availableDonor, setAvailableDonor] = useState([]);
  const [division, setDivision] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  // console.log(selectedDistrict);
  // console.log("selectedDistrictName", selectedDistrictName);
  // console.log("selectedDistrict", selectedUpazila);
  const filteredUpazilas = upazila?.filter(
    (upz) => upz.district_id === selectedDistrict
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {};

        // Add only non-empty filters to the params
        if (bloodGroup) params.blood = bloodGroup;
        if (userReligious) params.religious = userReligious;
        if (selectedGender) params.gender = selectedGender;
        if (selectedDistrictName) params.district = selectedDistrictName;
        if (selectedUpazila) params.area = selectedUpazila;
        // if (division) params.division = division;

        // Update the search params in the URL, only including non-empty values
        setSearchParams(params);

        // Navigate to the URL with updated query params
        navigate({
          pathname: "/availableDonors",
          search: new URLSearchParams(params).toString(), // Convert params to query string
        });
        const response = await fetch(
          `http://localhost:5000/available-donor?blood=${bloodGroup}&religious=${userReligious}&district=${selectedDistrictName}&area=${selectedUpazila}&gender=${selectedGender}`
        );
        const data = await response.json();
        setAvailableDonor(data); // Update state with fetched users based on filters
        setIsLoading(false);
        // console.log("Data received:", data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    bloodGroup,
    selectedDistrictName,
    selectedUpazila,
    userReligious,
    selectedGender,
    navigate,
    setSearchParams,
  ]);

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

  const handleClearSearchText = () => {
    setBloodGroup("");
    setUserReligious("");
    setSelectedGender("");
    setSelectedDistrictName("");
    setSelectedDistrict("");
    setSelectedUpazila("");
  };

  // const handleDelete = () => {
  //   axiosPublic.delete("/users").then((res) => console.log(res.data));
  // };

  // Update localStorage whenever changeUIDesign changes
  useEffect(() => {
    localStorage.setItem("UI_design", changeUIDesign);
  }, [changeUIDesign]);

  const fixOklchColors = () => {
    const elements = document.querySelectorAll("*");

    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);

      // Check for background-color
      const bgColor = computedStyle.backgroundColor;
      if (bgColor.includes("oklch")) {
        el.style.backgroundColor = "rgba(255, 255, 255, 0)"; // Fallback color

        // bg-[rgba(255,255,255,0.5)]
      }

      // Check for text color
      const textColor = computedStyle.color;
      if (textColor.includes("oklch")) {
        el.style.color = "rgba(0, 0, 0, 1)"; // Fallback color
      }

      // Check for border color
      const borderColor = computedStyle.borderColor;
      if (borderColor.includes("oklch")) {
        el.style.borderColor = "rgba(0, 0, 0, 1)"; // Fallback color
      }
    });
  };

  const handleDownload = async () => {
    const originalTable = document.getElementById("donor-list");
    if (!originalTable) {
      alert("Donor table not found!");
      return;
    }

    setHide(true);
    fixOklchColors();

    setTimeout(async () => {
      const donorsPerPage = 12;
      const totalPages = Math.ceil(availableDonor.length / donorsPerPage);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const start = pageIndex * donorsPerPage;
        const end = start + donorsPerPage;
        const pageData = availableDonor.slice(start, end);

        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        document.body.appendChild(tempContainer);

        const clonedTable = originalTable.cloneNode();
        const thead = originalTable.querySelector("thead")?.cloneNode(true);
        if (thead) clonedTable.appendChild(thead);

        const tbody = document.createElement("tbody");
        pageData.forEach((info, ind) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td class="py-2 px-4">${start + ind + 1}</td>
          <td class="py-2 px-4">${info?.user_name || ""}</td>
          <td class="py-2 px-4">${info?.bloodGroup || ""}</td>
          <td class="py-2 px-4">${info?.phone_number || ""}</td>
          <td class="py-2 px-4">${info?.user_religious || ""}</td>
          <td class="py-2 px-4">${info?.user_gender || ""}</td>
          <td class="py-2 px-4">${info?.user_address || ""}</td>
        `;
          tbody.appendChild(row);
        });

        clonedTable.appendChild(tbody);
        tempContainer.appendChild(clonedTable);

        const canvas = await html2canvas(clonedTable, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#fff",
        });

        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        document.body.removeChild(tempContainer);
      }

      pdf.save("donor_list.pdf");
      setHide(false);
    }, 1000);

    // setHide(false);
  };

  const handleInstantRequest = () => {
    alert("Functionality not ready");
    const getEmail = availableDonor?.map((email) => email.user_email);
    console.log("getEmail", getEmail);
  };

  // const handleDownload = async () => {
  //   setHide(true);
  //   fixOklchColors();

  //   // setInterval(() => {

  //     const donorsPerPage = 12;
  //     const totalPages = Math.ceil(availableDonor.length / donorsPerPage);
  //     const pdf = new jsPDF({
  //       orientation: "landscape",
  //       unit: "px",
  //       format: "a4",
  //     });

  //     const originalTable = document.getElementById("donor-list");

  //     for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
  //       // Slice data for this page
  //       const start = pageIndex * donorsPerPage;
  //       const end = start + donorsPerPage;
  //       const pageData = availableDonor.slice(start, end);

  //       // Create a temporary hidden container
  //       const tempContainer = document.createElement("div");
  //       tempContainer.style.position = "absolute";
  //       tempContainer.style.left = "-9999px";
  //       document.body.appendChild(tempContainer);

  //       // Clone the original table head
  //       const clonedTable = originalTable.cloneNode();
  //       const thead = originalTable.querySelector("thead").cloneNode(true);
  //       clonedTable.appendChild(thead);

  //       // Create and append tbody with current page's data
  //       const tbody = document.createElement("tbody");
  //       pageData.forEach((info, ind) => {
  //         const row = document.createElement("tr");
  //         row.innerHTML = `
  //           <td class="py-2 px-4">${start + ind + 1}</td>
  //           <td class="py-2 px-4">${info?.user_name || ""}</td>
  //           <td class="py-2 px-4">${info?.bloodGroup || ""}</td>
  //           <td class="py-2 px-4">${info?.phone_number || ""}</td>
  //           <td class="py-2 px-4">${info?.user_religious || ""}</td>
  //           <td class="py-2 px-4">${info?.user_gender || ""}</td>
  //           <td class="py-2 px-4">Address</td>
  //         `;
  //         tbody.appendChild(row);
  //       });

  //       clonedTable.appendChild(tbody);
  //       tempContainer.appendChild(clonedTable);

  //       // Convert to canvas and add to PDF
  //       const canvas = await html2canvas(clonedTable, {
  //         scale: 2,
  //         useCORS: true,
  //         allowTaint: true,
  //         backgroundColor: "#fff",
  //       });

  //       const imgData = canvas.toDataURL("image/png");
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //       if (pageIndex > 0) pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //       document.body.removeChild(tempContainer);
  //     }

  //     pdf.save("donor_list.pdf");
  //     setHide(false);
  //   // }, 1000);

  // };

  return (
    <MyContainer>
      <WebsiteTitle name={"রক্তযোদ্ধা || Available Donors"} />
      {/* <div
        className={`${hide ? "bg-yellow-300 z-10 absolute top-0 left-0 opacity-75 block" : "opacity-0 hidden"} h-screen`}
      ></div> */}
      {/* filter section */}
      <div className="flex flex-wrap justify-center gap-5 my-5">
        {/* blood group */}
        {/* <select
          // defaultValue="default"
          value={bloodGroup}
          id="bloodGroup"
          // value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="input-field text-sm md:text-base font-medium"
        >
          <option disabled value="">
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
        </select> */}

        <select
          // defaultValue="default"
          value={changeUIDesign}
          id="bloodGroup"
          // value={bloodGroup}
          onChange={(e) => setChangeUIDesign(e.target.value)}
          className="input-field text-sm font-medium"
        >
          <option disabled value="">
            Select UI
          </option>
          <option value="card">Card</option>
          <option value="list">List</option>
        </select>

        <BloodGroupDropdown
          blood={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          css={"input-field"}
        />
        <GenderDropDown
          gender={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          css={"input-field"}
        />
        <RegionDropdown
          religious={userReligious}
          onChange={(e) => setUserReligious(e.target.value)}
          css={"input-field"}
        />
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
          className="input-field text-sm font-medium"
        >
          <option disabled value="">
            Select District
          </option>
          <option value="All">All</option>
          {district.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        {/* Upazila select dropdown */}
        <select
          // defaultValue="default"
          value={selectedUpazila}
          onChange={(e) => setSelectedUpazila(e.target.value)}
          className="input-field text-sm font-medium"
          disabled={!selectedDistrict} // Disable upazila dropdown until district is selected
        >
          <option disabled value="">
            Select Upazila
          </option>
          <option value="All">All</option>
          {filteredUpazilas.map((data) => (
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="btn-bg rounded-md px-3 text-sm py-1"
        >
          Search
        </button>
        <button
          onClick={handleClearSearchText}
          className="btn-bg rounded-md px-3 text-sm py-1"
        >
          Clear
        </button>
        <button
          onClick={handleDownload}
          className="btn-bg rounded-md px-3 text-sm py-1"
        >
          {hide ? "Downloading..." : "Download List"}
        </button>

        <button
          onClick={handleInstantRequest}
          className="btn-bg rounded-md px-3 text-sm py-1"
        >
          Instant Request
        </button>
        {/* <button onClick={handleDelete} className="btn btn-primary">
          Delete
        </button> */}
      </div>
      <div className="h-[70vh] overflow-auto">
        {/* ------- end of filter section --- */}
        {availableDonor.length === 0 && !isLoading && (
          <div>
            <h1 className="text-center text-3xl font-semibold pt-10">
              No search result
            </h1>
          </div>
        )}
        {isLoading ? (
          <LoadingAnimation />
        ) : changeUIDesign === "list" ? (
          <ShowDonorAsList
            ref={donorListRef}
            donorList={availableDonor}
            hide={hide}
          />
        ) : (
          <ShowDonorAsCard ref={donorListRef} availableDonor={availableDonor} />
        )}
      </div>
    </MyContainer>
  );
};

export default AvailableDonorPage;
