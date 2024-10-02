import { useEffect, useRef, useState } from 'react';
import Api from '../../api/engine';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RaceStatus, selectRaceStatus } from '../../store/slices/garageSlice';
import { selectIsRaceFinished, setWinner } from '../../store/slices/winnersSlice';
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
  const [isDriving, setIsDriving] = useState(false);
  const [position, setPosition] = useState(0);
  const animationId = useRef<number>(0);
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector(selectRaceStatus);
  const isRaceFinished = useAppSelector(selectIsRaceFinished);

  useEffect(() => {
    drive();
  }, [isDriving]);

  useEffect(() => {
    switch (raceStatus) {
      case RaceStatus.RACE:
        startRace();
        break;
      case RaceStatus.RESET:
        stopRace();
        break;
    }
  }, [raceStatus]);

  const drive = async () => {
    if (isDriving) {
      const { success } = await Api.drive(carData.id);
      if (!success) {
        cancelAnimationFrame(animationId.current);
      }
    }
  };

  const animateRace = (velocity: number, distance: number) => {
    let start: number;
    let finished = false;
    const sumOfIndents = 260;
    const time = distance / velocity;
    const trackWidth = window.innerWidth - sumOfIndents;
    const frameVelocity = trackWidth / time;

    function step(timeStamp: number) {
      if (start === undefined) start = timeStamp;
      const elapsed = timeStamp - start;

      const position = Math.min(frameVelocity * elapsed, trackWidth);
      setPosition(position);
      if (position === trackWidth) {
        finished = true;
        endAnimation(time);
      }

      if (!finished) {
        animationId.current = requestAnimationFrame(step);
      }
    }
    animationId.current = requestAnimationFrame(step);
  };

  const startRace = async () => {
    const { velocity, distance } = await Api.startEngine(carData.id);
    setIsDriving(true);
    animateRace(velocity, distance);
  };

  const stopRace = async () => {
    if (isDriving) {
      await Api.stopEngine(carData.id);
      setIsDriving(false);
      setPosition(0);
      cancelAnimationFrame(animationId.current);
    }
  };

  const handleStartClick = () => {
    startRace();
  };

  const handleStopClick = () => {
    stopRace();
  };

  const endAnimation = (time: number) => {
    if (!isRaceFinished && raceStatus === RaceStatus.RACE) {
      dispatch(
        setWinner({
          id: carData.id,
          name: carData.name,
          time,
        }),
      );
    }
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
        }}
      >
        <CarIcon carColor={carData.color} />
      </div>
    </div>
  );
};

export default Racer;
