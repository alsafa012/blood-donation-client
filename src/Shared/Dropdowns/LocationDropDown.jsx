import { useState } from "react";

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

const LocationDropDown = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [searchDistrict, setSearchDistrict] = useState(""); // Search input for districts
  const [searchUpazila, setSearchUpazila] = useState(""); // Search input for upazilas
  const [openDistrict, setOpenDistrict] = useState(false);
  const [openUpazila, setOpenUpazila] = useState(false);

  // Filter districts based on search query
  const filteredDistricts = district.filter((d) =>
    d.name.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  // Filter upazilas based on selected district and search query
  const filteredUpazilas = selectedDistrict
    ? upazila
        .filter((upz) => upz.district_id === selectedDistrict)
        .filter((upz) =>
          upz.name.toLowerCase().includes(searchUpazila.toLowerCase())
        )
    : [];

  // Handle District selection
  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedUpazila(""); // Reset upazila when district changes
    setOpenDistrict(false); // Close district dropdown after selection
  };

  // Handle Upazila selection
  const handleUpazilaChange = (upazilaName) => {
    setSelectedUpazila(upazilaName);
    setOpenUpazila(false); // Close upazila dropdown after selection
  };
  return (
    <div className="min-h-60 border flex flex-col gap-5 w-[60%] mx-auto p-5">
      {/* User District or Division */}
      <div className="grid grid-cols-2 gap-2">
        <label className="text-base md:text-xl font-semibold">Division:*</label>
        {/* District select dropdown */}
        <div className="relative border border-yellow-300">
          <p
            onClick={() => setOpenDistrict(!openDistrict)}
            className="p-2 h-8 border border-red-600 cursor-pointer"
          >
            {selectedDistrict
              ? filteredDistricts.find((d) => d.id === selectedDistrict)?.name
              : "Select District"}
          </p>
          {/* Dropdown content */}
          <div
            className={`bg-gray-200 absolute z-10 w-full top-8 border border-green-400 right-0 h-32 max-h-32 overflow-y-auto ${
              openDistrict ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col">
              {/* Search input for district */}
              <input
                className="h-[40px] p-2 border border-purple-500"
                type="text"
                placeholder="Search District"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
              />
              {/* District content */}
              <div className="overflow-y-auto">
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((data) => (
                    <p
                      key={data.id}
                      className="p-2 hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleDistrictChange(data.id)}
                    >
                      {data.name}
                    </p>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No districts found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Upazila */}
      <div className="grid grid-cols-2 gap-2">
        <label className="text-base md:text-xl font-semibold">Area:*</label>
        {/* Upazila select dropdown */}
        <div className="relative border border-yellow-300">
          <p
            onClick={() => setOpenUpazila(!openUpazila)}
            className="p-2 h-8 border border-red-600 cursor-pointer"
          >
            {selectedUpazila || "Select Upazila"}
          </p>
          {/* Dropdown content */}
          <div
            className={`bg-gray-200 absolute z-10 w-full top-8 border border-green-400 right-0 h-32 max-h-32 overflow-y-auto ${
              openUpazila ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col">
              {/* Search input for upazilas */}
              <input
                className="h-[40px] p-2 border border-purple-500"
                type="text"
                placeholder="Search Upazila"
                value={searchUpazila}
                onChange={(e) => setSearchUpazila(e.target.value)}
              />
              {/* Upazila content */}
              <div className="overflow-y-auto">
                {filteredUpazilas.length > 0 ? (
                  filteredUpazilas.map((data) => (
                    <p
                      key={data.id}
                      className="p-2 hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleUpazilaChange(data.name)}
                    >
                      {data.name}
                    </p>
                  ))
                ) : (
                  <p className="p-2 text-gray-500">No upazilas found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDropDown;
