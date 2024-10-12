import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Importance of Blood Donation",
    content: `Blood donation is a vital aspect of healthcare. It saves lives and supports various medical procedures. Donating blood is a simple process that can have a huge impact. We encourage everyone to consider becoming a donor.`,
    date: "2023-01-01",
  },
  {
    id: 2,
    title: "How to Prepare for Blood Donation",
    content: `Preparing for blood donation is crucial to ensure a smooth process. It's important to stay hydrated, eat a healthy meal, and avoid heavy exercise before donating. Remember, your donation can save a life!`,
    date: "2023-02-15",
  },
  {
    id: 3,
    title: "Common Myths About Blood Donation",
    content: `Many myths surround blood donation that can deter potential donors. One common myth is that donating blood is painful. In reality, most donors report feeling only a slight pinch. Understanding the facts can help more people become donors.`,
    date: "2023-03-05",
  },
  {
    id: 4,
    title: "The Lifesaving Impact of Blood Donation",
    content: `Blood donation can save up to three lives with just one donation. It is crucial for surgeries, cancer treatments, and trauma care. Every drop counts, and your contribution can make a difference in your community.`,
    date: "2023-04-10",
  },
  {
    id: 5,
    title: "Who Can Donate Blood?",
    content: `Most healthy individuals aged 17 and older can donate blood. However, certain conditions or medications may disqualify someone. It's essential to check eligibility criteria before donating to ensure safety for both the donor and recipient.`,
    date: "2023-05-20",
  },
  {
    id: 6,
    title: "What Happens After You Donate Blood?",
    content: `After donating blood, your body begins to replenish the lost volume quickly. It takes a few weeks for your body to replace the red blood cells. Donors are encouraged to take care of themselves by hydrating and eating iron-rich foods.`,
    date: "2023-06-30",
  },
  {
    id: 7,
    title: "Blood Donation Drives: How You Can Get Involved",
    content: `Community blood drives are essential for increasing blood donations. You can organize or participate in local blood drives to help raise awareness and encourage others to donate. Every effort helps save lives.`,
    date: "2023-07-15",
  },
  {
    id: 8,
    title: "The Future of Blood Donation",
    content: `With advancements in technology, the future of blood donation looks promising. Research is underway for artificial blood and improved storage methods, potentially changing how we approach blood donation and transfusions.`,
    date: "2023-08-25",
  },
  // Add more posts as needed
];

const Blogs = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const togglePost = (id) => {
    if (expandedPostId === id) {
      setExpandedPostId(null); // Collapse if already expanded
    } else {
      setExpandedPostId(id); // Expand the selected post
    }
  };
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-5">Blog Posts</h2>
      {blogPosts?.map((post) => (
        <div key={post.id} className="border p-4 mb-4 rounded">
          <h3 className="text-xl font-semibold">{post?.title}</h3>
          <p className="text-gray-600 mb-2">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            {expandedPostId === post.id
              ? post?.content
              : post?.content?.substring(0, 100) + "..."}
          </p>
          <button
            onClick={() => togglePost(post.id)}
            className="text-blue-500 mt-2"
          >
            {expandedPostId === post.id ? "See Less" : "Read More"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
