import { createAsyncThunk } from '@reduxjs/toolkit';

import { Video_Categories } from '@/contracts/video';

import axiosHelper from '../helper/axiosHelper';

export const getVideoCategories = createAsyncThunk(
  '/video-category/list',
  async (): Promise<{
    data: { data: Array<Video_Categories> };
    message: string;
    status: number;
  }> => {
    try {
      const resPromise: {
        data: { data: Array<Video_Categories> };
        message: string;
        status: number;
      } = await axiosHelper.get('/video-category/getVideoCategories');

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const createNewVideo = createAsyncThunk(
  '/video/create',
  async (payload: any): Promise<void> => {
    try {
      const resPromise: any = await axiosHelper.post('/video/create', payload);

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
