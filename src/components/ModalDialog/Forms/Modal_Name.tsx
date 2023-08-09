import { Box, TextField } from '@mui/material';

import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';

const Modal_Name = (props: any) => {
  return (
    <Box>
      <TextField
        // disabled={isLoadingAuthForm}
        type="text"
        margin="normal"
        required
        {...props.register('firstname', {
          required: 'First Name is required',
        })}
        error={hasSpecifiedFieldError(props.errors, 'firstname')}
        helperText={<div>{renderFieldValidation(props.errors, 'firstname')}</div>}
        fullWidth
        label="First Name"
        onChange={(e) => {
          props.setValue('username', `${e.target.value} ${props.getValues('lastname')}`);
        }}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <TextField
        // disabled={isLoadingAuthForm}
        type="text"
        margin="normal"
        required
        {...props.register('lastname', {
          required: 'Last Name is required',
        })}
        error={hasSpecifiedFieldError(props.errors, 'lastname')}
        helperText={<div>{renderFieldValidation(props.errors, 'lastname')}</div>}
        fullWidth
        label="Last Name"
        onChange={(e) => {
          props.setValue('username', `${props.getValues('firstname')} ${e.target.value}`);
        }}
      />
      <TextField
        disabled
        margin="normal"
        required
        {...props.register('username', {
          required: 'User Name is required',
        })}
        error={hasSpecifiedFieldError(props.errors, 'username')}
        helperText={<div>{renderFieldValidation(props.errors, 'username')}</div>}
        fullWidth
        label="User Name (Display Name)"
      />
    </Box>
  );
};

export default Modal_Name;
