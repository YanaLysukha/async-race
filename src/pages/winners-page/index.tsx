import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import {
  fetchGetWinners,
  selectPageNumber,
  selectSortParam,
  selectTimeOrder,
  selectWinners,
  selectWinnersAmount,
  selectWinsOrder,
  WinnersSortOrder,
  WinnersSortParams,
} from '../../store/slices/winnersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './style.scss';
import WinnersPagination from '../../components/winners-pagination';

const WinnersPage = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const winnersAmount = useAppSelector(selectWinnersAmount);
  const timeOrder = useAppSelector(selectTimeOrder);
  const winsOrder = useAppSelector(selectWinsOrder);
  const currentPage = useAppSelector(selectPageNumber);
  const sortParam = useAppSelector(selectSortParam);

  useEffect(() => {
    let orderType: WinnersSortOrder;
    if (sortParam === WinnersSortParams.TIME) {
      orderType = timeOrder;
    } else {
      orderType = winsOrder;
    }
    dispatch(fetchGetWinners(currentPage, sortParam, orderType));
  }, [currentPage, sortParam, winsOrder, timeOrder]);

  return (
    <main className="page-container">
      <div className="winners-amount">Winners: {winnersAmount}</div>
      <WinnersTable winners={winners} timeOrder={timeOrder} winsOrder={winsOrder}></WinnersTable>
      <WinnersPagination></WinnersPagination>
    </main>
  );
};

export default WinnersPage;
