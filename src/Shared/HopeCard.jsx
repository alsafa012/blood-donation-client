import { forwardRef, useState } from "react";
// import domtoimage from "dom-to-image";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import MyContainer from "./MyContainer";
import useAuth from "../Components/hooks/useAuth";
import useLoggedUserInfo from "../Components/hooks/useLoggedUserInfo";
import ShowBloodGroup from "./ShowBloodGroup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import img from "../../src/assets/6.png";
// const HopeCard = () => {
const HopeCard = forwardRef((props, ref) => {
  const { user } = useAuth();

  const [loggedUserInfo] = useLoggedUserInfo();
  // console.log(loggedUserInfo);

  const gradients = [
    "radial-gradient(circle farthest-corner at 14.2% 27.5%, rgba(104, 199, 255, 1) 0%, rgba(181, 126, 255, 1) 90%)",
    "radial-gradient(circle farthest-corner at 14.2% 27.5%, rgba(255, 99, 132, 1) 0%, rgba(255, 159, 64, 1) 100%)",
    "radial-gradient(circle farthest-corner at 14.2% 27.5%, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
    "radial-gradient(circle farthest-corner at 14.2% 27.5%, rgba(248, 248, 248, 1) 0%, rgba(135, 180, 210, 1) 100%)",
  ];
  // State to store the current gradient
  const [currentGradient, setCurrentGradient] = useState(gradients[0]);
  // State to store custom color
  const [customColor, setCustomColor] = useState("#ffffff");
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

  // download content as image using html2canvas
  const handleDownloadCardAsImage = () => {
    // Fix any 'oklch' color issues before rendering the content
    fixOklchColors();

    // Ensure the content is updated and fully rendered before capturing
    const contentToDownload = document.getElementById("template-div");

    // Optional: Wait for any async operations to complete (useful if content is dynamic)
    setTimeout(() => {
      // Use html2canvas to convert the content to a canvas
      html2canvas(contentToDownload, {
        useCORS: true, // Enable CORS if you're loading images from an external source
        allowTaint: true, // Allow tainting for cross-origin content
        logging: true, // Enable logging for debugging purposes
      })
        .then((canvas) => {
          // Convert canvas to image (data URL)
          const imgData = canvas.toDataURL("image/png");

          // Create a temporary link element
          const link = document.createElement("a");
          link.href = imgData; // Set the href to the image data URL
          link.download = "template-content.png"; // Specify the name of the image file
          link.click(); // Trigger the download
        })
        .catch((error) => {
          console.error("Error generating image:", error);
        });
    }, 100); // Delay in milliseconds (if needed for rendering content)
  };

  const handleCardDownload = () => {
    const contentToDownload = document.getElementById("card-div");
    fixOklchColors();
    // Ensure images are fully loaded before capturing
    const images = contentToDownload.getElementsByTagName("img");
    let loadedImages = 0;

    for (let img of images) {
      if (img.complete) {
        loadedImages++;
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            capturePDF(contentToDownload);
          }
        };
        img.onerror = () => console.warn("Image failed to load:", img.src);
      }
    }

    // If all images are already loaded, proceed immediately
    if (loadedImages === images.length) {
      capturePDF(contentToDownload);
    }
  };

  // Separate function to handle PDF generation
  // const capturePDF = (contentToDownload) => {
  //   setTimeout(() => {
  //     html2canvas(contentToDownload, {
  //       scale: 3, // High resolution
  //       useCORS: true, // Allow external images
  //       allowTaint: true, // Prevent taint issues
  //       backgroundColor: null,
  //       width: 1011, // Standard credit card width (3.37 inches at 300 DPI)
  //       height: 638, // Standard credit card height (2.13 inches at 300 DPI)
  //     })
  //       .then((canvas) => {
  //         const imgData = canvas.toDataURL("image/png");

  //         // Set card size (Credit Card: 85.6mm × 54mm)
  //         const doc = new jsPDF({
  //           orientation: "landscape", // Business cards are usually landscape
  //           unit: "mm",
  //           format: [85.6, 54], // Standard card dimensions
  //         });
  //         const pageWidth = doc.internal.pageSize.getWidth();
  //         const pageHeight = doc.internal.pageSize.getHeight();

  //         // Centering calculations
  //         const imgWidth = 81.6; // Adjusted width
  //         const imgHeight = 50; // Adjusted height
  //         const x = (pageWidth - imgWidth) / 2; // Center horizontally
  //         const y = (pageHeight - imgHeight) / 2; // Center vertically

  //         // Add image centered inside the PDF
  //         doc.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  //         // Adjust the image inside the card
  //         // doc.addImage(imgData, "PNG", 2, 2, 81.6, 50); // Add margins and fit inside the card

  //         doc.save("Roktojoddha_Card.pdf");
  //       })
  //       .catch((error) => {
  //         console.error("Error generating PDF:", error);
  //       });
  //   }, 2000);
  // };
  const capturePDF = (contentToDownload) => {
    setTimeout(() => {
      html2canvas(contentToDownload, {
        scale: 3, // High resolution
        useCORS: true, // Allow external images
        allowTaint: true, // Prevent taint issues
        backgroundColor: "#fff", // Ensure proper rendering
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          // **PDF size matching the captured image**
          const imgWidth = 85.6; // mm (Full card width)
          const imgHeight = (canvas.height / canvas.width) * imgWidth; // Maintain aspect ratio

          const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [imgWidth, imgHeight], // Match dimensions
          });

          // **Center the image in PDF**
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const x = (pageWidth - imgWidth) / 2; // Center horizontally
          const y = (pageHeight - imgHeight) / 2; // Center vertically

          // Add the image centered inside the PDF
          doc.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

          doc.save("Roktojoddha_Card.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }, 2000);
  };

  // Function to handle gradient change on button click
  const handleGradientChange = (index) => {
    setCurrentGradient(gradients[index]);
  };
  // Handle custom color change
  const handleCustomColorChange = (event) => {
    const newColor = event.target.value;
    setCustomColor(newColor);
    setCurrentGradient(`linear-gradient(to right, ${newColor}, ${newColor})`);
  };
  return (
    <MyContainer>
      <div className="hidden" id="simple-content">
        <h1>Simple Test</h1>
        <p>This is a simple test for PDF generation.</p>
      </div>
      <button className="btn my-5 hidden" onClick={handleCardDownload}>
        handleCardDownload
      </button>

      <div className="min-h-[100vh flex flex-col items-center justify-center w-full rounded-lg">
        {/* card div */}
        <div
          ref={ref}
          id="card-div"
          className="flex justify-between mx-auto md:gap-8 items-start flex-1 max-h-max p-4 rounded-lg shadow-lg"
          style={{ background: currentGradient }}
        >
          {/* Donor info */}
          <div className="flex flex-col items-start gap-3 flex-1">
            {/* Image */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div
                className="w-20 h-20 rounded-full border-2 border-red-500"
                style={{
                  backgroundImage: `url(${
                    user?.email
                      ? user?.photoURL
                      : "https://i.ibb.co/mtL872C/image.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              <div>
                <h2 className="text-lg lg:text-2xl font-bold">
                  {user?.displayName || "Ridoy"}
                </h2>
                <p className="text-sm lg:text-md text-gray-600">
                  Age:{" "}
                  <span className="font-semibold">
                    {loggedUserInfo?.user_age || "25"}
                  </span>
                </p>
              </div>
            </div>
            {/* Information Section */}
            <div className="space-y-2 flex flex-col text-gray-700">
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "block",
                  marginBottom: "2px",
                }}
              >
                <span style={{ color: "red", fontSize: "16px" }}>🩸</span> Blood
                Group:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user ? (
                    <ShowBloodGroup blood={loggedUserInfo?.bloodGroup} />
                  ) : (
                    "A+"
                  )}
                </span>
              </p>

              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "block",
                  marginBottom: "2px",
                }}
              >
                <span style={{ color: "red", fontSize: "16px" }}>📞</span>{" "}
                Mobile:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {loggedUserInfo?.phone_number || "017xxxxxxxx"}
                </span>
              </p>

              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "block",
                  marginBottom: "2px",
                }}
                className="max-w-[300px] overflow-hidde text-wrap"
              >
                📍 Address:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {loggedUserInfo?.user_full_address || "XYZ, Bangladesh"}
                </span>
              </p>
            </div>
          </div>

          {/* Website logo */}
          <div className="flex flex-col items-center md:gap-2">
            <div
              className="w-32 h-32 rounf opa"
              style={{
                // backgroundImage: `url("https://i.ibb.co.com/8nGN7yds/logo-with-heart-hand.png")`,
                backgroundImage: `url(${img})`,
                // backgroundImage: `url("https://ibb.co.com/spcbVT6R")`,
                // src="https://i.ibb.co.com/S7vw7fm/logo-with-heart-hand.png"
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            {/* <h4 className="text-lg md:text-2xl font-bold">Roktojoddha</h4>
            <h4 className="text-lg md:text-2xl font-bold">রক্তযোদ্ধা</h4> */}
          </div>
        </div>

        {/* Gradient Selector */}
        <div className="my-4 flex gap-3 justify-center">
          {gradients?.map((gradient, index) => (
            <button
              key={index}
              onClick={() => handleGradientChange(index)}
              className={`${
                currentGradient === gradient ? "scale-105" : ""
              } px-4 py-2 text-white rounded-full size-10 shadow-md border border-gray-300 hover:scale- hover:opacity-90 transition-transform`}
              style={{ background: gradient }}
            />
          ))}
          {/* add a customixed color button */}
          {/* Custom Color Picker Button */}
          <label className="relative flex items-center cursor-pointer w-10 h-10 border-2 rounded-full max-w-10 max-h-10 overflow-hidden">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-28 h-28 rounded-full cursor-pointer"
            />
          </label>
        </div>
      </div>
      {/* ---- */}
    </MyContainer>
  );
});
//   );
// };
HopeCard.displayName = "HopeCard";
export default HopeCard;
