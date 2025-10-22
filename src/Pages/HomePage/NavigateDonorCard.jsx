import { useNavigate } from "react-router-dom";
import useAuth from "../../Components/hooks/useAuth";
import HopeCard from "../../Shared/HopeCard";

const NavigateDonorCard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const NavigateCardDownloadPage = () => {
    if (user) {
      navigate("/dashboard/cardDownload");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="bg-[#E1F5DA] p-8 rounded-xl flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between">
        <div className="md:w-auto lg:w-1/2 text-center md:text-left">
          <h2 className="text-xl max-w-max font-bold border-b border-dashed pb-2">
            রক্তযোদ্ধা ব্লাড কার্ড :
          </h2>
          <p className="text-gray-600 my-3 text-xs">
            এখনি ডাউনলোড করে ফেলুন আপনার কার্ডটি
          </p>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
            onClick={NavigateCardDownloadPage}
          >
            ডাউনলোড করুন →
          </button>
        </div>
        <div className="md:w-auto lg:w-1/2">
          <HopeCard />
        </div>
      </div>
    </div>
  );
};

export default NavigateDonorCard;
