import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IUserAuthentication_Response,
  SignInPayload,
  SignInResponseType,
  SignUpPayload,
  SignUpVerificationResponseType,
  VerificationEmailRequestPayload,
} from '@/contracts/auth';

import axiosHelper from '../helper/axiosHelper';

export const signUp = createAsyncThunk(
  '/auth/sign-up',
  async (payload: SignUpPayload): Promise<SignUpVerificationResponseType> => {
    try {
      const resPromise: SignUpVerificationResponseType = await axiosHelper.post(
        '/auth/sign-up',
        payload,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const signIn = createAsyncThunk(
  '/auth/sign-in',
  async (payload: SignInPayload): Promise<SignInResponseType> => {
    try {
      const resPromise: SignInResponseType = await axiosHelper.post(
        '/auth/sign-in',
        payload,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const verifyEmail = createAsyncThunk(
  '/auth/emailVerification',
  async (payload: string): Promise<SignInResponseType> => {
    try {
      const resPromise: SignInResponseType = await axiosHelper.post(
        `/auth/verification/${payload}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const requestEmailVerification = createAsyncThunk(
  '/auth/requestEmailVerification',
  async (
    payload: VerificationEmailRequestPayload,
  ): Promise<SignUpVerificationResponseType> => {
    try {
      const resPromise: SignInResponseType = await axiosHelper.post(
        '/auth/verification/request',
        payload,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const requestEmailResetPassword = createAsyncThunk(
  '/auth/emailRequestResetPassword',
  async (payload: {
    email: string;
  }): Promise<{ id: string; message: string; status: number }> => {
    try {
      const resPromise: { id: string; message: string; status: number } =
        await axiosHelper.post('/auth/password/request-reset', payload);

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const validteResetPasswordCode = createAsyncThunk(
  '/auth/validateResetPasswordCode',
  async (payload: {
    reset_password_code: string;
    reset_password_token: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.put(
        `/auth/password/check-reset-password-code/${payload.reset_password_token}`,
        { reset_password_code: payload.reset_password_code },
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const resetNewPassword = createAsyncThunk(
  '/auth/resetNewPassword',
  async (payload: {
    newPassword: string;
    confirmNewPassword: string;
    reset_password_token: string;
  }): Promise<IUserAuthentication_Response> => {
    try {
      const resPromise: IUserAuthentication_Response = await axiosHelper.post(
        `/auth/password/new/${payload.reset_password_token}`,
        {
          newPassword: payload.newPassword,
          confirmNewPassword: payload.confirmNewPassword,
        },
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
