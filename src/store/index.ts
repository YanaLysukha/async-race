import { configureStore } from '@reduxjs/toolkit';
import garageReducer from '../store/slices/garageSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
