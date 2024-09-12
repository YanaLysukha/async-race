import { useEffect } from 'react';
import CarControlPanel from '../../components/car-control-panel';
import RaceTrack from '../../components/race-track';
import './style.scss';
import { fetchCars, selectCarsAmount, selectCurrentCars } from '../../store/slices/garageSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Pagination from '../../components/pagination';

const GaragePage = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCurrentCars);
  const carsAmount = useAppSelector(selectCarsAmount);

  useEffect(() => {
    dispatch(fetchCars(1));
  }, []);

  return (
    <main className="page-container">
      <CarControlPanel></CarControlPanel>
      <div className="cars-amount">Cars in garage: {carsAmount}</div>
      <div className="tracks-container">
        {cars.map((car) => (
          <RaceTrack name={car.name} color={car.color} key={car.id}></RaceTrack>
        ))}
      </div>
      <Pagination></Pagination>
    </main>
  );
};

export default GaragePage;
