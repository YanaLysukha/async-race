import { ICar } from '../../types';
import Button from '../button';
import CarIcon from '../car';
import StartIcon from '../icons/start-icon';
import StopIcon from '../icons/stop-icon';
import './style.scss';

type RacerProps = {
  carData: ICar;
};

const Racer = ({ carData }: RacerProps) => {
  const startRace = () => {
    console.log('start');
  };

  const stopRace = () => {
    console.log('stop');
  };

  return (
    <div className="race-track">
      <div className="race-btn-container">
        <Button classes="action" onClickHandler={startRace}>
          <StartIcon></StartIcon>
        </Button>
        <Button classes="action" onClickHandler={stopRace}>
          <StopIcon></StopIcon>
        </Button>
      </div>
      <CarIcon carColor={carData.color} />
    </div>
  );
};

export default Racer;
