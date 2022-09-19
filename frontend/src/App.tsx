import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/login.page';
import { PrivateRoute } from './routes/private-route';
import { AdminRoute } from './routes/admin-route';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<PrivateRoute />} />
        <Route path='/lista-empleados' element={<AdminRoute />} />
        <Route path='*' element={<Navigate to={'/'} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
