import { useEffect, useState } from 'react';
import { ICar } from '../../types';
import Button from '../button';
import CarIcon from '../car';
import StartIcon from '../icons/start-icon';
import StopIcon from '../icons/stop-icon';
import './style.scss';
import Api from '../../api/engine';

type RacerProps = {
  carData: ICar;
};

const Racer = ({ carData }: RacerProps) => {
  const [time, setTime] = useState(0);
  const [isDriving, setIsDriving] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    drive();
  }, [isDriving]);

  const drive = async () => {
    if (isDriving) {
      const { success } = await Api.drive(carData.id);
      if (!success) {
        setTime(0);
        setIsDriving(false);
      }
    }
  };

  const startRace = async () => {
    const { velocity, distance } = await Api.startEngine(carData.id);
    setIsDriving(true);
    const animationTime = parseInt((distance / velocity).toString(), 10);
    const trackWidth = window.innerWidth - 260;
    setTime(animationTime);
    setPosition(trackWidth);
  };

  const stopRace = async () => {
    await Api.stopEngine(carData.id);
    setIsDriving(false);
    setPosition(0);
    setTime(0);
  };

  const handleStartClick = () => {
    startRace();
  };

  const handleStopClick = () => {
    stopRace();
  };

  return (
    <div className="race-track">
      <div className="race-btn-container">
        <Button classes="action" onClickHandler={handleStartClick} disabled={isDriving}>
          <StartIcon></StartIcon>
        </Button>
        <Button classes="action" onClickHandler={handleStopClick} disabled={!isDriving}>
          <StopIcon></StopIcon>
        </Button>
      </div>
      <div
        className="car-container"
        style={{
          transform: `translateX(${position}px)`,
          transition: `${time}ms linear`,
        }}
      >
        <CarIcon carColor={carData.color} />
      </div>
    </div>
  );
};

export default Racer;
