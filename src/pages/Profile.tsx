import { ArrowForwardIosOutlined } from '@mui/icons-material';
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  Modal_Birthday,
  Modal_Gender,
  Modal_Name,
  Modal_Password,
  Modal_ProfilePicture,
} from '@/components/ModalDialog/Forms';
import ModalDialogForms from '@/components/ModalDialog/ModalDialogForm';
import { PROFILE_FORMS } from '@/constants';
import { getUserProfile } from '@/services/api/user';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

const Profile = () => {
  const { userPersonalDetail, isLoadingUpdateProfile } = useAppSelector(
    (state) => state.user,
  );

  const [open, setOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('');

  const dispatch = useAppDispatch();

  const renderForms_ModalDialog = (formtype: string): JSX.Element => {
    switch (formtype) {
      case PROFILE_FORMS.PROFILE_PICTURE:
        return <Modal_ProfilePicture />;
      case PROFILE_FORMS.PROFILE_NAME:
        return <Modal_Name />;
      case PROFILE_FORMS.PROFILE_BIRTHDAY:
        return <Modal_Birthday />;
      case PROFILE_FORMS.PROFILE_GENDER:
        return <Modal_Gender />;
      default:
        return <Modal_Password />;
    }
  };

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
          borderRadius: '20px',
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontSize: '1.375rem' }}>
            Basic Profile&apos;s Information
          </Typography>
          <Typography>Update your account&apos;s information here</Typography>
        </Box>
        <Box
          onClick={() => {
            setFormType(PROFILE_FORMS.PROFILE_PICTURE);
            setOpen(true);
          }}
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
            {userPersonalDetail?.user_avatar_media_id ? (
              <Avatar
                alt="User Avatar"
                src={userPersonalDetail?.user_avatar_media_id.media_url}
                sx={{ width: 56, height: 56, cursor: 'pointer' }}
              ></Avatar>
            ) : (
              <Avatar
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
              >{`${userPersonalDetail?.firstname
                ?.charAt(0)
                .toUpperCase()}${userPersonalDetail?.lastname
                ?.charAt(0)
                .toUpperCase()}`}</Avatar>
            )}
          </div>
        </Box>
        <Box
          onClick={() => {
            setFormType(PROFILE_FORMS.PROFILE_NAME);
            setOpen(true);
          }}
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
              {`${userPersonalDetail?.firstname} ${userPersonalDetail?.lastname}`}
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
        <Box
          onClick={() => {
            setFormType(PROFILE_FORMS.PROFILE_BIRTHDAY);
            setOpen(true);
          }}
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
              {dayjs(userPersonalDetail?.Dob).format('DD/MM/YYYY')}
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
        <Box
          onClick={() => {
            setFormType(PROFILE_FORMS.PROFILE_GENDER);
            setOpen(true);
          }}
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
              {userPersonalDetail?.sex}
            </span>
            <IconButton>
              <ArrowForwardIosOutlined />
            </IconButton>
          </div>
        </Box>
        <Box
          onClick={() => {
            setFormType(PROFILE_FORMS.PROFILE_PASSWORD);
            setOpen(true);
          }}
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
      <ModalDialogForms modal_form_name={formType} open={open} setOpen={setOpen}>
        {renderForms_ModalDialog(formType)}
      </ModalDialogForms>
    </Box>
  );
};

export default Profile;
