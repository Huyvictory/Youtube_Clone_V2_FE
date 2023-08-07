import { IUserAuthentication, SignInPayload } from './auth';

export type UpdateNamesPayload = Pick<
  IUserAuthentication,
  'firstname' | 'lastname' | 'username'
>;
