import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on initial load if token exists in cookies
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me'); // Backend should return user info if cookie is valid
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });

      if (res.data?.user) {
        setUser(res.data.user);
        toast.success("Login successful");
        return res.data.user;
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Login failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout'); // This route clears the cookie
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };
  const isAdmin = () => user?.role === 'admin'; // Add this line
  const isExhibitor = () => user?.role === 'exhibitor';
  const isAttendee = () => user?.role === 'attendee';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, isExhibitor, isAttendee }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => useContext(AuthContext);
