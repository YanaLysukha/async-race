import Button from '../button';
import CarFormCreate from '../car-form-create';
import CarFormEdit from '../car-form-edit';
import './style.scss';

type CarControlPanelProps = {
  currentPage: number;
};

const CarControlPanel = ({ currentPage }: CarControlPanelProps) => {
  return (
    <div className="control-panel-wrapper">
      <CarFormCreate currentPage={currentPage}></CarFormCreate>
      <CarFormEdit></CarFormEdit>
      <div className="control-panel-buttons">
        <Button classes="basic-race" text="Race"></Button>
        <Button classes="basic" text="Reset"></Button>
        <Button classes="basic" text="Generate cars"></Button>
      </div>
    </div>
  );
};

export default CarControlPanel;
