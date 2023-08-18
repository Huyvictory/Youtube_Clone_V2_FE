/* eslint-disable jsx-a11y/media-has-caption */
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';

import { toolbarFormatQuill, toolbarQuill } from '@/constants';
import { CreateVideoPayload } from '@/contracts/video';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';

const ModalUploadVideo = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [valueRichText_Editor, setValueRichText_Editor] = useState<string>('');
  const [videoCategoryId, setVideoCategoryId] = useState<string>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();

  const {
    reset,
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
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
    console.log({
      ...data,
      video: videoFile,
      video_thumbnail: videoThumbnailFile,
      typeImage: 'VIDEO_THUMBNAIL',
      video_description: valueRichText_Editor,
    });
  };

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
                <MenuItem value={'Animals'}>Animals</MenuItem>
                <MenuItem value={'Nature'}>Nature</MenuItem>
                <MenuItem value={'People'}>People</MenuItem>
              </Select>
              {errors.video_category_id && (
                <FormHelperText>{errors.video_category_id.message}</FormHelperText>
              )}
            </FormControl>
            <Box sx={{ my: 2 }}>
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
                {previewImage && (
                  <Avatar
                    sx={{ width: 100, height: 100, cursor: 'pointer' }}
                    src={previewImage}
                  />
                )}
              </Box>
              {errors.video_thumbnail && (
                <p className="text-[#d32f2f]">{errors.video_thumbnail.message}</p>
              )}
            </Box>
            <Box sx={{ mt: 2 }}>
              <input
                {...register('video', { required: 'Video is required' })}
                accept="video/*"
                id="raised-video-file"
                type="file"
                required={true}
                onChange={handleChangeVideoUpload}
              />
            </Box>
            {errors.video && <p className="text-[#d32f2f]">{errors.video.message}</p>}
            {!previewVideo && (
              <img
                src="	https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault…qp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
                alt="placeholder_video_image"
                width={'1200px'}
              />
            )}
            {previewVideo && (
              <video autoPlay width={'100%'} controls>
                <source src={previewVideo}></source>
              </video>
            )}
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
        <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={false}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </Box>
  );
};

export default ModalUploadVideo;
