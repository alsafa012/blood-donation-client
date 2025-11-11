import { useState } from "react";
import { Link } from "react-router-dom";

const blogPosts = {
  en: [
    {
      id: 1,
      title: "The Importance of Blood Donation",
      content: `Blood donation is a vital aspect of healthcare. It saves millions of lives every year and plays a key role in surgeries, cancer treatment, and trauma care. Regular donations help maintain an adequate blood supply in hospitals. Donating blood not only benefits recipients but also promotes good health for donors by stimulating new blood cell production.`,
      date: "2025-01-01",
      image: "https://images.unsplash.com/photo-1584452964155-ef139340f0db",
    },
    {
      id: 2,
      title: "How to Prepare for Blood Donation",
      content: `Preparing for blood donation ensures a smooth and safe experience. Drink plenty of water before donating to stay hydrated. Eat a balanced meal rich in iron and avoid fatty foods that can affect test results. Get a good night’s sleep and avoid intense workouts before donating. Carry an ID, wear comfortable clothing, and relax during the process.`,
      date: "2025-02-15",
      image:
        "https://images.unsplash.com/photo-1753947687841-eab7644f9a23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: 3,
      title: "Common Myths About Blood Donation",
      content: `Many myths surround blood donation that stop people from donating. A common myth is that donating blood is painful—it's not, just a quick pinch. Some think donating blood can make you weak, but your body quickly replaces the donated blood. Others worry about infection, but all equipment used is sterile and disposable. Understanding the facts encourages more donors.`,
      date: "2025-03-05",
      image:
        "https://images.unsplash.com/photo-1670192117184-d07467e203b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632",
    },
    {
      id: 4,
      title: "The Lifesaving Impact of Blood Donation",
      content: `Each blood donation can save up to three lives. Donated blood is separated into red cells, plasma, and platelets, which help different patients — from accident victims to cancer patients and newborns. Blood donors are silent heroes whose simple act gives others a second chance at life.`,
      date: "2025-04-10",
      image:
        "https://plus.unsplash.com/premium_photo-1682309740788-04a5451ee019?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1512",
    },
    {
      id: 5,
      title: "Who Can Donate Blood?",
      content: `Most healthy individuals aged 17 and older can donate blood. Donors must weigh at least 50 kg, have normal blood pressure, and be free from infections like hepatitis or HIV. Certain medications or recent surgeries may delay eligibility, but these are usually temporary. Always consult the staff at the donation center if you’re unsure.`,
      date: "2025-05-20",
      image:
        "https://plus.unsplash.com/premium_photo-1723187717223-dbb2376b09dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1376",
    },
    {
      id: 6,
      title: "What Happens After You Donate Blood?",
      content: `After donating blood, your body quickly replaces the lost fluid within 24 to 48 hours. Red blood cells are restored within a few weeks. The donated blood is tested, processed, and stored safely for use in hospitals. Donors are advised to rest for a while, drink fluids, and avoid heavy physical activity for the next 24 hours.`,
      date: "2025-06-30",
      image:
        "https://plus.unsplash.com/premium_photo-1723114909883-39bda6919b5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374",
    },
    {
      id: 7,
      title: "Blood Donation Drives: How You Can Get Involved",
      content: `Blood donation drives are a great way to support your community. You can participate by donating, volunteering, or organizing one at your school, office, or neighborhood. Encouraging friends and family to join can significantly boost the impact. Every contribution, no matter how small, helps save lives.`,
      date: "2025-07-15",
      image:
        "https://plus.unsplash.com/premium_photo-1661769338046-e07bc03ff32a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1471",
    },
    {
      id: 8,
      title: "The Future of Blood Donation",
      content: `With technology advancing rapidly, the future of blood donation looks promising. Researchers are exploring artificial blood, advanced storage methods, and mobile apps for donor tracking. Digital platforms now make it easier to connect donors with those in urgent need. These innovations ensure that no life is lost due to a lack of blood.`,
      date: "2025-08-25",
      image:
        "https://images.unsplash.com/photo-1707722716121-4bc9517479f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1487",
    },
    {
      id: 9,
      title: "Health Benefits for Donors",
      content: `Donating blood offers several health benefits. It helps maintain healthy iron levels, improves blood circulation, and may lower the risk of heart disease. It also gives you a sense of purpose and emotional satisfaction knowing you’ve made a life-saving difference. Regular donors often report feeling healthier and happier.`,
      date: "2025-09-10",
      image:
        "https://images.unsplash.com/photo-1640978216799-63d5ac8e884f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: 10,
      title: "How Blood Donation Helps in Emergencies",
      content: `In emergencies like accidents, surgeries, and natural disasters, donated blood becomes a lifeline. Hospitals rely on regular donors to meet sudden demand. Blood is also used for patients with chronic illnesses such as thalassemia or leukemia. Your donation ensures that hospitals are ready to respond instantly when lives are on the line.`,
      date: "2025-10-05",
      image:
        "https://plus.unsplash.com/premium_photo-1723132609929-b981bd671754?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1469",
    },
  ],

  bn: [
    {
      id: 1,
      title: "রক্তদানের গুরুত্ব",
      content: `রক্তদান স্বাস্থ্যসেবার একটি অপরিহার্য অংশ। এটি প্রতি বছর লক্ষ লক্ষ মানুষের জীবন বাঁচায় এবং অপারেশন, ক্যান্সার চিকিৎসা ও দুর্ঘটনাজনিত রক্তক্ষরণে সাহায্য করে। নিয়মিত রক্তদান রক্তের সরবরাহ বজায় রাখে এবং দাতার শরীরেও নতুন রক্তকণিকা উৎপাদনকে উৎসাহিত করে।`,
      date: "2025-01-01",
      image: "https://images.unsplash.com/photo-1584452964155-ef139340f0db",
    },
    {
      id: 2,
      title: "রক্তদানের জন্য প্রস্তুতি",
      content: `রক্তদানের আগে কিছু প্রস্তুতি নিলে প্রক্রিয়াটি সহজ ও নিরাপদ হয়। পর্যাপ্ত পানি পান করুন, লোহা সমৃদ্ধ খাবার খান এবং চর্বিযুক্ত খাবার এড়িয়ে চলুন। পর্যাপ্ত ঘুম নিন ও ভারী ব্যায়াম থেকে বিরত থাকুন। পরিচয়পত্র সাথে নিন, আরামদায়ক পোশাক পরুন এবং শান্ত থাকুন।`,
      date: "2025-02-15",
      image:
        "https://images.unsplash.com/photo-1753947687841-eab7644f9a23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: 3,
      title: "রক্তদানের প্রচলিত ভুল ধারণা",
      content: `রক্তদানের বিষয়ে অনেক ভুল ধারণা প্রচলিত আছে। অনেকে মনে করেন রক্তদান ব্যথাদায়ক বা দুর্বলতা সৃষ্টি করে, যা সত্য নয়। রক্তদান একটি নিরাপদ প্রক্রিয়া যেখানে জীবাণুমুক্ত নতুন সরঞ্জাম ব্যবহৃত হয়। এসব ভুল ধারণা দূর করা গেলে আরও বেশি মানুষ রক্তদানে উৎসাহিত হবে।`,
      date: "2025-03-05",
      image:
        "https://images.unsplash.com/photo-1670192117184-d07467e203b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632",
    },
    {
      id: 4,
      title: "রক্তদানের জীবন রক্ষাকারী প্রভাব",
      content: `একজন দাতার রক্তদান তিনজন মানুষের জীবন বাঁচাতে পারে। রক্তকে লোহিত কণিকা, প্লাজমা এবং প্লেটলেটে ভাগ করা হয়, যা বিভিন্ন রোগীর প্রয়োজনে ব্যবহৃত হয়। তাই প্রতিটি রক্তদাতা একজন নীরব নায়ক, যিনি নতুন জীবনের আশা দেন।`,
      date: "2025-04-10",
      image:
        "https://plus.unsplash.com/premium_photo-1682309740788-04a5451ee019?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1512",
    },
    {
      id: 5,
      title: "কে রক্ত দিতে পারেন?",
      content: `১৭ বছর বা তার বেশি বয়সী এবং কমপক্ষে ৫০ কেজি ওজনের সুস্থ ব্যক্তি রক্ত দিতে পারেন। রক্তচাপ স্বাভাবিক থাকতে হবে এবং সংক্রামক রোগ যেমন হেপাটাইটিস বা এইচআইভি মুক্ত হতে হবে। কোনো ওষুধ গ্রহণ বা সাম্প্রতিক অপারেশন থাকলে তা সাময়িকভাবে রক্তদান বন্ধ রাখতে হতে পারে।`,
      date: "2025-05-20",
      image:
        "https://plus.unsplash.com/premium_photo-1723187717223-dbb2376b09dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1376",
    },
    {
      id: 6,
      title: "রক্তদানের পর কী হয়?",
      content: `রক্তদানের পর শরীর দ্রুত হারানো তরল পুনরায় তৈরি করতে শুরু করে। সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে প্লাজমা পূরণ হয়, আর লোহিত রক্তকণিকা কয়েক সপ্তাহের মধ্যে পুনরায় তৈরি হয়। দানের পর বিশ্রাম নিন, প্রচুর পানি পান করুন এবং ভারী কাজ এড়িয়ে চলুন।`,
      date: "2025-06-30",
      image:
        "https://plus.unsplash.com/premium_photo-1723114909883-39bda6919b5f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374",
    },
    {
      id: 7,
      title: "রক্তদান কর্মসূচিতে অংশগ্রহণ",
      content: `রক্তদান কর্মসূচি সমাজে রক্তের প্রাপ্যতা বাড়াতে গুরুত্বপূর্ণ ভূমিকা রাখে। আপনি নিজে রক্তদান করতে পারেন, স্বেচ্ছাসেবক হতে পারেন বা একটি কর্মসূচি আয়োজন করতে পারেন। বন্ধু ও পরিবারের সদস্যদের উৎসাহিত করলেই আরও অনেক মানুষ এতে যুক্ত হবে।`,
      date: "2025-07-15",
      image:
        "https://plus.unsplash.com/premium_photo-1661769338046-e07bc03ff32a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1471",
    },
    {
      id: 8,
      title: "রক্তদানের ভবিষ্যৎ",
      content: `প্রযুক্তির অগ্রগতির সাথে রক্তদানের ভবিষ্যৎ আরও আশাব্যঞ্জক। কৃত্রিম রক্ত তৈরি, উন্নত সংরক্ষণ প্রযুক্তি এবং মোবাইল অ্যাপের মাধ্যমে রক্তদাতা ও গ্রহীতার সংযোগ আরও সহজ হয়েছে। এসব উদ্ভাবন নিশ্চিত করছে যে কোনো জীবন রক্তের অভাবে ঝুঁকিতে না পড়ে।`,
      date: "2025-08-25",
      image:
        "https://images.unsplash.com/photo-1707722716121-4bc9517479f4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1487",
    },
    {
      id: 9,
      title: "রক্তদাতাদের স্বাস্থ্য উপকারিতা",
      content: `রক্তদান শুধু অন্যের জীবন বাঁচায় না, দাতারও স্বাস্থ্য উপকার করে। এটি শরীরের অতিরিক্ত আয়রন কমায়, রক্ত চলাচল উন্নত করে এবং হৃদরোগের ঝুঁকি হ্রাস করে। পাশাপাশি এটি মানসিক তৃপ্তি ও সামাজিক দায়িত্ববোধ বাড়ায়।`,
      date: "2025-09-10",
      image:
        "https://images.unsplash.com/photo-1640978216799-63d5ac8e884f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
    },
    {
      id: 10,
      title: "জরুরী অবস্থায় রক্তদানের ভূমিকা",
      content: `দুর্ঘটনা, অপারেশন ও প্রাকৃতিক দুর্যোগের সময় রক্তদানের ভূমিকা অপরিসীম। এই সময়ে রক্তই জীবন রক্ষার একমাত্র উপায় হতে পারে। হাসপাতালগুলো নিয়মিত দাতাদের রক্তের উপর নির্ভর করে, তাই নিয়মিত রক্তদানই জরুরি অবস্থায় জীবন বাঁচাতে সাহায্য করে।`,
      date: "2025-10-05",
      image:
        "hhttps://plus.unsplash.com/premium_photo-1723132609929-b981bd671754?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1469",
    },
  ],
};

const Blogs = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [language, setLanguage] = useState("en");

  const togglePost = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };
  return (
    <div className="max-w-7x mx-auto p-8 bg-[#E1F5DA]">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">
          {/* {language === "en" ? "Blog Posts" : "ব্লগ পোস্ট"} */}
          Blogs
        </h2>
        <button
          onClick={toggleLanguage}
          className="btn-bg text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {language === "en" ? "বাংলা" : "English"}
        </button>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 xl:gap-5">
        {blogPosts[language].slice(0, 4).map((post, index) => {
          // Calculate how many blogs are left
          const remainingBlogs = blogPosts[language]?.length - 3;

          // If it's the 4th item, show "+X more" card
          if (index === 3) {
            return (
              <Link
                to={"/blogs"}
                key="more-posts"
                // onClick={() => (window.location.href = "/blogs")}
                className="flex items-center justify-center bg-gray-50 p-border rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition duration-300"
              >
                <span className="text-lg lg:text-2xl font-semibold p-text">
                  +{remainingBlogs} more
                </span>
              </Link>
            );
          }

          // Otherwise show normal blog card
          return (
            <div
              key={post.id}
              className="bg-white p-border rounded-md shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full min-h-16 md:h-48 object-cover"
              />
              <div className="p-1 md:p-4">
                <h3 className="text-base md:text-xl font-semibold mb-1">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-xs mb-3">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed text-justify">
                  {expandedPostId === post.id
                    ? post.content
                    : post.content.substring(0, 50) + "..."}
                </p>
                <button
                  onClick={() => togglePost(post.id)}
                  className="mt-2 text-xs md:text-sm p-text hover:underline font-medium"
                >
                  {expandedPostId === post.id
                    ? language === "en"
                      ? "See Less"
                      : "কম দেখুন"
                    : language === "en"
                    ? "Read More"
                    : "আরও পড়ুন"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
