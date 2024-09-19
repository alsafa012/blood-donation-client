import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
const useLoggedUserInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: loggedUserInfo = [], refetch } = useQuery({
    queryKey: ["loggedUserInfo"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/email/${user.email}`);
      return res.data;
    },
  });
  return [loggedUserInfo, refetch];
};

export default useLoggedUserInfo;
