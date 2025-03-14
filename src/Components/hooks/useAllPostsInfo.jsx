import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPostsInfo = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allPostsData = [],
    refetch: refetchPostData,
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
      const postDeadline = new Date(post.post_deadline);
      return postDeadline >= today && post.found_donor_successfully === false;
    })
    .sort(
      (a, b) =>
        new Date(b.postCreatedDate).getTime() -
        new Date(a.postCreatedDate).getTime()
    );

  return [allPostsData, allPostsInfo, refetchPostData, isLoading];
};

export default useAllPostsInfo;
