export type CreateVideoPayload = {
  video_title: string;
  video_thumbnail: File;
  video_category_id: string;
  video: File;
  video_description?: string;
  typeImage: string;
};

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
