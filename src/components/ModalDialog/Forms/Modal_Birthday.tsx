import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Controller } from 'react-hook-form';

const Modal_Birthday = (props: any) => {
  return (
    <Box>
      <Controller
        name={'Dob'}
        control={props.control}
        render={({ field: { value, onChange } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label={'Birthday'}
              defaultValue={dayjs(value)}
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
