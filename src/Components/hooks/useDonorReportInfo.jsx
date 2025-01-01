import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
const useDonorReportInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reportInfo = [], refetch: refetchReportInfo } = useQuery({
    queryKey: ["allReportDonor"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reportDonor");
      return res.data;
    },
  });
  return [reportInfo, refetchReportInfo];
};

export default useDonorReportInfo;