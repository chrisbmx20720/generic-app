import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavBar from '../components/navbar/HomeNavbar';
import '../styles/Home.css'
import FooterComponent from '../components/footer/FooterComponent';
import ContactForm from '../components/forms/ContactForm';
//import ShowProducts from '../components/products/views/ShowProducts';

import ProductSlider from '../components/products/views/ProductSlider'

export default function Home() {
  return (
    <>
    <HomeNavBar/>

    <header className="masthead">
    <div className="container">
        <div className="masthead-subheading">¡Bienvenidos a Tukún Tukún!</div>
        <div className="masthead-heading text-uppercase">Del Corazon a la boca</div>
        <a className="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
    </div>
    </header>

    <Container className='bg-light'>
        <Row className='py-5'>
            {/*<ShowProducts/>*/}
            <ProductSlider/>
            
        </Row>
    </Container>

    <Container fluid className='bg-light' style={{ padding: 0 }}>
            <Row>
                {/* Columna izquierda (contenido) */}
                <Col sm={6} className='py-5 px-5'>
                    <h2 className="section-heading text-uppercase">Acerca de Nosotros</h2>
                    <p className="section-subheading text-muted">Del Corazón a la Boca: disfruta de nuestros sabores artesanales.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a className="btn btn-primary btn-xl text-uppercase" href="#">Ver Más</a>
                </Col>
                
                {/* Columna derecha (imagen de fondo) */}
                <Col sm={6} className="bg-image">
                    {/* Aquí puedes agregar contenido adicional si lo deseas */}
                </Col>
            </Row>
        </Container>


    <ContactForm/>
    <FooterComponent/>


  </>
  );
}


