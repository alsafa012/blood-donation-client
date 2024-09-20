const ShowBloodGroup = ({ blood }) => {
  return (
    <>
      <p>{`${
        blood === "ABPositive"
          ? "AB+"
          : blood === "APositive"
          ? "A+"
          : blood === "BPositive"
          ? "B+"
          : blood === "OPositive"
          ? "O+"
          : blood === "ABNegative"
          ? "AB-"
          : blood === "ANegative"
          ? "A-"
          : blood === "BNegative"
          ? "B-"
          : blood === "ONegative"
          ? "O-"
          : ""
      }`}</p>
    </>
  );
};

export default ShowBloodGroup;
