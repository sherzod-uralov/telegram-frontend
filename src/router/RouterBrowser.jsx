import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Sidebar from '../components/Register';
import Groups from '../components/group'; // Correct the component name to 'Groups'
import SideGroup from '../components/SideGroup';
const RouterBrowser = () => {
  const token = localStorage.getItem('token');
  console.log(token);

  return (
    <BrowserRouter>
      <SideGroup />
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/group/:id" element={<Groups />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterBrowser;
