import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import {
  fetchGetWinners,
  selectPageNumber,
  selectWinners,
  selectWinnersAmount,
} from '../../store/slices/winnersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './style.scss';
import WinnersPagination from '../../components/winners-pagination';

const WinnersPage = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const winnersAmount = useAppSelector(selectWinnersAmount);
  const currentPage = useAppSelector(selectPageNumber);

  useEffect(() => {
    dispatch(fetchGetWinners(currentPage, 'wins', 'ASC'));
  }, []);

  return (
    <main className="page-container">
      <div className="winners-amount">Winners: {winnersAmount}</div>
      <WinnersTable winners={winners}></WinnersTable>
      <WinnersPagination></WinnersPagination>
    </main>
  );
};

export default WinnersPage;
