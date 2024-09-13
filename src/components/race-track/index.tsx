import { useAppDispatch } from '../../store/hooks';
import { fetchDeleteCar } from '../../store/slices/garageSlice';
import Button from '../button';
import CarIcon from '../car';
import DeleteIcon from '../icons/delete-icon';
import EditIcon from '../icons/edit-icon';
import StartIcon from '../icons/start-icon';
import StopIcon from '../icons/stop-icon';
import './style.scss';

type RaceTrackProps = {
  carData: {
    name: string;
    color: string;
    id: number;
  };
  currentPage: number;
};

const RaceTrack = ({ carData, currentPage }: RaceTrackProps) => {
  const dispatch = useAppDispatch();

  const deleteCar = () => {
    dispatch(fetchDeleteCar(carData.id, currentPage));
  };

  return (
    <div className="race-track-wrapper">
      <div className="race-track-info">
        <h3 className="car-name">{carData.name}</h3>
        <div className="car-btn-container">
          <Button classes="select" text="Edit">
            <EditIcon></EditIcon>
          </Button>
          <Button classes="select" text="Delete" onClickHandler={deleteCar}>
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
        <CarIcon carColor={carData.color} />
      </div>
    </div>
  );
};

export default RaceTrack;
