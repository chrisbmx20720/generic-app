import React, { useState } from 'react';
import ProductListComponent from '../../components/products/ProductListComponent';
import ProductForm from '../../components/products/ProductForm';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Products() {
  const [registerProduct, setRegisterProduct] = useState(false); // Estado para alternar entre formulario y lista
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const { productId } = useParams(); // Obtener el productId de los parámetros

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Almacena el producto seleccionado
    setRegisterProduct(true); // Cambia a modo formulario
  };

  return (
    <div>
      <Row>
        <Col className="d-flex align-items-center mb-4">
          <h2 className="mb-0">
            {registerProduct ? 'Register Product' : 'Products'}
          </h2>
          <Button 
            variant="outline-dark" 
            onClick={() => {
              setRegisterProduct(!registerProduct); 
              if (!registerProduct) setSelectedProduct(null); // Resetea el producto seleccionado si se cambia de vuelta a la lista
            }} 
            className="ms-3"
          >
            {registerProduct ? 'Back to Product List' : 'Add New Product'}
          </Button>
        </Col>
      </Row>

      {/* Mostrar formulario o lista de productos según el estado */}
      {registerProduct || productId ? 
        <ProductForm product={selectedProduct} /> : 
        <ProductListComponent onEditProduct={handleEditProduct} />
      }
    </div>
  );
}
