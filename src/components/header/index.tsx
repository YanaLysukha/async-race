import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <div>
        <Link to="/garage">Garage</Link>
      </div>
      <div>
        <Link to="/winners">Winners</Link>
      </div>
    </header>
  );
};
