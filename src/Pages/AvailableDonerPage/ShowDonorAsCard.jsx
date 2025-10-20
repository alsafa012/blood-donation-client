import { Link } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import { forwardRef } from "react";

const ShowDonorAsCard = forwardRef(({ availableDonor,location }, ref) => {
  // const ShowDonorAsCard = ({ availableDonor }) => {
  return (
    <MyContainer>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 px-1`}
      >
        {/* show searchable data */}
        {/* {[1,2,3,4,5,6,7,8,9,10]?.map((info) => ( */}
        {availableDonor?.map((info) => (
          <div
            id="donor-list"
            className="p-border flex flex-col overflow-hidden rounded-md group"
            key={info._id}
          >
            <div className="overflow-hidden h-[200px] w-full">
              <img
                className="h-[200px] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                // src={info?.user_image}
                src={
                  info?.showImage
                    ? info?.user_image
                    : info?.user_gender === "Male"
                    ? "https://i.ibb.co/mtL872C/image.png"
                    : "https://i.ibb.co.com/270Pssg6/women-hijab.jpg"
                }
                alt="user_image"
              />
            </div>
            <div className="p-2 grow">
              <p className="text-lg md:text-lg font-semibold">
                {info?.user_name}
              </p>
              <div className="text-base md:text-lg font-medium">
                <ShowBloodGroup blood={info?.bloodGroup} />
              </div>

              <p className="text-lg md:text-lg font-medium">
                {info?.user_gender}
              </p>

              {/* <p className="text-lg md:text-lg font-medium">
                  {info?.bloodGroup}
                </p> */}
            </div>
            <Link state={location?.pathname} to={`/availableDonors/${info._id}`}>
              <button className="btn-bg py-2 w-full">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </MyContainer>
  );
});
ShowDonorAsCard.displayName = "ShowDonorAsCard";
export default ShowDonorAsCard;
