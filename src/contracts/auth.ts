import { Dayjs } from 'dayjs';

export interface IUserAuthentication {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  username: string;
  Dob: Date | Dayjs | null;
  sex: string | null;
}

export interface IUserAuthentication_Response {
  message: string;
  status: number;
  data: {
    data: { accessToken: string };
  };
}

export type SignUpPayload = Pick<
  IUserAuthentication,
  'firstname' | 'lastname' | 'email' | 'password' | 'Dob' | 'sex'
>;

export type SignUpVerificationResponseType = Pick<
  IUserAuthentication_Response,
  'message' | 'status'
>;

export type SignInPayload = Pick<IUserAuthentication, 'email' | 'password'>;

export type SignInResponseType = Pick<
  IUserAuthentication_Response,
  'data' | 'message' | 'status'
>;

export type VerificationEmailRequestPayload = Pick<IUserAuthentication, 'email'>;
