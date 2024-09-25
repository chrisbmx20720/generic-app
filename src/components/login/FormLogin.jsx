import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { getUsers } from '../../services/UserService';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormLogin.css';

import {toast } from 'react-toastify';


export default function FormLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const usersData = await getUsers();
      const user = usersData.find(user => user.email === email && user.password === password);

      if (user) {
        dispatch(login(user));

        toast.success(`Welcome Back, ${user.name}`,{
          autoClose: 1000
          })

        setTimeout(()=>{
          navigate("/admin");
        },1500)
        
      } else {
        setError("Incorrect email or password");
      }
    } catch (err) {
      setError("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

   
    <Container className="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-form p-4 bg-light border rounded shadow-sm">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </Form>
      </div>

      
    </Container>

    
  );
}
