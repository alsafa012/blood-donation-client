import { useLoaderData } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import WebsiteTitle from "../../Shared/WebsiteTitle";

const ShowAvailableDonorDetails = () => {
  const donorDetails = useLoaderData();
  return (
    <MyContainer>
      <WebsiteTitle name={`${donorDetails?.user_name}'s Details`} />
      <div className="px-1 flex gap-2 flex-col lg:flex-row justify-center mt-5">
        <div className="mx-aut border">
          <img
            className="h-[180px] w-full md:h-[300px] lg:h-[350px] object-fill rounded-md"
            src={donorDetails?.user_image}
            alt=""
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Name: {donorDetails?.user_name}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Age:{donorDetails?.user_age}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Blood Group: {donorDetails?.bloodGroup}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Phone No: {donorDetails?.phone_number}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Contact Via Email: {donorDetails?.user_email}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Contact Via Whatsapp: {donorDetails?.user_whatsapp}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Contact Via Messenger: {donorDetails?.user_messenger}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Nationality: {donorDetails?.user_nationality}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Address: {donorDetails?.user_address}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            MaritalStatus: {donorDetails?.user_maritalStatus}
          </p>
          <p className="text-lg lg:text-xl xl:text-2xl font-medium">
            Religion: {donorDetails?.user_religious}
          </p>
        </div>
      </div>
    </MyContainer>
  );
};

export default ShowAvailableDonorDetails;
