import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWinner } from '../../types';
import { RootState } from '..';

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
}

export const initialState: IWinnersState = {
  winners: [],
  winnersAmount: 0,
  newWinner: {
    id: null,
    name: '',
    time: 0,
  },
};

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinner: (state, action: PayloadAction<NewRaceWinner>) => {
      state.newWinner = action.payload;
    },
    setWinners: (state, action: PayloadAction<IWinnerInfo[]>) => {
      state.winners = action.payload;
    },
  },
});

export const { setWinner, setWinners } = winnersSlice.actions;

export const selectWinners = (state: RootState) => state.winners.winners;
export const selectNewWinner = (state: RootState) => state.winners.newWinner;

export default winnersSlice.reducer;
