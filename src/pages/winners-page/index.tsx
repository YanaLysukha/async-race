import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import {
  fetchGetWinners,
  selectWinners,
  selectWinnersAmount,
} from '../../store/slices/winnersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './style.scss';

const WinnersPage = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);
  const winnersAmount = useAppSelector(selectWinnersAmount);

  useEffect(() => {
    dispatch(fetchGetWinners(1, 'wins', 'ASC'));
  }, []);

  return (
    <main className="page-container">
      <div className="winners-amount">Winners: {winnersAmount}</div>
      <WinnersTable winners={winners}></WinnersTable>
    </main>
  );
};

export default WinnersPage;
