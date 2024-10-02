import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import {
  fetchGetWinners,
  selectPageNumber,
  selectWinners,
  selectWinnersAmount,
  selectWinnersTableSort,
  WinnersSortParams,
} from '../../store/slices/winnersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './style.scss';
import WinnersPagination from '../../components/winners-pagination';

const WinnersPage = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const winnersAmount = useAppSelector(selectWinnersAmount);
  const currentPage = useAppSelector(selectPageNumber);
  const { sortParam, winsSortOrder, timeSortOrder } = useAppSelector(selectWinnersTableSort);

  useEffect(() => {
    const orderType = sortParam === WinnersSortParams.TIME ? timeSortOrder : winsSortOrder;
    dispatch(fetchGetWinners(currentPage, sortParam, orderType));
  }, [currentPage, sortParam, winsSortOrder, timeSortOrder]);

  return (
    <main className="page-container">
      <div className="winners-amount">Winners: {winnersAmount}</div>
      <WinnersTable
        winners={winners}
        timeOrder={timeSortOrder}
        winsOrder={winsSortOrder}
      ></WinnersTable>
      <WinnersPagination></WinnersPagination>
    </main>
  );
};

export default WinnersPage;
