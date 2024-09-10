import Button from '../button';
import CarIcon from '../car';
import DeleteIcon from '../icons/delete-icon';
import EditIcon from '../icons/edit-icon';
import StartIcon from '../icons/start-icon';
import StopIcon from '../icons/stop-icon';
import './style.scss';

const RaceTrack = () => {
  return (
    <div className="race-track-wrapper">
      <div className="race-track-info">
        <h3 className="car-name">BMW</h3>
        <div className="car-btn-container">
          <Button classes="select" text="Edit">
            <EditIcon></EditIcon>
          </Button>
          <Button classes="select" text="Delete">
            <DeleteIcon></DeleteIcon>
          </Button>
        </div>
      </div>
      <div className="race-track">
        <div className="race-btn-container">
          <Button classes="action">
            <StartIcon></StartIcon>
          </Button>
          <Button classes="action">
            <StopIcon></StopIcon>
          </Button>
        </div>
        <CarIcon carColor="#ff5733" />
      </div>
    </div>
  );
};

export default RaceTrack;
