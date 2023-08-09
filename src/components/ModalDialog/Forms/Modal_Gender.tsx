import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const Modal_Gender = (props: any) => {
  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Controller
          name="sex"
          control={props.control}
          render={({ field: { value, onChange } }) => (
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={value}
                name="radio-buttons-group"
                onChange={(event) => {
                  onChange(event.target.value);
                }}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Box>
    </Box>
  );
};

export default Modal_Gender;
