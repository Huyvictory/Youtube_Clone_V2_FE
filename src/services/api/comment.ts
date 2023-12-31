import { createAsyncThunk } from '@reduxjs/toolkit';

import { CommentType } from '@/contracts/comment';

import axiosHelper from '../helper/axiosHelper';

export const getListCommentsVideo = createAsyncThunk(
  '/comments/list',
  async ({
    videoId,
  }: {
    videoId: string;
  }): Promise<{ data: { data: Array<CommentType> } }> => {
    try {
      const resPromise: { data: { data: Array<CommentType> } } = await axiosHelper.get(
        `/comment/list/${videoId}`,
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const createCommentVideo = createAsyncThunk(
  '/comment/create',
  async ({
    videoId,
    comment_content,
  }: {
    videoId: string;
    comment_content: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.post(
        `/create/comment/${videoId}`,
        { comment_content },
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const updateCommentVideo = createAsyncThunk(
  '/comment/update',
  async ({
    commentId,
    comment_content,
  }: {
    commentId: string;
    comment_content: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.put(
        `/comment/update/${commentId}`,
        { comment_content },
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const deleteCommentVideo = createAsyncThunk(
  '/comment/delete',
  async ({
    commentId,
    videoId,
  }: {
    commentId: string;
    videoId: string;
  }): Promise<{ message: string; status: number }> => {
    try {
      const resPromise: { message: string; status: number } = await axiosHelper.delete(
        `/comment/delete/${commentId}`,
        { data: { videoId: videoId } },
      );

      return Promise.resolve(resPromise);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
