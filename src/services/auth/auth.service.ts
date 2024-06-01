import { API_ROUTES } from '@/constants';
import { AuthenticationRequest, AuthenticationResponse } from '@/dto';
import { apiClient } from '@/lib';

export const authService = {
  login: async (data: AuthenticationRequest) =>
    await apiClient.post<AuthenticationResponse>(API_ROUTES.AUTH.LOGIN, data),
  logout: async () => await apiClient.post<void>(API_ROUTES.AUTH.LOGOUT),
};
