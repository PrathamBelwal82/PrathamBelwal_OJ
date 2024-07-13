import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './pages/register';
import Home from './home'
import Dashboard from './dashBoard'
import Problems from './problems'
import PrivateRoute from './privateRoute';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
        />
        <Route path="/dashboard" element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/problems" element={ <PrivateRoute><Problems /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
