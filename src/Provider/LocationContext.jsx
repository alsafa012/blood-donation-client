import { createContext, useState } from "react";

// Create the context
export const LocationContext = createContext(null);

// Create the provider component
export const AddressProvider = ({ children }) => {
  const district = [
    { id: "1", division_id: "1", name: "Dhaka", bn_name: "কুমিল্লা" },
    { id: "2", division_id: "1", name: "Feni", bn_name: "ফেনী" },
  ];

  const upazila = [
    { id: "1", district_id: "1", name: "Mohammadpur", bn_name: "দেবিদ্বার" },
    { id: "2", district_id: "1", name: "Dhanmondi", bn_name: "বরুড়া" },
    { id: "3", district_id: "1", name: "Shankar", bn_name: "ব্রাহ্মণপাড়া" },
    { id: "4", district_id: "1", name: "Banani", bn_name: "চান্দিনা" },
    { id: "18", district_id: "2", name: "Chhagalnaiya", bn_name: "ছাগলনাইয়া" },
    { id: "19", district_id: "2", name: "Feni Sadar", bn_name: "ফেনী সদর" },
  ];

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchUpazila, setSearchUpazila] = useState("");
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openUpazila, setOpenUpazila] = useState(false);
  const [selectedDistrictName, setSelectedDistrictName] = useState("");

  // Function to set the district and district name together
  const handleDistrictChange = (districtId) => {
    const districtObj = district.find((d) => d.id === districtId);
    setSelectedDistrict(districtId);
    setSelectedDistrictName(districtObj ? districtObj.name : ""); // Set the district name
    setOpenDistrict(false); // Close district dropdown
    setSelectedUpazila(""); // Reset upazila when district changes
  };

  return (
    <LocationContext.Provider
      value={{
        district,
        upazila,
        selectedDistrict,
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
        handleDistrictChange,
        selectedDistrictName,
        setSelectedDistrictName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the LocationContext
// export const useLocationContext = () => useContext(LocationContext);
