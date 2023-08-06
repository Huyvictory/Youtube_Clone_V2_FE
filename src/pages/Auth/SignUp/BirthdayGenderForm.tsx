import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { Control, Controller } from 'react-hook-form';

import { SignUpPayload } from '@/contracts/auth';

const BirthdayGenderForm = ({
  moveToPreviousStep,
  control,
}: {
  moveToPreviousStep: () => void;
  control: Control<SignUpPayload, any>;
}) => {
  return (
    <Box
      sx={{
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ m: 2 }} component="h1" variant="h5">
          Birthday-Gender
        </Typography>
        <Controller
          name={'Dob'}
          control={control}
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
        <Box sx={{ my: 2 }}>
          <Controller
            name="sex"
            control={control}
            defaultValue={null}
            render={({ field: { value, onChange } }) => (
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={null}
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

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>

        <Button
          onClick={() => {
            moveToPreviousStep();
          }}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: 'red' }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default BirthdayGenderForm;
