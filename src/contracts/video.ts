export type CreateVideoPayload = {
  video_title: string;
  video_thumbnail: File;
  video_category_id: string;
  video: File;
  video_description?: string;
  typeImage: string;
};
