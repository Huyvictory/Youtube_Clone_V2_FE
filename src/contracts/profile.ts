import { Dayjs } from 'dayjs';

export interface UserProfile {
  email: string | null;
  password: string | null;
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  Dob: Date | Dayjs | null;
  sex: string | null;
  user_avatar_media_id: { media_url: string | undefined };
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
