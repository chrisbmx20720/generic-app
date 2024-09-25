import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faImage, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import MediaComponent from '../../components/media/MediaComponent';
import '../../components/products/Product.css';
import { getProductCategories, postProductCategory } from '../../services/CategoryService';
import { Navigate, useParams } from 'react-router-dom';
import { GetProductById, PutProduct } from '../../services/ProductService';

export default function EditProduct() {
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [product, setProduct] = useState({
    name: '',
    description: '',
    excerpt: '',
    provider: '',
    quantity: '',
    isFeatured: false,
    height: '',
    width: '',
    price: '',
    category: '',
    tags: '',
    image: {
      title: '',
      alt: '',
      caption: '',
      description: '',
      url: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  // Cargar los detalles del producto usando el ID
  useEffect(() => {
    fetchProductById();
    fetchCategories();
  }, [id]);

  const fetchProductById = async () => {
    try {
      const data = await GetProductById(id);
      setProduct(data);
      localStorage.setItem("imageData", JSON.stringify(data.image));
    } catch (err) {
      setError('Error loading product');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getProductCategories();
      setCategories(data);
    } catch (err) {
      setError('Error loading categories');
    }
  };

  const handleCategoryChange = (e) => {
    setProduct({
      ...product,
      category: e.target.value,
    });
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === '') return;
    try {
      const newCat = await postProductCategory({ name: newCategory });
      setCategories((prevCategories) => [...prevCategories, newCat]);
      setNewCategory('');
      toast.success('Category created successfully');
    } catch (err) {
      setError('Error creating category');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PutProduct(product); 
      <Navigate to="/admin/products/"/>
    
      toast.success(`Product updated successfully`,{
        autoClose: 1000
        })


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturedImage = () => {
    toast(
      <MediaComponent onImageSubmit={handleImageSubmit} />,
      {
        position: 'top-left',
        className: 'toast-left-full',
        autoClose: false,
      }
    );
  };

  const handleImageSubmit = (imageData) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: {
        title: imageData.title,
        alt: imageData.alt,
        description: imageData.description,
        url: imageData.url,
      },
    }));
    toast.dismiss(); // Cerrar el modal de MediaComponent
  };

  return (
    <div className="container mt-4">
      <Row>
        {/* Left column: Product form */}
        <Col lg={9}>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center mb-4">
                <Col>
                  <h2 className="mb-0">Edit Product</h2>
                </Col>

                <Col className="d-flex justify-content-end">
                <Button
                variant="primary"
                type="submit"
                disabled={loading}
                >
                {loading ? 'Updating...' : 'Update Product'}
                </Button>
                </Col>
            </Row>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={3}
              />
            </Form.Group>

            <Form.Group controlId="productExcerpt">
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                type="text"
                name="excerpt"
                value={product.excerpt}
                onChange={handleChange}
                placeholder="Enter short excerpt"
              />
            </Form.Group>

            <Form.Group controlId="productProvider">
              <Form.Label>Provider</Form.Label>
              <Form.Control
                type="text"
                name="provider"
                value={product.provider}
                onChange={handleChange}
                placeholder="Enter provider name"
              />
            </Form.Group>

            <Form.Group controlId="productQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Enter available quantity"
              />
            </Form.Group>

            <Form.Group controlId="productHeight">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="text"
                name="height"
                value={product.height}
                onChange={handleChange}
                placeholder="Enter product height"
              />
            </Form.Group>

            <Form.Group controlId="productWidth">
              <Form.Label>Width</Form.Label>
              <Form.Control
                type="text"
                name="width"
                value={product.width}
                onChange={handleChange}
                placeholder="Enter product width"
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter product price"
              />
            </Form.Group>

            
          </Form>
        </Col>

        {/* Right column: Categories, tags, featured image, featured product, and publish button */}
        <Col lg={3}>
          {/* Category section */}
          
          <Card className="mb-3">
            <Card.Header>Category</Card.Header>
            <Card.Body>
              <InputGroup>
                <FormControl
                  as="select"
                  value={product.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </FormControl>
              </InputGroup>

              <div className="mt-3">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={handleAddCategory}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </InputGroup>
              </div>
            </Card.Body>
          </Card>

          

          {/* Tags */}
          <Card className="mb-3">
            <Card.Body>
              <Form.Group controlId="productTags">
                <Form.Control
                  type="text"
                  name="tags"
                  value={product.tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas"
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Featured image */}
          <Card className="mb-3">
            <Card.Header>Featured Image</Card.Header>
            <Card.Body>
              <Button variant="outline-primary" onClick={handleFeaturedImage}>
                <FontAwesomeIcon icon={faImage} className="me-2" />
                Select Image
              </Button>
              {product.image.url && (
                <div className="mt-3">
                  <img
                    src={product.image.url}
                    alt={product.image.alt}
                    className="img-fluid"
                  />
                  <p>{product.image.title}</p>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Featured product */}
          <Card className="mb-3">
            <Card.Header>Featured Product</Card.Header>
            <Card.Body>
              <Form.Group controlId="productIsFeatured">
                <Form.Check
                  type="checkbox"
                  name="isFeatured"
                  checked={product.isFeatured}
                  onChange={handleChange}
                  label="Mark as featured product"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
