import { memo } from "react";

const GenderDropDown = ({ value, onChange, css }) => {
  console.log("GenderDropDown rendered");
  return (
    <div className="">
      <select
        value={value}
        onChange={onChange}
        className={`${css} text-base font-medium`}
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
