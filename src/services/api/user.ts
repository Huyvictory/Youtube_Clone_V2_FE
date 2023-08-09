import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserAuthentication } from '@/contracts/auth';
import {
  UpdateUserPassword_Payload,
  UpdateUserProfile_Payload,
} from '@/contracts/profile';

import axiosHelper from '../helper/axiosHelper';

export const getUserProfile = createAsyncThunk(
  '/user/me',
  async (): Promise<{
    message: string;
    status: number;
    data: { data: IUserAuthentication };
  }> => {
    try {
      const resPromise: {
        message: string;
        status: 200;
        data: { data: IUserAuthentication };
      } = await axiosHelper.get('/user/me');

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  '/user/update-profile',
  async (
    payload: UpdateUserProfile_Payload,
  ): Promise<{
    message: string;
    status: number;
    data: { data: IUserAuthentication };
  }> => {
    try {
      const resPromise: {
        message: string;
        status: number;
        data: { data: IUserAuthentication };
      } = await axiosHelper.put('/user/update-profile', payload);

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  '/user/update-password',
  async (
    payload: UpdateUserPassword_Payload,
  ): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.put(
        '/user/update/password',
        payload,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
