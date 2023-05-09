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
import AddSignals from './pages/add-signals';

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
        <Route path="/admin/add-signals" element={<AddSignals />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default Router;

