import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';
import { ICar, IWinner } from '../../types';
import WinnersApi from '../../api/winners';
import Api from '../../api/cars';

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
    setWinnersAmount: (state) => {
      state.winnersAmount += 1;
    },
    setTotalWinners: (state, action: PayloadAction<number>) => {
      state.winnersAmount = action.payload;
    },
  },
});

export const { setWinner, setWinners, setRaceFinished, resetWinner, setWinnersAmount } =
  winnersSlice.actions;

export const fetchGetWinners =
  (page: number, sortBy: string, order: string) => async (dispatch: AppDispatch) => {
    const { winners } = await WinnersApi.getWinners(page, sortBy, order);
    const carsPromises = winners.map(async (winner) => {
      const carData: ICar = await Api.getCar(winner.id);
      const combinedData: IWinnerInfo = { ...winner, ...carData };
      return combinedData;
    });
    const winnersInfo: IWinnerInfo[] = await Promise.all(carsPromises);
    console.log(winnersInfo);
    dispatch(setWinners(winnersInfo));
  };

export const fetchCreateWinner = (winnerData: IWinner) => async (dispatch: AppDispatch) => {
  await WinnersApi.createWinner(winnerData);
  dispatch(setWinnersAmount());
};

export const fetchUpdateWinner = (winnerData: IWinner) => async () => {
  await WinnersApi.updateWinner(winnerData);
};

export const fetchUpdateWinnersTable =
  (id: number, time: number) => async (dispatch: AppDispatch) => {
    const currentWinner = await WinnersApi.getWinner(id);
    if (!currentWinner) {
      dispatch(fetchCreateWinner({ id, wins: 1, time }));
    } else {
      const bestTime = Math.min(currentWinner.time, time);
      const updatedData: IWinner = {
        id: id,
        wins: currentWinner.wins + 1,
        time: bestTime,
      };
      dispatch(fetchUpdateWinner(updatedData));
    }
  };

export const selectWinners = (state: RootState) => state.winners.winners;
export const selectRaceWinner = (state: RootState) => state.winners.newWinner;
export const selectIsRaceFinished = (state: RootState) => state.winners.isRaceFinished;

export default winnersSlice.reducer;
