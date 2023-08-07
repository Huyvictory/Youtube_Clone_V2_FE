import { Box, TextField } from '@mui/material';
import React from 'react';

import { UpdateNamesPayload } from '@/contracts/profile';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';

const Modal_Name = (props: any) => {
  return (
    <Box>
      <TextField
        // disabled={isLoadingAuthForm}
        margin="normal"
        required
        {...props.register('firstname', {
          required: 'First Name is required',
        })}
        error={hasSpecifiedFieldError(props.errors, 'firstname')}
        helperText={<div>{renderFieldValidation(props.errors, 'firstname')}</div>}
        fullWidth
        label="First Name"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <TextField
        // disabled={isLoadingAuthForm}
        margin="normal"
        required
        {...props.register('lastname', {
          required: 'Last Name is required',
        })}
        error={hasSpecifiedFieldError(props.errors, 'lastname')}
        helperText={<div>{renderFieldValidation(props.errors, 'lastname')}</div>}
        fullWidth
        label="Last Name"
      />
      <TextField
        // disabled={isLoadingAuthForm}
        margin="normal"
        required
        {...props.register('username', {
          required: 'User Name is required',
        })}
        error={hasSpecifiedFieldError(props.errors, 'username')}
        helperText={<div>{renderFieldValidation(props.errors, 'username')}</div>}
        fullWidth
        label="User Name"
      />
    </Box>
  );
};

export default Modal_Name;
