export type CreateVideoPayload = {
  video_title: string;
  video_thumbnail: File;
  video_category_id: string;
  video: File;
  video_description?: string;
  typeImage: string;
};

export type UpdateVideoPayload = Partial<CreateVideoPayload>;

export type Video_Categories = {
  _id: string;
  video_category_name: string;
};

export type GetListVideos_Response = {
  _id: string;
  channel_id: {
    _id: string;
    channel_name: string;
  };
  video_title: string;
  video_views: number;
  video_thumbnail_media_id: {
    media_url: string;
  };
  user_id: {
    user_avatar_media_id: {
      media_url: string;
    };
  };
};

export type GetVideoByID_Response = {
  _id: string;
  channel_id: {
    _id: string;
    channel_name: string;
    channel_subscribers: Array<unknown>;
  };
  video_thumbnail_media_id: {
    media_url: string;
  };
  video_category_id: string;
  video_title: string;
  video_description: string;
  video_views: number;
  video_url: string;
  video_commments: Array<unknown>;
  video_like_count: number;
  video_dislike_count: number;
  user_id: {
    user_avatar_media_id: {
      media_url: string;
    };
  };
  createdAt: string;
};
