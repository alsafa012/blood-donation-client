import HopeCard from "../../Shared/HopeCard";

const Banner = () => {
  return (
    <div className="min-h-[50vh]">
      <img
        className="w-full h-[60vh] object-fill"
        src="https://st2.depositphotos.com/3643473/5841/i/450/depositphotos_58411043-stock-photo-old-key-with-hope-sign.jpg"
        alt=""
      />
      <div>
        <HopeCard/>
      </div>
    </div>
  );
};

export default Banner;
