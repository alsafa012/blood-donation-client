import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { useEffect, useRef, useState } from "react";
import MyContainer from "../../Shared/MyContainer";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import LoadingAnimation from "../../Shared/LoadingAnimation";
import ShowDonorAsList from "./ShowDonorAsList";
import BloodGroupDropdown from "../../Shared/Dropdowns/BloodGroupDropdown";
import GenderDropDown from "../../Shared/Dropdowns/GenderDropDown";
import RegionDropdown from "../../Shared/Dropdowns/RegionDropdown";
import ShowDonorAsCard from "./ShowDonorAsCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import useLoggedUserInfo from "../../Components/hooks/useLoggedUserInfo";
import Swal from "sweetalert2";
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
// const fakeData = Array.from({ length: 55 }, (_, i) => ({
//   _id: `id${i + 1}`,
//   user_name: `User ${i + 1}`,
//   bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
//   phone_number: `01${Math.floor(100000000 + Math.random() * 900000000)}`,
//   user_religious: ["Islam", "Hinduism", "Christianity", "Buddhism"][i % 4],
//   user_gender: i % 2 === 0 ? "Male" : "Female",
// }));
const AvailableDonorPage = () => {
  const donorListRef = useRef();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  // const [changeUIDesign, setChangeUIDesign] = useState("card");
  // Check localStorage for saved design preference, default to 'card'
  const storedDesign = localStorage.getItem("UI_design") || "card";
  const [changeUIDesign, setChangeUIDesign] = useState(storedDesign);
  const [hide, setHide] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  // console.log("searchParams", searchParams);
  const [bloodGroup, setBloodGroup] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [userReligious, setUserReligious] = useState("");
  const [availableDonor, setAvailableDonor] = useState([]);
  const [division, setDivision] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [loggedUserInfo] = useLoggedUserInfo();
  // console.log("loggedUserInfo", loggedUserInfo);
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
          `https://blood-donation-server-ebon.vercel.app/available-donor?blood=${bloodGroup}&religious=${userReligious}&district=${selectedDistrictName}&area=${selectedUpazila}&gender=${selectedGender}`
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
          <td class="py-2 px-4">${info?.phone_number || ""}   ${
            info?.alternative_phone_number && ","
          } ${
            info?.alternative_phone_number && info?.alternative_phone_number
          }</td>
          <td class="py-2 px-4">${info?.user_religious || ""}</td>
          <td class="py-2 px-4">${info?.user_gender || ""}</td>
          <td class="py-2 px-4">${info?.user_full_address || ""}</td>
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

  // const availableDonorList = availableDonor?.map((email) => email.user_email);
  // console.log("availableDonorList", availableDonorList);

  const handleSendInstantEmail = (e) => {
    e.preventDefault();
    // Check if blood group is selected
    if (!bloodGroup) {
      return Swal.fire({
        title: "Error!",
        text: "Please select a blood group before sending emails.",
        icon: "error",
      });
    }

    // Filter donors by the selected blood group
    // const filteredDonors = availableDonor?.filter(
    //   (donor) => donor.user_bloodGroup === bloodGroup
    // );

    // // If no donors found for that group
    // if (!filteredDonors || filteredDonors.length === 0) {
    //   return Swal.fire({
    //     title: "No Donors Found!",
    //     text: `No available donors with blood group ${bloodGroup}.`,
    //     icon: "warning",
    //   });
    // }

    // Extract emails from filtered donors
    const availableDonorList = availableDonor?.map((donor) => donor.user_email);
    const formData = {
      // email: [
      //   "alsafa012@gmail.com",
      //   "alsafa024@gmail.com",
      //   "rjridoy012@gmail.com",
      // ],
      email: availableDonorList,
      // subject: formInput.subject.value,
      body: `
        My name is ${loggedUserInfo?.user_name}.\n
        I need emergency ${bloodGroup} blood.

        If you can donate, please contact me via:
        📞 Phone: ${loggedUserInfo?.phone_number}
        📧 Email: ${loggedUserInfo?.user_email}
        💬 WhatsApp: ${loggedUserInfo?.user_whatsapp}
        💻 Messenger: ${loggedUserInfo?.user_messenger}
       
      `,
    };
    // console.log(formData);
    fetch("https://yourmailsender.pythonanywhere.com/send/mail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
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
      {/* filter section */}
      <div className="flex flex-col gap-3 mt-2 mb-3 px-1 md:px-2">
        {/* Sorted items */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          <select
            // defaultValue="default"
            value={changeUIDesign}
            id="bloodGroup"
            // value={bloodGroup}
            onChange={(e) => setChangeUIDesign(e.target.value)}
            // className="input-field text-sm font-medium"
            className="input-field-availabledonors font-medium w-full"
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
            css={"input-field-availabledonors"}
          />
          <GenderDropDown
            gender={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            css={"input-field-availabledonors"}
          />
          <RegionDropdown
            religious={userReligious}
            onChange={(e) => setUserReligious(e.target.value)}
            css={"input-field-availabledonors"}
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
            className="input-field-availabledonors text-sm font-medium"
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
            className="input-field-availabledonors text-sm font-medium"
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
        </div>
        {/* Actions button */}
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3">
          <button
            onClick={handleSearch}
            className="hidden btn-bg rounded-md px-[2px] md:px-3 text-[12px] py-[2px] md:py-1 flex justify-center items-center gap-[3px] md:gap-[2px]"
          >
            Search <FaSearch size={15} />
          </button>
          <button
            onClick={handleClearSearchText}
            className="btn-bg rounded-md px-[2px] md:px-3 text-[12px] py-[2px] md:py-1 flex justify-center items-center gap-[3px] md:gap-[2px]"
          >
            Clear All <MdClear size={15} />
          </button>
          <button
            onClick={handleDownload}
            className="btn-bg rounded-md px-[2px] md:px-3 text-[12px] py-[2px] md:py-1 flex justify-center items-center gap-[3px] md:gap-[2px]"
          >
            {hide ? "Downloading..." : "Download List"} <FaDownload size={15} />
          </button>
          <button
            onClick={handleSendInstantEmail}
            className="btn-bg rounded-md px-[2px] md:px-3 text-[12px] py-[2px] md:py-1 flex justify-center items-center gap-[3px] md:gap-[2px]"
          >
            Instant Request <FiSend size={15} />
          </button>
        </div>
        {/* <button onClick={handleDelete} className="btn btn-primary">
          Delete
        </button> */}
      </div>
      {/* ------- end of filter section --- */}
      <div className="h-[70vh] overflow-auto pb-2">
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
            location={location}
          />
        ) : (
          <ShowDonorAsCard
            ref={donorListRef}
            availableDonor={availableDonor}
            location={location}
          />
        )}
      </div>
    </MyContainer>
  );
};

export default AvailableDonorPage;
