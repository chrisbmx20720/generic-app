import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css'

export default function ProductCard({ product, onView }) {
  const { name, category, price, quantity, imageUrl } = product; // Desestructuramos el objeto product

  return (
    <div className="col-3">
      <Card style={{ width: '100%' }}>
        <Card.Img className="product-featured-image" variant="top" src={product.image.url} alt={`Image of ${name}`} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {product.excerpt}
          </Card.Text>
          <Button variant="primary" onClick={onView}>Ver Producto</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
