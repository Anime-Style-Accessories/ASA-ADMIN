import { IBaseResponse } from '@/utils';
import { UserData } from './user';

export type AuthenticationResponse = IBaseResponse<{
  access_token: string;
  refresh_token: string;
  user: UserData;
}>;

export type AuthenticationRequest = {
  email: string;
  password: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
};
