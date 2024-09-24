import { configureStore } from '@reduxjs/toolkit';
import garageReducer from '../store/slices/garageSlice';
import winnersReducer from '../store/slices/winnersSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
