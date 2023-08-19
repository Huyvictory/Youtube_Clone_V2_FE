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
