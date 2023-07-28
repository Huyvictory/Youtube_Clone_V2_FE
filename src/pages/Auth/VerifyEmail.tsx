import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AUTH_TOKEN } from '@/constants';
import { requestEmailVerification, verifyEmail } from '@/services/api/auth';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { getLocalStorageKey } from '@/utils/localStorage';
import { showNotification } from '@/utils/notification';

const VerifiMailUnsuccessful = () => {
  return <div>Can not not verify your email please try again</div>;
};

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full">
      <Button
        fullWidth
        onClick={() => {
          navigate('/');
        }}
      >
        Explore the website now !
      </Button>
    </div>
  );
};

const VerifyEmailTokenExpired = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col w-full">
      <div>Your verification link has expired. Please request a new one</div>
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          dispatch(
            requestEmailVerification({
              email: getLocalStorageKey(AUTH_TOKEN.USER_EMAIL) as string,
            }),
          ).then((res: any) => {
            if (res.payload) {
              showNotification(
                'A new verification has been sent to your email',
                'success',
              );
            }
          });
        }}
      >
        Request verify email again
      </Button>
    </div>
  );
};

const VerifyEmail = () => {
  const { isLoadingAuthForm } = useAppSelector((state) => state.auth);
  const { verifyToken } = useParams();
  const dispatch = useAppDispatch();

  const [templateEmailVerificationToRender, setTemplateEmailVerificationToRender] =
    useState<JSX.Element>();

  useEffect(() => {
    dispatch(verifyEmail(verifyToken as string)).then((res: any) => {
      if (res.payload) {
        setTemplateEmailVerificationToRender(<VerifyEmailSuccess />);
      } else {
        if (res.error.message.includes('is expired')) {
          setTemplateEmailVerificationToRender(<VerifyEmailTokenExpired />);
        } else {
          setTemplateEmailVerificationToRender(<VerifiMailUnsuccessful />);
        }
      }
    });
  }, []);

  return (
    <Box className="flex w-full justify-center">
      {templateEmailVerificationToRender}
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingAuthForm}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default VerifyEmail;
