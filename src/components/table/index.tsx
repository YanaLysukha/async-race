import { IWinnerInfo } from '../../store/slices/winnersSlice';
import CarIcon from '../car';
import './style.scss';

type TableProps = {
  winners: IWinnerInfo[];
};

const WinnersTable = ({ winners }: TableProps) => {
  return (
    <table className="table">
      <thead className="table-head">
        <tr>
          <th className="table-head-item">Number</th>
          <th className="table-head-item">Car</th>
          <th className="table-head-item">Name</th>
          <th className="table-head-item">Wins</th>
          <th className="table-head-item">Best time</th>
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
