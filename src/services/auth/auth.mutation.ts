import { AuthenticationRequest } from '@/dto';
import { useMutation } from '@tanstack/react-query';
import { authService } from './auth.service';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: AuthenticationRequest) => {
      const res = await authService.login(data);
      return res.data;
    },
  });
};
