import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import { fetchGetWinners, selectWinners } from '../../store/slices/winnersSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const WinnersPage = () => {
  const dispatch = useAppDispatch();
  const winners = useAppSelector(selectWinners);

  useEffect(() => {
    dispatch(fetchGetWinners(1, 'id', 'ASC'));
  }, []);

  return (
    <main>
      <WinnersTable winners={winners}></WinnersTable>
    </main>
  );
};

export default WinnersPage;
