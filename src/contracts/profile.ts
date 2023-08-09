import { Dayjs } from 'dayjs';

interface UserProfile {
  email: string | null;
  password: string | null;
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  Dob: Date | Dayjs | null;
  sex: string | null;
}

export type UpdateUserProfile_Payload = Pick<
  UserProfile,
  'firstname' | 'lastname' | 'username' | 'Dob' | 'sex'
>;

export type UpdateUserPassword_Payload = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
