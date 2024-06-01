import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { userService } from './user.service';

export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS.GET_CURRENT_USER],
    queryFn: async () => {
      const res = await userService.getUser();
      return res.data;
    },
  });
};
