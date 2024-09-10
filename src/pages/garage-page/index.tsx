import { useCallback, useEffect, useState } from 'react';
import CarControlPanel from '../../components/car-control-panel';
import RaceTrack from '../../components/race-track';
import './style.scss';
import Api from '../../api/cars';
import { ICar } from '../../types';

const GaragePage = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const carsFromGarage = await Api.getCars();
      if (carsFromGarage) {
        setCars(carsFromGarage);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
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
