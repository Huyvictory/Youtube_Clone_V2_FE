import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import authReducer from './auth';
import channelReducer from './channel';
import commentReducer from './comment';
import playlistReducer from './playlist';
import userReducer from './user';
import videoReducer from './video';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  video: videoReducer,
  channel: channelReducer,
  playlist: playlistReducer,
  comment: commentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppStore = ReturnType<typeof setupStore>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
