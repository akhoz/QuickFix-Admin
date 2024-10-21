import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import RepairRequests from './pages/RepairRequests';
import Layout from './components/layout/Layout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-center w-screen h-full">
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LogIn />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />} />

          <Route element={<Layout />}>
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
            <Route path="/requests" element={isLoggedIn ? <RepairRequests /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
