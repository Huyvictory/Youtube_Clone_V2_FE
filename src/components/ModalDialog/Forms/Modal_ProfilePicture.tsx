/* eslint-disable jsx-a11y/media-has-caption */
import { UploadFileOutlined } from '@mui/icons-material';
import { Avatar, Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@/services/hooks';

const Modal_ProfilePicture = (props: any) => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);

  const [previewImage, setPreviewImage] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();

  const videoRef: any = useRef();

  const handleChangeImage = (e: any) => {
    setPreviewImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeVideoUpload = (e: any) => {
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (userPersonalDetail) {
      setPreviewImage(userPersonalDetail?.user_avatar_media_id.media_url);
    }
  }, [userPersonalDetail]);

  return (
    <Box>
      <input
        {...props.register('user_avatar_media_id')}
        accept="image/*"
        id="raised-button-file"
        type="file"
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
      {/* <Box sx={{ mt: 2 }}>
        <input
          accept="video/*"
          id="raised-video-file"
          type="file"
          onChange={handleChangeVideoUpload}
        />
      </Box>
      {previewVideo && (
        <video autoPlay ref={videoRef} width={'250px'} controls>
          <source src={previewVideo}></source>
        </video>
      )} */}
    </Box>
  );
};

export default Modal_ProfilePicture;
