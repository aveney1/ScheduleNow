import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import CustomerPage from './pages/CustomerPage'
import AppointmentPage from './pages/AppointmentPage'
import AvailabilityPage from './pages/AvailabilityPage'
import PasswordPage from './pages/PasswordPage'
import LoginPage from './pages/LoginPage'
import ManagerHomePage from './pages/ManagerHomePage'
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
