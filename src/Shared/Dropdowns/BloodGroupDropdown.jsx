// import React from "react";

// const BloodGroupDropdown = React.memo(({ blood, onChange }) => {
//   return (
//     <div className="">
//       {/* <label className="text-base font-semibold">Blood Group:*</label> */}
//       <select
//         defaultValue="default"
//         // value={value}
//         onChange={onChange}
//         className="input-field text-base font-medium"
//       >
//         <option disabled value="default">
//           Select bloodGroup
//         </option>
//         <option value="ABPositive">AB+</option>
//         <option value="APositive">A+</option>
//         <option value="BPositive">B+</option>
//         <option value="OPositive">O+</option>
//         <option value="ABNegative">AB-</option>
//         <option value="ANegative">A-</option>
//         <option value="BNegative">B-</option>
//         <option value="ONegative">O-</option>
//       </select>
//     </div>
//   );
// });

// export default BloodGroupDropdown;
import React from "react";

const BloodGroupDropdown = React.memo(({ blood, onChange, css, status }) => {
  // console.log("blood", blood);
  return (
    <div className="">
      <select
        value={blood}
        onChange={onChange}
        className={`${css} text-sm md:text-base font-medium w-full`}
        required
      >
        <option disabled value="">
          Select Blood Group
        </option>
        {status && (
          <option className="" value="All">
            All
          </option>
        )}
        <option value="ABPositive">AB+</option>
        <option value="APositive">A+</option>
        <option value="BPositive">B+</option>
        <option value="OPositive">O+</option>
        <option value="ABNegative">AB-</option>
        <option value="ANegative">A-</option>
        <option value="BNegative">B-</option>
        <option value="ONegative">O-</option>
      </select>
    </div>
  );
});

// Set display name for debugging
BloodGroupDropdown.displayName = "BloodGroupDropdown";

export default BloodGroupDropdown;
