import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchUpdateCar,
  selectSelectedCar,
  setSelectedCarColor,
  setSelectedCarName,
} from '../../store/slices/garageSlice';
import Button from '../button';
import Input from '../input';
import './style.scss';

type CarFormEditProps = {
  currentPage: number;
};

const CarFormEdit = ({ currentPage }: CarFormEditProps) => {
  const dispatch = useAppDispatch();
  const selectedCar = useAppSelector(selectSelectedCar);

  const updateCar = () => {
    if (selectedCar.id === 0) {
      return;
    }
    dispatch(fetchUpdateCar(selectedCar, currentPage));
  };

  const onEditCarName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedCarName(event.target.value));
  };

  const onEditCarColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedCarColor(event.target.value));
  };

  return (
    <div className="form-wrapper">
      <Input
        type="text"
        placeholder="Car Name"
        disabled={selectedCar.id === 0}
        onChange={onEditCarName}
      ></Input>
      <Input type="color" disabled={selectedCar.id === 0} onChange={onEditCarColor}></Input>
      <Button
        text="Edit car"
        classes="basic"
        disabled={selectedCar.id === 0}
        onClickHandler={updateCar}
      ></Button>
    </div>
  );
};

export default CarFormEdit;
