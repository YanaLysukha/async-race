import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCreateCar,
  selectCreatedCar,
  selectCurrentInputValues,
  setCreatedCarColor,
  setCreatedCarName,
  setInputColor,
  setInputName,
} from '../../store/slices/garageSlice';
import Button from '../button';
import Input from '../input';
import './style.scss';

type CarFormCreateProps = {
  currentPage: number;
};

const CarFormCreate = ({ currentPage }: CarFormCreateProps) => {
  const createdCar = useAppSelector(selectCreatedCar);
  const dispatch = useAppDispatch();
  const currentInputValue = useAppSelector(selectCurrentInputValues);

  const createCar = () => {
    dispatch(fetchCreateCar(createdCar ?? { name: 'New Car', color: '#ffffff' }, currentPage));
    dispatch(setInputName(''));
    dispatch(setInputColor('#000000'));
  };

  const onCreateCarName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedCarName(event?.target.value));
    dispatch(setInputName(event.target.value));
  };

  const onCreateCarColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedCarColor(event.target.value));
    dispatch(setInputColor(event.target.value));
  };

  return (
    <div className="form-wrapper">
      <Input
        type="text"
        placeholder="Create your new car"
        onChange={onCreateCarName}
        value={currentInputValue.name}
      ></Input>
      <Input type="color" onChange={onCreateCarColor} value={currentInputValue.color}></Input>
      <Button text="Create car" classes="basic" onClickHandler={createCar}></Button>
    </div>
  );
};

export default CarFormCreate;
