import { API_ROUTES } from '@/constants';
import { UserDto } from '@/dto';
import { apiClient } from '@/lib';

export const userService = {
  getUser: async () =>
    await apiClient.get<UserDto>(API_ROUTES.USER.GET_CURRENT_USER),
};
