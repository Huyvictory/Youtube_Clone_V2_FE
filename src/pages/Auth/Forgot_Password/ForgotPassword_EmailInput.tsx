import { Box, Button, CssBaseline, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { requestEmailResetPassword } from '@/services/api/auth';
import { useAppDispatch } from '@/services/hooks';
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

const ForgotPassword_EmailInput = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<{ email: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: { email: string }) => {
    dispatch(requestEmailResetPassword(data)).then((res: any) => {
      console.log(res);
      if (res.payload) {
        localStorage.setItem('secondsRemaining', '600');
        navigate(`/forgot-password/reset_code_otp/${res.payload.data.id}`, {
          state: { email: data.email },
        });
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid Email',
              },
            })}
            error={hasSpecifiedFieldError(errors, 'email')}
            helperText={<div>{renderFieldValidation(errors, 'email')}</div>}
            fullWidth
            label="Email Address"
            autoComplete="email"
            placeholder="Please enter your email address"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Continue
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
};

export default ForgotPassword_EmailInput;
