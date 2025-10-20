
import React, { useState } from "react";
import MyContainer from "../../Shared/MyContainer";

const bloodBanks = [
  { name: "Dhaka Medical College Blood Bank", division: "Dhaka", district: "Dhaka", address: "Dhaka Medical College, Dhaka", phone: "+880123456789", email: "dhakamedical@gmail.com" },
  { name: "Sir Salimullah Medical College Blood Bank", division: "Dhaka", district: "Dhaka", address: "Sir Salimullah Medical College, Dhaka", phone: "+880987654321", email: "ssmc@gmail.com" },
  { name: "Bangladesh Red Crescent Society Blood Bank", division: "Dhaka", district: "Dhaka", address: "59/1, Bijoynagar, Dhaka", phone: "+880112233445", email: "redcresc@gmail.com" },
  { name: "Chittagong Medical College Blood Bank", division: "Chittagong", district: "Chittagong", address: "Chittagong Medical College, Chittagong", phone: "+880223344556", email: "cmc@gmail.com" },
  { name: "Chittagong General Hospital Blood Bank", division: "Chittagong", district: "Chittagong", address: "General Hospital, Chittagong", phone: "+880334455667", email: "ctgh@gmail.com" },
  { name: "Khulna Medical College Blood Bank", division: "Khulna", district: "Khulna", address: "Khulna Medical College, Khulna", phone: "+880445566778", email: "khulna@gmail.com" },
  { name: "Jessore Sadar Hospital Blood Bank", division: "Khulna", district: "Jessore", address: "Jessore Sadar Hospital, Jessore", phone: "+880556677889", email: "jessore@gmail.com" },
  { name: "Barisal Medical College Blood Bank", division: "Barisal", district: "Barisal", address: "Barisal Medical College, Barisal", phone: "+880667788990", email: "barisal@gmail.com" },
  { name: "Rajshahi Medical College Blood Bank", division: "Rajshahi", district: "Rajshahi", address: "Rajshahi Medical College, Rajshahi", phone: "+880778899001", email: "rajshahi@gmail.com" },
  { name: "Bogra Sadar Hospital Blood Bank", division: "Rajshahi", district: "Bogra", address: "Bogra Sadar Hospital, Bogra", phone: "+880889900112", email: "bogra@gmail.com" },
  { name: "Sylhet MAG Osmani Medical College Blood Bank", division: "Sylhet", district: "Sylhet", address: "MAG Osmani Medical College, Sylhet", phone: "+880990011223", email: "sylhet@gmail.com" },
  { name: "Moulvibazar Sadar Hospital Blood Bank", division: "Sylhet", district: "Moulvibazar", address: "Moulvibazar Hospital, Moulvibazar", phone: "+880101112131", email: "moulvibazar@gmail.com" },
  { name: "Rangpur Medical College Blood Bank", division: "Rangpur", district: "Rangpur", address: "Rangpur Medical College, Rangpur", phone: "+880111213141", email: "rangpur@gmail.com" },
  { name: "Dinajpur Sadar Hospital Blood Bank", division: "Rangpur", district: "Dinajpur", address: "Dinajpur Hospital, Dinajpur", phone: "+880121314151", email: "dinajpur@gmail.com" },
  { name: "Comilla Medical College Blood Bank", division: "Chittagong", district: "Comilla", address: "Comilla Medical College, Comilla", phone: "+880131415161", email: "comilla@gmail.com" },
  { name: "Narayanganj General Hospital Blood Bank", division: "Dhaka", district: "Narayanganj", address: "Narayanganj Hospital, Narayanganj", phone: "+880141516171", email: "narayanganj@gmail.com" },
  { name: "Tangail Sadar Hospital Blood Bank", division: "Dhaka", district: "Tangail", address: "Tangail Hospital, Tangail", phone: "+880151617181", email: "tangail@gmail.com" },
  { name: "Mymensingh Medical College Blood Bank", division: "Mymensingh", district: "Mymensingh", address: "Mymensingh Medical College, Mymensingh", phone: "+880161718192", email: "mymensingh@gmail.com" },
  { name: "Pabna Sadar Hospital Blood Bank", division: "Rajshahi", district: "Pabna", address: "Pabna Hospital, Pabna", phone: "+880171819202", email: "pabna@gmail.com" },
  { name: "Brahmanbaria Sadar Hospital Blood Bank", division: "Chittagong", district: "Brahmanbaria", address: "Brahmanbaria Hospital, Brahmanbaria", phone: "+880181920212", email: "brahmanbaria@gmail.com" }
];
const BloodBankPage = () => {
  const [search, setSearch] = useState("");
  const [division, setDivision] = useState("All");

  const divisions = ["All", ...new Set(bloodBanks.map(bank => bank.division))];

  const filteredBanks = bloodBanks.filter(bank => {
    const matchesSearch =
      bank.name.toLowerCase().includes(search.toLowerCase()) ||
      bank.district.toLowerCase().includes(search.toLowerCase());
    const matchesDivision = division === "All" || bank.division === division;
    return matchesSearch && matchesDivision;
  });

  return (
    // <MyContainer>
    <div className="max-w-7xl mx-auto py-6 px-4">
       <h2 className="text-xl lg:text-3xl font-bold mb-5">
        Blood Banks in Bangladesh
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or district"
          className="flex-1 p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#CFE1B9]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#CFE1B9]"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        >
          {divisions.map((div, idx) => (
            <option key={idx} value={div}>{div}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBanks.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No blood banks found
          </p>
        ) : (
          filteredBanks.map((bank, idx) => (
            <div key={idx} className="p-5 border rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{bank.name}</h3>
              <p><span className="font-semibold">Division:</span> {bank.division}</p>
              <p><span className="font-semibold">District:</span> {bank.district}</p>
              <p><span className="font-semibold">Address:</span> {bank.address}</p>
              <p><span className="font-semibold">Phone:</span> {bank.phone}</p>
              <p><span className="font-semibold">Email:</span> {bank.email}</p>
            </div>
          ))
        )}
      </div>
     </div>
    // </MyContainer>
  );
};

export default BloodBankPage;
