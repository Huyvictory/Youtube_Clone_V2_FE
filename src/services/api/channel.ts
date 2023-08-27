import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetChannelDetail_Response } from '@/contracts/channel';

import axiosHelper from '../helper/axiosHelper';

export const getChannelDetail = createAsyncThunk(
  '/channel/details',
  async (): Promise<GetChannelDetail_Response> => {
    try {
      const resPromise: GetChannelDetail_Response = await axiosHelper.get(
        '/channel/details',
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const UpdateOrCreateChannelBanner = createAsyncThunk(
  '/channel/banner',
  async (
    payload: any,
  ): Promise<{ data: { data: string; message: string; status: number } }> => {
    try {
      const resPromise: { data: { data: string; message: string; status: number } } =
        await axiosHelper.post('/channel/banner', payload);

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
