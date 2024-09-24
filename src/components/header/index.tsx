import { Link } from 'react-router-dom';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RaceStatus, selectRaceStatus, setRaceStatus } from '../../store/slices/garageSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector(selectRaceStatus);

  const switchPage = () => {
    if (raceStatus === RaceStatus.RACE) {
      dispatch(setRaceStatus(RaceStatus.INIT));
    }
  };

  return (
    <header className="header">
      <div className="logo">Async race</div>
      <nav>
        <ul className="navigation-list">
          <li>
            <Link to="/garage" className="nav-link" onClick={switchPage}>
              Garage
            </Link>
          </li>
          <li>
            <Link to="/winners" className="nav-link" onClick={switchPage}>
              Winners
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
