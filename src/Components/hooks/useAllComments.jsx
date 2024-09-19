import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllComments = () => {
  const axiosPublic = useAxiosPublic();
  const { data: allCommentsInfo = [], refetch: refetchComments } = useQuery({
    queryKey: ["allComments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allComments");
      return res.data;
    },
  });

  return [allCommentsInfo, refetchComments];
};

export default useAllComments;
