import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

const Profile = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          border: '1px solid rgb(218,220,224)',
          padding: '20px 25px',
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.375rem' }}>
            Basic Profile&apos;s Information
          </Typography>
          <Typography>
            Some information that could be shown to other people using this platform
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'whitesmoke',
            },
            borderBottom: 1,
            borderColor: 'rgb(218,220,224)',
          }}
        >
          <div className="text-[16px] text-[rgb(95,99,104)] w-[30%] font-medium">
            Profile picture
          </div>
          <div className="flex grow shrink justify-between">
            <span className="flex items-center font-normal">
              Profile picture will help personalize your account
            </span>
            <Avatar
              alt="User Avatar"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
              sx={{ width: 56, height: 56, cursor: 'pointer' }}
            ></Avatar>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'whitesmoke',
            },
            borderBottom: 1,
            borderColor: 'rgb(218,220,224)',
          }}
        >
          <div className="text-[16px] text-[rgb(95,99,104)] w-[30%] font-medium">
            Name
          </div>
          <div className="flex grow shrink justify-between">
            <span className="flex items-center font-normal text-[rgb(32,33,36)]">
              Huyvictory
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'whitesmoke',
            },
            borderBottom: 1,
            borderColor: 'rgb(218,220,224)',
          }}
        >
          <div className="text-[16px] text-[rgb(95,99,104)] w-[30%] font-medium">
            Birthday
          </div>
          <div className="flex grow shrink justify-between">
            <span className="flex items-center font-normal text-[rgb(32,33,36)]">
              DD/MM/YYYY
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'whitesmoke',
            },
            borderBottom: 1,
            borderColor: 'rgb(218,220,224)',
          }}
        >
          <div className="text-[16px] text-[rgb(95,99,104)] w-[30%] font-medium">
            Gender
          </div>
          <div className="flex grow shrink justify-between">
            <span className="flex items-center font-normal text-[rgb(32,33,36)]">
              Nam
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'whitesmoke',
            },
          }}
        >
          <div className="text-[16px] text-[rgb(95,99,104)] w-[30%] font-medium">
            Password
          </div>
          <div className="flex grow shrink justify-between">
            <span className="flex items-center font-normal text-[rgb(32,33,36)]">
              ••••••••
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
