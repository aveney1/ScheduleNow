import React ,{useContext, createContext,useMemo, useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage'
import ManagerHomePage from './pages/ManagerHomePage'
import CustomerPage from './pages/CustomerPage'
import AppointmentPage from './pages/AppointmentPage'
import AvailabilityPage from './pages/AvailabilityPage'
import PasswordPage from "./pages/PasswordPage.jsx";
import { UserProvider} from './context/UserContext.jsx';
import { useUserContext } from './context/UserContext.jsx';



function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/managerhome" element={<ManagerHomePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/appointment/:id" element={<AppointmentPage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/availability/:id" element={<AvailabilityPage />} />
            <Route path="/password" element={<PasswordPage />} />
          </Routes>
        </BrowserRouter>
        </UserProvider>
  );
}

export default App;
