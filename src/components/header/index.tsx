import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RaceStatus, selectRaceStatus, setRaceStatus } from '../../store/slices/garageSlice';
import { resetWinner } from '../../store/slices/winnersSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector(selectRaceStatus);
  const location = useLocation();

  const switchPage = () => {
    if (raceStatus === RaceStatus.RACE) {
      dispatch(setRaceStatus(RaceStatus.RESET));
      dispatch(resetWinner());
    }
  };

  return (
    <header className="header">
      <div className="logo">Async race</div>
      <nav>
        <ul className="navigation-list">
          <li>
            <Link
              to="/garage"
              className={location.pathname === '/garage' ? 'nav-link current' : 'nav-link'}
              onClick={switchPage}
            >
              Garage
            </Link>
          </li>
          <li>
            <Link
              to="/winners"
              className={location.pathname === '/winners' ? 'nav-link current' : 'nav-link'}
              onClick={switchPage}
            >
              Winners
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
