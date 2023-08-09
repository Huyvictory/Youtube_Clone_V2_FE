import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';

const Modal_Password = (props: any) => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  const togglePasswords = (type: string): void => {
    if (type === 'newPassword') {
      setShowNewPassword((prevStateNewPassword) => !prevStateNewPassword);
    } else if (type === 'confirmNewPassword') {
      setShowConfirmNewPassword(
        (prevStateConfirmNewPassword) => !prevStateConfirmNewPassword,
      );
    } else if (type === 'oldPassword') {
      setShowOldPassword((prevStateOldPassword) => !prevStateOldPassword);
    }
  };

  return (
    <Box>
      <TextField
        // disabled={isLoadingAuthForm}
        type={showOldPassword ? 'text' : 'password'}
        margin="normal"
        required
        {...props.register('password.oldPassword', {
          required: 'Old Password is required',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              'Password must have 8 characters including a lowercase, uppercase, number',
          },
        })}
        error={hasSpecifiedFieldError(props.errors, 'password.oldPassword')}
        helperText={
          <div>{renderFieldValidation(props.errors, 'password.oldPassword')}</div>
        }
        fullWidth
        label="Old Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  togglePasswords('oldPassword');
                }}
                edge="end"
              >
                {showOldPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <TextField
        // disabled={isLoadingAuthForm}
        type={showNewPassword ? 'text' : 'password'}
        margin="normal"
        required
        {...props.register('password.newPassword', {
          required: 'New Password is required',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              'Password must have 8 characters including a lowercase, uppercase, number',
          },
          validate: (value: string) =>
            value !== props.getValues('password.oldPassword') ||
            'New password must be different with old password',
        })}
        error={hasSpecifiedFieldError(props.errors, 'password.newPassword')}
        helperText={
          <div>{renderFieldValidation(props.errors, 'password.newPassword')}</div>
        }
        fullWidth
        label="New Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  togglePasswords('newPassword');
                }}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        // disabled={isLoadingAuthForm}
        type={showConfirmNewPassword ? 'text' : 'password'}
        margin="normal"
        required
        {...props.register('password.confirmNewPassword', {
          required: 'Confirm New Password is required',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              'Password must have 8 characters including a lowercase, uppercase, number',
          },
          validate: (value: string) =>
            value === props.getValues('password.newPassword') ||
            'Confirm password does not match with new password',
        })}
        error={hasSpecifiedFieldError(props.errors, 'password.confirmNewPassword')}
        helperText={
          <div>{renderFieldValidation(props.errors, 'password.confirmNewPassword')}</div>
        }
        fullWidth
        label="Confirm New Password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  togglePasswords('confirmNewPassword');
                }}
                edge="end"
              >
                {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Modal_Password;
