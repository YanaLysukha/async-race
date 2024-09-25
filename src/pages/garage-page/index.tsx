import { useEffect } from 'react';
import CarControlPanel from '../../components/car-control-panel';
import RaceTrack from '../../components/race-track';
import './style.scss';
import {
  fetchCarsOnCurrentPage,
  RaceStatus,
  selectCarsAmount,
  selectCurrentCars,
  selectCurrentPage,
  setRaceStatus,
} from '../../store/slices/garageSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Pagination from '../../components/pagination';
import WinnerModal from '../../components/winner-modal';

const GaragePage = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCurrentCars);
  const carsAmount = useAppSelector(selectCarsAmount);
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {}, [currentPage, cars]);

  useEffect(() => {
    dispatch(fetchCarsOnCurrentPage(currentPage));
    dispatch(setRaceStatus(RaceStatus.INIT));
  }, []);

  return (
    <main className="page-container">
      <WinnerModal></WinnerModal>
      <CarControlPanel currentPage={currentPage}></CarControlPanel>
      <div className="cars-amount">Cars in garage: {carsAmount}</div>
      <div className="tracks-container">
        {cars.map((car) => (
          <RaceTrack carData={car} key={car.id} currentPage={currentPage}></RaceTrack>
        ))}
      </div>
      <Pagination></Pagination>
    </main>
  );
};

export default GaragePage;
