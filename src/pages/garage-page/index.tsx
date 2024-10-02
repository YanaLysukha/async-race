import { useEffect } from 'react';
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
import { resetWinner } from '../../store/slices/winnersSlice';

const GaragePage = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectCurrentCars);
  const carsAmount = useAppSelector(selectCarsAmount);
  const currentPage = useAppSelector(selectCurrentPage);
  const pagesAmount = useAppSelector(selectPagesAmount);

  useEffect(() => {}, [currentPage, cars]);

  useEffect(() => {
    dispatch(fetchCarsOnCurrentPage(currentPage));
    dispatch(setRaceStatus(RaceStatus.INIT));
  }, []);

  const resetRace = () => {
    dispatch(setRaceStatus(RaceStatus.INIT));
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
      <WinnerModal></WinnerModal>
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
