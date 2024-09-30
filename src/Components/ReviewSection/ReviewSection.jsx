import useLoggedUserInfo from "../hooks/useLoggedUserInfo";

const ReviewSection = () => {
  const [loggedUserInfo] = useLoggedUserInfo()
  console.log(loggedUserInfo);
  const handleSendEmail = (e) => {
    e.preventDefault();
    const formInput = e.target;
    const formData = {
      email: [
        "alsafa012@gmail.com",
        "alsafa024@gmail.com",
        "rjridoy012@gmail.com",
      ],
      // email: formInput.email.value,
      subject: formInput.subject.value,
      body: `
        My name is ${loggedUserInfo?.user_name}.\n
        ${formInput.body.value}\n
        Please contact me via:
        Phone: ${loggedUserInfo?.phone_number}
        Email: ${loggedUserInfo?.user_email}
        WhatsApp: ${loggedUserInfo?.user_whatsapp}
        Messenger: ${loggedUserInfo?.user_messenger}
      `,
    };
    console.log(formData);

    fetch("https://yourmailsender.pythonanywhere.com/send/mail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        alert(data);
        console.log(data);
        // You can add a success message or further processing here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        // You can handle the error with a user notification here
      });
  };
  return (
    <div className="min-h-[50vh] bg-[#B5C99A] mt-5">
      ReviewSection
      <form
        onSubmit={handleSendEmail}
        className="flex flex-col gap-5 w-[40%] mx-auto border p-5"
      >
        <input
          id="email"
          placeholder="email"
          className="px-2 h-[30px] border"
          type="text"
        />
        <input
          id="subject"
          placeholder="subject"
          className="px-2 h-[30px] border"
          type="text"
        />
        <textarea
          className="w-full min-h-[80px] md:min-h-[100px] max-h-[100px] border border-[#CFE1B9] px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#CFE1B9]"
          id="body"
          cols={5}
          placeholder="body"
          name="body"
          required
        />
        <button className="btn w-full">Send</button>
      </form>
    </div>
  );
};

export default ReviewSection;
