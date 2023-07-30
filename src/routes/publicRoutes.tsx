import { lazy, Suspense } from 'react';

import { forgotpassword_Routes } from './forgot_password';

const SignUp = lazy(() => import('@/pages/Auth/SignUp'));
const Login = lazy(() => import('@/pages/Auth/SignIn'));
const VerifyEmail = lazy(() => import('@/pages/Auth/VerifyEmail'));
const ForgotPassword = lazy(() => import('@/pages/Auth/Forgot_Password'));

export const publicRoutes = [
  {
    index: true,
    path: '/signup',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    index: true,
    path: '/login',
    element: (
      <Suspense fallback={<>Loaidng...</>}>
        <Login />
      </Suspense>
    ),
  },
  {
    index: true,
    path: '/verification/:verifyToken',
    element: (
      <Suspense fallback={<>Loaidng...</>}>
        <VerifyEmail />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<>Loaidng...</>}>
        <ForgotPassword />
      </Suspense>
    ),
    children: forgotpassword_Routes,
  },
];
