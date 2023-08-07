import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Controller } from 'react-hook-form';

const Modal_Birthday = (props: any) => {
  return (
    <Box>
      <Controller
        name={'Dob'}
        control={props.control}
        defaultValue={null}
        render={({ field: { value, onChange } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label={'Birthday'}
              defaultValue={null}
              onChange={(value: Dayjs | null) => {
                onChange(value?.toDate());
              }}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
};

export default Modal_Birthday;
