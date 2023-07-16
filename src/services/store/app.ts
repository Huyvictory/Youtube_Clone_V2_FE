import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AppState {
  isAppLoading: boolean;
  openSidenav: boolean;
}

// Define the initial state using that type
const initialState: AppState = {
  isAppLoading: false,
  openSidenav: false,
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isAppLoading = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setAppLoading } = appSlice.actions;
