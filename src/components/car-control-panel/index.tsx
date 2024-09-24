import { useAppDispatch } from '../../store/hooks';
import { fetchGenerateCars, RaceStatus, setRaceStatus } from '../../store/slices/garageSlice';
import Button from '../button';
import CarFormCreate from '../car-form-create';
import CarFormEdit from '../car-form-edit';
import './style.scss';

type CarControlPanelProps = {
  currentPage: number;
};

const CarControlPanel = ({ currentPage }: CarControlPanelProps) => {
  const dispatch = useAppDispatch();

  const generateCars = () => {
    dispatch(fetchGenerateCars(currentPage));
  };

  const startRace = () => {
    dispatch(setRaceStatus(RaceStatus.RACE));
  };

  const resetRace = () => {
    dispatch(setRaceStatus(RaceStatus.RESET));
  };

  return (
    <div className="control-panel-wrapper">
      <CarFormCreate currentPage={currentPage}></CarFormCreate>
      <CarFormEdit currentPage={currentPage}></CarFormEdit>
      <div className="control-panel-buttons">
        <Button classes="basic-race" text="Race" onClickHandler={startRace}></Button>
        <Button classes="basic" text="Reset" onClickHandler={resetRace}></Button>
        <Button classes="basic" text="Generate cars" onClickHandler={generateCars}></Button>
      </div>
    </div>
  );
};

export default CarControlPanel;
