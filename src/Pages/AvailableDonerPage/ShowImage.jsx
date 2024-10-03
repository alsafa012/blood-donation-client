import { MdOutlineCancel } from "react-icons/md";

const ShowImage = ({ displayImage, showImage, setShowImage }) => {
//   const [showImage, setShowImage] = useState(false);
  //   const [displayImage, setDisplayImage] = useState(donorDetails?.user_image);
  return (
    <div
      className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden min-h-screen max-h-screen w-full bg-black/20 backdrop-blur-sm ${
        showImage ? "opacity-1 visible" : "invisible opacity-0"
      }`}
    >
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className={`${showImage ? "block" : "hidden"} absolute z-10`}
      >
        <img
          // className="object-contain md:object-fill min-h-[60vh] max-h-[90vh] rounded-sm bg-primary"
          className="object-cover md:min-h-[60vh] max-h-[90vh] rounded-md"
          src={displayImage}
          alt="displayImage.png"
        />
        <button
          onClick={() => setShowImage(false)}
          className="absolute top-2 right-2 hover:rotate-180 transition-transform duration-300 rounded-full btn-bg"
        >
          <MdOutlineCancel size={35} fill="#B5C99A" />
        </button>
      </div>
    </div>
  );
};

export default ShowImage;
