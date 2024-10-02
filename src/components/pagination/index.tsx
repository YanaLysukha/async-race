import Button from '../button';
import ToTheLeftIcon from '../icons/to-the-left-icon';
import ToTheRightIcon from '../icons/to-the-right-icon';
import './style.scss';

type PaginationProps = {
  currentPage: number;
  pagesAmount: number;
  toThePrevPage: () => void;
  toTheNextPage: () => void;
};

const Pagination = ({
  currentPage,
  pagesAmount,
  toThePrevPage,
  toTheNextPage,
}: PaginationProps) => {
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
