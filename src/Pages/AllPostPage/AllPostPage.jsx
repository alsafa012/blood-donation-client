import React, { useState } from 'react';
import MyContainer from '../../Shared/MyContainer';

const AllPostPage = () => {
    const [message, setMessage] = useState("");
    const [bloodGroup, setBloodGroup] = useState("AB+"); // Default blood group to filter
  
    const allUsers = [
      {
        id: 1,
        name: "Ridoy",
        image:
          "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726012800&semt=ais_hybrid",
        messenger_link: "https://m.me/rjridoy012",
        blood_group: "AB+",
      },
      {
        id: 2,
        name: "Cake Paradise",
        image:
          "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726012800&semt=ais_hybrid",
        messenger_link: "https://m.me/cakeparadisebd0",
        blood_group: "A+",
      },
      {
        id: 3,
        name: "Safa",
        image:
          "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726012800&semt=ais_hybrid",
        messenger_link: "https://m.me/alsafa012",
        blood_group: "AB+",
      },
      {
        id: 4,
        name: "Zisan",
        image:
          "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726012800&semt=ais_hybrid",
        messenger_link: "https://m.me/zisan05",
        blood_group: "O+",
      },
    ];
  
    const sendMessage = () => {
      // Filter users with the selected blood group
      const filteredUsers = allUsers.filter(
        (user) => user.blood_group === bloodGroup
      );
  
      // Open a new tab for each user with their Messenger link and pre-filled message
      filteredUsers.forEach((user) => {
        const messengerLink = `${user.messenger_link}?ref=${encodeURIComponent(
          message
        )}`;
        console.log(messengerLink);
        //   window.open(messengerLink, "_blank");
      });
    };
  
    return (
      <MyContainer>
        <h2>Blood Donation Request</h2>
  
        <label htmlFor="bloodGroup">Select Blood Group:</label>
        <select
          id="bloodGroup"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="my-5"
        >
          <option value="AB+">AB+</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB-">AB-</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
        </select>
  
        <div className="grid grid-cols-5 gap-5">
          {allUsers
            .filter((user) => user.blood_group === bloodGroup)
            .map((user) => (
              <div key={user.id}>
                <img
                  className="w-[200px] h-[200px]"
                  src={user?.image}
                  alt={user.name}
                />
                <p>{user.name}</p>
                <p>{user.blood_group}</p>
              </div>
            ))}
        </div>
  
        <input
          type="text"
          className="h-10 my-5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
  
        <button className="bg-gray-600 rounded-xl p-3 ml-5" onClick={sendMessage}>
          Send Message
        </button>
      </MyContainer>
    );
  };

export default AllPostPage;