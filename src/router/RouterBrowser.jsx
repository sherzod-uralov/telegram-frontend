import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Home from "../Components/Home";
function RouterBrowser() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/" Component={Register} />
          <Route path="/login" Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouterBrowser;
