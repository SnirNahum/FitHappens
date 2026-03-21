import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DailyPage from './app/daily';
import SettingsPage from './app/settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/daily" replace />} />
        <Route path="/daily" element={<DailyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
