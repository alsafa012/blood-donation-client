import { useState } from "react";

const blogPosts = {
  en: [
    {
      id: 1,
      title: "The Importance of Blood Donation",
      content: `Blood donation is a vital aspect of healthcare. It saves lives and supports various medical procedures. Donating blood is a simple process that can have a huge impact.`,
      date: "2023-01-01",
      image: "https://images.unsplash.com/photo-1584452964155-ef139340f0db",
    },
    {
      id: 2,
      title: "How to Prepare for Blood Donation",
      content: `Preparing for blood donation is crucial to ensure a smooth process. Stay hydrated, eat a healthy meal, and avoid heavy exercise before donating.`,
      date: "2023-02-15",
      image: "https://images.unsplash.com/photo-1600959907703-125ba1d5c4c6",
    },
    {
      id: 3,
      title: "Common Myths About Blood Donation",
      content: `Many myths surround blood donation that can deter potential donors. One common myth is that donating blood is painful.`,
      date: "2023-03-05",
      image: "https://images.unsplash.com/photo-1588774069163-59c30b974ef3",
    },
    {
      id: 4,
      title: "The Lifesaving Impact of Blood Donation",
      content: `Blood donation can save up to three lives with just one donation.`,
      date: "2023-04-10",
      image: "https://images.unsplash.com/photo-1603398938378-d8d3b0a67a1f",
    },
    {
      id: 5,
      title: "Who Can Donate Blood?",
      content: `Most healthy individuals aged 17 and older can donate blood.`,
      date: "2023-05-20",
      image: "https://images.unsplash.com/photo-1600958565728-37d1f9c58d1d",
    },
    {
      id: 6,
      title: "What Happens After You Donate Blood?",
      content: `After donating blood, your body begins to replenish the lost volume quickly.`,
      date: "2023-06-30",
      image: "https://images.unsplash.com/photo-1588776814546-77bdfb56cb6d",
    },
    {
      id: 7,
      title: "Blood Donation Drives: How You Can Get Involved",
      content: `Community blood drives are essential for increasing blood donations.`,
      date: "2023-07-15",
      image: "https://images.unsplash.com/photo-1600958491450-59e38a1f10f8",
    },
    {
      id: 8,
      title: "The Future of Blood Donation",
      content: `With advancements in technology, the future of blood donation looks promising.`,
      date: "2023-08-25",
      image: "https://images.unsplash.com/photo-1600958549485-cc5283a43b4f",
    },
    {
      id: 9,
      title: "Health Benefits for Donors",
      content: `Blood donation can improve heart health and reduce harmful iron stores.`,
      date: "2023-09-10",
      image: "https://images.unsplash.com/photo-1600958563340-4aa90f3dcded",
    },
    {
      id: 10,
      title: "How Blood Donation Helps in Emergencies",
      content: `Blood is crucial in accidents, surgeries, and disaster relief efforts.`,
      date: "2023-10-05",
      image: "https://images.unsplash.com/photo-1584452964155-ef139340f0db",
    },
  ],
  bn: [
    {
      id: 1,
      title: "রক্তদানের গুরুত্ব",
      content: `রক্তদান স্বাস্থ্যসেবার একটি গুরুত্বপূর্ণ অংশ। এটি জীবন বাঁচায় এবং চিকিৎসাকে সহায়তা করে।`,
      date: "2023-01-01",
      image: "https://images.unsplash.com/photo-1584452964155-ef139340f0db",
    },
    {
      id: 2,
      title: "রক্তদানের জন্য প্রস্তুতি",
      content: `রক্তদানের আগে পর্যাপ্ত পানি পান করুন, স্বাস্থ্যকর খাবার খান এবং ভারী ব্যায়াম এড়িয়ে চলুন।`,
      date: "2023-02-15",
      image: "https://images.unsplash.com/photo-1600959907703-125ba1d5c4c6",
    },
    {
      id: 3,
      title: "রক্তদানের প্রচলিত ভুল ধারণা",
      content: `অনেকেই মনে করেন রক্তদান খুব ব্যথাদায়ক, যা আসলে সঠিক নয়।`,
      date: "2023-03-05",
      image: "https://images.unsplash.com/photo-1588774069163-59c30b974ef3",
    },
    {
      id: 4,
      title: "রক্তদানের জীবন রক্ষাকারী প্রভাব",
      content: `একবার রক্তদান তিনজন মানুষের জীবন বাঁচাতে পারে।`,
      date: "2023-04-10",
      image: "https://images.unsplash.com/photo-1603398938378-d8d3b0a67a1f",
    },
    {
      id: 5,
      title: "কে রক্ত দিতে পারেন?",
      content: `১৭ বছর বা তার বেশি বয়সী সুস্থ ব্যক্তিরা রক্ত দিতে পারেন।`,
      date: "2023-05-20",
      image: "https://images.unsplash.com/photo-1600958565728-37d1f9c58d1d",
    },
    {
      id: 6,
      title: "রক্তদানের পর কী হয়?",
      content: `রক্তদানের পর শরীর দ্রুত নতুন রক্ত তৈরি শুরু করে।`,
      date: "2023-06-30",
      image: "https://images.unsplash.com/photo-1588776814546-77bdfb56cb6d",
    },
    {
      id: 7,
      title: "রক্তদান কর্মসূচিতে অংশগ্রহণ",
      content: `কমিউনিটি রক্তদান কর্মসূচি রক্তদানের হার বাড়াতে সাহায্য করে।`,
      date: "2023-07-15",
      image: "https://images.unsplash.com/photo-1600958491450-59e38a1f10f8",
    },
    {
      id: 8,
      title: "রক্তদানের ভবিষ্যৎ",
      content: `প্রযুক্তির অগ্রগতির সাথে রক্তদানের ভবিষ্যৎ আরও উজ্জ্বল।`,
      date: "2023-08-25",
      image: "https://images.unsplash.com/photo-1600958549485-cc5283a43b4f",
    },
    {
      id: 9,
      title: "রক্তদাতাদের স্বাস্থ্য উপকারিতা",
      content: `রক্তদান হৃদরোগের ঝুঁকি কমাতে এবং আয়রন নিয়ন্ত্রণে রাখতে সাহায্য করে।`,
      date: "2023-09-10",
      image: "https://images.unsplash.com/photo-1600958563340-4aa90f3dcded",
    },
    {
      id: 10,
      title: "জরুরী অবস্থায় রক্তদানের ভূমিকা",
      content: `দুর্ঘটনা, অপারেশন এবং প্রাকৃতিক দুর্যোগে রক্ত অপরিহার্য।`,
      date: "2023-10-05",
      image: "https://images.unsplash.com/photo-1584452964155-ef139340f0db",
    },
  ],
};

const BlogPage = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [language, setLanguage] = useState("en");

  const togglePost = (id) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">
          {language === "en" ? "Blog Posts" : "ব্লগ পোস্ট"}
        </h2>
        <button
          onClick={toggleLanguage}
          className="btn-bg text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {language === "en" ? "বাংলা" : "English"}
        </button>
      </div>

      {/* Blog List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-5">
        {blogPosts[language].map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg md:text-xl font-semibold mb-1">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-3">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {expandedPostId === post.id
                  ? post.content
                  : post.content.substring(0, 50) + "..."}
              </p>
              <button
                onClick={() => togglePost(post.id)}
                className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium"
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
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
