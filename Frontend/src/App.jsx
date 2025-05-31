import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/profile'
import AdminDashboard from './pages/AdminDashboard'
import ExhibitorDashboard from './pages/ExhibitorDashboard'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Attendee Routes */}
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
                <AdminDashboard />
            }
          />

          {/* Exhibitor Routes */}
          <Route
            path="/exhibitor-dashboard"
            element={
                <ExhibitorDashboard />
            }
          />
          <Route
            path="/create"
            element={
                <CreateEvent />
            }
          />
          <Route
            path="/edit-event/:id"
            element={
                <EditEvent />
            }
          />

          {/* Common Routes */}
          <Route
            path="/profile"
            element={
                <Profile />
            }
          />
          <Route path="/events" element={<Home />} />
          <Route path="/categories" element={<Home />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
