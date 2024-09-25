import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectRaceWinner } from '../../store/slices/winnersSlice';
import './style.scss';

const WinnerModal = () => {
  const dispatch = useAppDispatch();
  const raceWinner = useAppSelector(selectRaceWinner);
  const { id, time, name } = raceWinner;
  const timeInSec = (time / 1000).toFixed(2);

  return (
    <div className={`${id ? 'modal-container' : 'hidden'}`}>
      <p className="modal-message">
        Winner is {name} - {timeInSec}s
      </p>
    </div>
  );
};

export default WinnerModal;
