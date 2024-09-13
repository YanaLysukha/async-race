import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCreateCar,
  selectCreatedCar,
  setCreatedCarColor,
  setCreatedCarName,
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

  const createCar = () => {
    dispatch(fetchCreateCar(createdCar ?? { name: 'New Car', color: '#ffffff' }, currentPage));
  };

  const onCreateCarName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedCarName(event?.target.value));
  };

  const onCreateCarColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedCarColor(event.target.value));
  };

  return (
    <div className="form-wrapper">
      <Input type="text" placeholder="Car Name" onChange={onCreateCarName}></Input>
      <Input type="color" onChange={onCreateCarColor}></Input>
      <Button text="Create car" classes="basic" onClickHandler={createCar}></Button>
    </div>
  );
};

export default CarFormCreate;
