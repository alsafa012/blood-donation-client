import { memo } from "react";

const RegionDropdown = ({ religious, onChange, css }) => {
  // console.log("RegionDropdown rendered");
  return (
    <div className="">
      <select
        value={religious}
        onChange={onChange}
        className={`${css} text-sm md:text-base font-medium w-full`}
        required
      >
        <option disabled value="">
          Select Religious
        </option>
        <option value="Islam">Islam</option>
        <option value="Hindu">Hindu</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
};

export default memo(RegionDropdown);
