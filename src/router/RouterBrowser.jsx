import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Groups from '../components/group'; 
import SideGroup from '../components/SideGroup';
const RouterBrowser = () => {
  const token = localStorage.getItem('token');
  console.log(token);

  return (
    <BrowserRouter>
    {token ? <SideGroup/> : ''}
      <Routes>
        {token ? <Route path="/group" element={<Groups />} /> : <Route path="/" element={<Register/>} />}
        <Route path="/login" element={<Login />} />
        <Route path="/group/:id" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterBrowser;
