//Routes.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import Login from './pages/login';
import Signup from './pages/signup';
import PasswordRecovery from './pages/password-recovery';
import ResetPassword from './pages/reset-password';
import AtivarConta from './pages/ativar-conta';
import AdminDashboard from './pages/admin-dashboard';

function Router() {
  console.log('Rendering Routes');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<PasswordRecovery />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ativar-conta" element={<AtivarConta />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default Router;

