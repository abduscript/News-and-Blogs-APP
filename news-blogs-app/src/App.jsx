import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import MainApp from './MainApp.jsx'; // MainApp = komponen yang render News

const App = () => {
  return (
    <AuthProvider> {/* Bungkus semua supaya state Auth global */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Proteksi route /home */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <MainApp />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
