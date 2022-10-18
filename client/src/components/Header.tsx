import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Header({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  if(isAuth) {
    return (
      <div>
        <div>Header</div>
        <Button onClick={() => navigate("/home")} variant="primary" >Home</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button onClick={() => navigate("/register")} variant="primary" >Register</Button>
        <Button onClick={() => navigate("/login")} variant="primary" >Login</Button>
      </div>
    )
  }
  
}

export default Header