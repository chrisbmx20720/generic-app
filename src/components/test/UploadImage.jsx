import React, { useState } from 'react';
import axios from 'axios';

export function UploadImage({ updateGallery }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);

      
      updateGallery();

    } catch (error) {
      setMessage('Error subiendo la imagen');
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
        <div className="form-group mb-3">
          <input
            type="file"
            className="form-control"
            id="fileInput"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-dark btn-block">Subir</button>
      </form>
      {message && (
        <div className={`mt-3 alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}
