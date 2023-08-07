export enum AUTH_TOKEN {
  AUTH_TOKEN = '@AUTH_TOKEN_YC',
  USER_EMAIL = '@USER_EMAIL',
}

export enum PROFILE_FORMS {
  PROFILE_PICTURE = 'Profile Picture',
  PROFILE_NAME = 'Name',
  PROFILE_BIRTHDAY = 'Birthday',
  PROFILE_GENDER = 'Gender',
  PROFILE_PASSWORD = 'Password',
}

export const ExceptionCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CUSTOM_EXCEPTION: 420,
  SERVER_ERROR: 500,
};

export const toastOptions = {
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  progress: undefined,
};
