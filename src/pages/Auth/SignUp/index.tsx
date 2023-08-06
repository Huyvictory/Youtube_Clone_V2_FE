import {
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SignUpPayload } from '@/contracts/auth';
import { signUp } from '@/services/api/auth';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { showNotification } from '@/utils/notification';

import BirthdayGenderForm from './BirthdayGenderForm';
import SignUp from './SignUp';

const SignUpStep = () => {
  const stepLabels = ['Basic credentials', 'Birthday - Gender'];

  const { isLoadingAuthForm } = useAppSelector((state) => state.auth);

  const [currentActiveStep, setCurrentActiveStep] = useState<number>(0);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<SignUpPayload>({ mode: 'onChange' });

  useEffect(() => {
    trigger(undefined);
  }, []);

  const dispatch = useAppDispatch();

  const moveToNextSignUpStep = () => {
    setCurrentActiveStep((prevStep) => prevStep + 1);
  };

  const moveBackWardStep = () => {
    setCurrentActiveStep((prevStep) => prevStep - 1);
  };

  const onSubmitSignUpForm = (data: SignUpPayload) => {
    dispatch(signUp(data)).then((res: any) => {
      if (res.payload) {
        showNotification(
          'Sign up successfully please check your mail inbox for verification',
          'success',
        );
      }
    });
  };

  const RenderSignUpFormByStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <BirthdayGenderForm moveToPreviousStep={moveBackWardStep} control={control} />
        );
      default:
        return (
          <SignUp
            moveToNextStep={moveToNextSignUpStep}
            register={register}
            errors={errors}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <CssBaseline />
      <Stepper activeStep={currentActiveStep}>
        {stepLabels.map((stepLabel, index) => {
          return (
            <Step key={index}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box component={'form'} onSubmit={handleSubmit(onSubmitSignUpForm)}>
        {RenderSignUpFormByStep(currentActiveStep)}
      </Box>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingAuthForm}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SignUpStep;
