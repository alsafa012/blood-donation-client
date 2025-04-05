import { Link } from "react-router-dom";
import MyContainer from "../../Shared/MyContainer";
import ShowBloodGroup from "../../Shared/ShowBloodGroup";
import { forwardRef } from "react";
const ShowDonorAsList = forwardRef(({ donorList, hide }, ref) => {
  const fakeData = Array.from({ length: 55 }, (_, i) => ({
    _id: `id${i + 1}`,
    user_name: `User ${i + 1}`,
    bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
    phone_number: `01${Math.floor(100000000 + Math.random() * 900000000)}`,
    user_religious: ["Islam", "Hinduism", "Christianity", "Buddhism"][i % 4],
    user_gender: i % 2 === 0 ? "Male" : "Female",
  }));
  return (
    <MyContainer>
      <div className="overflow-x-auto mx-auto pb-4">
        {/* <h2 className="text-2xl font-semibold text-center mb-4">Donor List</h2> */}
        <table
          ref={ref}
          id="donor-list"
          className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg"
        >
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Sl No.</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Blood Group</th>
              <th className="py-2 px-4 text-left">Phone Number</th>
              <th className="py-2 px-4 text-left">Sex</th>
              <th className="py-2 px-4 text-left">Region</th>
              <th className="py-2 px-4 text-left">Address</th>
              {!hide && <th className="py-2 px-4 text-left">Action</th>}
            </tr>
          </thead>
          <tbody>
            {donorList?.map((info, ind) => (
              <tr key={info?._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 w-[130px]">{ind + 1 || "0"}</td>
                <td className="py-2 px-4">{info?.user_name || ""}</td>
                <td className="py-2 px-4">
                  <ShowBloodGroup blood={info?.bloodGroup || ""} />
                </td>
                <td className="py-2 px-4">{info?.phone_number || ""}</td>
                <td className="py-2 px-4">{info?.user_religious || ""}</td>
                <td className="py-2 px-4">{info?.user_gender || ""}</td>
                <td className="py-2 px-4">{info?.user_address || ""}</td>
                {!hide && (
                  <td className="py-2 px-4">
                    <Link
                      to={`/availableDonors/${info?._id}`}
                      className="hover:underline"
                    >
                      View details
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MyContainer>
  );
});
ShowDonorAsList.displayName = "ShowDonorAsList";
export default ShowDonorAsList;
