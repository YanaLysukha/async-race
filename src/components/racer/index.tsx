import { useEffect, useRef, useState } from 'react';
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
  const [status, setStatus] = useState<'stopped' | 'drive'>('stopped');
  const [velocity, setVelocity] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const carRef = useRef<HTMLDivElement>(null);
  const raceTrackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (status === 'drive' && velocity > 0 && distance > 0) {
      startAnimation();
    }
  }, [status, velocity, distance]);

  useEffect(() => {
    drive();
  }, [status]);

  const drive = async () => {
    if (status === 'drive') {
      const { success } = await Api.drive(carData.id);
      if (!success) {
        setStatus('stopped');
        setTime(0);
      }
    }
  };

  const startEngine = async () => {
    const { distance, velocity } = await Api.startEngine(carData.id);
    setVelocity(velocity);
    setDistance(distance);
    setStatus('drive');
  };

  const startAnimation = () => {
    const totalDistance = 50000;
    const distancePerSecond = (velocity / distance) * totalDistance;
    let currentPosition = 0;
    const time = distance / velocity / 1000;
    setTime(time);

    const animate = () => {
      if (currentPosition < totalDistance && status === 'drive') {
        currentPosition += distancePerSecond;
        setPosition(currentPosition);
        if (carRef.current) {
          carRef.current.style.transform = `translateX(${currentPosition}px)`;
        }
        if (Math.random() < 0.02) {
          setStatus('stopped');
          return;
        }
        requestAnimationFrame(animate);
      } else {
        setStatus('stopped');
      }
    };

    requestAnimationFrame(animate);
  };

  const handleStartClick = () => {
    console.log('start');
    if (status === 'stopped') {
      startEngine();
    }
  };

  const handleStopClick = () => {
    console.log('stop');
  };

  return (
    <div ref={raceTrackRef} className="race-track">
      <div className="race-btn-container">
        <Button classes="action" onClickHandler={handleStartClick}>
          <StartIcon></StartIcon>
        </Button>
        <Button classes="action" onClickHandler={handleStopClick}>
          <StopIcon></StopIcon>
        </Button>
      </div>
      <div
        className="car-container"
        ref={carRef}
        style={{
          transform: `translateX(${position}px)`,
          transition: `${time} linear`,
        }}
      >
        <CarIcon carColor={carData.color} />
      </div>
    </div>
  );
};

export default Racer;
