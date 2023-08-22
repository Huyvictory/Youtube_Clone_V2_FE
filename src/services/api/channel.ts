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
