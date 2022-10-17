import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Register() {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [error, setError] = useState("");

  const mailValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(mail) === false) {

      return false;
    }
    return true;
  }

  const sendFormulaire = () => {
    if (mailValidation() === false) return setError("Mail is incorrect");
    if (username.length === 0) return setError("Username is incorrect");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirmPassword) return setError("Passwords don't match");
    if (lastName.length === 0) return setError("Last name is incorrect");
    if (firstName.length === 0) return setError("First name is incorrect");
    setError("");
  }

  return (
    <div style={{ alignSelf: "center", width: 500, marginLeft: "auto", marginRight: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Register</h1>
      <Form>
        <Form.Group controlId="form.mail">
          <Form.Label>Mail address</Form.Label>
          <Form.Control type="mail" onChange={(e) => { setMail(e.target.value) }} placeholder="name@example.com" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="form.Username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="form.Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="form.ConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="form.lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" onChange={(e) => { setLastName(e.target.value) }} placeholder="Last Name" />
        </Form.Group>
        <Form.Group controlId="form.firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" onChange={(e) => { setFirstName(e.target.value) }} placeholder="First Name" />
        </Form.Group>
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        <Button variant="primary" onClick={() => sendFormulaire()}>Register</Button>
      </Form>
    </div>
  )
}
