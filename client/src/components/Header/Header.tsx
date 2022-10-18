import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import "./header.css"

function Header({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  if (isAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', alignItems: "center" }}>
        <img className="logo" height={80} width={80} src={"/logo.png"} alt="Logo" onClick={() => navigate("/home")} />
        <div>
          <a className="btn-header" onClick={() => navigate("/home")}>My account</a>
          <img className="logout" height={40} width={40} src={"/logout.png"} alt="Logo" onClick={() => navigate("/home")} />
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', alignItems: "center" }}>
        <img className="logo" height={80} width={80} src={"/logo.png"} alt="Logo" onClick={() => navigate("/login")} />
        <div>
          <a className="btn-header" onClick={() => navigate("/register")}>Register</a>
          <a className="btn-header" onClick={() => navigate("/login")}>Login</a>
        </div>

      </div>
    )
  }

}

export default Header