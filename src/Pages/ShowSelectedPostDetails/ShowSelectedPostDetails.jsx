import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Components/hooks/useAxiosPublic";
import { FaArrowLeft } from "react-icons/fa";

const ShowSelectedPostDetails = () => {
  const [selectedPostDetails, setSelectedPostDetails] = useState([]);
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  // console.log(id);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log("navigate", navigate);

  useState(() => {
    if (id) {
      axiosPublic
        .get(`/single-post-details/${id}`)
        .then((res) => setSelectedPostDetails(res.data));
    }
  }, []);
  const handleNavigate = () => {
    navigate(location.state || "/");
  };

  return (
    <div
      className={`fixed z-[100] flex items-center justify-center top-0 left-0 overflow-hidden min-h-screen max-h-screen w-full bg-black/20 backdrop-blur-sm `}
    >
      <div className="w-[98%] lg:w-[40%] xl:w-[35%] mx-auto p-border rounded-sm max-h-max">
        <div className="bg-gray-50 w-full btn-bg py-1 px-1" title="Back">
          <button
            className="flex items-center p-1 rounded-full hover:bg-[#B5C99A]"
            onClick={handleNavigate}
          >
            <FaArrowLeft size={25} />
          </button>
        </div>
        {/* image and info */}
        <div className="flex justify-between border-b px-1 py-1">
          <div className="flex gap-4">
            <Link to={`/availableDonors/${selectedPostDetails?.creator_id}`}>
              <img
                className="w-[50px] h-[50px] object-cover rounded-full"
                src={selectedPostDetails?.creator_image}
                alt={"creator_image.png"}
              />
            </Link>
            <div>
              <Link
                to={`/availableDonors/${selectedPostDetails?.creator_id}`}
                className="text-[14px] font-semibold"
              >
                {selectedPostDetails?.creator_name}
              </Link>
              <p className="text-[10px]">
                {selectedPostDetails?.post_created_date} at{" "}
                {selectedPostDetails?.post_created_time}
              </p>
              <p className="text-[10px]">
                removed on {selectedPostDetails?.post_deadline}
              </p>
            </div>
          </div>
        </div>
        {/* content */}
        <div>
          {/* texts */}
          <div className="min-h-[120px] px-1 py-2">
            {selectedPostDetails?.comment?.split("\n")?.map((com, ind) =>
              com?.trim() !== "" ? (
                <p className="text-[14px] mt-1" key={ind}>
                  {com}
                </p>
              ) : (
                <br key={ind} />
              )
            )}
          </div>
          {/* image */}
          {selectedPostDetails?.post_images?.length > 0 && (
            <div className="border-t border-[#CFE1B9] flex gap-2 flex-wrap items-center justify-center py-1">
              {selectedPostDetails?.post_images?.map((image, ind) => (
                <div className="size-28" key={ind}>
                  <img
                    className="md:hover:scale-y-105 p-border hover:rounded-md duration-300 size-28 object-cover cursor-pointer"
                    src={image}
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}

          {/* react & comment div */}
          <div className="flex items-center btn-bg gap-2 justify-between text-[14px] p-1">
            <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
              like
            </button>
            <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
              Comment
            </button>
            <button className="px-2 hover:bg-[#B5C99A] py-1 rounded-md">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSelectedPostDetails;
