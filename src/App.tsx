import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Layout from './components/layout/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<Layout />}>
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
