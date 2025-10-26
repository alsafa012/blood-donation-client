import { useState, useEffect } from "react";
import moment from "moment";
import { FaClock } from "react-icons/fa";

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(moment());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white gap-1">
      {/* Time */}
      <div className="flex items-center gap-2">
        <FaClock className="text-green-400 w-5 h-5" />
        <span className="font-mono text-lg">{currentTime.format("hh:mm A")}</span>
      </div>

      {/* Date */}
      <div className="text-sm text-gray-300">
        {currentTime.format("dddd, MMMM Do YYYY")}
      </div>
    </div>
  );
};

export default DigitalClock;
