import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
