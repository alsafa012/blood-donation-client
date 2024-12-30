import { FaLocationDot } from "react-icons/fa6";

// GoogleMapModal.js
const GoogleMapModal = ({ isOpen, mapUrl, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="my-10">
        <h1 className="py-3 inline-flex gap-2 items-center px-2 text-xl md:text-3xl font-medium mb-3">
          <FaLocationDot fill="red" /> Our Location
          <p className="border mt-5"></p>
        </h1>
        {/* <div */}
        <iframe
          src="https://maps.app.goo.gl/ENY57brapPpKty2Z7"
          // width="600"
          height="450"
          className="w-[100%]"
          // style="border:0;"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="bg-white rounded-lg w-11/12 md:w-3/4 h-3/4 p-4 relative hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
        >
          X
        </button>

        {/* Google Map Embed */}
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMapModal;
