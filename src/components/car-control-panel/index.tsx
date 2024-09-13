import { useAppDispatch } from '../../store/hooks';
import { fetchGenerateCars } from '../../store/slices/garageSlice';
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

  return (
    <div className="control-panel-wrapper">
      <CarFormCreate currentPage={currentPage}></CarFormCreate>
      <CarFormEdit currentPage={currentPage}></CarFormEdit>
      <div className="control-panel-buttons">
        <Button classes="basic-race" text="Race"></Button>
        <Button classes="basic" text="Reset"></Button>
        <Button classes="basic" text="Generate cars" onClickHandler={generateCars}></Button>
      </div>
    </div>
  );
};

export default CarControlPanel;
