import { useContext, useState } from "react";
import { LocationContext } from "../../Provider/LocationContext";

const DistrictDropdown = ({
  selectedDistrict,
  setSelectedDistrict,
  searchDistrict,
  setSearchDistrict,
  district,
  openDistrict,
  setOpenDistrict,
}) => {
  const { setSelectedUpazila } = useContext(LocationContext);
  // Filter districts based on search query
  const filteredDistricts = district?.filter((d) =>
    d.name.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  // Handle District selection
  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setOpenDistrict(false); // Close district dropdown after selection
    setSelectedUpazila("");
  };
  const handleInputChange = (e) => {
    setSearchDistrict(e.target.value); // Update the search term
  };
  return (
    <div className="relative">
      <div className="relative w-full">
        <input
          onClick={() => setOpenDistrict(!openDistrict)}
          className="post-input-field w-full input-peer cursor-pointer"
          id="district"
          placeholder=" "
          value={
            filteredDistricts.find((d) => d.id === selectedDistrict)?.name || ""
          }
          // value={filteredDistricts.find((d) => d.id === selectedDistrict)?.name}
        />
        <label htmlFor="district" className="post-input-label">
          District
        </label>
      </div>
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
            // onChange={(e) => setSearchDistrict(e.target.value)}
            onChange={handleInputChange}
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
  );
};

export default DistrictDropdown;
