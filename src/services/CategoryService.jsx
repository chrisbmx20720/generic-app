import React from 'react'


    const API_URL = 'http://localhost:3000'; // Cambia esto por tu URL base del API

    // Función para obtener las categorías de productos
    export const getProductCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/productCategories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
    
        const categories = await response.json();
        return categories;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
    
    // Función para crear una nueva categoría de productos
    export const postProductCategory = async (categoryData) => {
      try {
        const response = await fetch(`${API_URL}/productCategories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
    
        if (!response.ok) {
          throw new Error('Error al crear la categoría');
        }
    
        const newCategory = await response.json();
        return newCategory;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
