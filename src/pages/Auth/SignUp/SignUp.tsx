import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { IconButton, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';

import { SignUpPayload } from '@/contracts/auth';
import { signUp } from '@/services/api/auth';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';
import { showNotification } from '@/utils/notification';

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

const SignUp = ({
  moveToNextStep,
  register,
  errors,
}: {
  moveToNextStep: () => void;
  register: UseFormRegister<SignUpPayload>;
  errors: FieldErrors<SignUpPayload>;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    setShowPassword((previousState_ShowPassword) => !previousState_ShowPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ m: 2 }} component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                {...register('firstname', { required: 'First name is required' })}
                required
                error={hasSpecifiedFieldError(errors, 'firstname')}
                helperText={renderFieldValidation(errors, 'firstname')}
                fullWidth
                label="First Name"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('lastname', { required: 'Last name is required' })}
                error={hasSpecifiedFieldError(errors, 'lastname')}
                helperText={renderFieldValidation(errors, 'lastname')}
                required
                fullWidth
                label="Last Name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: 'Password is required.',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      'Password must have 8 characters including a lowercase, uppercase, number',
                  },
                })}
                error={hasSpecifiedFieldError(errors, 'password')}
                helperText={<div>{renderFieldValidation(errors, 'password')}</div>}
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={Object.keys(errors).length > 0}
            onClick={() => {
              moveToNextStep();
            }}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              '&.Mui-disabled': {
                background: '#eaeaea',
                color: '#c0c0c0',
                cursor: 'not-allowed',
                pointerEvents: 'all !important',
              },
            }}
          >
            Next Step
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export default SignUp;
