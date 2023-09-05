export interface PlaylistDetail {
  _id: string;
  playlist_name: string;
  playlist_videos: Playlist_Videos;
  playlist_channel_id: {
    channel_name: string;
  };
  playlist_respresentation_image_id?: {
    _id: string;
    media_url: string;
  };
  playlist_description?: string | null;
  playlist_user_id: string;
  createdAt: string;
  updatedAt: string;
}

export type Playlist_Videos = Array<{
  _id: string;
  channel_id: {
    _id: string;
    channel_name: string;
    channel_subscribers: Array<unknown>;
  };
  video_title: string;
  video_views: number;
  video_thumbnail_media_id: {
    _id: string;
    media_url: string;
  };
  video_url: string;
  video_like_count: string;
  video_dislike_count: string;
  user_id: {
    _id: string;
    user_avatar_media_id: {
      _id: string;
      media_url: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}>;

export type createPlaylist_Payload = {
  playlist_name: string;
  playlist_description?: string;
};
