import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Register from "./components/Register";
function App() {
  return (
    <div className="px-3"> 
      <Header />
      <Routes>
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
