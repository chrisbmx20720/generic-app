import React from 'react';
import { useLocation,Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slices/authSlice';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function MyNavbar() {
  const location = useLocation(); 
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  
  const getBrandText = () => {
    if (location.pathname === '/login') {
      return 'Login';
    } else if (location.pathname === '/admin') {
      return 'Admin Dashboard';
    } else if (location.pathname === '/register') {
      return 'Register';
    } else {
      return 'Home';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container fluid className="w-100 bg-dark header-nav">

      <Container>
        <h4 className='text-light mb-2 mt-2 text-start' >{getBrandText()}</h4>
      </Container>
      <Navbar bg="dark" variant="dark" expand="lg">
  
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            </Nav.Item>
          </Nav>
          {isAuthenticated && (
            <Button className='mx-3' variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
