import HopeCard from "../../../../Shared/HopeCard";
import MyContainer from "../../../../Shared/MyContainer";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";

const DownloadCard = () => {
  const handleDownload = () => {
    alert("handleDownload");
  };
  return (
    <>
      <MyContainer>
        <WebsiteTitle name={"রক্তযোদ্ধা || Card Download"} />
        <div className="flex justify-center flex-col gap-5 md:gap-10 mt-20 mb-10">
          <button
            className="bg-primary max-w-max mx-auto text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
            onClick={handleDownload}
          >
            ডাউনলোড করুন →
          </button>

          <HopeCard />
        </div>
      </MyContainer>
    </>
  );
};
export default DownloadCard;
