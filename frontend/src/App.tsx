import { BrowserRouter as Router,Routes, Route,Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import TaskForm from './components/TaskForm'
import Dashborad from './components/Dashboard'
import TaskCard from './components/TaskCard'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

    return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <Router>
          <Routes>
            <Route path='/TaskCard/:id' element={<TaskCard />} />
            <Route path="/dashboard" element={<Dashborad />} />
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/taskform" element={<TaskForm />} />
          </Routes>
        </Router>
      </div>
    );
  

}

const AppWrapper = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;


