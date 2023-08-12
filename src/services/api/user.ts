import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUserAuthentication } from '@/contracts/auth';
import {
  UpdateUserPassword_Payload,
  UpdateUserProfile_Payload,
  UserProfile,
} from '@/contracts/profile';

import axiosHelper from '../helper/axiosHelper';

export const getUserProfile = createAsyncThunk(
  '/user/me',
  async (): Promise<{
    message: string;
    status: number;
    data: { data: UserProfile };
  }> => {
    try {
      const resPromise: {
        message: string;
        status: 200;
        data: { data: UserProfile };
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
    data: { data: UserProfile };
  }> => {
    try {
      const resPromise: {
        message: string;
        status: number;
        data: { data: UserProfile };
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

export const updateUserAvatar = createAsyncThunk(
  '/user/update-avatar',
  async (payload: any): Promise<{ data: { data: { mediaUrl: string } } }> => {
    try {
      const resPromise: { data: { data: { mediaUrl: string } } } = await axiosHelper.put(
        '/update/user/avatar_profile',
        payload,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
