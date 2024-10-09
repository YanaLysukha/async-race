import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchGenerateCars,
  RaceStatus,
  selectRaceStatus,
  setRaceStatus,
} from '../../store/slices/garageSlice';
import { resetWinner, setRaceFinished } from '../../store/slices/winnersSlice';
import Button from '../button';
import CarFormCreate from '../car-form-create';
import CarFormEdit from '../car-form-edit';
import './style.scss';

type CarControlPanelProps = {
  currentPage: number;
};

const CarControlPanel = ({ currentPage }: CarControlPanelProps) => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector(selectRaceStatus);

  const generateCars = () => {
    dispatch(fetchGenerateCars(currentPage));
  };

  const startRace = () => {
    dispatch(setRaceStatus(RaceStatus.RACE));
    dispatch(setRaceFinished(false));
  };

  const resetRace = () => {
    dispatch(setRaceStatus(RaceStatus.RESET));
    dispatch(resetWinner());
  };

  return (
    <div className="control-panel-wrapper">
      <CarFormCreate currentPage={currentPage}></CarFormCreate>
      <CarFormEdit currentPage={currentPage}></CarFormEdit>
      <div className="control-panel-buttons">
        <Button
          classes="basic-race"
          text="Race"
          onClickHandler={startRace}
          disabled={raceStatus === RaceStatus.RACE}
        ></Button>
        <Button
          classes="basic"
          text="Reset"
          onClickHandler={resetRace}
          disabled={raceStatus === RaceStatus.RESET || raceStatus === RaceStatus.INIT}
        ></Button>
        <Button classes="basic" text="Generate cars" onClickHandler={generateCars}></Button>
      </div>
    </div>
  );
};

export default CarControlPanel;
