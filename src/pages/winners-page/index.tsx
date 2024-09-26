import { useEffect } from 'react';
import WinnersTable from '../../components/table';
import { fetchGetWinners, selectWinners } from '../../store/slices/winnersSlice';
import { useAppSelector } from '../../store/hooks';

const WinnersPage = () => {
  const winners = useAppSelector(selectWinners);
  console.log(winners);

  useEffect(() => {
    fetchGetWinners(1, 'id', 'ASC');
  }, []);

  return (
    <main>
      <WinnersTable winners={winners}></WinnersTable>
    </main>
  );
};

export default WinnersPage;
