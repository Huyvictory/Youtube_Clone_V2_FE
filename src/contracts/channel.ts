import { GetListVideos_Response } from './video';

export type videosDetailChannel = {
  _id: string;
  video_title: string;
  video_thumbnail_media_id: {
    _id: string;
    media_url: string;
  };
  video_views: number;
  createdAt: string;
  video_like_count: number;
  video_dislike_count: number;
};

export type channelDetail = {
  subscribed_channels: Array<string>;
  _id: string;
  channel_name: string;
  channel_playlist: Array<string>;
  channel_videos: Array<videosDetailChannel>;
  channel_subscribers: Array<string>;
  channel_owner_id: {
    _id: string;
    user_avatar_media_id: {
      _id: string;
      media_url: string;
    };
  };
  channel_description_id: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetChannelDetail_Response = {
  data: {
    data: {
      channelDetail: channelDetail;
    };
  };
};
