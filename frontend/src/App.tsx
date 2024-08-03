import React from 'react';import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PointPage from "./pages/PointPage";
import { I18nextProvider } from 'react-i18next';
import i18n from './plugins/i18n';

const App: React.FC = () => {
  return (
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/:collaboratorId" element={<PointPage />} />
          </Routes>
        </Router>
      </I18nextProvider>
  );
};

export default App;
