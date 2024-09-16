import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdNavigateBefore } from "react-icons/md";
import useAuth from "../../Components/hooks/useAuth";
import WebsiteTitle from "../../Shared/WebsiteTitle";
// import { PiNavigationArrowDuotone } from "react-icons/pi";
// <PiNavigationArrowDuotone />
const LoginPage = () => {
  // const from = location?.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const { user, userSignIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    if (user) {
      return Swal.fire({
        title: "Error!",
        text: "user already exists",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    userSignIn(email, password)
      .then((result) => {
        // navigate(location?.state ? location.state : "/");
        console.log(result.user);
        Swal.fire("Good job!", "User login successfully", "success");
        navigate(from, { replace: true });

        // e.target.email.value = "";
        // e.target.password.value = "";
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("User login failed..! Invalid email or password");
      });
  };
  return (
    // <div className="min-h-screen bg-[url('https://st2.depositphotos.com/3643473/5841/i/450/depositphotos_58411043-stock-photo-old-key-with-hope-sign.jpg')] bg-no-repeat bg-cover">
   <div className="min-h-screen bg-[url('https://img.freepik.com/premium-photo/hope-word-is-written-wooden-cubes-green-summer-background-closeup-wooden-elements_661495-5652.jpg')] bg-no-repeat bg-cover"> 
      <WebsiteTitle name={"Login Page"}></WebsiteTitle>
      {/* <PageTitle title="Login"></PageTitle> */}
      <div className="backdrop-blur-xl w-full min-h-screen flex justify-center items-center">
        <div className="relative p-border w-4/5 md:w-1/2 lg:w-1/3 mx-auto p-5 rounded-xl overflow-hidden">
          {/* <p className="text-3xl font-bold mb-6 text-center mt-5">Login Here..</p> */}
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <h3 className="mt-3 text-xl font-medium text-center text-black">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-700">
            Login or create account
          </p>
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            {/* <div className="">
            <label className="label text-black font-medium">
              <span className="">Email</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input bg-transparent input-bordered text-black font-medium w-full"
              required
            />
          </div> */}
            {/* new email */}
            <div className="relative w-full">
              <input
                className="peer w-full h-[50px] bg-none bg-transparent border-b border-b-[#1B8EF8] px-2 pt-4 text-[#1B8EF8] focus:outline-none dark:bg-blue-500/20"
                type="text"
                name="email"
                id="navigate_ui_input_55"
                placeholder=""
              />
              <label
                className="absolute left-2 top-0.5 text-xs text-[#1B8EF8] duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#1B8EF8]"
                htmlFor="navigate_ui_input_55"
              >
                Email
              </label>
            </div>
            {/* new Pass */}
            <div className="relative w-full">
              <input
                className="peer w-full h-[50px] bg-none bg-transparent border-b border-b-[#1B8EF8] px-2 pt-4 text-[#1B8EF8] focus:outline-none dark:bg-blue-500/20"
                type={showPassword ? "text" : "password"}
                name="password"
                id="navigate_ui_input_55"
                placeholder=""
              />
              <label
                className="absolute left-2 top-0.5 text-xs text-[#1B8EF8] duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#1B8EF8]"
                htmlFor="navigate_ui_input_55"
              >
                Password
              </label>
              <div>
                <span
                  className="text-xl absolute top-[40%] right-4 text-black font-medium"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
                </span>
              </div>
            </div>

            {/* Password */}
            {/* <div className=" relative">
            <label className="label text-black font-medium">
              <span className="">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input bg-transparent input-bordered text-black font-medium w-full"
              required
            />
            <label className="label mt-3">
              <a href="#" className="-alt link link-hover">
                Forgot password?
              </a>
            </label>
            <span
              className="text-xl absolute top-[40%] right-4 text-black font-medium"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
            </span>
          </div> */}

            <h3>
              {errorMessage && (
                <p className="text-red-600 pt-1">{errorMessage}</p>
              )}
            </h3>
            <div className="mt-6">
              <button className="btn-bg rounded-md py-2 w-full mt-8">Login</button>
            </div>
          </form>
          <p className="text-center py-4">
            Do not Have An Account ?
            <Link
              className="text-[#87986A] font-medium hover:underline ml-1"
              to="/registration"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

// import { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { MdNavigateBefore } from "react-icons/md";
// import useAuth from "../../Components/hooks/useAuth";
// import WebsiteTitle from "../../Shared/WebsiteTitle";
// // import { PiNavigationArrowDuotone } from "react-icons/pi";
// // <PiNavigationArrowDuotone />
// const LoginPage = () => {
//   // const from = location?.state?.from?.pathname || "/";
//   const [showPassword, setShowPassword] = useState(false);
//   const { user, userSignIn } = useAuth();
//   const [errorMessage, setErrorMessage] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location?.state?.from?.pathname || "/";
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (user) {
//       return Swal.fire({
//         title: "Error!",
//         text: "user already exists",
//         icon: "error",
//         confirmButtonText: "Cool",
//       });
//     }
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.password.value;
//     console.log(email, password);
//     userSignIn(email, password)
//       .then((result) => {
//         // navigate(location?.state ? location.state : "/");
//         console.log(result.user);
//         Swal.fire("Good job!", "User login successfully", "success");
//         navigate(from, { replace: true });

//         // e.target.email.value = "";
//         // e.target.password.value = "";
//       })
//       .catch((error) => {
//         console.log(error);
//         setErrorMessage("User login failed..! Invalid email or password");
//       });
//   };
//   return (
//     <div className="-my-3 flex justify-center items-center min-h-screen py-5 md:py-10 bg-[url('https://st2.depositphotos.com/3643473/5841/i/450/depositphotos_58411043-stock-photo-old-key-with-hope-sign.jpg')] bg-no-repeat bg-cover">
//       <WebsiteTitle name={"Login Page"}></WebsiteTitle>
//       {/* <PageTitle title="Login"></PageTitle> */}
//       <div className="relative border border-[#aaa69d] backdrop-blur-xl w-4/5 md:w-1/2 lg:w-1/3 mx-auto p-5 rounded-xl overflow-hidden">
//         {/* <p className="text-3xl font-bold mb-6 text-center mt-5">Login Here..</p> */}
//         <div className="flex justify-center mx-auto">
//           <img
//             className="w-auto h-7 sm:h-8"
//             src="https://merakiui.com/images/logo.svg"
//             alt=""
//           />
//         </div>
//         <h3 className="mt-3 text-xl font-medium text-center text-black">
//           Welcome Back
//         </h3>
//         <p className="mt-1 text-center text-gray-700">
//           Login or create account
//         </p>
//         <form onSubmit={handleLogin}>
//           {/* Email */}
//           <div className="">
//             <label className="label text-black font-medium">
//               <span className="">Email</span>
//             </label>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email"
//               className="input bg-transparent input-bordered text-black font-medium w-full"
//               required
//             />
//           </div>
//           {/* <div className="relative w-full">
//             <input
//               className="peer w-full h-[50px] bg-none bg-transparent border-b border-b-[#1B8EF8] px-2 pt-4 text-[#1B8EF8] focus:outline-none dark:bg-blue-500/20"
//               type="text"
//               id="navigate_ui_input_55"
//               placeholder=""
//             />
//             <label
//               className="absolute left-2 top-0.5 text-xs text-[#1B8EF8] duration-300 peer-placeholder-shown:left-2 peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-2 peer-focus:top-0.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#1B8EF8]"
//               htmlFor="navigate_ui_input_55"
//             >
//               Email
//             </label>
//           </div> */}
//           {/* Password */}
//           <div className=" relative">
//             <label className="label text-black font-medium">
//               <span className="">Password</span>
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               className="input bg-transparent input-bordered text-black font-medium w-full"
//               required
//             />
//             <label className="label mt-3">
//               <a href="#" className="-alt link link-hover">
//                 Forgot password?
//               </a>
//             </label>
//             <span
//               className="text-xl absolute top-[40%] right-4 text-black font-medium"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
//             </span>
//           </div>
//           <h3>
//             {errorMessage && (
//               <p className="text-red-600 pt-1">{errorMessage}</p>
//             )}
//           </h3>
//           <div className="mt-6">
//             <button className="primary-btn w-full">Login</button>
//           </div>
//         </form>
//         <div className="divider divider-info">OR</div>
//         <p className="text-center py-4">
//           Do not Have An Account ?
//           <Link
//             className="text-[#87986A] font-medium hover:underline ml-1"
//             to="/registration"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };
// export default LoginPage;
