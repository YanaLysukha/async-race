import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';
import { ICar, IWinner } from '../../types';
import WinnersApi from '../../api/winners';
import Api from '../../api/cars';
import { WINNERS_PAGE_LIMIT } from '../../api/data';

export enum WinnersSortParams {
  WINS = 'wins',
  TIME = 'time',
}

export enum WinnersSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IWinnerInfo extends IWinner {
  name: string;
  color: string;
}

export type SortByTime = {
  orderType: WinnersSortOrder;
  sortBy: WinnersSortParams.TIME;
};

export type SortByWins = {
  orderType: WinnersSortOrder;
  sortBy: WinnersSortParams.WINS;
};

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
  pageNumber: number;
  pagesAmount: number;
  sortByTime: SortByTime;
  sortByWins: SortByWins;
  sortParam: WinnersSortParams;
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
  pageNumber: 1,
  pagesAmount: 1,
  sortByTime: {
    orderType: WinnersSortOrder.DESC,
    sortBy: WinnersSortParams.TIME,
  },
  sortByWins: {
    orderType: WinnersSortOrder.DESC,
    sortBy: WinnersSortParams.WINS,
  },
  sortParam: WinnersSortParams.WINS,
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
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPagesAmount: (state, action: PayloadAction<number>) => {
      state.pagesAmount = action.payload;
    },
    // winners table
    toggleTimeOrder: (state, action: PayloadAction<string>) => {
      const orderType =
        action.payload === WinnersSortOrder.ASC ? WinnersSortOrder.DESC : WinnersSortOrder.ASC;
      state.sortByTime = { orderType, sortBy: state.sortByTime.sortBy };
    },
    toggleWinsOrder: (state, action: PayloadAction<string>) => {
      const orderType =
        action.payload === WinnersSortOrder.ASC ? WinnersSortOrder.DESC : WinnersSortOrder.ASC;
      state.sortByWins = { orderType, sortBy: state.sortByWins.sortBy };
    },
    setSortParam: (state, action: PayloadAction<WinnersSortParams>) => {
      state.sortParam = action.payload;
    },
  },
});

export const {
  setWinner,
  setWinners,
  setRaceFinished,
  resetWinner,
  setWinnersAmount,
  setTotalWinners,
  setPageNumber,
  setPagesAmount,
  toggleTimeOrder,
  toggleWinsOrder,
  setSortParam,
} = winnersSlice.actions;

export const fetchGetWinners =
  (page: number, sortBy: string, order: string) => async (dispatch: AppDispatch) => {
    const { winners, totalRecords } = await WinnersApi.getWinners(page, sortBy, order);
    const carsPromises = winners.map(async (winner) => {
      const carData: ICar = await Api.getCar(winner.id);
      const combinedData: IWinnerInfo = { ...winner, ...carData };
      return combinedData;
    });
    const winnersInfo: IWinnerInfo[] = await Promise.all(carsPromises);
    dispatch(setWinners(winnersInfo));
    if (totalRecords) {
      dispatch(setTotalWinners(+totalRecords));
      const pagesAmount = Math.ceil(+totalRecords / WINNERS_PAGE_LIMIT);
      dispatch(setPagesAmount(pagesAmount));
    }
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
export const selectWinnersAmount = (state: RootState) => state.winners.winnersAmount;
export const selectPageNumber = (state: RootState) => state.winners.pageNumber;
export const selectPagesAmount = (state: RootState) => state.winners.pagesAmount;
export const selectTimeOrder = (state: RootState) => state.winners.sortByTime.orderType;
export const selectWinsOrder = (state: RootState) => state.winners.sortByWins.orderType;
export const selectSortParam = (state: RootState) => state.winners.sortParam;

export default winnersSlice.reducer;
