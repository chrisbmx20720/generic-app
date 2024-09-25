// ProductSlider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ProductCard from '../../products/cards/ProductCard'

const ProductSlider = ({ products }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      className="mySwiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
