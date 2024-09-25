import React, { useState } from 'react';
import { Container, Row, Col, Tab, Tabs, Form, Button } from 'react-bootstrap';
import './MediaComponent.css'; 
import { UploadImage } from '../test/UploadImage';
import { ImageGallery } from '../test/ImageGallery';

const MediaComponent = ({ onImageSubmit }) => {
  const [formData, setFormData] = useState({
    alt: '',
    description: '',
    url: '',
    title: '',
  });

  // Function to handle image selection from ImageGallery
  const handleImageSelect = (image) => {
    setFormData({
      ...formData,
      url: `http://localhost:5000/uploads/${image.filename}`, // Use the filename from the selected image
      alt: image.alt_text || '', // Set alt text if available
      title: image.title || '' // Set title if available
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onImageSubmit(formData);
  };

  return (
    <Container>
      <Row>
        {/* Left column (larger) */}
        <Col md={9} className="p-3">
          <Tabs defaultActiveKey="upload" id="media-tabs" className="mb-3 custom-tabs">
            <Tab eventKey="upload" title="Upload">
              <div className="p-3">
                <UploadImage />
              </div>
            </Tab>
            <Tab eventKey="media" title="Media Library">
              <div className="p-3" id='mediaContainer'>
                <ImageGallery onSelectImage={handleImageSelect} />
              </div>
            </Tab>
          </Tabs>
        </Col>

        {/* Right column */}
        <Col md={3} className="p-3" style={{ borderLeft: '1px solid #ddd' }}>
          {formData.url ? (
            <img width="100" height="100" src={formData.url} alt={formData.alt || 'Image description'} />
          ) : (
            <p>Select a featured image below</p>
          )}
          
          <Form onSubmit={handleSubmit} className="p-3">
            <Form.Group controlId="formAlt">
              <Form.Label className="small-text">Alt</Form.Label>
              <Form.Control
                type="text"
                name="alt"
                value={formData.alt}
                onChange={handleInputChange}
                placeholder="Alt text"
                className="small-text"
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label className="small-text">Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="small-text"
              />
            </Form.Group>

            <Form.Group controlId="formUrl">
              <Form.Label className="small-text">URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="small-text"
              />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label className="small-text">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="small-text"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="small-text mt-4">
              Select featured image
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MediaComponent;
