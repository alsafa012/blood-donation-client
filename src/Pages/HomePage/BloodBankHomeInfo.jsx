import { Link } from "react-router-dom";

const bloodBanks = [
  {
    name: "Dhaka Medical College Blood Bank",
    division: "Dhaka",
    district: "Dhaka",
    address: "Dhaka Medical College, Dhaka",
    phone: "+880123456789",
    email: "dhakamedical@gmail.com",
  },
  {
    name: "Sir Salimullah Medical College Blood Bank",
    division: "Dhaka",
    district: "Dhaka",
    address: "Sir Salimullah Medical College, Dhaka",
    phone: "+880987654321",
    email: "ssmc@gmail.com",
  },
  {
    name: "Bangladesh Red Crescent Society Blood Bank",
    division: "Dhaka",
    district: "Dhaka",
    address: "59/1, Bijoynagar, Dhaka",
    phone: "+880112233445",
    email: "redcresc@gmail.com",
  },
  {
    name: "Chittagong Medical College Blood Bank",
    division: "Chittagong",
    district: "Chittagong",
    address: "Chittagong Medical College, Chittagong",
    phone: "+880223344556",
    email: "cmc@gmail.com",
  },
  {
    name: "Chittagong General Hospital Blood Bank",
    division: "Chittagong",
    district: "Chittagong",
    address: "General Hospital, Chittagong",
    phone: "+880334455667",
    email: "ctgh@gmail.com",
  },
  {
    name: "Khulna Medical College Blood Bank",
    division: "Khulna",
    district: "Khulna",
    address: "Khulna Medical College, Khulna",
    phone: "+880445566778",
    email: "khulna@gmail.com",
  },
  {
    name: "Jessore Sadar Hospital Blood Bank",
    division: "Khulna",
    district: "Jessore",
    address: "Jessore Sadar Hospital, Jessore",
    phone: "+880556677889",
    email: "jessore@gmail.com",
  },
  {
    name: "Barisal Medical College Blood Bank",
    division: "Barisal",
    district: "Barisal",
    address: "Barisal Medical College, Barisal",
    phone: "+880667788990",
    email: "barisal@gmail.com",
  },
  {
    name: "Rajshahi Medical College Blood Bank",
    division: "Rajshahi",
    district: "Rajshahi",
    address: "Rajshahi Medical College, Rajshahi",
    phone: "+880778899001",
    email: "rajshahi@gmail.com",
  },
  {
    name: "Bogra Sadar Hospital Blood Bank",
    division: "Rajshahi",
    district: "Bogra",
    address: "Bogra Sadar Hospital, Bogra",
    phone: "+880889900112",
    email: "bogra@gmail.com",
  },
  {
    name: "Sylhet MAG Osmani Medical College Blood Bank",
    division: "Sylhet",
    district: "Sylhet",
    address: "MAG Osmani Medical College, Sylhet",
    phone: "+880990011223",
    email: "sylhet@gmail.com",
  },
  {
    name: "Moulvibazar Sadar Hospital Blood Bank",
    division: "Sylhet",
    district: "Moulvibazar",
    address: "Moulvibazar Hospital, Moulvibazar",
    phone: "+880101112131",
    email: "moulvibazar@gmail.com",
  },
  {
    name: "Rangpur Medical College Blood Bank",
    division: "Rangpur",
    district: "Rangpur",
    address: "Rangpur Medical College, Rangpur",
    phone: "+880111213141",
    email: "rangpur@gmail.com",
  },
  {
    name: "Dinajpur Sadar Hospital Blood Bank",
    division: "Rangpur",
    district: "Dinajpur",
    address: "Dinajpur Hospital, Dinajpur",
    phone: "+880121314151",
    email: "dinajpur@gmail.com",
  },
  {
    name: "Comilla Medical College Blood Bank",
    division: "Chittagong",
    district: "Comilla",
    address: "Comilla Medical College, Comilla",
    phone: "+880131415161",
    email: "comilla@gmail.com",
  },
  {
    name: "Narayanganj General Hospital Blood Bank",
    division: "Dhaka",
    district: "Narayanganj",
    address: "Narayanganj Hospital, Narayanganj",
    phone: "+880141516171",
    email: "narayanganj@gmail.com",
  },
  {
    name: "Tangail Sadar Hospital Blood Bank",
    division: "Dhaka",
    district: "Tangail",
    address: "Tangail Hospital, Tangail",
    phone: "+880151617181",
    email: "tangail@gmail.com",
  },
  {
    name: "Mymensingh Medical College Blood Bank",
    division: "Mymensingh",
    district: "Mymensingh",
    address: "Mymensingh Medical College, Mymensingh",
    phone: "+880161718192",
    email: "mymensingh@gmail.com",
  },
  {
    name: "Pabna Sadar Hospital Blood Bank",
    division: "Rajshahi",
    district: "Pabna",
    address: "Pabna Hospital, Pabna",
    phone: "+880171819202",
    email: "pabna@gmail.com",
  },
  {
    name: "Brahmanbaria Sadar Hospital Blood Bank",
    division: "Chittagong",
    district: "Brahmanbaria",
    address: "Brahmanbaria Hospital, Brahmanbaria",
    phone: "+880181920212",
    email: "brahmanbaria@gmail.com",
  },
];
const BloodBankHomeInfo = () => {
  return (
    // <div className="max-w-screen-2xl mx-auto py-6 px-4">
    <div className="p-8 bg-[#E1F5DA]">
      <h2 className="text-xl lg:text-3xl font-bold mb-5">
        Blood Banks in Bangladesh
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
        {bloodBanks?.slice(0, 6).map((bank, idx) => {
          // Calculate how many blogs are left
          const remainingBlogs = bloodBanks?.length - 3;

          // If it's the 4th item, show "+X more" card
          if (idx === 5) {
            return (
              <Link
                to={"/bloodBanks"}
                key="more-posts"
                // onClick={() => (window.location.href = "/blogs")}
                className="flex items-center justify-center bg-gray-50 p-border rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition duration-300"
              >
                <span className="text-lg lg:text-2xl font-semibold text-green-700">
                  +{remainingBlogs} more
                </span>
              </Link>
            );
          }

          return (
            <div
              key={idx}
              className="p-2 md:p-3 bg-white p-border rounded-lg shadow hover:shadow-sm transition"
            >
              <h3 className="text-xl font-semibold mb-2">{bank.name}</h3>
              <p>
                <span className="font-semibold">Division:</span> {bank.division}
              </p>
              <p>
                <span className="font-semibold">District:</span> {bank.district}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {bank.address}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {bank.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {bank.email}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BloodBankHomeInfo;
