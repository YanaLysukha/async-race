import { IWinnerInfo } from '../../store/slices/winnersSlice';
import CarIcon from '../car';

type TableProps = {
  winners: IWinnerInfo[];
};

const WinnersTable = ({ winners }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner) => (
          <tr key={winner.id}>
            <td>{winner.id}</td>
            <td>
              <CarIcon carColor={winner.color}></CarIcon>
            </td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WinnersTable;
