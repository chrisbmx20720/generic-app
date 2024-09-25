import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { getUserById, PutUser } from '../../services/UserService';
import { Container, Form, Row, Col, Button, Alert, Nav } from 'react-bootstrap';
import {toast } from 'react-toastify';

export default function EditUser() {
    const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async (id) => {
      try {
        const fetchedUser = await getUserById(id);
        setUser(fetchedUser);
      } catch (error) {
        console.log("Error fetching user:", error);
        setError("Error fetching user data");
      }
    };

    if (id) {
      getUser(id);
    }
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name] : value,

      
    });

    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setLoading(true);

    
    try {
     await PutUser(user);
     
     toast.success("User updated successfully !",{
      autoClose: 1000
      })

    setTimeout(()=>{
      navigate('/admin/users');
    },1500)
    
   

    } catch (err) {
        setError(err.message);
    } finally {
      setLoading(false);
    
  };
  }

  return (
    <Container className="register-container">
      <div className="register-form">
        <h2 className="text-center mb-4">Edit User</h2>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  placeholder="Enter your lastname"
                  value={user.lastname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
  
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
           
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? 'Loading...' : 'Save Changes'}
          </Button>
        </Form>
      </div>
    </Container>
  );
}
