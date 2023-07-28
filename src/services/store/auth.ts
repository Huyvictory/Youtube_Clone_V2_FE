import { createSlice } from '@reduxjs/toolkit';

import { AUTH_TOKEN } from '@/constants';
import { setLocalStorageKey } from '@/utils/localStorage';

import { requestEmailVerification, signIn, signUp, verifyEmail } from '../api/auth';

// Define a type for the slice state
interface AppState {
  isLoadingAuthForm: boolean;
  isVerifyTokenExpired: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  isLoadingAuthForm: false,
  isVerifyTokenExpired: false,
};

export const appSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoadingAuthForm = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoadingAuthForm = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoadingAuthForm = false;
        console.log(action.payload);
        setLocalStorageKey(AUTH_TOKEN.AUTH_TOKEN, action.payload.data.data.accessToken);
      })
      .addCase(signUp.pending, (state) => {
        state.isLoadingAuthForm = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoadingAuthForm = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoadingAuthForm = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoadingAuthForm = true;
      })
      .addCase(verifyEmail.rejected, (state) => {
        state.isLoadingAuthForm = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoadingAuthForm = false;
        setLocalStorageKey(AUTH_TOKEN.AUTH_TOKEN, action.payload.data.data.accessToken);
      })
      .addCase(requestEmailVerification.pending, (state) => {
        state.isLoadingAuthForm = true;
      })
      .addCase(requestEmailVerification.rejected, (state) => {
        state.isLoadingAuthForm = false;
      })
      .addCase(requestEmailVerification.fulfilled, (state) => {
        state.isLoadingAuthForm = false;
      });
  },
});

export default appSlice.reducer;

// export const { setAppLoading } = appSlice.actions;
