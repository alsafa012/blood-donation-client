import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
const useAllUsersInfo = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allUsers = [], refetch: refetchUser } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users");
            return res.data;
        },
    });
    return [allUsers, refetchUser];
};

export default useAllUsersInfo;