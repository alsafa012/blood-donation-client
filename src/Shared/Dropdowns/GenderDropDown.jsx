import { memo } from "react";

const GenderDropDown = ({ gender, onChange, css }) => {
  // console.log("GenderDropDown rendered");
  return (
    <div className="">
      <select
        value={gender}
        onChange={onChange}
        className={`${css} text-sm font-medium w-full`}
        required
      >
        <option disabled value="">
          Select Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default memo(GenderDropDown);
