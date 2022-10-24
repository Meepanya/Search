import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LogInPage from './pages/LogInPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/SignUpPage';
import './styles/Global.css';

function App() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Router>
        <Routes>
          <Route path="" element={<SearchPage />} />
          <Route path="log-in" element={<LogInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
