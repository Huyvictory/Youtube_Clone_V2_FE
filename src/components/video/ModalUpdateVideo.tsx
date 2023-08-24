/* eslint-disable jsx-a11y/media-has-caption */
import 'react-quill/dist/quill.snow.css';

import { Cancel } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';

import { toolbarFormatQuill, toolbarQuill } from '@/constants';
import { CreateVideoPayload, UpdateVideoPayload } from '@/contracts/video';
import { getChannelDetail } from '@/services/api/channel';
import {
  createNewVideo,
  getVideoByItsId,
  getVideoCategories,
  updateExisingVideo,
} from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';
import { showNotification } from '@/utils/notification';

const ModalUpdateVideo = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { isLoadingVideo, videoCategoriesList, videoDetail } = useAppSelector(
    (state) => state.video,
  );

  const [valueRichText_Editor, setValueRichText_Editor] = useState<string>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateVideoPayload>({
    mode: 'all',
    defaultValues: {},
  });

  const handleChangeImage = (e: any) => {
    setPreviewImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeVideoUpload = (e: any) => {
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));
  };

  const sendVideoInformations = (data: UpdateVideoPayload) => {
    const videoFile = (data.video as any)[0];
    const videoThumbnailFile = (data.video_thumbnail as any)[0];

    const updateVideoFormData = new FormData();
    if (videoFile) {
      updateVideoFormData.append('video', videoFile);
    }
    if (videoThumbnailFile) {
      updateVideoFormData.append('video_thumbnail', videoThumbnailFile);
      updateVideoFormData.append('typeImage', 'VIDEO_THUMBNAIL');
    }

    updateVideoFormData.append('video_title', data.video_title as any);
    updateVideoFormData.append('video_description', valueRichText_Editor as string);
    updateVideoFormData.append('video_category_id', data.video_category_id as any);

    dispatch(
      updateExisingVideo({
        payload: updateVideoFormData as any,
        videoId: videoDetail?._id as string,
      }),
    ).then((res: any) => {
      if (res.payload) {
        dispatch(getChannelDetail());
        showNotification('Update Video successfully', 'success', 2000);
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    if (videoDetail) {
      reset({
        video_title: videoDetail.video_title,
        video_category_id: videoDetail.video_category_id,
      });

      setValueRichText_Editor(videoDetail.video_description);
      setPreviewImage(videoDetail.video_thumbnail_media_id.media_url);
      setPreviewVideo(videoDetail.video_url);
    }
  }, [videoDetail]);

  return (
    <Box>
      <Dialog
        maxWidth={'lg'}
        open={open}
        onClose={(e: any) => {
          setOpen(false);
          e.preventDefault();
        }}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box component={'form'} noValidate onSubmit={handleSubmit(sendVideoInformations)}>
          <DialogTitle
            id="scroll-dialog-title"
            // eslint-disable-next-line react/no-children-prop
            children={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Update your video</div>
                <IconButton
                  onClick={(e: React.MouseEvent) => {
                    setOpen(false);
                    e.preventDefault();
                  }}
                >
                  <Cancel />
                </IconButton>
              </div>
            }
          ></DialogTitle>
          <DialogContent dividers={true}>
            <TextField
              required
              margin="normal"
              type="text"
              fullWidth
              label="Title"
              {...register('video_title', {
                required: 'Video title is required',
              })}
              error={hasSpecifiedFieldError(errors, 'video_title')}
              helperText={<div>{renderFieldValidation(errors, 'video_title')}</div>}
            />

            <Controller
              control={control}
              name="video_category_id"
              defaultValue={videoDetail?.video_category_id}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <FormControl
                  fullWidth
                  margin="normal"
                  required
                  sx={{ my: 3 }}
                  error={hasSpecifiedFieldError(errors, 'video_category_id')}
                >
                  <InputLabel id="demo-simple-select-label">Video Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="video_category_id"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  >
                    {videoCategoriesList?.map((videoCategory) => (
                      <MenuItem key={videoCategory._id} value={videoCategory._id}>
                        {videoCategory.video_category_name}
                      </MenuItem>
                    ))}
                  </Select>

                  {errors.video_category_id && (
                    <FormHelperText>{errors.video_category_id.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Box>
              <InputLabel sx={{ my: 1 }}>Video Description</InputLabel>
              <ReactQuill
                theme="snow"
                placeholder="Type your video description here"
                modules={toolbarQuill}
                formats={toolbarFormatQuill}
                value={valueRichText_Editor}
                onChange={(value) => {
                  setValueRichText_Editor(value);
                }}
              />
            </Box>

            <Box sx={{ my: 2 }}>
              <InputLabel sx={{ my: 1 }}>Upload Video Thumbnail</InputLabel>
              <input
                {...register('video_thumbnail')}
                accept="image/*"
                id="raised-button-file"
                type="file"
                onChange={handleChangeImage}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={previewImage}
                  alt="placeholder_video_thumbnail"
                  width={'1200px'}
                />
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel sx={{ my: 1 }}>Upload Video</InputLabel>
              <input
                {...register('video')}
                accept="video/*"
                id="raised-video-file"
                type="file"
                onChange={handleChangeVideoUpload}
              />
            </Box>

            <video autoPlay width={'100%'} controls src={previewVideo}></video>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
        <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingVideo}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </Box>
  );
};

export default ModalUpdateVideo;
