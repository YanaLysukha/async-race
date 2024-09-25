import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';
import { IWinner } from '../../types';
import WinnersApi from '../../api/winners';

export interface IWinnerInfo extends IWinner {
  name: string;
  color: string;
}

type NewRaceWinner = {
  id: number | null;
  name: string;
  time: number;
};

interface IWinnersState {
  winners: IWinnerInfo[];
  winnersAmount: number;
  newWinner: NewRaceWinner;
  isRaceFinished: boolean;
}

export const initialState: IWinnersState = {
  winners: [],
  winnersAmount: 0,
  newWinner: {
    id: null,
    name: '',
    time: 0,
  },
  isRaceFinished: false,
};

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinner: (state, action: PayloadAction<NewRaceWinner>) => {
      if (!state.isRaceFinished) {
        state.newWinner = action.payload;
        state.isRaceFinished = true;
      }
    },
    resetWinner: (state) => {
      state.newWinner = {
        id: null,
        name: '',
        time: 0,
      };
      state.isRaceFinished = false;
    },
    setWinners: (state, action: PayloadAction<IWinnerInfo[]>) => {
      state.winners = action.payload;
    },
    setRaceFinished: (state, action: PayloadAction<boolean>) => {
      state.isRaceFinished = action.payload;
    },
  },
});

export const { setWinner, setWinners, setRaceFinished, resetWinner } = winnersSlice.actions;

export const fetchCreateWinner = (winnerData: IWinner) => async (dispatch: AppDispatch) => {
  await WinnersApi.createWinner(winnerData);
};

export const selectWinners = (state: RootState) => state.winners.winners;
export const selectRaceWinner = (state: RootState) => state.winners.newWinner;
export const selectIsRaceFinished = (state: RootState) => state.winners.isRaceFinished;

export default winnersSlice.reducer;
