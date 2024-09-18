import { useEffect, useRef, useState } from 'react';
import Api from '../../api/engine';
import { ICar } from '../../types';
import Button from '../button';
import CarIcon from '../car';
import StartIcon from '../icons/start-icon';
import StopIcon from '../icons/stop-icon';
import './style.scss';

type RacerProps = {
  carData: ICar;
};

// const INITIAL_POSITION = 85;

const Racer = ({ carData }: RacerProps) => {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const image = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const startAnimation = async () => {
      const { distance, velocity } = await Api.startEngine(carData.id);
      const time = (distance / velocity) * 1000;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / time, 1);

        const currentX = distance * progress;
        setPosition(currentX);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
        if (currentX >= window.innerWidth - 260) {
          setIsAnimating(false);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      startAnimation();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating]);

  const handleStartClick = () => {
    setIsAnimating(true);
  };

  const handleStopClick = () => {
    setPosition(0);
    setIsAnimating(false);
  };

  return (
    <div className="race-track">
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
        ref={image}
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
