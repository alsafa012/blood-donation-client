// import HopeCard from "../../../../Shared/HopeCard";
// import MyContainer from "../../../../Shared/MyContainer";
// import WebsiteTitle from "../../../../Shared/WebsiteTitle";

// const DownloadCard = () => {
//   const handleDownload = () => {
//     alert("handleDownload");
//   };
//   return (
//     <>
//       <MyContainer>
//         <WebsiteTitle name={"রক্তযোদ্ধা || Card Download"} />
//         <div className="flex justify-center flex-col gap-5 md:gap-10 mt-20 mb-10">
//           <button
//             className="bg-primary max-w-max mx-auto text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
//             onClick={handleDownload}
//           >
//             ডাউনলোড করুন →
//           </button>

//           <HopeCard />
//         </div>
//       </MyContainer>
//     </>
//   );
// };
// export default DownloadCard;
import HopeCard from "../../../../Shared/HopeCard";
import MyContainer from "../../../../Shared/MyContainer";
import WebsiteTitle from "../../../../Shared/WebsiteTitle";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa6";

const DownloadCard = () => {
  const cardRef = useRef(null);
  // Adjust handleCardDownload function to improve resolution and control card size
  const fixOklchColors = () => {
    const elements = document.querySelectorAll("*");

    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);

      // Check for background-color
      const bgColor = computedStyle.backgroundColor;
      if (bgColor.includes("oklch")) {
        el.style.backgroundColor = "rgba(255, 255, 255, 0)"; // Fallback color
      }

      // Check for text color
      const textColor = computedStyle.color;
      if (textColor.includes("oklch")) {
        el.style.color = "rgba(0, 0, 0, 1)"; // Fallback color
      }

      // Check for border color
      const borderColor = computedStyle.borderColor;
      if (borderColor.includes("oklch")) {
        el.style.borderColor = "rgba(0, 0, 0, 1)"; // Fallback color
      }
    });
  };
  const handleDownload = () => {
    if (cardRef.current) {
      fixOklchColors();
      html2canvas(cardRef.current, {
        scale: 3, // High resolution
        useCORS: true, // Allow external images
        allowTaint: true, // Prevent taint issues
        backgroundColor: "#fff", // Ensure proper rendering
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = 85.6; // mm
        const imgHeight = (canvas.height / canvas.width) * imgWidth;

        const doc = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: [imgWidth, imgHeight],
        });

        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        doc.save("Roktojoddha_Card.pdf");
      });
    }
  };

  return (
    <MyContainer>
      <WebsiteTitle name={"রক্তযোদ্ধা || Card Download"} />
      <div className="flex justify-center flex-col gap-5 md:gap-10 mt-20 mb-10">
        <button
          className="bg-primary max-w-max mx-auto text-white px-4 py-2 rounded-md font-semibold flex items-center gap-2"
          onClick={handleDownload}
        >
          ডাউনলোড করুন <FaDownload />
        </button>

        {/* Pass ref to HopeCard */}
        <HopeCard ref={cardRef} />
      </div>
    </MyContainer>
  );
};

export default DownloadCard;
