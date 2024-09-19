import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPostsInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allPostsInfo = [], refetch } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allPosts");
      return res.data;
    },
  });

  return [allPostsInfo, refetch];
};

export default useAllPostsInfo;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useAllPostsInfo = () => {
//   const axiosPublic = useAxiosPublic();
//   const { data: allPostsInfo = [], refetch } = useQuery({
//     queryKey: ["allPosts"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/allPosts");
//       return res.data;
//     },
//   });

//   // Filter posts that have a valid deadline (posts where the deadline hasn't passed)
//   const filteredPosts = allPostsInfo.filter((post) => {
//     const today = new Date();
//     const postDeadline = new Date(post.post_deadline);
//     return postDeadline >= today; // Show only posts whose deadline is today or in the future
//   });

//   return [filteredPosts, refetch];
// };

// export default useAllPostsInfo;

// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useAllPostsInfo = () => {
//   const axiosPublic = useAxiosPublic();
//   const { data: allPostsInfo = [], refetch } = useQuery({
//     queryKey: ["allPosts"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/allPosts");
//       return res.data;
//     },
//   });

//   // Filter and sort posts
//   const filteredAndSortedPosts = allPostsInfo
//     .filter((post) => {
//       const today = new Date();
//       const postDeadline = new Date(post.post_deadline);
//       return postDeadline >= today; // Keep only posts with future deadlines
//     })
//     .sort((a, b) => new Date(b.postCreatedDate) - new Date(a.postCreatedDate)); // Sort by post creation date (newest first)

//   return [filteredAndSortedPosts, refetch];
// };

// export default useAllPostsInfo;
