import { useState } from "react";

const UpazilaDropdown = ({
  selectedDistrict,
  selectedUpazila,
  setSelectedUpazila,
  searchUpazila,
  setSearchUpazila,
  upazila,
  openUpazila,
  setOpenUpazila,
}) => {
  // Filter upazilas based on selected district and search query
  const filteredUpazilas = selectedDistrict
    ? upazila
        .filter((upz) => upz.district_id === selectedDistrict)
        .filter((upz) =>
          upz.name.toLowerCase().includes(searchUpazila.toLowerCase())
        )
    : [];

  // Handle Upazila selection
  const handleUpazilaChange = (upazilaName) => {
    setSelectedUpazila(upazilaName);
    setOpenUpazila(false); // Close upazila dropdown after selection
  };

  return (
    <div className="relative">
      <div className="relative w-full">
        <input
          onClick={() => setOpenUpazila(!openUpazila)}
          className="post-input-field w-full input-peer cursor-pointer"
          id="upazila"
          disabled={!selectedDistrict} // Disable if no district is selected
          placeholder=" "
          value={selectedUpazila}
        />
        <label htmlFor="upazila" className="post-input-label">
          Upazila
        </label>
      </div>
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
  );
};

export default UpazilaDropdown;
