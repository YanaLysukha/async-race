import CarControlPanel from '../../components/car-control-panel';
import RaceTrack from '../../components/race-track';
import './style.scss';

const GaragePage = () => {
  return (
    <main className="page-container">
      <CarControlPanel></CarControlPanel>
      <RaceTrack></RaceTrack>
    </main>
  );
};

export default GaragePage;
