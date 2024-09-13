import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CarData, ICar } from '../../types';
import { AppDispatch, RootState } from '..';
import Api, { PAGE_LIMIT } from '../../api/cars';

interface IGarageState {
  cars: ICar[];
  carsAmount: number;
  currentPage: number;
  pagesAmount: number;
  createdCar: CarData;
}

const initialState: IGarageState = {
  cars: [],
  carsAmount: 0,
  currentPage: 1,
  pagesAmount: 1,
  createdCar: { name: '', color: '#ffffff' },
};

export const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    // cars
    setCars: (state, action: PayloadAction<ICar[]>) => {
      state.cars = action.payload;
    },
    setCarsAmount: (state, action: PayloadAction<number>) => {
      state.carsAmount = action.payload;
    },
    setCreatedCarName: (state, action: PayloadAction<string>) => {
      state.createdCar.name = action.payload;
    },
    setCreatedCarColor: (state, action: PayloadAction<string>) => {
      state.createdCar.color = action.payload;
    },

    // page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPagesAmount: (state, action: PayloadAction<number>) => {
      state.pagesAmount = action.payload;
    },
  },
});

export const fetchCarsOnCurrentPage = (page: number) => async (dispatch: AppDispatch) => {
  const result = await Api.getCars(page);
  const carsAmount = Number(result.carsAmount);
  dispatch(setCars(result.cars));
  dispatch(setCarsAmount(carsAmount));

  const pagesAmount = Math.ceil(carsAmount / PAGE_LIMIT);
  dispatch(setPagesAmount(pagesAmount));
};

export const fetchCreateCar =
  (carData: CarData, page: number) => async (dispatch: AppDispatch) => {
    await Api.createCar(carData);
    dispatch(fetchCarsOnCurrentPage(page));
  };

export const {
  setCars,
  setCarsAmount,
  setCurrentPage,
  setPagesAmount,
  setCreatedCarName,
  setCreatedCarColor,
} = garageSlice.actions;

export const selectCurrentCars = (state: RootState) => state.garage.cars;
export const selectCarsAmount = (state: RootState) => state.garage.carsAmount;
export const selectCurrentPage = (state: RootState) => state.garage.currentPage;
export const selectPagesAmount = (state: RootState) => state.garage.pagesAmount;
export const selectCreatedCar = (state: RootState) => state.garage.createdCar;

export default garageSlice.reducer;
