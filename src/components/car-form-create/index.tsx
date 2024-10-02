import { useState } from 'react';
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
  const [carName, setCarName] = useState('');
  const [carColor, setCarColor] = useState('');

  const createCar = () => {
    dispatch(fetchCreateCar(createdCar ?? { name: 'New Car', color: '#ffffff' }, currentPage));
    setCarName('');
    setCarColor('ffffff');
  };

  const onCreateCarName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedCarName(event?.target.value));
    setCarName(event.target.value);
  };

  const onCreateCarColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCreatedCarColor(event.target.value));
    setCarColor(event.target.value);
  };

  return (
    <div className="form-wrapper">
      <Input
        type="text"
        placeholder="Create your new car"
        onChange={onCreateCarName}
        value={carName}
      ></Input>
      <Input type="color" onChange={onCreateCarColor} value={carColor}></Input>
      <Button text="Create car" classes="basic" onClickHandler={createCar}></Button>
    </div>
  );
};

export default CarFormCreate;
