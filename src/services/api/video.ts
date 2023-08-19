import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetListVideos_Response, Video_Categories } from '@/contracts/video';

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

export const getListVideos = createAsyncThunk(
  '/video/list',
  async (payload: {
    page: number;
    limit: number;
    videoCategory?: Array<string>;
  }): Promise<{
    data: { data: Array<GetListVideos_Response> };
  }> => {
    try {
      const resPromise: {
        data: { data: Array<GetListVideos_Response> };
      } = await axiosHelper.get(
        `/video/getVideosList?page=${payload.page}&limit=${payload.limit}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
