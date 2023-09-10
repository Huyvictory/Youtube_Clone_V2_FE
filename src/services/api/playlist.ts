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

export const getPlaylistsVideo = createAsyncThunk(
  '/playlist/playlists/video',
  async ({
    video_id,
  }: {
    video_id: string;
  }): Promise<{
    data: {
      data: {
        _id: string;
        video_playlists: Array<string>;
      };
    };
  }> => {
    try {
      const resPromise: {
        data: {
          data: {
            _id: string;
            video_playlists: Array<string>;
          };
        };
      } = await axiosHelper.get(`/video/getPlaylistsVideo/${video_id}`);

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

export const updatePlaylistInformation = createAsyncThunk(
  '/playlist/update/info-playlist',
  async (payload: {
    playlist_name?: string;
    playlist_description?: string;
    playlistId: string;
  }): Promise<{
    message: string;
    status: number;
  }> => {
    try {
      const resPromise: {
        message: string;
        status: number;
      } = await axiosHelper.put(`/playlist/update/information/${payload.playlistId}`, {
        playlist_name: payload.playlist_name,
        playlist_description: payload.playlist_description,
      });

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const CreateOrUpdatePlaylistRepresentationImage = createAsyncThunk(
  '/playlist/update-representation',
  async ({
    payloadImage,
    playlistId,
  }: {
    payloadImage: any;
    playlistId: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.post(
        `/playlist/update/representation-image/${playlistId}`,
        payloadImage,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const deletePlaylist = createAsyncThunk(
  '/playlist/delete',
  async ({
    playlistId,
  }: {
    playlistId: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.delete(
        `/playlist/delete/${playlistId}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const updatePlaylistRepresentationImageLink = createAsyncThunk(
  '/playlist/update/representation-link',
  async (payload: {
    media_id: string;
    media_url: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.put(
        '/playlist/update/representation-link',
        { ...payload },
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
