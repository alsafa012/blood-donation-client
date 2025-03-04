import { useState } from "react";
// import domtoimage from "dom-to-image";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import MyContainer from "./MyContainer";
import useAuth from "../Components/hooks/useAuth";
import useLoggedUserInfo from "../Components/hooks/useLoggedUserInfo";
import ShowBloodGroup from "./ShowBloodGroup";
import { MdOutlineBloodtype } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
const HopeCard = () => {
  const { user } = useAuth();

  const [loggedUserInfo] = useLoggedUserInfo();
  console.log(loggedUserInfo);

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
  // Adjust handleSimpleDownload function to improve resolution and control card size
  const fixOklchColors = () => {
    const elements = document.querySelectorAll("*");

    elements.forEach((el) => {
      const computedStyle = window.getComputedStyle(el);

      // Check for background-color
      const bgColor = computedStyle.backgroundColor;
      if (bgColor.includes("oklch")) {
        el.style.backgroundColor = "rgba(255, 99, 132, 1)"; // Fallback color
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
  // Function to handle gradient change on button click
  const handleGradientChange = (index) => {
    setCurrentGradient(gradients[index]);
  };
  // download content as PDF using domtoimage
  // const handleDownload = () => {
  //   const contentToDownload = document.getElementById("template-div");

  //   domtoimage
  //     .toPng(contentToDownload, {
  //       width: 400, // Adjust width for a medium-sized card (you can tweak this value)
  //       height: 300, // Adjust height to fit a medium size (you can tweak this value)
  //       style: { transform: "scale(1)" }, // Ensure no unnecessary scaling is applied
  //     })
  //     .then((dataUrl) => {
  //       const doc = new jsPDF({
  //         unit: "mm", // Use millimeters for precision
  //         format: "a4", // Default page size is A4 (210mm x 297mm)
  //       });

  //       // Get page dimensions (A4 size)
  //       const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  //       const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm

  //       // Content dimensions (NID card size)
  //       const contentWidth = 85.6; // NID card width
  //       const contentHeight = 53.98; // NID card height

  //       // Calculate horizontal and vertical offsets to center the content
  //       const offsetX = (pageWidth - contentWidth) / 2; // Horizontal center
  //       const offsetY = (pageHeight - contentHeight) / 2; // Vertical center

  //       // Add the image to the PDF, centered on the page
  //       doc.addImage(dataUrl, "PNG", offsetX, 50, contentWidth, contentHeight);

  //       // Save the generated PDF
  //       doc.save("template-content.pdf");
  //     })
  //     .catch((error) => {
  //       console.error("Error generating the image:", error);
  //     });
  // };

  // download content as image using html2canvas
  // const handleDownload = () => {
  //   // Fix any 'oklch' color issues before rendering the content
  //   fixOklchColors();

  //   // Ensure the content is updated and fully rendered before capturing
  //   const contentToDownload = document.getElementById("template-div");

  //   // Optional: Wait for any async operations to complete (useful if content is dynamic)
  //   setTimeout(() => {
  //     // Use html2canvas to convert the content to a canvas
  //     html2canvas(contentToDownload, {
  //       useCORS: true, // Enable CORS if you're loading images from an external source
  //       allowTaint: true, // Allow tainting for cross-origin content
  //       logging: true, // Enable logging for debugging purposes
  //     })
  //       .then((canvas) => {
  //         // Convert canvas to image (data URL)
  //         const imgData = canvas.toDataURL("image/png");

  //         // Create a temporary link element
  //         const link = document.createElement("a");
  //         link.href = imgData; // Set the href to the image data URL
  //         link.download = "template-content.png"; // Specify the name of the image file
  //         link.click(); // Trigger the download
  //       })
  //       .catch((error) => {
  //         console.error("Error generating image:", error);
  //       });
  //   }, 100); // Delay in milliseconds (if needed for rendering content)
  // };

  // download content as image using domtoimage
  const handleDownload = () => {
    const contentToDownload = document.getElementById("template-div");

    // Use domtoimage to capture the content and generate the image
    domtoimage
      .toPng(contentToDownload)
      .then((dataUrl) => {
        console.log("dataUrl", dataUrl);
        // Create a temporary link element
        const link = document.createElement("a");
        link.href = dataUrl; // Set the href to the image data URL
        link.download = "template-content.png"; // Specify the name of the image file
        link.click(); // Trigger the download
        // console.log("link", link);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  const a = 1;
  // download content as PDF using html2canvas need to use set-timeout
  // const handleDownload = () => {
  //   // Step 1: Fix 'oklch' colors before rendering the image
  //   fixOklchColors();

  //   const contentToDownload = document.getElementById("template-div");

  //   html2canvas(contentToDownload)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const doc = new jsPDF();
  //       doc.addImage(imgData, "PNG", 10, 10, 180, 160);
  //       doc.save("template-content.pdf");
  //     })
  //     .catch((error) => {
  //       console.error("Error generating PDF:", error);
  //     });
  // };
  const handleSimpleDownload = () => {
    const contentToDownload = document.getElementById("simple-content");

    // Step 1: Fix 'oklch' colors before rendering the image
    fixOklchColors();

    // Step 2: Use html2canvas to render the content to an image
    html2canvas(contentToDownload, {
      width: 400, // Adjust width for medium size (tweak this value)
      height: 300, // Adjust height for medium size (tweak this value)
      scale: 2, // This will improve the resolution
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF();

        // Add the generated image to the PDF, adjusting size
        doc.addImage(imgData, "PNG", 10, 10, 180, 160); // Adjust these values for a better fit
        doc.save("simple-content.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  // Handle custom color change
  const handleCustomColorChange = (event) => {
    const newColor = event.target.value;
    setCustomColor(newColor);
    setCurrentGradient(`linear-gradient(to right, ${newColor}, ${newColor})`);
  };
  return (
    <MyContainer>
      <div id="simple-content">
        <h1>Simple Test</h1>
        <p>This is a simple test for PDF generation.</p>
      </div>
      <button onClick={handleSimpleDownload}>handleSimpleDownload</button>

      <div className="min-h-[100vh] flex flex-col items-center justify-center w-full border border-blue-600">
        {/* Template div */}
        <div
          id="template-div"
          className="flex justify-between w-[95%] md:w-[50%] lg:w-[40%] mx-auto md:gap-8 items-start flex-1 max-h-max p-4 rounded-lg shadow-lg border"
          style={{ background: currentGradient }}
        >
          {/* Donor info */}
          <div className="flex flex-col items-start gap-3 flex-1">
            {/* Image */}
            <div className="flex items-center space-x-4">
              {user?.email ? (
                <img
                  className="w-16 md:w-24 h-16 md:h-24 rounded-full object-cover border-4 border-red-500"
                  src={user?.photoURL}
                  alt="User profile"
                />
              ) : (
                <img
                  className="h-28 w-28 border rounded-full object-cover"
                  src="https://i.ibb.co/mtL872C/image.png"
                  alt="Default profile image"
                />
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  {user?.displayName || "Ridoy"}
                </h2>
                <p className="text-md text-gray-600">
                  Age: <span className="font-semibold">28</span>
                </p>
              </div>
            </div>
            {/* Information Section */}
            <div className="space-y-3 flex flex-col text-gray-700">
              <p className="text-sm inline-flex items-center gap-[2px] md:text-lg font-medium">
                <MdOutlineBloodtype fill="red" /> Blood Group:{" "}
                <span className="font-semibold ml-1">
                  <ShowBloodGroup blood={loggedUserInfo?.bloodGroup || "A+"} />
                </span>
              </p>
              <p className="text-sm inline-flex items-center gap-[2px] md:text-lg font-medium">
                <CiPhone fill="red" /> Mobile:{" "}
                <span className="font-semibold ml-1">017xxxxxxxx</span>
              </p>
              <p className="text-sm md:text-lg font-medium">
                📍 Address:{" "}
                <span className="font-semibold ml-1">xxxxxx, Bangladesh</span>
              </p>
            </div>
          </div>

          {/* Website logo */}
          <div className="flex flex-col items-center md:gap-2">
            <h2 className="text-lg md:text-2xl font-bold">Roktojoddha</h2>
            <img
              className="w-16 md:w-24 h-16 md:h-24 border rounded-full shadow-md"
              src="https://i.ibb.co/mtL872C/image.png"
              alt="Website Logo"
            />
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
          <label className="relative flex items-center cursor-pointer">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-10 h-10 p-0 border-2 border-gray-300 rounded-full cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* ---- */}
      {/* </div> */}
    </MyContainer>
  );
};

export default HopeCard;
