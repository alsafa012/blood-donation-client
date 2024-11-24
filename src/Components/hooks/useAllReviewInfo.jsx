import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllReviewInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviewInfo = [], refetch: refetchReviews } = useQuery({
    queryKey: ["allReview"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  return [reviewInfo, refetchReviews];
};

export default useAllReviewInfo;
