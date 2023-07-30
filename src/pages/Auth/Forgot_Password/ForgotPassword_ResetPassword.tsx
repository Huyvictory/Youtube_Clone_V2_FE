import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { resetNewPassword } from '@/services/api/auth';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const ForgotPassword_ResetPassword = () => {
  const { isLoadingAuthForm } = useAppSelector((state) => state.auth);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{
    newPassword: string;
    confirmNewPassword: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();

  const toggleNewPasswords = (type: string): void => {
    if (type === 'newPassword') {
      setShowNewPassword((prevStateNewPassword) => !prevStateNewPassword);
    } else if (type === 'confirmNewPassword') {
      setShowConfirmNewPassword(
        (prevStateConfirmNewPassword) => !prevStateConfirmNewPassword,
      );
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
  };

  const onSubmit = (data: { newPassword: string; confirmNewPassword: string }) => {
    dispatch(
      resetNewPassword({ ...data, reset_password_token: resetPasswordToken as string }),
    ).then((res: any) => {
      if (res.payload) {
        navigate('/');
      }
    });
  };

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Your New Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            disabled={isLoadingAuthForm}
            margin="normal"
            required
            {...register('newPassword', {
              required: 'This field is required.',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Password must have 8 characters including a lowercase, uppercase, number',
              },
            })}
            error={hasSpecifiedFieldError(errors, 'newPassword')}
            helperText={<div>{renderFieldValidation(errors, 'newPassword')}</div>}
            fullWidth
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      toggleNewPasswords('newPassword');
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <TextField
            disabled={isLoadingAuthForm}
            margin="normal"
            {...register('confirmNewPassword', {
              required: 'This field is required.',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Password must have 8 characters including a lowercase, uppercase, number',
              },
            })}
            error={hasSpecifiedFieldError(errors, 'confirmNewPassword')}
            helperText={<div>{renderFieldValidation(errors, 'confirmNewPassword')}</div>}
            required
            fullWidth
            label="Confirm New Password"
            type={showConfirmNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      toggleNewPasswords('confirmNewPassword');
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            autoComplete="new-password"
          />

          <Button
            disabled={isLoadingAuthForm}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingAuthForm}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ForgotPassword_ResetPassword;
