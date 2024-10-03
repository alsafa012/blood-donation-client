import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPostsInfo = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allPostsData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allPosts");
      return res.data;
    },
  });

  // Filter and sort posts
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // console.log("today", today);
  const allPostsInfo = allPostsData
    ?.filter((post) => {
      // const today = new Date();
      // // console.log("today", today);
      const postDeadline = new Date(post.post_deadline);
      // console.log("postD", postDeadline);
      // console.log("today", today);
      // console.log(" postDeadline >= today", postDeadline >= today);
      // console.log("postDeadline", postDeadline);
      return postDeadline >= today && post.found_donor_successfully === false;
    })
    .sort(
      (a, b) =>
        new Date(b.postCreatedDate).getTime() -
        new Date(a.postCreatedDate).getTime()
    );
  // console.log("allPostsInfo", allPostsInfo);

  return [allPostsData,allPostsInfo, refetch, isLoading];
};

export default useAllPostsInfo;
