import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createPlaylist_Payload,
  Playlist_Videos,
  PlaylistDetail,
} from '@/contracts/playlist';

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

export const getPlaylistDetail = createAsyncThunk(
  '/playlist/detail',
  async ({
    playlistId,
  }: {
    playlistId: string;
  }): Promise<{ data: { data: PlaylistDetail } }> => {
    try {
      const resPromise: { data: { data: PlaylistDetail } } = await axiosHelper.get(
        `/playlist/detail/${playlistId}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const addOrDeleteVideo_Playlist = createAsyncThunk(
  '/playlist/add_delete',
  async (payload: {
    video_id: string;
    playlistId: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: {
        data: { data: Playlist_Videos };
        message: string;
        status: number;
      } = await axiosHelper.patch(`/playlist/update/video/${payload.playlistId}`, {
        videoId: payload.video_id,
      });

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
