/* eslint-disable jsx-a11y/media-has-caption */
import { Avatar, Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const Modal_ProfilePicture = () => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [previewVideo, setPreviewVideo] = useState<string>();

  const videoRef: any = useRef();

  const handleChangeImage = (e: any) => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleChangeVideoUpload = (e: any) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setPreviewVideo(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [previewVideo]);

  return (
    <Box>
      <input
        accept="image/*"
        id="raised-button-file"
        type="file"
        onChange={handleChangeImage}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {previewImage && (
          <Avatar sx={{ width: 56, height: 56, cursor: 'pointer' }} src={previewImage} />
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
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
      )}
    </Box>
  );
};

export default Modal_ProfilePicture;
