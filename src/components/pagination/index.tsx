import Button from '../button';
import ToTheLeftIcon from '../icons/to-the-left-icon';
import ToTheRightIcon from '../icons/to-the-right-icon';
import './style.scss';

const Pagination = () => {
  return (
    <div className="garage-pagination-wrapper">
      <div className="pages">Page: </div>
      <div className="pagination-btn-container">
        <Button classes="action pagination">
          <ToTheLeftIcon></ToTheLeftIcon>
        </Button>
        <Button classes="action pagination">
          <ToTheRightIcon></ToTheRightIcon>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
