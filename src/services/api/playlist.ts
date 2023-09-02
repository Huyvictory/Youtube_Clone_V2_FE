import { createAsyncThunk } from '@reduxjs/toolkit';

import { createPlaylist_Payload, PlaylistDetail } from '@/contracts/playlist';

import axiosHelper from '../helper/axiosHelper';

export const createNewPlaylist = createAsyncThunk(
  '/playlist/new',
  async (
    payload: createPlaylist_Payload,
  ): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.post(
        '/playlist/create',
        payload,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const getListPlaylists_Channel = createAsyncThunk(
  '/playlist/list/channel',
  async (payload: {
    channel_id: string;
  }): Promise<{ data: { data: Array<PlaylistDetail> } }> => {
    try {
      const resPromise: { data: { data: Array<PlaylistDetail> } } = await axiosHelper.get(
        `/playlist/list/${payload.channel_id}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
