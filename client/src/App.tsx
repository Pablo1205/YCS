import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

import api from "./api/api";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchAuth = async () => {
    try {
      const res = await api.get("/auth/login");
      navigate("/home");
      setIsAuth(true);
      setLoading(false);
    } catch (err) {
      setIsAuth(false);
      setLoading(false);
    }

  }
  useEffect(() => {
    fetchAuth();
  }, [])

  const onAuthSuccess = () => {
    setIsAuth(true);
    navigate("/home");
  }

  if (loading) {
    return (
      <></>
    )
  } else {
    return (
      <div className="px-3">
        <Header isAuth={isAuth} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/register' element={<Register onSuccess={() => onAuthSuccess} />} />
          <Route path='/login' element={<Login onSuccess={() => onAuthSuccess} />} />
        </Routes>
      </div>
    );
  }



}

export default App;
