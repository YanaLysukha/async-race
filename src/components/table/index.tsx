import { useAppDispatch } from '../../store/hooks';
import {
  IWinnerInfo,
  setSortParam,
  toggleTimeOrder,
  toggleWinsOrder,
  WinnersSortOrder,
  WinnersSortParams,
} from '../../store/slices/winnersSlice';
import CarIcon from '../car';
import './style.scss';

type TableProps = {
  winners: IWinnerInfo[];
  timeOrder: WinnersSortOrder;
  winsOrder: WinnersSortOrder;
};

const WinnersTable = ({ winners, timeOrder, winsOrder }: TableProps) => {
  const dispatch = useAppDispatch();

  const sortTime = () => {
    dispatch(toggleTimeOrder(timeOrder));
    dispatch(setSortParam(WinnersSortParams.TIME));
  };

  const sortWins = () => {
    dispatch(toggleWinsOrder(winsOrder));
    dispatch(setSortParam(WinnersSortParams.WINS));
  };

  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th
            className={`${winsOrder === WinnersSortOrder.ASC ? 'table-head-item asc' : 'table-head-item desc'}`}
            onClick={sortWins}
          >
            Wins
          </th>
          <th
            className={`${timeOrder === WinnersSortOrder.ASC ? 'table-head-item asc' : 'table-head-item desc'}`}
            onClick={sortTime}
          >
            Best time
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={winner.id} className="table-row">
            <td className="table-row-item">{index + 1}</td>
            <td className="table-row-item">
              <CarIcon carColor={winner.color}></CarIcon>
            </td>
            <td className="table-row-item">{winner.name}</td>
            <td className="table-row-item">{winner.wins}</td>
            <td className="table-row-item">{winner.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTable;
