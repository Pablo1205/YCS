import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from "./components/Register";
import Login from "./components/Login";

import api from "./api/api";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const fetchAuth = async () => {
    try {
      const res = await api.get("/auth/login");
      console.log(res);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
      setIsAuth(false);
    }

  }
  useEffect(() => {
    console.log("reftrech api")
    fetchAuth();
  }, [])

  return (
    <div className="px-3">
      <Header isAuth={isAuth} />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );

}

export default App;
