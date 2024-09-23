import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProducts, addProduct, deleteProduct } from '../utils/api';

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
      const newProduct = await addProduct(productData);
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