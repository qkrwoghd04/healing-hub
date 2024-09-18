import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProducts, addProduct, deleteProduct } from '../utils/api';

const API_URL = "http://Healing-hub-env.eba-3tqt3jvq.ap-northeast-2.elasticbeanstalk.com/api"
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const addNewProduct = async (productData) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: productData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const newProduct = await response.json();
      setProducts(prevProducts => [...prevProducts, newProduct]);
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };
  const refreshProducts = async () => {
    await loadProducts();
  };
  

  return (
    <ProductContext.Provider value={{ 
      products, 
      addNewProduct, 
      removeProduct,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);