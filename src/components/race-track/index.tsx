import Button from '../button';
import CarIcon from '../car';
import './style.scss';

const RaceTrack = () => {
  return (
    <div className="race-track-wrapper">
      <div className="race-track-info">
        <h3 className="car-name">BMW</h3>
        <div className="car-btn-container">
          <Button classes="select" text="Edit"></Button>
          <Button classes="select" text="Delete"></Button>
        </div>
      </div>
      <div className="race-track">
        <div className="race-btn-container">
          <Button></Button>
          <Button></Button>
        </div>
        <CarIcon carColor="#ff5733" />
      </div>
    </div>
  );
};

export default RaceTrack;
