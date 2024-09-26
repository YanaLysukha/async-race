import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUpdateWinnersTable, selectRaceWinner } from '../../store/slices/winnersSlice';
import './style.scss';

const WinnerModal = () => {
  const dispatch = useAppDispatch();
  const raceWinner = useAppSelector(selectRaceWinner);
  console.log(raceWinner);
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
