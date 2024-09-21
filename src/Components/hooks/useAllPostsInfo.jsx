import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPostsInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allPostsData = [], refetch } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allPosts");
      return res.data;
    },
  });

  // Filter and sort posts
  const allPostsInfo = allPostsData
    ?.filter((post) => {
      const today = new Date().getDate();
      console.log("today", today);
      const postDeadline = new Date(post.post_deadline).getDate();
      console.log("postDeadline", postDeadline);
      return postDeadline >= today;
    })
    .sort(
      (a, b) =>
        new Date(b.postCreatedDate).getTime() -
        new Date(a.postCreatedDate).getTime()
    );
  console.log("allPostsInfo", allPostsInfo);

  return [allPostsInfo, refetch];
};

export default useAllPostsInfo;
