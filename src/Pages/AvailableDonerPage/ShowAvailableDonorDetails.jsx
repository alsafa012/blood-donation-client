import { useLoaderData } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import WebsiteTitle from "../../Shared/WebsiteTitle";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";

const ShowAvailableDonorDetails = () => {
  const donorDetails = useLoaderData();
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
          <img
            className="h-[300px] w-auto md:h-[380px] lg:h-[350px] object-contain rounded-md cursor-pointer"
            src={donorDetails?.user_image}
            alt="user_image.png"
          />
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
        <div className="flex flex-col gap-2 px-2 border-y py-2">
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Name</p> <p>: {donorDetails?.user_name}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Age</p>
            <p>: {donorDetails?.user_age}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Blood Group</p>
            <div className="flex gap-1">
              <p>:</p> <ShowBloodGroup blood={donorDetails?.bloodGroup} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Phone No</p>
            <p>: {donorDetails?.phone_number}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Contact Via Email</p>
            <p>: {donorDetails?.user_email}</p>
          </div>
          {/* <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Contact Via Whatsapp</p>
            {donorDetails?.user_whatsapp ? (
              <div>
                <span>:</span>
                <button
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-start ml-1 hover:underline hover:text-[#97A97C]"
                  onClick={handleWhatsAppContact}
                >
                  click here
                </button>
              </div>
            ) : (
              <p>: Not available</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Contact Via Messenger</p>
            {donorDetails?.user_messenger ? (
              <div>
                <span>:</span>
                <button
                  className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-start ml-1 hover:underline hover:text-[#97A97C]"
                  onClick={handleMessengerContact}
                >
                  click here
                </button>
              </div>
            ) : (
              <p>: Not available</p>
            )}
          </div> */}
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p> MaritalStatus</p> <p>: {donorDetails?.user_maritalStatus}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Religion</p> <p>: {donorDetails?.user_religious}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p> Address</p>{" "}
            <p>
              : {donorDetails?.user_area}, {donorDetails?.user_district}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-10 lg:gap-36 text-base md:text-lg lg:text-xl xl:text-2xl font-medium">
            <p>Nationality</p> <p>: {donorDetails?.user_nationality}</p>
          </div>
        </div>
        {/* image modal as absolute */}
        <div className="hidden"></div>
        {/* --------- */}
      </div>
    </MyContainer>
  );
};

export default ShowAvailableDonorDetails;
