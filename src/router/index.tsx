import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import GaragePage from '../pages/garage-page';
import WinnersPage from '../pages/winners-page';

export function RouterComponent() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/garage" />} />
        <Route path="/garage" element={<GaragePage />} />
        <Route path="/winners" element={<WinnersPage />} />
      </Routes>
    </Router>
  );
}
