// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useAllReviewInfo = () => {
//   const axiosPublic = useAxiosPublic();
//   const { data: reviewInfo = [], refetch: refetchReviews } = useQuery({
//     queryKey: ["allReview"],
//     queryFn: async () => {
//       const res = await axiosPublic.get("/reviews");
//       return res.data;
//     },
//   });

//   return [reviewInfo, refetchReviews];
// };

// export default useAllReviewInfo;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllReviewInfo = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviewInfo = [], refetch: refetchReviews } = useQuery({
    queryKey: ["allReview"],
    queryFn: async () => {
      const [reviewsRes, usersRes] = await Promise.all([
        axiosPublic.get("/reviews"),
        axiosPublic.get("/users"), // Assuming your users' API endpoint is `/users`
      ]);

      const reviews = reviewsRes.data;
      const users = usersRes.data;

      // Merge reviews with corresponding user blood group
      const mergedReviews = reviews?.map((review) => {
        const user = users?.find((u) => u._id === review.reviewer_id);
        return {
          ...review,
          reviewer_bloodGroup: user ? user.bloodGroup : "Unknown", // Add blood group
        };
      });

      return mergedReviews;
    },
  });

  return [reviewInfo, refetchReviews];
};

export default useAllReviewInfo;
