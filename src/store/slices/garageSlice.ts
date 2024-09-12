import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../types';
import { AppDispatch, RootState } from '..';
import Api from '../../api/cars';

interface IGarageState {
  cars: ICar[];
}

const initialState: IGarageState = {
  cars: [],
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    },
  },
});

export const fetchCars = (page: number) => async (dispatch: AppDispatch) => {
  const cars = await Api.getCars(page);
  dispatch(setCars(cars.cars));
};

export const { setCars } = garageSlice.actions;

export const selectCurrentCars = (state: RootState) => state.garage.cars;

export default garageSlice.reducer;
