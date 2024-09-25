// ProductSlider.js
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ProductCard from '../../products/cards/ProductCard'
import { getProducts } from '../../../services/ProductService'

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
      spaceBetween={30}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      className="mySwiper"
    >
      {Products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
