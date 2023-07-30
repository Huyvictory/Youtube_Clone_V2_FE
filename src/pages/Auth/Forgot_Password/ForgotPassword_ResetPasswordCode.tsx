import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { requestEmailResetPassword, validteResetPasswordCode } from '@/services/api/auth';
import { useAppDispatch } from '@/services/hooks';
import { twoDigits, useInterval } from '@/utils/useInterval';

const ForgotPassword_ResetPasswordCode = () => {
  const [OTPValue, setOTPValue] = useState<string>('');
  const [ErrorOtpValue, setErrorOtpValue] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    Number(localStorage.getItem('secondsRemaining')),
  );

  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();
  const { state } = useLocation();
  console.log(state.email);

  const dispatch = useAppDispatch();

  const OnChangeVerificationInput = (otp: string) => {
    setOTPValue(otp);
  };

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useInterval(
    () => {
      setSecondsRemaining(Number(localStorage.getItem('secondsRemaining')) - 1);
      localStorage.setItem(
        'secondsRemaining',
        String(Number(localStorage.getItem('secondsRemaining')) - 1),
      );
    },
    secondsRemaining ? 1000 : null,
  );

  const verifyResetPasswordCode = () => {
    dispatch(
      validteResetPasswordCode({
        reset_password_code: OTPValue,
        reset_password_token: resetPasswordToken as string,
      }),
    ).then((res: any) => {
      if (res.payload) {
        navigate(`/forgot-password/reset-password/${resetPasswordToken}`);
      }
    });
  };

  const sendNewResetPasswordCode = () => {
    dispatch(requestEmailResetPassword({ email: state.email })).then((res: any) => {
      if (res.payload) {
        localStorage.setItem('secondsRemaining', '600');
        navigate(`/forgot-password/reset_code_otp/${res.payload.data.id}`, {
          state: { email: state.email },
        });
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography sx={{ margin: '1rem 0' }} variant="h5" component="p">
        Verify reset password code
      </Typography>
      <Typography sx={{ margin: '1rem 0' }} component="p">
        The code has been sent to your email inboxes
      </Typography>
      <OtpInput
        numInputs={6}
        separator={<span className="mx-1">-</span>}
        onChange={OnChangeVerificationInput}
        value={OTPValue}
        containerStyle="flex justify-center text-white"
        inputStyle={'text-sm border !w-[50px] h-[50px] text-lg'}
        focusStyle={'border-[#4E4B66]'}
        errorStyle={'border-red-500'}
        shouldAutoFocus={true}
        hasErrored={ErrorOtpValue}
      />
      <Button
        sx={{ margin: '1rem 0' }}
        variant="contained"
        onClick={() => {
          verifyResetPasswordCode();
        }}
      >
        Verify
      </Button>
      {ErrorOtpValue && (
        <p className="text-red-500 text-center mx-2">
          Mã xác nhận chưa đúng. Vui lòng nhập lại
        </p>
      )}
      <div className="font-semibold text-center my-2">
        Reset password verification code is valid in{' '}
        {`${minutesToDisplay}:${twoDigits(secondsToDisplay)}`}
      </div>
      {secondsRemaining <= 540 && (
        <Box className="flex flex-col mt-2">
          <p>Have not received the code ? Send again</p>
          <Button
            variant="contained"
            onClick={() => {
              sendNewResetPasswordCode();
            }}
          >
            Send otp again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ForgotPassword_ResetPasswordCode;
