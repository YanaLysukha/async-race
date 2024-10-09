import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchUpdateWinnersTable, NewRaceWinner } from '../../store/slices/winnersSlice';
import './style.scss';

type WinnerModalProps = {
  raceWinner: NewRaceWinner;
};

const WinnerModal = ({ raceWinner }: WinnerModalProps) => {
  const dispatch = useAppDispatch();
  const { id, time, name } = raceWinner;
  const timeInSec = Number((time / 1000).toFixed(2));

  useEffect(() => {
    if (id) {
      dispatch(fetchUpdateWinnersTable(id, timeInSec));
    }
  }, [id]);

  return (
    <div className={`${id ? 'modal-container' : 'hidden'}`}>
      <p className="modal-message">
        Winner is {name} - {timeInSec}s
      </p>
    </div>
  );
};

export default WinnerModal;
