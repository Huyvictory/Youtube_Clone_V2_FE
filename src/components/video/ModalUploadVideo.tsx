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
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';

import { toolbarFormatQuill, toolbarQuill } from '@/constants';
import { CreateVideoPayload } from '@/contracts/video';
import { createNewVideo, getVideoCategories } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';
import { showNotification } from '@/utils/notification';

const ModalUploadVideo = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { isLoadingVideo, videoCategoriesList } = useAppSelector((state) => state.video);

  const [valueRichText_Editor, setValueRichText_Editor] = useState<string>();
  const [videoCategoryId, setVideoCategoryId] = useState<string>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVideoPayload>({ mode: 'all' });

  const handleChangeImage = (e: any) => {
    setPreviewImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeVideoUpload = (e: any) => {
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));
  };

  const sendVideoInformations = (data: CreateVideoPayload) => {
    const videoFile = (data.video as any)[0];
    const videoThumbnailFile = (data.video_thumbnail as any)[0];

    const createVideoFormData = new FormData();
    createVideoFormData.append('video', videoFile);
    createVideoFormData.append('video_thumbnail', videoThumbnailFile);
    createVideoFormData.append('video_title', data.video_title);
    createVideoFormData.append('video_description', valueRichText_Editor as string);
    createVideoFormData.append('video_category_id', data.video_category_id);
    createVideoFormData.append('typeImage', 'VIDEO_THUMBNAIL');
    dispatch(createNewVideo(createVideoFormData)).then((res: any) => {
      if (res.payload) {
        showNotification('Created Video successfully', 'success', 2000);
        setOpen(false);
      }
    });
  };

  useEffect(() => {
    dispatch(getVideoCategories());
  }, []);

  return (
    <Box>
      <Dialog
        maxWidth={'lg'}
        open={open}
        onClose={() => {
          setOpen(false);
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
                <div>Upload your video</div>
                <IconButton
                  onClick={() => {
                    setOpen(false);
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
            <FormControl
              fullWidth
              margin="normal"
              required
              sx={{ my: 3 }}
              error={hasSpecifiedFieldError(errors, 'video_category_id')}
            >
              <InputLabel id="demo-simple-select-label">Video Category</InputLabel>
              <Select
                {...register('video_category_id', {
                  required: 'Video Category is required',
                })}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={videoCategoryId}
                onChange={(e) => {
                  setVideoCategoryId(e.target.value);
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
              {errors.video_thumbnail && (
                <p className="text-[#d32f2f]">{errors.video_thumbnail.message}</p>
              )}
              <input
                {...register('video_thumbnail', {
                  required: 'Video thumbnail is required',
                })}
                accept="image/*"
                id="raised-button-file"
                type="file"
                required={true}
                onChange={handleChangeImage}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {!previewImage && (
                  <img
                    src="https://peoplevine.blob.core.windows.net/media/72/e86f3854-ebcf-4025-ae66-220b51f77ec2/image_not_available.png"
                    alt="placeholder_video_thumbnail"
                    width={'1200px'}
                  />
                )}
                {previewImage && (
                  <Avatar
                    sx={{ width: 100, height: 100, cursor: 'pointer' }}
                    src={previewImage}
                  />
                )}
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <InputLabel sx={{ my: 1 }}>Upload Video</InputLabel>
              {errors.video && <p className="text-[#d32f2f]">{errors.video.message}</p>}
              <input
                {...register('video', { required: 'Video is required' })}
                accept="video/*"
                id="raised-video-file"
                type="file"
                required={true}
                onChange={handleChangeVideoUpload}
              />
            </Box>

            {!previewVideo && (
              <img
                src="	https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault…qp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
                alt="placeholder_video_preview"
                width={'1200px'}
              />
            )}
            {previewVideo && (
              <video autoPlay width={'100%'} controls src={previewVideo}></video>
            )}
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

export default ModalUploadVideo;
