import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import MyContainer from "../../Shared/MyContainer"; // Assuming this is a utility component for max-width and centering
import { Link } from "react-router-dom";
import { FaArrowRight, FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#E1F5DA] border-t border-[#cfe1b9]">
      <MyContainer>
        <div className="p-5 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-3">Roktojoddha</h2>
            <p className="text-sm leading-relaxed">
              Roktojoddha” is a web-based platform that connects blood donors
              and recipients easily and efficiently. Join our community today
              and help save lives by becoming a blood donor.
            </p>
            <Link
              to="/about"
              className="mt-3 inline-flex items-center gap-2 text-green-700 font-medium hover:gap-3 transition-all"
            >
              Learn more <FaArrowRight />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-3">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-green-700 transition-colors flex items-center gap-2"
                >
                  🏠 <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/availableDonors"
                  className="hover:text-green-700 transition-colors flex items-center gap-2"
                >
                  🩸 <span>Available Donors</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/posts"
                  className="hover:text-green-700 transition-colors flex items-center gap-2"
                >
                  📢 <span>Blood Requests</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/bloodBanks"
                  className="hover:text-green-700 transition-colors flex items-center gap-2"
                >
                  🏥 <span>Blood Banks</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-green-700 transition-colors flex items-center gap-2"
                >
                  📰 <span>Blogs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-black mb-3">
              Contact Info
            </h2>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-700" /> 017*****590,
                018*****409
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-green-700" />{" "}
                support@roktojoddha.com
              </li>
              <li className="flex items-center gap-2">
                <FaFacebook className="text-green-700" />
                <a
                  //   href="https://facebook.com/Roktojoddha"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-green-700"
                >
                  facebook.com/Roktojoddha
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#cfe1b9]"></div>
        {/* Bottom Credits */}
        <div className="text-center text-sm text-gray-700 py-3 px-1">
          <p>© 2025 Roktojoddha || All Rights Reserved.</p>
          <p className="mt-1">
            Developed & Maintained by{" "}
            <a
              href="https://alsafaridoy.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-green-700 hover:underline"
            >
              Ridoy IT Solution
            </a>
          </p>
        </div>
      </MyContainer>
    </div>
  );
};

export default Footer;
