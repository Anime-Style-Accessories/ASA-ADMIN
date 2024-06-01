import { IBaseResponse } from '@/utils';

export type UserData = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  role?: string; // STAFF, CUSTOMER, ADMIN
};

export type UserDto = IBaseResponse<UserData>;

export type UpdateProfileRequest = Pick<UserData, 'address' | 'avatar'> & {
  phone: string;
  firstName: string;
  lastName: string;
};
