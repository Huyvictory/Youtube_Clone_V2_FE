import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  GetListVideos_Response,
  GetVideoByID_Response,
  Video_Categories,
} from '@/contracts/video';

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
    videoCategory?: string;
  }): Promise<{
    data: { data: Array<GetListVideos_Response> };
  }> => {
    let urlAPICall = `/video/getVideosList?page=${payload.page}&limit=${payload.limit}`;

    if (payload.videoCategory) {
      urlAPICall += `&videoCategory=${payload.videoCategory}`;
    }
    try {
      const resPromise: {
        data: { data: Array<GetListVideos_Response> };
      } = await axiosHelper.get(urlAPICall);

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const getVideoByItsId = createAsyncThunk(
  '/video/detail',
  async (payload: {
    videoId: string;
  }): Promise<{ data: { data: GetVideoByID_Response } }> => {
    try {
      const resPromise: { data: { data: GetVideoByID_Response } } = await axiosHelper.get(
        `/video/getVideoDetail/${payload.videoId}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
