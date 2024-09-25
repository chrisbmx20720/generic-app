import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../services/ProductService'
import ProductCard from '../cards/ProductCard';

export default function ShowProducts() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleView = (productId) => {
    console.log(`View product with ID: ${productId}`);
    // Lógica para ver los detalles del producto
  };

  return (
    <div className="row">
      {Products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={() => handleView(product.id)}
        />
      ))}
    </div>
  );
}
