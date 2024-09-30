import { useLoaderData } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import { useState } from "react";
import ShowImage from "./ShowImage";

const ShowAvailableDonorDetails = () => {
  const donorDetails = useLoaderData();
  const [showImage, setShowImage] = useState(false);
  const handleMessengerContact = () => {
    if (donorDetails?.user_messenger) {
      const messengerUrl = `https://m.me/${donorDetails.user_messenger}`;
      window.open(messengerUrl, "_blank");
    } else {
      alert("Messenger contact not available.");
    }
  };
  const handleWhatsAppContact = () => {
    if (donorDetails?.user_whatsapp) {
      // Convert the phone number to international format
      const whatsappNumber = `+880${donorDetails.user_whatsapp}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}`;
      window.open(whatsappUrl, "_blank");
    } else {
      alert("WhatsApp contact not available.");
    }
  };
  return (
    <MyContainer>
      <WebsiteTitle name={`${donorDetails?.user_name}'s Details`} />
      <div className="px-1 w-full md:w-[80%] lg:w-[65%] mx-auto flex gap-2 flex-col justify-center mt-2 mb-5">
        <div className="">
          <div className="">
            <img
              onClick={() => setShowImage(true)}
              className="h-[300px] w-auto md:h-[380px] lg:h-[350px] object-contain rounded-md cursor-pointer"
              src={donorDetails?.user_image}
              alt="user_image.png"
            />
          </div>
          {/* Social icons */}
          <div className="flex gap-2 items-center pt-2">
            {donorDetails?.user_messenger && (
              <div
                className="size-8 cursor-pointer md:hover:rotate-45 duration-300 rounded-full"
                onClick={handleMessengerContact}
              >
                <img
                  className="size-8 rounded-full"
                  src="https://i.ibb.co.com/3zzvw7k/logo-512.webp"
                  alt=""
                />
              </div>
            )}
            {donorDetails?.user_whatsapp && (
              <div
                className="size-7 cursor-pointer md:hover:rotate-45 duration-300 rounded-full"
                onClick={handleWhatsAppContact}
              >
                <img
                  className="size-7 rounded-full"
                  src="https://i.ibb.co.com/BBxHZdG/whatsapp-512.webp"
                  alt=""
                />
              </div>
            )}
          </div>
          {/* ------------- */}
        </div>
        {/* User details display */}
        <div className="flex flex-col gap-2 px-2 border-y py-2">
          {[
            { label: "Name", value: donorDetails?.user_name },
            { label: "Age", value: donorDetails?.user_age },
            {
              label: "Blood Group",
              value: <ShowBloodGroup blood={donorDetails?.bloodGroup} />,
            },
            { label: "Phone No", value: donorDetails?.phone_number },
            { label: "Contact Via Email", value: donorDetails?.user_email },
            {
              label: "Marital Status",
              value: donorDetails?.user_maritalStatus,
            },
            { label: "Religion", value: donorDetails?.user_religious },
            {
              label: "Address",
              value: `${donorDetails?.user_area}, ${donorDetails?.user_district}`,
            },
            { label: "Nationality", value: donorDetails?.user_nationality },
          ].map(({ label, value }) => (
            <div
              className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium"
              key={label}
            >
              <p>{label}</p>{" "}
              <div className="flex items-center gap-1">
                <span>:</span>
                <span>{value}</span>
              </div>
            </div>
          ))}
        </div>
        {/* show selected image */}
        <ShowImage
          displayImage={donorDetails?.user_image}
          showImage={showImage}
          setShowImage={setShowImage}
        />
        {/* --------- */}
      </div>
    </MyContainer>
  );
};

export default ShowAvailableDonorDetails;
