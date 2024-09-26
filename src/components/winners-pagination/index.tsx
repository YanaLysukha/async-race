import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchGetWinners,
  selectPageNumber,
  selectPagesAmount,
  setPageNumber,
} from '../../store/slices/winnersSlice';
import Button from '../button';
import ToTheLeftIcon from '../icons/to-the-left-icon';
import ToTheRightIcon from '../icons/to-the-right-icon';
import './style.scss';

const WinnersPagination = () => {
  const dispatch = useAppDispatch();
  const currentPageNumber = useAppSelector(selectPageNumber);
  const pagesAmount = useAppSelector(selectPagesAmount);

  const toTheNextPage = async () => {
    dispatch(setPageNumber(currentPageNumber + 1));
    dispatch(fetchGetWinners(currentPageNumber + 1, 'wins', 'ASC'));
  };

  const toThePrevPage = () => {
    dispatch(setPageNumber(currentPageNumber - 1));
    dispatch(fetchGetWinners(currentPageNumber - 1, 'wins', 'ASC'));
  };

  return (
    <div className="winners-pagination-wrapper">
      <div className="pages">
        Page: {currentPageNumber} / {pagesAmount}
      </div>
      <div className="pagination-btn-container">
        <Button
          classes="action pagination"
          onClickHandler={toThePrevPage}
          disabled={currentPageNumber === 1}
        >
          <ToTheLeftIcon></ToTheLeftIcon>
        </Button>
        <Button
          classes="action pagination"
          onClickHandler={toTheNextPage}
          disabled={currentPageNumber === pagesAmount}
        >
          <ToTheRightIcon></ToTheRightIcon>
        </Button>
      </div>
    </div>
  );
};

export default WinnersPagination;
