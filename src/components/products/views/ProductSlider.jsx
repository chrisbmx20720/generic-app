import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { Button } from 'react-bootstrap';
import { getProducts } from '../../../services/ProductService';
import './ProductSlider.css'; // Archivo de estilos personalizado

const ProductSlider = () => {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      breakpoints={{
        // Ancho >= 1024px (pantallas grandes)
        1024: {
          slidesPerView: 4,
        },
        // Ancho >= 768px (tablets)
        768: {
          slidesPerView: 2,
        },
        // Ancho >= 320px (móviles)
        320: {
          slidesPerView: 1,
        },
      }}
      navigation={true} // Activar navegación
      pagination={{ clickable: true }} // Hacer la paginación clicable
      loop={true} // Habilitar el loop continuo
      modules={[Navigation, Pagination]} // Agregar los módulos necesarios
      className="mySwiper"
    >
      {Products.map((product) => (
        <SwiperSlide key={product.id} className="product-slide">
          <div className="product-card">
            <img 
              className="product-featured-image" 
              src={product.image.url} 
              alt={`Image of ${product.name}`} 
            />
            <div className="product-info">
              <h5>{product.name}</h5>
              <p>{product.excerpt}</p>
              <Button variant="primary" onClick={() => alert('Ver Producto')}>Ver Producto</Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
