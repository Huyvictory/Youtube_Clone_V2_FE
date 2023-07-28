import { createAsyncThunk } from '@reduxjs/toolkit';

import {
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
