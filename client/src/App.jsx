import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage.jsx'
import AppointmentPage from './pages/AppointmentPage'
import AvailabilityPage from './pages/AvailabilityPage'
import NotFound404 from './pages/NotFound404.jsx';
import { UserProvider} from './context/UserContext.jsx';
import RouteProtector from './utils/RouteProtector.jsx';



function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/registration" element={<RegistrationPage />} />
            <Route exact path="/home" element={<RouteProtector><HomePage /></RouteProtector>}/>
            <Route exact path="/appointment" element={<RouteProtector><AppointmentPage /></RouteProtector>} />
            <Route exact path="/appointment/:id" element={<RouteProtector><AppointmentPage /></RouteProtector>} />
            <Route exact path="/availability" element={<RouteProtector><AvailabilityPage /></RouteProtector>} />
            <Route exact path="/availability/:id" element={<RouteProtector><AvailabilityPage /></RouteProtector>} />
            <Route exact path="*" element={<RouteProtector><NotFound404 /></RouteProtector>} />
          </Routes>
        </BrowserRouter>
        </UserProvider>
  );
}

export default App;
