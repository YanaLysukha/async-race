import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICar } from '../../types';
import { AppDispatch, RootState } from '..';
import Api from '../../api/cars';

interface IGarageState {
  cars: ICar[];
  carsAmount: number;
}

const initialState: IGarageState = {
  cars: [],
  carsAmount: 0,
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    },
    setCarsAmount: (state, action: PayloadAction<number>) => {
      state.carsAmount = action.payload;
    },
  },
});

export const fetchCars = (page: number) => async (dispatch: AppDispatch) => {
  const result = await Api.getCars(page);
  dispatch(setCars(result.cars));
  dispatch(setCarsAmount(Number(result.carsAmount)));
};

export const { setCars, setCarsAmount } = garageSlice.actions;

export const selectCurrentCars = (state: RootState) => state.garage.cars;
export const selectCarsAmount = (state: RootState) => state.garage.carsAmount;

export default garageSlice.reducer;
