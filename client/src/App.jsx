import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import CustomerPage from './pages/CustomerPage.jsx'
import AppointmentPage from './pages/AppointmentPage.jsx'
import AvailabilityPage from './pages/AvailabilityPage.jsx'
import PasswordPage from './pages/PasswordPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ManagerHomePage from './pages/ManagerHomePage.jsx'
//import "./style.css"

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/registration" element={<RegistrationPage/>}/>
          <Route path="/managerhome" element={<ManagerHomePage/>}/>
          <Route path="/appointment" element={<AppointmentPage/>}/>
          <Route path="/availability" element={<AvailabilityPage/>}/>
          <Route path="/customer" element={<CustomerPage/>}/>
          <Route path="/password" element={<PasswordPage/>}/>  
        </Routes>
        </BrowserRouter>
      </div>
      </>
  )
}

export default App
