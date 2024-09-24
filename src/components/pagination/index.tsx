import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCarsOnCurrentPage,
  RaceStatus,
  selectCurrentPage,
  selectPagesAmount,
  setCurrentPage,
  setRaceStatus,
} from '../../store/slices/garageSlice';
import Button from '../button';
import ToTheLeftIcon from '../icons/to-the-left-icon';
import ToTheRightIcon from '../icons/to-the-right-icon';
import './style.scss';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const pagesAmount = useAppSelector(selectPagesAmount);
  const currentPage = useAppSelector(selectCurrentPage);

  const resetRace = () => {
    dispatch(setRaceStatus(RaceStatus.INIT));
  };

  const toTheNextPage = async () => {
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
    <div className="garage-pagination-wrapper">
      <div className="pages">
        Page: {currentPage} / {pagesAmount}
      </div>
      <div className="pagination-btn-container">
        <Button
          classes="action pagination"
          onClickHandler={toThePrevPage}
          disabled={currentPage === 1}
        >
          <ToTheLeftIcon></ToTheLeftIcon>
        </Button>
        <Button
          classes="action pagination"
          onClickHandler={toTheNextPage}
          disabled={currentPage === pagesAmount}
        >
          <ToTheRightIcon></ToTheRightIcon>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
