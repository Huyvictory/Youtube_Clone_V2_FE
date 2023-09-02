export interface PlaylistDetail {
  _id: string;
  playlist_name: string;
  playlist_videos: Array<string>;
  playlist_channel_id: string;
  playlist_respresentation_image_id?: string | null;
  playlist_description?: string | null;
  playlist_user_id: string;
  createdAt: string;
  updatedAt: string;
}

export type createPlaylist_Payload = {
  playlist_name: string;
  playlist_description?: string;
};
