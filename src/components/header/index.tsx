import { Link } from 'react-router-dom';
import './style.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="logo">Async race</div>
      <nav>
        <ul className="navigation-list">
          <li>
            <Link to="/garage" className="nav-link">
              Garage
            </Link>
          </li>
          <li>
            <Link to="/winners" className="nav-link">
              Winners
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
