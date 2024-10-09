import { useEffect, useState } from 'react';
import CarControlPanel from '../../components/car-control-panel';
import RaceTrack from '../../components/race-track';
import WinnerModal from '../../components/winner-modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCarsOnCurrentPage,
  RaceStatus,
  selectCarsAmount,
  selectCurrentCars,
  selectCurrentPage,
  selectPagesAmount,
  setCurrentPage,
  setRaceStatus,
} from '../../store/slices/garageSlice';
import './style.scss';
import Pagination from '../../components/pagination';
import { resetWinner, selectRaceWinner } from '../../store/slices/winnersSlice';

const GaragePage = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCurrentCars);
  const carsAmount = useAppSelector(selectCarsAmount);
  const currentPage = useAppSelector(selectCurrentPage);
  const pagesAmount = useAppSelector(selectPagesAmount);
  const raceWinner = useAppSelector(selectRaceWinner);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (raceWinner.id) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [raceWinner.id]);

  useEffect(() => {}, [currentPage, cars]);

  useEffect(() => {
    dispatch(fetchCarsOnCurrentPage(currentPage));
    dispatch(setRaceStatus(RaceStatus.RESET));
  }, []);

  const resetRace = () => {
    dispatch(setRaceStatus(RaceStatus.RESET));
    dispatch(resetWinner());
  };

  const toTheNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchCarsOnCurrentPage(currentPage + 1));
    resetRace();
  };

  const toThePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchCarsOnCurrentPage(currentPage - 1));
    resetRace();
  };

  return (
    <main className="page-container">
      {isVisible && <WinnerModal raceWinner={raceWinner}></WinnerModal>}
      <CarControlPanel currentPage={currentPage}></CarControlPanel>
      <div className="cars-amount">Cars in garage: {carsAmount}</div>
      <div className="tracks-container">
        {cars.map((car) => (
          <RaceTrack carData={car} key={car.id} currentPage={currentPage}></RaceTrack>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pagesAmount={pagesAmount}
        toTheNextPage={toTheNextPage}
        toThePrevPage={toThePrevPage}
      ></Pagination>
    </main>
  );
};

export default GaragePage;
