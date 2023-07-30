import { lazy, Suspense } from 'react';

const ForgotPassword_EmailInput = lazy(
  () => import('@/pages/Auth/Forgot_Password/ForgotPassword_EmailInput'),
);
const ForgotPassword_ResetPasswordCode = lazy(
  () => import('@/pages/Auth/Forgot_Password/ForgotPassword_ResetPasswordCode'),
);
const ForgotPassword_ResetPassword = lazy(
  () => import('@/pages/Auth/Forgot_Password/ForgotPassword_ResetPassword'),
);

export const forgotpassword_Routes = [
  {
    index: true,
    element: (
      <Suspense fallback={<>Loading...</>}>
        <ForgotPassword_EmailInput />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password/reset_code_otp/:resetPasswordToken',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <ForgotPassword_ResetPasswordCode />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password/reset-password/:resetPasswordToken',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <ForgotPassword_ResetPassword />
      </Suspense>
    ),
  },
];
