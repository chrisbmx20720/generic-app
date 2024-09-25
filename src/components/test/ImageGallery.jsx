import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageGallery.css';
import { UploadImage } from './UploadImage';

export function ImageGallery({ onSelectImage }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to update the gallery
  const updateGallery = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setImages(response.data);
      setLoading(false); // Set loading to false after fetching images
    } catch (error) {
      setError('Error loading images');
      console.error('Error fetching images:', error);
      setLoading(false); // Set loading to false even on error
    }
  };

  useEffect(() => {
    updateGallery();
  }, []);

  const handleImageClick = (image) => {
    onSelectImage(image); // Pass the selected image back to the parent
  };

  return (
    <div className="container mt-5 pb-4">
      <UploadImage updateGallery={updateGallery} />
      {loading && <p className="text-center">Loading images...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      <div className="row">
        {images.length > 0 ? (
          images.map((image) => (
            <div className="col-md-2 mb-3" key={image.id}>
              <div className="card image-card">
                <img
                  src={`http://localhost:5000/uploads/${image.filename}`}
                  alt={image.alt_text || 'Gallery image'}
                  className="card-img-top image-square"
                  onClick={() => handleImageClick(image)} // Pass the entire image object
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No images found.</p>
        )}
      </div>
    </div>
  );
}
