import { useNavigate } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import useAuth from "../../Components/hooks/useAuth";

const NavigateRegistration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const NavigateRegistrationPage = () => {
    navigate("/registration");
  };
  return (
    <MyContainer>
      <div
        className={`${
          user ? "hidden" : "block"
        } w-[60%] mx-auto bg-[#CEE9BE bg-[#E1F5DA] p-10`}
      >
        <h1 className="text-2xl font-semibold text-center mb-4">
          If you are interested in donating blood, register{" "}
          <span className="text-lg block mt-2">and become a Roktojoddha.</span>
        </h1>
        <p className="text-sm text-gray-700 my-5">
          Roktojoddha is not a single organization; it is a platform for blood
          donors. It exists for the convenience of individuals and organizations
          alike. Its purpose is to bring together blood donors and various
          blood-related organizations on a single platform, making the process
          of giving and receiving blood easier. If you are a blood donor,
          register on the Roktojoddha website today.
        </p>
        <button
          className="bg-primar btn-bg mx-auto text-white px-4 py-1 rounded-md font-semibold flex items-center gap-2 hover:-skew-y-3 transition"
          onClick={NavigateRegistrationPage}
        >
          Register →
        </button>
        {/* <h1 className="text-2xl font-semibold text-center">
          রক্তদানে আগ্রহী হলে রেজিস্ট্রেশন করুন{" "}
          <span className="text-lg">হয়ে যান রক্তযোদ্ধা</span>
        </h1>
        <p className="text-sm text-gray-600 my-5">
          রক্তযোদ্ধা কোন একক সংগঠন নয়, বরং রক্তদাতাদের একটি প্লাটফর্ম। সকল
          ব্যক্তির, সংগঠনের সুবিধার জন্যই। যাঁরা রক্তদেন তাঁদেরকে এবং রক্তদান
          সম্পর্কিত বিভিন্ন সংগঠনগুলোকে এক প্লাটফর্মে নিয়ে এসে রক্ত দেওয়া-পাওয়ার
          কাজটা সহজ করাই এর উদ্দেশ্য। আপনিও রক্তদাতা হলে রক্তযোদ্ধা website এ
          রেজিস্ট্রেশন করুন।
        </p>
        <button
          className="bg-primary mx-auto text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
          onClick={NavigateRegistrationPage}
        >
          রেজিস্ট্রেশন করুন →
        </button> */}
      </div>
    </MyContainer>
  );
};

export default NavigateRegistration;
