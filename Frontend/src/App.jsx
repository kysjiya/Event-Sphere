import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Attendee/Dashboard';
import UpcomingExposRegistration from './pages/Attendee/UpcomingExposRegistration';
import Profile from './pages/profile';
import ManageExpos from './pages/Admin/Show-events';
import ManageBooths from './pages/Admin/manage-booth';
import AllExhibitors from './pages/Admin/exhibitors-profile';
import AllUsersTable from './pages/Admin/All-Users';
import EditUser from './pages/Admin/EditUser';
import AddUser from './pages/Admin/CreateUser';
import CreateBooth from './pages/Admin/CreateBooth';
import EditBooth from './pages/Admin/EditBooth';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ExhibitorDashboard from './pages/Exhibitor/ExhibitorDashboard';
import ExpoRegistrationForm from './pages/Exhibitor/ExpoRegistrationForm';
import AllExhibitorsRequests from './pages/Admin/manage-bookings';
import UpcomingExpos from './pages/Exhibitor/UpcomingExpos';
import CreateEvent from './pages/Admin/CreateEvent';
import EditEvent from './pages/Admin/EditEvent';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Show-events"
            element={
              <PrivateRoute>
                <ManageExpos />
              </PrivateRoute>
            }
          />
          <Route
            path="/exhibitor-dashboard"
            element={
              <PrivateRoute>
                <ExhibitorDashboard />
              </PrivateRoute>
            }
          />
<Route path="/ExpoRegistrationForm/:expoId" element={<ExpoRegistrationForm />} />
<Route path="/manage-bookings" element={<AllExhibitorsRequests />} />


          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/CreateBooth/:expoId"
            element={
              <PrivateRoute>
                <CreateBooth />
              </PrivateRoute>
            }
          />
          <Route
           path="/manage-booth/:expoId" 
           element={
           <ManageBooths />
           } 
           />
         <Route 
         path="/EditBooth/:boothId" 
         element={
         <EditBooth />
         } 
         />
         <Route 
         path="/All-Users" 
         element={
         <AllUsersTable />
         } 
         />

        <Route 
         path="/create-user" 
         element={
         <AddUser />
         } 
         />

        <Route 
         path="/edit-user/:id" 
         element={
         <EditUser />
         } 
         />

         <Route 
         path="/exhibitors-profile" 
         element={
         <AllExhibitors />
         } 
         />
       {/* <Route path="/expo/:expoId/register" element={<ExpoRegistrationForm />} /> */}
        <Route path="/UpcomingExposRegistration" element={<UpcomingExposRegistration />} />

          <Route
            path="/edit-event/:id"
            element={
              <PrivateRoute>
                <EditEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/UpcomingExpos"
            element={
              <PrivateRoute>
                <UpcomingExpos />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
