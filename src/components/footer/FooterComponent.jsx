import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function FooterComponent() {
  return (
    <div>
       <footer className="footer py-4">
      <Container>
        <Row className="align-items-center">
          <Col lg={4} className="text-lg-start">
            Copyright &copy; Your Website 2023
          </Col>
          <Col lg={4} className="my-3 my-lg-0 text-center">
            <Button variant="dark" className="btn-social mx-2" href="#!" aria-label="Twitter">
              <FaTwitter />
            </Button>
            <Button variant="dark" className="btn-social mx-2" href="#!" aria-label="Facebook">
              <FaFacebookF />
            </Button>
            <Button variant="dark" className="btn-social mx-2" href="#!" aria-label="LinkedIn">
              <FaLinkedinIn />
            </Button>
          </Col>
          <Col lg={4} className="text-lg-end">
            <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
            <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  )
}
 