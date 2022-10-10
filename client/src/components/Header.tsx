import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Header</div>
      <Button onClick={() => navigate("/register")} variant="primary" >Primary</Button>  
    </div>
  )
}

export default Header