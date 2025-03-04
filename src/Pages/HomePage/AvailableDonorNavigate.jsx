// import { useNavigate } from "react-router-dom";
// import useAuth from "../../Components/hooks/useAuth";

// const AvailableDonorNavigate = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const NavigateAddReviewPage = () => {
//     if (user) {
//       navigate("/availableDonors");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <div
//         style={{
//           backgroundImage: "url('https://i.ibb.co/KzbNkgSx/blood-2.jpg')",
//           backgroundSize: "contain", // Prevent image from stretching
//           backgroundPosition: "center", // Center the image within the container
//         }}
//         className="min-h-[50vh] w-[65%] bg-no-repeat flex items-center justify-start p-8 border border-green-400"
//       >
//         {/* Content area */}
//         <div className="text-white">
//           <h2 className="text-3xl font-bold">Available Donor</h2>
//           <p className="text-lg">
//             Are you looking for a ready donor? Who is ready to give blood now?
//           </p>

//           <button
//             className="btn-bg px-6 py-2 mt-4 rounded-md font-semibold"
//             onClick={NavigateAddReviewPage}
//           >
//             Get Donor
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableDonorNavigate;
import { useNavigate } from "react-router-dom";
import useAuth from "../../Components/hooks/useAuth";

const AvailableDonorNavigate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const NavigateAddReviewPage = () => {
    if (user) {
      navigate("/availableDonors");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative max-w-3xl  min-h-[50vh] w-full lg:w-[65%">
        {/* Image behind the content */}
        <img
          src="https://i.ibb.co/KzbNkgSx/blood-2.jpg"
          alt="Blood Donation"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content area */}
        <div className="relative text-white z-10 p-8">
          <h2 className="text-3xl font-bold">Available Donor</h2>
          <p className="text-lg">
            Are you looking for a ready donor? <br />
            Who is ready to give blood now?
          </p>

          <button
            className="btn-bg px-6 py-2 mt-4 rounded-md font-semibold"
            onClick={NavigateAddReviewPage}
          >
            Get Donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableDonorNavigate;
