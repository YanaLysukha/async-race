import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import {
  fetchGetWinners,
  selectPageNumber,
  selectPagesAmount,
  selectWinners,
  selectWinnersAmount,
  selectWinnersTableSort,
  setPageNumber,
  WinnersSortParams,
} from '../../store/slices/winnersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './style.scss';
import Pagination from '../../components/pagination';

const WinnersPage = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const winnersAmount = useAppSelector(selectWinnersAmount);
  const currentPage = useAppSelector(selectPageNumber);
  const pagesAmount = useAppSelector(selectPagesAmount);
  const { sortParam, winsSortOrder, timeSortOrder } = useAppSelector(selectWinnersTableSort);

  useEffect(() => {
    const orderType = sortParam === WinnersSortParams.TIME ? timeSortOrder : winsSortOrder;
    dispatch(fetchGetWinners(currentPage, sortParam, orderType));
  }, [currentPage, sortParam, winsSortOrder, timeSortOrder]);

  const toTheNextPage = () => {
    dispatch(setPageNumber(currentPage + 1));
    dispatch(fetchGetWinners(currentPage + 1, 'wins', 'ASC'));
  };

  const toThePrevPage = () => {
    dispatch(setPageNumber(currentPage - 1));
    dispatch(fetchGetWinners(currentPage - 1, 'wins', 'ASC'));
  };

  return (
    <main className="page-container">
      <div className="winners-amount">Winners: {winnersAmount}</div>
      <WinnersTable
        winners={winners}
        timeOrder={timeSortOrder}
        winsOrder={winsSortOrder}
      ></WinnersTable>
      <Pagination
        currentPage={currentPage}
        pagesAmount={pagesAmount}
        toThePrevPage={toThePrevPage}
        toTheNextPage={toTheNextPage}
      ></Pagination>
    </main>
  );
};

export default WinnersPage;
