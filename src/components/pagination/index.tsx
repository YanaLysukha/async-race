import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCarsOnCurrentPage,
  selectCurrentPage,
  selectPagesAmount,
  setCurrentPage,
} from '../../store/slices/garageSlice';
import Button from '../button';
import ToTheLeftIcon from '../icons/to-the-left-icon';
import ToTheRightIcon from '../icons/to-the-right-icon';
import './style.scss';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const pagesAmount = useAppSelector(selectPagesAmount);
  const currentPage = useAppSelector(selectCurrentPage);

  const toTheNextPage = async () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchCarsOnCurrentPage(currentPage + 1));
  };

  const toThePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(fetchCarsOnCurrentPage(currentPage - 1));
  };

  return (
    <div className="garage-pagination-wrapper">
      <div className="pages">
        Page: {currentPage} / {pagesAmount}
      </div>
      <div className="pagination-btn-container">
        <Button classes="action pagination" onClickHandler={toThePrevPage}>
          <ToTheLeftIcon></ToTheLeftIcon>
        </Button>
        <Button classes="action pagination" onClickHandler={toTheNextPage}>
          <ToTheRightIcon></ToTheRightIcon>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
