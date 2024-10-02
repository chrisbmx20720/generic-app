import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavBar from '../components/navbar/HomeNavbar';
import '../styles/Home.css'
import FooterComponent from '../components/footer/FooterComponent';
import ContactForm from '../components/forms/ContactForm';
//import ShowProducts from '../components/products/views/ShowProducts';
import ProductSlider from '../components/products/views/ProductSlider'
import MapComponent from '../components/map/MapComponent';

//import ProductSlider from '../components/products/views/ProductSlider'

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
            {/*

            
            <ProductSlider/>
             <ShowProducts/>
            */}

         <h2>Lo más vendido</h2>       
     
         <ProductSlider/>
            
        </Row>
    </Container>

    <Container fluid className='bg-light' style={{ padding: 0 }} id="about">
            <Row>
                {/* Columna izquierda (contenido) */}
                <Col sm={6} className='py-5 px-5'>
                    <h2 className="section-heading text-uppercase">Acerca de Nosotros</h2>
                    <p className="section-subheading text-muted">Del Corazón a la Boca: disfruta de nuestros sabores artesanales.</p>
                    <p>En Tukún Tukún, creemos en la magia de lo hecho a mano. Cada producto que ofrecemos está elaborado con dedicación y pasión, utilizando ingredientes frescos y de la más alta calidad. Nuestro compromiso es llevar a tu mesa una experiencia única, donde cada bocado cuenta una historia de tradición, amor y respeto por la cocina artesanal.

Nos inspira la riqueza de nuestra cultura, y por eso trabajamos incansablemente para preservar los sabores auténticos que nos identifican. Desde el primer día, nuestro objetivo ha sido fusionar lo mejor de las recetas tradicionales con un toque contemporáneo, creando delicias que sorprenden y deleitan a todos los paladares.

Ya sea que busques un regalo especial o simplemente quieras disfrutar de algo delicioso, estamos aquí para compartir contigo el fruto de nuestra pasión. Cada creación es un reflejo de nuestra dedicación a la excelencia y el cuidado por cada detalle.

¡Bienvenidos a nuestra familia de sabores!</p>
                    <a className="btn btn-primary btn-xl text-uppercase" href="#">Ver Más</a>
                </Col>
                
                {/* Columna derecha (imagen de fondo) */}
                <Col sm={6} className="bg-image">
                    {/* Aquí puedes agregar contenido adicional si lo deseas */}
                </Col>
            </Row>
        </Container>

    <div id="contact">
        
    <ContactForm/>
    </div>


    <Container fluid className='bg-light' style={{ padding: 0 }} >
        <Row>
            <MapComponent/>
        </Row>
    </Container>
    <FooterComponent/>


  </>
  );
}


