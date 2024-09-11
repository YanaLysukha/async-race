import { useEffect } from 'react';
import CarControlPanel from '../../components/car-control-panel';
import RaceTrack from '../../components/race-track';
import './style.scss';
import { fetchCars, selectCurrentCars } from '../../store/slices/garageSlice';
import { useAppDispatch, useAppSelector } from '../../store';

const GaragePage = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCurrentCars);

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  return (
    <main className="page-container">
      <CarControlPanel></CarControlPanel>
      <div className="tracks-container">
        {cars.map((car) => (
          <RaceTrack name={car.name} color={car.color} key={car.id}></RaceTrack>
        ))}
      </div>
    </main>
  );
};

export default GaragePage;
